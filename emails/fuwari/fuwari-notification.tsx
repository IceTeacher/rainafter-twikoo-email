import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Tailwind, Text } from 'react-email';
import { CollageFonts } from './theme/collage-fonts';
import { collageTailwindConfig, commentRichContentCss, metaValueStyle } from './theme';
import type { RainafterNotificationEmailProps } from './types';
import { CommentCard } from './components/CommentCard';
import { config } from './config';

export const RainafterNotificationEmail = ({
  siteUrl = '${SITE_URL}',
  siteName = '${SITE_NAME}',
  parentNick = '${PARENT_NICK}',
  parentComment = '${PARENT_COMMENT}',
  nick = '${NICK}',
  comment = '${COMMENT}',
  postUrl = '${POST_URL}',
  img = '${IMG}',
  parentImg = '${PARENT_IMG}',
  bannerImage = config.defaultBannerImage,
}: RainafterNotificationEmailProps) => {
  const previewText = `${nick} 回复了您在 ${siteName} 的评论`;
  const homeUrl = siteUrl || postUrl;
  const detailUrl = postUrl || siteUrl;

  return (
    <Tailwind config={collageTailwindConfig}>
      <Html>
        <Head>
          <CollageFonts />
          <style>{commentRichContentCss}</style>
        </Head>

        <Body className="bg-canvas-white font-14 font-inter text-fg m-0 p-0">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto max-w-[640px] px-4 pt-10 pb-8">
            <Section className="shadow-collage-card rounded-[12px]" style={{ overflow: 'hidden' }}>
              <Section className="bg-bg rounded-[12px]" style={{ overflow: 'hidden' }}>
                {/* Banner区域 */}
                <Section className="p-0">
                  <Link href={homeUrl}>
                    <Img
                      src={bannerImage}
                      alt={`${siteName} 站点 Banner`}
                      width={608}
                      height={320}
                      className="block w-full max-w-[608px] object-cover"
                    />
                  </Link>
                </Section>

                {/* 通知内容 */}
                <Section className="mobile:px-6! mobile:pt-10 px-10 pt-16 pb-14 text-left">
                  <Section className="mb-9 text-left">
                    <Text className="font-15 font-inter text-fg m-0">{siteName} 评论通知</Text>
                    <Text className="font-32 text-fg m-0 mt-5 font-sans">有人回复了您的评论</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-[18px]">{parentNick}，您好！</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0">
                      <strong className="text-fg">{nick}</strong> 在 <strong className="text-fg">{siteName}</strong>{' '}
                      回复了您发表的评论。点开下方按钮即可查看上下文，并继续参与这次讨论。
                    </Text>
                  </Section>

                  <Section className="text-left">
                    <Button
                      href={detailUrl}
                      className="bg-brand-soft font-15 font-inter text-brand inline-block rounded-[16px] border-none px-5 py-3.5 text-center"
                    >
                      查看原文与回复
                    </Button>
                    <Text className="font-13 font-inter text-fg-3 m-0 mt-4">
                      或返回{' '}
                      <Link href={homeUrl} className="text-brand">
                        {siteName}
                      </Link>{' '}
                      查看更多动态。
                    </Text>
                  </Section>
                </Section>

                {/* 正文区域 */}
                <Section className="bg-bg-2 mobile:px-6! px-10 py-10">
                  <Section className="rounded-[18px] py-5">
                    <Text className="font-32 text-fg m-0 font-sans">相关评论</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-3">
                      为了方便您回顾，以下是相关评论的内容：
                    </Text>
                  </Section>
                  {/* 评论区域 */}
                  <Section className="mt-5">
                    <CommentCard
                      avatarSrc={parentImg}
                      nick={parentNick}
                      label="您的评论"
                      content={parentComment}
                      backgroundColor="#FFFFFF"
                      avatarBackgroundColor="#E4EFFF"
                      avatarTextColor="#4272B8"
                    />
                  </Section>
                  {/* 回复区域 */}
                  <Section className="mt-4">
                    <CommentCard
                      avatarSrc={img}
                      nick={nick}
                      label={`${nick} 的回复`}
                      content={comment}
                      backgroundColor="#E4EFFF"
                      avatarBackgroundColor="#4272B8"
                      avatarTextColor="#FFFFFF"
                    />
                  </Section>
                </Section>

                {/* 通知说明区域 */}
                <Section className="bg-bg-2 mobile:px-6! px-10 py-10">
                  <Section className="rounded-[20px] py-6">
                    <Text className="font-20 text-fg m-0 font-sans">邮件说明</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-3">
                      您收到这封邮件，是因为有人回复了您在 {siteName} 的评论。如果此通知与您无关，请忽视这封邮件。
                    </Text>
                  </Section>

                  <Section className="pt-5">
                    <Text className="font-13 font-inter text-fg-3 m-0">文章链接</Text>
                    <Text className="font-14 font-inter text-fg m-0 mt-2" style={metaValueStyle}>
                      {detailUrl}
                    </Text>
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
  comment: '谢谢您的留言，我补充了一个更直接的排查方法。\n您可以点开文章末尾的更新说明，再对照一下现在的配置。',
  postUrl: 'https://rainafter.example.com/posts/reply-notification',
  img: 'https://i.pravatar.cc/120?img=14',
  parentImg: 'https://i.pravatar.cc/120?img=32',
  bannerImage: 'https://www.rainafter.cn/images/banner.jpg',
} satisfies RainafterNotificationEmailProps;

export default RainafterNotificationEmail;
