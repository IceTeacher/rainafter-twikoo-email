import { Section, Text } from 'react-email';

export const Footer = ({
  siteName,
  detailUrl,
  isAdmin = false,
}: {
  siteName: string;
  detailUrl: string;
  isAdmin?: boolean;
}) => {
  return (
    <Section className="mobile:px-6! px-8 py-8">
      <Section className="bg-sectionSubtleBackground rounded-3xl px-6 py-4">
        {!isAdmin && (
          <Section className="rounded-[20px] pb-4">
            <Text className="font-20 text-textPrimary m-0 font-sans">邮件说明</Text>
            <Text className="font-14 text-textSecondary m-0 mt-3 font-sans">
              系统邮件请勿回复，您收到这封邮件，是因为有人回复了您在 {siteName}{' '}
              的评论，如果此通知与您无关，请忽视这封邮件。
            </Text>
          </Section>
        )}

        <Section>
          <Text className="font-13 text-textMuted m-0 font-sans">文章链接</Text>
          <Text className="font-13 text-textPrimary over break-anywhere m-0 mt-1 font-sans wrap-break-word">
            {detailUrl}
          </Text>
        </Section>
      </Section>
    </Section>
  );
};
