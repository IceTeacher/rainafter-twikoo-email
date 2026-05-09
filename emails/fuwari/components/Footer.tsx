import { Section, Text } from 'react-email';

export const Footer = ({ siteName, detailUrl }: { siteName: string; detailUrl: string }) => {
  return (
    <Section className="bg-sectionSubtleBackground mobile:px-6! px-10 py-10">
      <Section className="rounded-[20px] py-6">
        <Text className="font-20 text-textPrimary m-0 font-sans">邮件说明</Text>
        <Text className="font-14 font-inter text-textSecondary m-0 mt-3">
          您收到这封邮件，是因为有人回复了您在 {siteName} 的评论，如果此通知与您无关，请忽视这封邮件。
        </Text>
        <Text className="font-14 font-inter text-textSecondary m-0 mt-3">系统邮件请勿回复。</Text>
      </Section>

      <Section className="pt-5">
        <Text className="font-13 font-inter text-textMuted m-0">文章链接</Text>
        <Text className="font-14 font-inter text-textPrimary over break-anywhere m-0 mt-2 wrap-break-word">
          {detailUrl}
        </Text>
      </Section>
    </Section>
  );
};
