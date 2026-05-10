import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Tailwind, Text } from 'react-email';
import { CommentCard } from '@/fuwari/components/CommentCard';
import { Footer } from '@/fuwari/components/Footer';
import type { NotificationEmailProps } from '@/fuwari/types';
import { collageTailwindConfig, commentRichContentCss } from '@/fuwari/styles';
import { config } from '@/fuwari/config';

// 管理员评论通知邮件模板
export const NotificationAdminEmail = ({
  siteUrl = '${SITE_URL}',
  siteName = '${SITE_NAME}',
  nick = '${NICK}',
  comment = '${COMMENT}',
  postUrl = '${POST_URL}',
  img = '${IMG}',
  bannerImage = config.defaultBannerImage,
}: NotificationEmailProps) => {
  const previewText = `${nick} 在 ${siteName} 发表了新评论`;
  const homeUrl = siteUrl || postUrl;
  const detailUrl = postUrl || siteUrl;

  return (
    <Tailwind config={collageTailwindConfig}>
      <Html lang="zh-cn">
        <Head>
          <style>{commentRichContentCss}</style>
        </Head>

        <Body className="bg-pageBackground font-14 font-inter text-textPrimary m-0 p-0">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto max-w-160 px-4 pt-10 pb-8">
            <Section className="shadow-collage-card rounded-xl" style={{ overflow: 'hidden' }}>
              <Section className="bg-emailSurface rounded-xl" style={{ overflow: 'hidden' }}>
                {/* Banner 区域 */}
                <Section className="p-0">
                  <Link href={homeUrl}>
                    <Img
                      src={bannerImage}
                      alt={`${siteName} 站点 Banner`}
                      width={608}
                      height={320}
                      className="block w-full max-w-152 object-cover"
                    />
                  </Link>
                </Section>

                {/* 通知内容 */}
                <Section className="mobile:px-6! mobile:pt-10 px-10 pt-16 pb-14 text-left">
                  <Section className="mb-9 text-left">
                    <Text className="font-15 font-inter text-textPrimary m-0">{siteName} 评论通知</Text>
                    <Text className="font-32 text-textPrimary m-0 mt-5 font-sans">有人发表了新评论</Text>
                    <Text className="font-14 font-inter text-textSecondary m-0 mt-4.5">
                      您在 {siteName} 收到一条新的评论。
                    </Text>
                    <Text className="font-14 font-inter text-textSecondary m-0 mt-3">
                      <strong className="text-textPrimary">{nick}</strong> 刚刚在{' '}
                      <strong className="text-textPrimary">{siteName}</strong>{' '}
                      留下了一条新评论。点开下方按钮即可查看原文与讨论上下文，并及时处理这条留言。
                    </Text>
                  </Section>

                  <Section className="text-left">
                    <Button
                      href={detailUrl}
                      className="bg-actionPrimarySubtle font-15 font-inter text-actionPrimary inline-block rounded-2xl border-none px-5 py-3.5 text-center"
                    >
                      查看原文与评论
                    </Button>
                    <Text className="font-13 font-inter text-textMuted m-0 mt-4">
                      或返回{' '}
                      <Link href={homeUrl} className="text-actionPrimary">
                        {siteName}
                      </Link>{' '}
                      查看更多动态。
                    </Text>
                  </Section>
                </Section>

                {/* 正文区域 */}
                <Section className="bg-sectionSubtleBackground mobile:px-6! px-10 py-10">
                  <Section className="rounded-[18px] py-5">
                    <Text className="font-32 text-textPrimary m-0 font-sans">最新评论</Text>
                    <Text className="font-14 font-inter text-textSecondary m-0 mt-3">
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
                      backgroundColor={config.colors.commentCardNewCommentBackground}
                    />
                  </Section>
                </Section>

                {/* 通知说明区域 */}
                <Footer siteName={siteName} detailUrl={detailUrl} />
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

NotificationAdminEmail.PreviewProps = config.notificationAdminEmailPreviewProps;

export default NotificationAdminEmail;
