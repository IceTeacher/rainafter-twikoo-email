# Rainafter-Twikoo 邮件通知模板

这是一个基于 React Email 开发的用于 Twikoo 评论系统邮件通知模板项目，提供可本地预览、可导出、可定制主题的邮件模板实现。当前仓库内置 `Rainafter` 和 `Fuwari` 两套主题，并分别包含访客回复通知与管理员评论通知模板。

## 功能概览

- 基于 React Email 构建邮件模板，便于开发、预览与导出
- 适用于 Twikoo 评论系统的通知邮件场景
- 内置两套主题：`Rainafter`、`Fuwari`
- 每套主题均包含两类模板：
  - `notification.tsx`：访客收到评论回复通知
  - `notification-admin.tsx`：站点管理员收到新评论通知
- 支持通过配置文件修改主题色、Banner 图片和预览数据
- 支持本地启动预览服务，减少反复发送测试邮件的成本

## 模板预览

### Rainafter 主题

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start;">
  <div align="center">
    <img src="docs/picture/rainafter-notification.webp" alt="rainafter 普通评论回复通知" style="width: 100%; height: 420px; object-fit: contain;" />
    <strong>普通评论回复通知 <code>notification</code></strong><br />
  </div>
  <div align="center">
    <img src="docs/picture/rainafter-notification-admin.webp" alt="rainafter 管理员新评论通知" style="width: 100%; height: 420px; object-fit: contain;" />
    <strong>管理员新评论通知 <code>notification-admin</code></strong><br />
  </div>
</div>

Rainafter 主题以清新简约的设计风格为主，配色柔和。
### Fuwari 主题

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start;">
  <div align="center">
    <img src="docs/picture/fuwari-notification.webp" alt="fuwari 普通评论回复通知" style="width: 100%; height: 420px; object-fit: contain;" />
    <strong>普通评论回复通知 <code>notification</code></strong><br />
  </div>
  <div align="center">
    <img src="docs/picture/fuwari-notification-admin.webp" alt="fuwari 管理员新评论通知" style="width: 100%; height: 420px; object-fit: contain;" />
    <strong>管理员新评论通知 <code>notification-admin</code></strong><br />
  </div>
</div>

Fuwari 主题参考了知名 Astro 博客主题 [Fuwari](https://github.com/saicaca/fuwari) 的设计风格和配色方案。

## 开始使用

先安装依赖：

```bash
pnpm install
```

启动本地预览开发服务：

```bash
pnpm dev
```

启动后可在浏览器中打开 `http://localhost:3000` 查看邮件模板预览。

导出邮件模板：

```bash
pnpm build
```

或：

```bash
pnpm export
```

## 项目结构

当前主要模板入口如下：

```text
emails/
├── rainafter/
│   ├── config.ts
│   ├── notification.tsx
│   └── notification-admin.tsx
└── fuwari/
    ├── config.ts
    ├── notification.tsx
    └── notification-admin.tsx
```

- `emails/rainafter/`：`rainafter` 主题模板
- `emails/fuwari/`：`fuwari` 主题模板
- `notification.tsx`：普通评论回复通知模板
- `notification-admin.tsx`：管理员新评论通知模板
- `config.ts`：主题配置入口

## 主题修改

如果你想调整邮件主题，优先从对应主题目录下的 `config.ts` 开始：

- `emails/rainafter/config.ts`
- `emails/fuwari/config.ts`

当前可直接在配置中调整的内容包括：

- 主题颜色
- Banner 图片地址
- 开发预览用的示例数据

如果需要进一步修改卡片结构、文案布局或样式细节，再进入对应主题下的模板文件和组件文件进行调整。

## License

MIT License
