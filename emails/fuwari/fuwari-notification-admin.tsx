import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Tailwind, Text } from 'react-email';
import { CommentCard } from './components/CommentCard';
import { config } from './config';
import { collageTailwindConfig, commentRichContentCss, metaValueStyle } from './theme';
import { CollageFonts } from './theme/collage-fonts';
import type { RainafterNotificationEmailProps } from './types';

export const RainafterNotificationAdminEmail = ({
  siteUrl = '${SITE_URL}',
  siteName = '${SITE_NAME}',
  nick = '${NICK}',
  comment = '${COMMENT}',
  postUrl = '${POST_URL}',
  img = '${IMG}',
  bannerImage = config.defaultBannerImage,
}: RainafterNotificationEmailProps) => {
  const previewText = `${nick} 在 ${siteName} 发表了新评论`;
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
                {/* Banner 区域 */}
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
                    <Text className="font-32 text-fg m-0 mt-5 font-sans">有人发表了新评论</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-[18px]">
                      您在 {siteName} 收到一条新的评论。
                    </Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-[12px]">
                      <strong className="text-fg">{nick}</strong> 刚刚在 <strong className="text-fg">{siteName}</strong>{' '}
                      留下了一条新评论。点开下方按钮即可查看原文与讨论上下文，并及时处理这条留言。
                    </Text>
                  </Section>

                  <Section className="text-left">
                    <Button
                      href={detailUrl}
                      className="bg-brand-soft font-15 font-inter text-brand inline-block rounded-[16px] border-none px-5 py-3.5 text-center"
                    >
                      查看原文与评论
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
                    <Text className="font-32 text-fg m-0 font-sans">最新评论</Text>
                    <Text className="font-14 font-inter text-fg-2 m-0 mt-3">
                      为了方便您快速查看，以下是评论的内容：
                    </Text>
                  </Section>
                  {/* 评论区域 */}
                  <Section className="mt-5">
                    <CommentCard
                      avatarSrc={img}
                      nick={nick}
                      label="新的评论"
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
                      您收到这封邮件，是因为您的站点 {siteName} 收到了一条新的评论。如果此通知与您无关，请忽视这封邮件。
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

RainafterNotificationAdminEmail.PreviewProps = {
  siteUrl: 'https://rainafter.example.com',
  siteName: 'Rainafter',
  nick: '阿雨',
  comment: '这篇文章的排版和插图都很好，尤其是最后一段关于配置回退逻辑的说明，对我排查问题很有帮助。',
  postUrl: 'https://rainafter.example.com/posts/admin-notification',
  img: 'https://i.pravatar.cc/120?img=14',
  bannerImage: 'https://www.rainafter.cn/images/banner.jpg',
} satisfies RainafterNotificationEmailProps;

export default RainafterNotificationAdminEmail;
