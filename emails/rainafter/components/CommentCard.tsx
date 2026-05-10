import { Section, Row, Column, Text } from 'react-email';
import { CommentCardProps } from '@/rainafter/types';
import { AvatarBadge } from '@/rainafter/components/AvatarBadge';

// 评论卡片
export function CommentCard({ avatarSrc, nick, label, content, backgroundColor }: CommentCardProps) {
  return (
    <>
      <Text className="font-16 text-textMuted m-0 mb-2 font-sans">{label}</Text>
      <Section className="rounded-[20px] px-6 py-4" style={{ backgroundColor }}>
        <Row>
          <Column className="w-10.5 align-top">
            <AvatarBadge src={avatarSrc} name={nick} />
          </Column>
          <Column className="pl-4 align-top">
            <Text className="font-15 text-textPrimary m-0 mt-1 font-sans">{nick}</Text>
            <Section className="mt-2">
              <div className="comment-rich-content" dangerouslySetInnerHTML={{ __html: content }} />
            </Section>
          </Column>
        </Row>
      </Section>
    </>
  );
}
