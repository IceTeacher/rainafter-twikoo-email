import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import test from 'node:test';
import nodemailer from 'nodemailer';
import { buildTemplatePayload, templateDefinitions, type TemplatePayload } from './email-fixtures.ts';

const execFileAsync = promisify(execFile);
const rootDir = process.cwd();
const placeholderPattern = /\$\{([A-Z_]+)\}/g;
const defaultSendDelayMs = 1000; // 默认每封邮件之间间隔 1 秒，避免过快触发 SMTP 服务商的速率限制
const baseTestTimeoutMs = 120000; // 基础测试超时时间 2 分钟

// 测试发信所需的环境变量配置
interface EmailEnv {
  recipients: string[];
  from: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  smtpRequireTls: boolean;
  subjectPrefix: string;
  sendDelayMs: number;
}

// 解析布尔值环境变量，默认为 false，只要值为 "true"（不区分大小写）就返回 true
function parseBoolean(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value.trim() === '') {
    return defaultValue;
  }
  return value.trim().toLowerCase() === 'true';
}

//
function parseNonNegativeInt(name: string, value: string | undefined, defaultValue: number): number {
  if (value === undefined || value.trim() === '') {
    return defaultValue;
  }

  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }

  return parsedValue;
}

// 读取必填环境变量，缺失时直接让测试失败
function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

// 将测试脚本依赖的 SMTP 与收件人配置统一解析成结构化对象
function getEmailEnv(): EmailEnv {
  const recipientsRaw = getRequiredEnv('EMAIL_TEST_RECIPIENTS'); // 收件人列表
  const recipients = recipientsRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  // 至少需要一个收件人地址
  if (recipients.length === 0) {
    throw new Error('EMAIL_TEST_RECIPIENTS must include at least one recipient address');
  }
  // 验证 SMTP 端口号
  const smtpPort = Number.parseInt(getRequiredEnv('SMTP_PORT'), 10);
  if (Number.isNaN(smtpPort)) {
    throw new Error('SMTP_PORT must be a valid integer');
  }
  // 验证发信间隔
  const sendDelayMs = parseNonNegativeInt(
    'EMAIL_TEST_SEND_DELAY_MS',
    process.env.EMAIL_TEST_SEND_DELAY_MS,
    defaultSendDelayMs,
  );

  return {
    recipients,
    from: getRequiredEnv('EMAIL_TEST_FROM'),
    smtpHost: getRequiredEnv('SMTP_HOST'),
    smtpPort,
    smtpSecure: parseBoolean(process.env.SMTP_SECURE),
    smtpUser: getRequiredEnv('SMTP_USER'),
    smtpPass: getRequiredEnv('SMTP_PASS'),
    smtpRequireTls: parseBoolean(process.env.SMTP_REQUIRE_TLS),
    subjectPrefix: process.env.EMAIL_TEST_SUBJECT_PREFIX?.trim() || '[email-compat]',
    sendDelayMs,
  };
}

// 根据测试矩阵规模和发信间隔动态计算测试超时时间，确保在 CI 环境中有足够时间完成全部测试流程
function getEmailTestTimeoutMs(): number {
  const recipients = process.env.EMAIL_TEST_RECIPIENTS?.split(',')
    .map((item) => item.trim())
    .filter(Boolean).length;

  const sendCount = (recipients || 1) * templateDefinitions.length;
  const sendDelayMs = parseNonNegativeInt(
    'EMAIL_TEST_SEND_DELAY_MS',
    process.env.EMAIL_TEST_SEND_DELAY_MS,
    defaultSendDelayMs,
  );
  const throttlingBudgetMs = Math.max(0, sendCount - 1) * sendDelayMs;

  return baseTestTimeoutMs + throttlingBudgetMs;
}

