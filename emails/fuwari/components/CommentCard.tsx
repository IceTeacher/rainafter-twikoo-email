import { Section, Row, Column, Text } from 'react-email';
import { commentTextStyle } from '../theme';
import { CommentCardProps } from '../types';
import { AvatarBadge } from './AvatarBadge';

// 评论卡片
export function CommentCard({
  avatarSrc,
  nick,
  label,
  content,
  backgroundColor,
  avatarBackgroundColor,
  avatarTextColor,
}: CommentCardProps) {
  return (
    <Section className="rounded-[20px] px-6 py-4" style={{ backgroundColor }}>
      <Row>
        <Column className="w-[42px] align-top">
          <AvatarBadge
            src={avatarSrc}
            name={nick}
            backgroundColor={avatarBackgroundColor}
            textColor={avatarTextColor}
          />
        </Column>
        <Column className="pl-4 align-top">
          <Text className="font-15 font-inter text-fg m-0">{nick}</Text>
          <Text className="font-13 font-inter text-fg-3 m-0 mt-1">{label}</Text>
        </Column>
      </Row>
      <Section className="mt-2">
        <div className="comment-rich-content" style={commentTextStyle} dangerouslySetInnerHTML={{ __html: content }} />
      </Section>
    </Section>
  );
}
