import { Body, Button, Container, Head, Html, Link, Preview, Section, Tailwind, Text } from 'react-email';
import { CommentCard } from '@/rainafter/components/CommentCard';
import { Footer } from '@/rainafter/components/Footer';
import type { NotificationEmailProps } from '@/rainafter/types';
import { collageTailwindConfig, commentRichContentCss } from '@/rainafter/styles';
import { config } from '@/rainafter/config';

// 普通评论通知邮件模板
export const NotificationEmail = ({
  siteUrl = '${SITE_URL}',
  siteName = '${SITE_NAME}',
  parentNick = '${PARENT_NICK}',
  parentComment = '${PARENT_COMMENT}',
  nick = '${NICK}',
  comment = '${COMMENT}',
  postUrl = '${POST_URL}',
  img = '${IMG}',
  parentImg = '${PARENT_IMG}',
  bannerImage = config.bannerImage,
}: NotificationEmailProps) => {
  const previewText = `${nick} 回复了您在 ${siteName} 的评论`;
  const detailUrl = postUrl || siteUrl;

  return (
    <Tailwind config={collageTailwindConfig}>
      <Html lang="zh-cn">
        <Head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap');
          </style>
          <style>{commentRichContentCss}</style>
        </Head>

        <Body className="bg-pageBackground font-14 text-textPrimary m-0 p-0 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto max-w-160 px-4 pt-10 pb-8">
            <Section
              className="shadow-collage-card border-borderPrimary rounded-xl border"
              style={{ overflow: 'hidden' }}
            >
              <Section className="bg-emailSurface rounded-xl" style={{ overflow: 'hidden' }}>
                {/* 通知内容 */}
                <Section
                  className={`mobile:px-6! mobile:pt-10 bg-[url('${bannerImage}')] bg-cover bg-position-[0%_10%] bg-no-repeat px-10 pt-16 pb-8 text-left`}
                >
                  <Section className="mb-9 text-left">
                    <Text className="font-32 text-textPrimary m-0 mt-5 font-sans">有人回复了您的评论</Text>
                    <Text className="font-16 text-textSecondary m-0 mt-8 font-sans">您好，{parentNick}</Text>
                    <Text className="font-16 text-textSecondary m-0 mt-2 font-sans">
                      您在 「 {siteName} 」 中的评论，
                    </Text>
                    <Text className="font-16 text-textSecondary m-0 mt-1 font-sans">收到了新的回复。</Text>
                  </Section>

                  <Section className="text-left">
                    <Button
                      href={detailUrl}
                      className="bg-actionPrimarySubtle font-16 text-actionPrimary border-borderSubtle inline-block rounded-lg border px-6 py-2 text-center font-sans"
                    >
                      查看完整对话
                    </Button>
                  </Section>
                </Section>

                {/* 正文区域 */}
                <Section className="mobile:px-6! px-8 py-8">
                  <Section className="bg-sectionSubtleBackground rounded-3xl px-6 py-6">
                    <Section>
                      <CommentCard
                        avatarSrc={parentImg}
                        nick={parentNick}
                        label="您的评论"
                        content={parentComment}
                        backgroundColor={config.colors.commentCardOriginalBackground}
                      />
                    </Section>

                    <Section className="mt-5">
                      <CommentCard
                        avatarSrc={img}
                        nick={nick}
                        label={`${nick}的回复`}
                        content={comment}
                        backgroundColor={config.colors.commentCardReplyBackground}
                      />
                    </Section>
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

NotificationEmail.PreviewProps = config.notificationEmailPreviewProps;

export default NotificationEmail;
