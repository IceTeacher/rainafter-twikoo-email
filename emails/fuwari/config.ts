import type { NotificationEmailProps } from '@/fuwari/types';

// 站点默认 Banner 图片 URL
export const defaultBannerImage = 'https://www.rainafter.cn/images/banner.jpg';

// 邮件主题色配置
export const colors = {
  pageBackground: '#EAEEF5', // 页面背景色
  emailSurface: '#FFFFFF', // 邮件卡片主体
  sectionSubtleBackground: '#F5F8FE', // 用于区分层次的次级背景色
  textPrimary: '#1F2937', // 主要文本色
  textSecondary: '#475467', // 次要文本色
  textMuted: '#667085', // 辅助文字色
  actionPrimary: '#4272B8', // 主要操作色
  actionPrimarySubtle: '#E4EFFF', // 主要操作色（柔和）
  borderSubtle: '#D7E1F0', // 次要边框色
  commentCardOriginalBackground: '#FFFFFF', // 原始评论卡片背景色
  commentCardReplyBackground: '#E4EFFF', // 回复评论卡片背景色
  commentCardNewCommentBackground: '#E4EFFF', // 新评论卡片背景色
  richContentCodeBackground: '#F4F4F4', // 富文本中代码块背景色
  richContentCodeText: '#333333', // 富文本中代码块文字色
} as const;

// 字体配置
export const fontScale = {
  11: {
    fontSize: '11px',
    lineHeight: '1.5',
    letterSpacing: '-0.033px',
    fontWeight: '300',
  },
  13: {
    fontSize: '13px',
    lineHeight: '1.5',
    letterSpacing: '-0.039px',
    fontWeight: '300',
  },
  14: { fontSize: '14px', lineHeight: '1.5' },
  15: {
    fontSize: '15px',
    lineHeight: '1.5',
    letterSpacing: '-0.075px',
    fontWeight: '500',
  },
  20: { fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' },
  32: { fontSize: '32px', lineHeight: '1.2', letterSpacing: '-0.6px' },
  48: { fontSize: '48px', lineHeight: '1', letterSpacing: '-1.44px' },
  58: { fontSize: '58px', lineHeight: '1', letterSpacing: '-1.74px' },
  88: { fontSize: '88px', lineHeight: '1', letterSpacing: '-2.64px' },
} as const;

// 用于开发模式的普通评论通知邮件预览数据
export const notificationEmailPreviewProps = {
  siteUrl: 'https://rainafter.example.com',
  siteName: 'Rainafter',
  parentNick: '林山',
  parentComment: '这篇文章把问题讲得很清楚，尤其是最后一段关于执行顺序的提醒，对我很有帮助。',
  nick: '阿雨',
  comment: '谢谢您的留言，我补充了一个更直接的排查方法。\n您可以点开文章末尾的更新说明，再对照一下现在的配置。',
  postUrl: 'https://rainafter.example.com/posts/reply-notification',
  img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
  parentImg: 'https://weavatar.com/avatar/0010c1a19fe3135e77a9065bf4609f8219e0f5bff051999e1b31bcf90a0a2024?s=256',
  bannerImage: defaultBannerImage,
} satisfies NotificationEmailProps;

// 用于开发模式的管理员评论通知邮件预览数据
export const notificationAdminEmailPreviewProps = {
  siteUrl: 'https://rainafter.example.com',
  siteName: 'Rainafter',
  nick: '阿雨',
  comment: '这篇文章的排版和插图都很好，尤其是最后一段关于配置回退逻辑的说明，对我排查问题很有帮助。',
  postUrl: 'https://rainafter.example.com/posts/admin-notification',
  img: 'https://weavatar.com/avatar/79fa08da7bcb57cd5bf5f3f7c423926f5e686f5d72f76107314506202382c63e?s=256',
  bannerImage: defaultBannerImage,
} satisfies NotificationEmailProps;

export const config = {
  defaultBannerImage,
  colors,
  fontScale,
  notificationEmailPreviewProps,
  notificationAdminEmailPreviewProps,
} as const;