// 将模板渲染时需要的占位符统一转换成字符串映射
function toPlaceholderMap(payload: TemplatePayload): Record<string, string> {
  return {
    SITE_URL: payload.siteUrl ?? '',
    SITE_NAME: payload.siteName ?? '',
    PARENT_NICK: payload.parentNick ?? '',
    PARENT_COMMENT: payload.parentComment ?? '',
    NICK: payload.nick ?? '',
    COMMENT: payload.comment ?? '',
    POST_URL: payload.postUrl ?? '',
    IMG: payload.img ?? '',
    PARENT_IMG: payload.parentImg ?? '',
    MAIL: payload.mail ?? '',
  };
}

// 将 HTML 模板中的占位符替换成实际值，并验证是否有未替换的占位符残留，确保测试发出的邮件内容完整
function replacePlaceholders(html: string, payload: TemplatePayload): string {
  const placeholders = toPlaceholderMap(payload);

  const renderedHtml = html.replaceAll(placeholderPattern, (_, key: string) => placeholders[key] ?? '');
  const remainingPlaceholders = renderedHtml.match(placeholderPattern);

  assert.equal(
    remainingPlaceholders,
    null,
    `Rendered HTML still contains unresolved placeholders: ${remainingPlaceholders?.join(', ')}`,
  );

  return renderedHtml;
}

// 每次测试都先重新构建邮件模板，确保发出的就是当前 out/ 产物
async function buildTemplates(): Promise<void> {
  await execFileAsync('pnpm', ['build'], {
    cwd: rootDir,
    env: process.env,
  });
}

// 在两次发信之间插入可配置延时，降低测试矩阵对 SMTP 服务的瞬时压力
async function waitForNextSend(sendDelayMs: number): Promise<void> {
  if (sendDelayMs <= 0) {
    return;
  }

  await sleep(sendDelayMs);
}

// 按“模板 × 收件人”执行 SMTP 发信测试
test(
  'email compatibility test matrix sends built templates via SMTP',
  { timeout: getEmailTestTimeoutMs() },
  async (t) => {
    const emailEnv = getEmailEnv();
    let hasSentEmail = false;

    await buildTemplates();

    // 先确认构建产物存在，再继续后续替换和发信
    for (const definition of templateDefinitions) {
      await access(path.join(rootDir, definition.htmlPath));
    }

    // 使用构建产物创建 SMTP 连接
    const transporter = nodemailer.createTransport({
      host: emailEnv.smtpHost,
      port: emailEnv.smtpPort,
      secure: emailEnv.smtpSecure,
      requireTLS: emailEnv.smtpRequireTls,
      auth: {
        user: emailEnv.smtpUser,
        pass: emailEnv.smtpPass,
      },
    });

    await transporter.verify();

    for (const definition of templateDefinitions) {
      const templateHtml = await readFile(path.join(rootDir, definition.htmlPath), 'utf8');
      // 根据模板 ID 构建占位符数据，并渲染成最终 HTML
      const payload = buildTemplatePayload(definition.id);
      const html = replacePlaceholders(templateHtml, payload);

      for (const recipient of emailEnv.recipients) {
        // 为每个收件人单独创建子测试，失败时能直接定位到目标邮箱
        await t.test(`${definition.id} -> ${recipient}`, async () => {
          if (hasSentEmail) {
            await waitForNextSend(emailEnv.sendDelayMs);
          }

          const info = await transporter.sendMail({
            from: emailEnv.from,
            to: recipient,
            subject: `${emailEnv.subjectPrefix} ${definition.theme} ${definition.template}`,
            html,
          });

          hasSentEmail = true;

          // 输出最小必要日志，便于核对哪封邮件已成功送出
          console.log(
            JSON.stringify({
              theme: definition.theme,
              template: definition.template,
              recipient,
              messageId: info.messageId,
              sendDelayMs: emailEnv.sendDelayMs,
            }),
          );
        });
      }
    }

    // 主测试结束后主动关闭 SMTP 连接池
    transporter.close();
  },
);
