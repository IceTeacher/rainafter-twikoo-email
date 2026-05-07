import { Section, Row, Column, Text, Markdown, Img, CodeBlock, dracula } from 'react-email';
import { markdownStyles, commentTextStyle } from '../theme';
import { CommentCardProps } from '../types';
import { AvatarBadge } from './AvatarBadge';
import parse, { domToReact } from 'html-react-parser';

// 评论卡片
export function CommentCard({
  avatarSrc,
  nick,
  label,
  content,
  backgroundColor,
  avatarBackgroundColor,
  avatarTextColor,
}: CommentCardProps) {
  const options = {
    replace: (domNode: any) => {
      // 将原生的 <img> 替换为 React Email 的 <Img> 组件
      if (domNode.name === 'img') {
        return <Img src={domNode.attribs.src} alt={domNode.attribs.alt} width="70%" style={{ maxWidth: '400px' }} />;
      }
      // 处理换行符或段落
      if (domNode.name === 'p') {
        return (
          <Text className="font-14 font-inter text-fg-2 m-0 mt-4" style={commentTextStyle}>
            {domToReact(domNode.children, options)}
          </Text>
        );
      }
      // 处理代码块
      if (domNode.name === 'pre') {
        // 提取内部 code 标签的文本内容
        const codeElement = domNode.children[0];
        const codeString = codeElement?.children[0]?.data || '';
        // 提取语言标识
        const className = codeElement?.attribs?.class || '';
        const lang = className.replace('language-', '') || 'text';
        return (
          <CodeBlock
            code={codeString}
            language={lang}
            theme={dracula}
            style={{
              width: '90%',
              padding: '16px',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          />
        );
      }
    },
  };

  return (
    <Section className="rounded-[20px] px-6 py-4" style={{ backgroundColor }}>
      <Row>
        <Column className="w-[42px] align-top">
          <AvatarBadge
            src={avatarSrc}
            name={nick}
            backgroundColor={avatarBackgroundColor}
            textColor={avatarTextColor}
          />
        </Column>
        <Column className="pl-4 align-top">
          <Text className="font-15 font-inter text-fg m-0">{nick}</Text>
          <Text className="font-13 font-inter text-fg-3 m-0 mt-1">{label}</Text>
        </Column>
      </Row>
      <Section className="mt-2">{parse(content, options)}</Section>
    </Section>
  );
}
