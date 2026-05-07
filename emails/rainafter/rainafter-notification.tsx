import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import { CollageFonts } from './collage-fonts';
import { collageTailwindConfig } from './theme';

interface RainafterNotificationEmailProps {
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
  ip?: string; // ${IP}
}

interface AvatarBadgeProps {
  src?: string;
  name: string;
}

interface CommentCardProps {
  avatarSrc?: string;
  nick: string;
  label: string;
  content: string;
}

const commentTextStyle = {
  whiteSpace: 'pre-line' as const,
  wordBreak: 'break-word' as const,
  overflowWrap: 'anywhere' as const,
};

const metaValueStyle = {
  wordBreak: 'break-word' as const,
  overflowWrap: 'anywhere' as const,
};

function getInitial(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return '?';
  }

  return Array.from(trimmedName)[0]?.toLocaleUpperCase() ?? '?';
}

function AvatarBadge({ src, name }: AvatarBadgeProps) {
  if (src) {
    return (
      <Img
        src={src}
        alt={`${name} 的头像`}
        width={48}
        height={48}
        className="border-stroke block rounded-full border"
      />
    );
  }

  return (
    <Text
      className="bg-bg-2 border-stroke font-15 font-inter text-fg m-0 rounded-full border text-center"
      style={{
        width: '48px',
        height: '48px',
        lineHeight: '48px',
      }}
    >
      {getInitial(name)}
    </Text>
  );
}

function CommentCard({ avatarSrc, nick, label, content }: CommentCardProps) {
  return (
    <Section className="border-stroke bg-bg rounded-[8px] border px-5 py-5">
      <Row>
        <Column className="w-[56px] align-top">
          <AvatarBadge src={avatarSrc} name={nick} />
        </Column>
        <Column className="pl-4 align-top">
          <Text className="font-15 font-inter text-fg m-0">{nick}</Text>
          <Text className="font-13 font-inter text-fg-3 m-0 mt-1">{label}</Text>
          <Text className="font-14 font-inter text-fg-2 m-0 mt-4" style={commentTextStyle}>
            {content}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

function MetaRow({ label, value, bordered = true }: { label: string; value: string; bordered?: boolean }) {
  return (
    <Row className={bordered ? 'border-stroke border-b' : ''}>
      <Column className="w-[88px] py-3 pr-3 align-top">
        <Text className="font-13 font-inter text-fg-3 m-0">{label}</Text>
      </Column>
      <Column className="py-3 align-top">
        <Text className="font-13 font-inter text-fg-2 m-0" style={metaValueStyle}>
          {value}
        </Text>
      </Column>
    </Row>
  );
}

export const RainafterNotificationEmail = ({
  siteUrl = 'https://rainafter.example.com',
  siteName = 'Rainafter',
  parentNick = '林山',
  parentComment = '这篇文章把问题讲得很清楚，尤其是最后一段关于执行顺序的提醒，对我很有帮助。',
  nick = '阿雨',
  comment = '谢谢你的留言，我补充了一个更直接的排查方法。\n你可以点开文章末尾的更新说明，再对照一下现在的配置。',
  postUrl = 'https://rainafter.example.com/posts/reply-notification',
  img = 'https://i.pravatar.cc/120?img=14',
  parentImg = 'https://i.pravatar.cc/120?img=32',
  mail = 'replyer@example.com',
  ip = '203.0.113.42',
}: RainafterNotificationEmailProps) => {
  const previewText = `${nick} 回复了你在 ${siteName} 的评论`;
  const homeUrl = siteUrl || postUrl;
  const detailUrl = postUrl || siteUrl;

  return (
    <Tailwind config={collageTailwindConfig}>
      <Html>
        <Head>
          <CollageFonts />
        </Head>

        <Body className="bg-canvas font-14 font-inter text-fg m-0 p-0">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto max-w-[640px] px-4 pt-16 pb-6">
            <Section className="shadow-collage-card rounded-[8px]">
              <Section className="bg-bg border-stroke rounded-[8px] border">
                <Section className="mobile:px-6! mobile:pt-10 px-10 pt-16 pb-14 text-left">
                  <Section className="mb-9 text-left">
                    <Text className="font-15 font-inter text-fg m-0">{siteName} 评论通知</Text>
                    <Text className="font-48 text-fg m-0 mt-5 font-sans">有人回复了你的评论</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-[18px]">{parentNick}，你好！</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0">
                      <strong className="text-fg">{nick}</strong> 在 <strong className="text-fg">{siteName}</strong>{' '}
                      回复了你发表的评论。点开下方按钮即可查看上下文，并继续参与这次讨论。
                    </Text>
                  </Section>

                  <Section className="text-left">
                    <Button
                      href={detailUrl}
                      className="bg-brand font-15 font-inter text-fg-inverted inline-block border-none px-5 py-3.5 text-center"
                    >
                      查看原文与回复
                    </Button>
                    <Text className="font-13 font-inter text-fg-3 m-0 mt-4">
                      或返回{' '}
                      <Link href={homeUrl} className="text-fg-2">
                        {siteName}
                      </Link>{' '}
                      查看更多动态。
                    </Text>
                  </Section>
                </Section>

                <Section className="bg-bg-2 mobile:px-6! mobile:py-12! px-10 py-14">
                  <Section className="mb-8">
                    <Text className="font-32 text-fg m-0 font-sans">本次对话</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-3 max-w-[460px]">
                      下面是与你这次通知直接相关的评论内容。评论按纯文本展示，并保留原始换行。
                    </Text>
                  </Section>

                  <CommentCard avatarSrc={parentImg} nick={parentNick} label="你的评论" content={parentComment} />

                  <Section className="mt-4">
                    <CommentCard avatarSrc={img} nick={nick} label={`${nick} 的回复`} content={comment} />
                  </Section>
                </Section>

                <Section className="border-stroke mobile:px-6! border-t px-10 py-12">
                  <Text className="font-13 font-inter text-fg-3 m-0 max-w-[360px]">
                    你收到这封邮件，是因为有人回复了你在 {siteName} 的评论。若这不是你预期收到的通知，请登录{' '}
                    <Link href={homeUrl} className="text-fg-2">
                      {siteName}
                    </Link>{' '}
                    检查通知设置。
                  </Text>

                  <Text className="m-0 mt-4">
                    <Link href={homeUrl} className="font-14 font-inter text-fg">
                      访问 {siteName}
                    </Link>
                  </Text>

                  <Section className="bg-bg-2 border-stroke mt-8 rounded-[8px] border px-5 py-4">
                    <MetaRow label="文章链接" value={detailUrl} />
                    <MetaRow label="回复者邮箱" value={mail || '未提供'} />
                    <MetaRow label="来源 IP" value={ip || '未提供'} bordered={false} />
                  </Section>
                </Section>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

RainafterNotificationEmail.PreviewProps = {
  siteUrl: 'https://rainafter.example.com',
  siteName: 'Rainafter',
  parentNick: '林山',
  parentComment: '这篇文章把问题讲得很清楚，尤其是最后一段关于执行顺序的提醒，对我很有帮助。',
  nick: '阿雨',
  comment: '谢谢你的留言，我补充了一个更直接的排查方法。\n你可以点开文章末尾的更新说明，再对照一下现在的配置。',
  postUrl: 'https://rainafter.example.com/posts/reply-notification',
  img: 'https://i.pravatar.cc/120?img=14',
  parentImg: 'https://i.pravatar.cc/120?img=32',
  mail: 'replyer@example.com',
  ip: '203.0.113.42',
} satisfies RainafterNotificationEmailProps;

export default RainafterNotificationEmail;
