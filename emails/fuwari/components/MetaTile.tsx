import { Section, Text } from '@react-email/components';
import { metaValueStyle } from '../theme';

// 元数据卡片
export function MetaTile({ label, value }: { label: string; value: string }) {
  return (
    <Section className="rounded-[16px] px-5 py-4">
      <Text className="font-13 font-inter text-fg-3 m-0">{label}</Text>
      <Text className="font-14 font-inter text-fg m-0 mt-2" style={metaValueStyle}>
        {value}
      </Text>
    </Section>
  );
}
