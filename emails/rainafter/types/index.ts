export interface NotificationEmailProps {
  siteUrl?: string; // ${SITE_URL}
  siteName?: string; // ${SITE_NAME}
  parentNick?: string; // ${PARENT_NICK}
  parentComment?: string; // ${PARENT_COMMENT}
  nick?: string; // ${NICK}
  comment?: string; // ${COMMENT}
  postUrl?: string; // ${POST_URL}
  img?: string; // ${IMG}
  parentImg?: string; // ${PARENT_IMG}
  mail?: string; // ${MAIL}
  bannerImage?: string; // 可选的头部图片 URL
}

export interface AvatarBadgeProps {
  src?: string;
  name: string;
}

export interface CommentCardProps {
  avatarSrc?: string;
  nick: string;
  label: string;
  content: string;
  backgroundColor: string;
}
