export interface RainafterNotificationEmailProps {
  siteUrl?: string; // ${SITE_URL}
  siteName?: string; // ${SITE_NAME}
  parentNick?: string; // ${PARENT_NICK}
  parentComment?: string; // ${PARENT_COMMENT}, trusted HTML snippet or plain text
  nick?: string; // ${NICK}
  comment?: string; // ${COMMENT}, trusted HTML snippet or plain text
  postUrl?: string; // ${POST_URL}
  img?: string; // ${IMG}
  parentImg?: string; // ${PARENT_IMG}
  mail?: string; // ${MAIL}
  ip?: string; // ${IP}
  bannerImage?: string; // optional site banner image
}

export interface AvatarBadgeProps {
  src?: string;
  name: string;
  backgroundColor: string;
  textColor: string;
}

export interface CommentCardProps {
  avatarSrc?: string;
  nick: string;
  label: string;
  content: string; // trusted HTML snippet or placeholder string
  backgroundColor: string;
  avatarBackgroundColor: string;
  avatarTextColor: string;
}
