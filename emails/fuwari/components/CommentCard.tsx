import { Section, Row, Column, Text } from 'react-email';
import { CommentCardProps } from '@/fuwari/types';
import { AvatarBadge } from '@/fuwari/components/AvatarBadge';

// 评论卡片
export function CommentCard({ avatarSrc, nick, label, content, backgroundColor }: CommentCardProps) {
  return (
    <Section className="rounded-[20px] px-6 py-4" style={{ backgroundColor }}>
      <Row>
        <Column className="w-10.5 align-top">
          <AvatarBadge src={avatarSrc} name={nick} />
        </Column>
        <Column className="pl-4 align-top">
          <Text className="font-15 font-inter text-textPrimary m-0">{nick}</Text>
          <Text className="font-13 font-inter text-textMuted m-0 mt-1">{label}</Text>
        </Column>
      </Row>
      <Section className="mt-2">
        <div className="comment-rich-content" dangerouslySetInnerHTML={{ __html: content }} />
      </Section>
    </Section>
  );
}
