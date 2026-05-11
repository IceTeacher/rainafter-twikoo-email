export type ThemeId = 'fuwari' | 'rainafter';
export type TemplateKind = 'notification' | 'notification-admin';
export type TemplateId =
  | 'fuwari.notification'
  | 'fuwari.notification-admin'
  | 'rainafter.notification'
  | 'rainafter.notification-admin';

export interface TemplatePayload {
  siteUrl?: string;
  siteName?: string;
  parentNick?: string;
  parentComment?: string;
  nick?: string;
  comment?: string;
  postUrl?: string;
  img?: string;
  parentImg?: string;
  mail?: string;
  bannerImage?: string;
}

interface BaseTemplateFixture extends Omit<TemplatePayload, 'parentComment' | 'comment'> {}

export interface TemplateDefinition {
  id: TemplateId;
  theme: ThemeId;
  template: TemplateKind;
  htmlPath: string;
}

const avatarNick = '兼容性测试用户';
const parentNick = '原评论作者';

// 每个模板的基础测试数据，存放不随测试场景变化的字段
const baseFixtures: Record<TemplateId, BaseTemplateFixture> = {
  'fuwari.notification': {
    siteUrl: 'https://rainafter.example.com',
    siteName: 'Rainafter',
    parentNick,
    nick: avatarNick,
    postUrl: 'https://rainafter.example.com/posts/email-compatibility-reply',
    img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
    parentImg: 'https://weavatar.com/avatar/0010c1a19fe3135e77a9065bf4609f8219e0f5bff051999e1b31bcf90a0a2024?s=256',
    mail: 'compat@example.com',
    bannerImage: 'https://www.rainafter.cn/images/banner.jpg',
  },
  'fuwari.notification-admin': {
    siteUrl: 'https://rainafter.example.com',
    siteName: 'Rainafter',
    nick: avatarNick,
    postUrl: 'https://rainafter.example.com/posts/email-compatibility-admin',
    img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
    mail: 'compat@example.com',
    bannerImage: 'https://www.rainafter.cn/images/banner.jpg',
  },
  'rainafter.notification': {
    siteUrl: 'https://rainafter.example.com',
    siteName: 'Rainafter',
    parentNick,
    nick: avatarNick,
    postUrl: 'https://rainafter.example.com/posts/email-compatibility-reply',
    img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
    parentImg: 'https://weavatar.com/avatar/0010c1a19fe3135e77a9065bf4609f8219e0f5bff051999e1b31bcf90a0a2024?s=256',
    mail: 'compat@example.com',
    bannerImage: 'https://www.rainafter.cn/images/emails/rainafter/banner.webp',
  },
  'rainafter.notification-admin': {
    siteUrl: 'https://rainafter.example.com',
    siteName: 'Rainafter',
    nick: avatarNick,
    postUrl: 'https://rainafter.example.com/posts/email-compatibility-admin',
    img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
    mail: 'compat@example.com',
    bannerImage: 'https://www.rainafter.cn/images/emails/rainafter/adminBanner.webp',
  },
};

// 单封邮件内同时覆盖文本、长文本、长链接、代码块和图片样本
const combinedParentComment = `
  <p>这是一条普通文本父评论，用于验证常规中文内容在不同邮箱客户端中的显示效果</p>
  <p>第二段补充更长的说明文字，观察段间距是否稳定、长句是否会撑破容器，以及中英文混排在窄屏客户端中的断行效果是否自然</p>
  <p>长链接测试：https://rainafter.example.com/posts/email-compatibility/very-long-path/with-query?theme=fuwari&template=notification&mode=combined</p>
  <p>下面这段父评论包含代码块与行内代码，用于验证邮件客户端对富文本代码内容的渲染</p>
  <pre><code>const template = "reply-notification";
const client = "mail-client";
console.log(template, client);</code></pre>
  <p>同时检查行内 <code>HTML_ESCAPE_TEST</code> 是否正确展示</p>
  <p>父评论中包含一张图片，用于验证图片缩放、圆角和说明文字的显示效果</p>
  <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" alt="Scenery test image"/>
  <p>图片下方说明：这是一张用于测试邮件图片展示的风景图</p>
`.trim();

const combinedComment = `
  <p>这是一条普通文本回复，用于验证基础排版、字体和链接按钮是否正常显示</p>
  <p>这里继续补充较长的回复内容，包含更多中文字符、English words、1234567890，以及换行后的段落布局是否仍旧清晰可读</p>
  <p>长链接测试：https://rainafter.example.com/docs/email/rendering/client-behavior?mode=combined&template=notification</p>
  <p>这条回复包含一个代码段：</p>
  <pre><code>function sendTestMail(theme) {
  return \`rendered:\${theme}\`;
}</code></pre>
  <p>并补充一段行内代码 <code>pnpm test:email</code> 作为兼容性样本</p>
  <p>回复内容同样包含一张图片，用于验证富文本中的图文混排表现</p>
  <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80" alt="Forest test image"/>
  <p>图片说明：验证常见邮箱客户端对远程图片的加载和排版处理</p>
`.trim();

// 导出 HTML 模板
export const templateDefinitions: readonly TemplateDefinition[] = [
  {
    id: 'fuwari.notification',
    theme: 'fuwari',
    template: 'notification',
    htmlPath: 'out/fuwari/notification.html',
  },
  {
    id: 'fuwari.notification-admin',
    theme: 'fuwari',
    template: 'notification-admin',
    htmlPath: 'out/fuwari/notification-admin.html',
  },
  {
    id: 'rainafter.notification',
    theme: 'rainafter',
    template: 'notification',
    htmlPath: 'out/rainafter/notification.html',
  },
  {
    id: 'rainafter.notification-admin',
    theme: 'rainafter',
    template: 'notification-admin',
    htmlPath: 'out/rainafter/notification-admin.html',
  },
] as const;

// 注入测试数据到模板
export function buildTemplatePayload(templateId: TemplateId): TemplatePayload {
  const base = baseFixtures[templateId];

  if (templateId.endsWith('notification-admin')) {
    return {
      ...base,
      comment: combinedComment,
    };
  }

  return {
    ...base,
    parentComment: combinedParentComment,
    comment: combinedComment,
  };
}
