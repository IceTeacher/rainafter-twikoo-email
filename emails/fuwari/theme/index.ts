import type { TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';

// 颜色
const colors = {
  canvas: '#EAEEF5',
  'canvas-white': 'transparent',
  bg: '#FFFFFF',
  'bg-2': '#F5F8FE',
  fg: '#1F2937',
  'fg-2': '#475467',
  'fg-3': '#667085',
  'fg-inverted': '#FFFFFF',
  stroke: '#D7E1F0',
  brand: '#4272B8',
  'brand-soft': '#E4EFFF',
} as const;

// 字体大小
const fontScale = {
  11: {
    fontSize: '11px',
    lineHeight: '1.5',
    letterSpacing: '-0.033px',
    fontWeight: '300',
  },
  13: {
    fontSize: '13px',
    lineHeight: '1.5',
    letterSpacing: '-0.039px',
    fontWeight: '300',
  },
  14: { fontSize: '14px', lineHeight: '1.5' },
  15: {
    fontSize: '15px',
    lineHeight: '1.5',
    letterSpacing: '-0.075px',
    fontWeight: '500',
  },
  20: { fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' },
  32: { fontSize: '32px', lineHeight: '1.2', letterSpacing: '-0.6px' },
  48: { fontSize: '48px', lineHeight: '1', letterSpacing: '-1.44px' },
  58: { fontSize: '58px', lineHeight: '1', letterSpacing: '-1.74px' },
  88: { fontSize: '88px', lineHeight: '1', letterSpacing: '-2.64px' },
} as const;

// 评论文本样式
export const commentTextStyle = {
  color: '#475467',
  fontSize: '14px',
  lineHeight: '1.5',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word' as const,
  overflowWrap: 'anywhere' as const,
} as const;

export const commentRichContentCss = `
  .comment-rich-content p {
    margin: 6px 0 0;
  }

  .comment-rich-content p:first-child {
    margin-top: 0;
  }

  .comment-rich-content p:last-child {
    margin-bottom: 0;
  }

  .comment-rich-content img {
    display: block;
    max-width: 100%;
    width: auto;
    height: auto;
    border-radius: 8px;
    margin: 12px 0;
  }

  .comment-rich-content pre {
    margin: 12px 0;
    padding: 10px;
    border-radius: 4px;
    background-color: #f4f4f4;
    color: #333333;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-wrap: anywhere;
  }

  .comment-rich-content code {
    font-family: Consolas, Monaco, 'Courier New', monospace;
  }

  .comment-rich-content ul,
  .comment-rich-content ol {
    margin: 12px 0;
    padding-left: 18px;
  }

  .comment-rich-content li {
    margin-bottom: 4px;
  }

  .comment-rich-content a {
    color: #4272B8;
    text-decoration: underline;
    word-break: break-word;
  }
`;

// 元数据值样式
export const metaValueStyle = {
  wordBreak: 'break-word' as const,
  overflowWrap: 'anywhere' as const,
};

// Markdown 自定义样式
export const markdownStyles = {
  image: {
    marginTop: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '640px',
  },
  p: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#333',
    margin: '0',
    marginTop: '6px',
  },
  bold: {
    fontWeight: '700',
    color: '#000',
    fontSize: '14px',
  },
  ul: {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '10px',
  },
  ol: {
    paddingLeft: '10px',
  },
  li: {
    marginLeft: '10px', // 整个列表项（含圆点）向右移
    paddingLeft: '2px', // 圆点与文字之间的额外间距
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#333',
    marginBottom: '4px', // 对应 my-1 的效果
  },
  codeBlock: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#333',
    width: '92%',
    whiteSpace: 'pre-wrap' as const, // 保留空格和换行，但允许自动换行
    wordBreak: 'break-all' as const, // 确保长单词或无空格的字符串也能强制换行
    overflowWrap: 'anywhere' as const, // 进一步增强溢出时的换行行为
    textOverflow: 'clip' as const,
  },
};

// Tailwind 配置
export const collageTailwindConfig: TailwindConfig = {
  plugins: [
    plugin(({ addUtilities, addVariant }) => {
      addVariant('mobile', '@media (max-width: 600px)');
      const utilities: Record<string, Record<string, string>> = {};
      for (const [step, token] of Object.entries(fontScale)) {
        utilities[`.font-${step}`] = token;
      }
      addUtilities(utilities);
    }),
  ],
  theme: {
    extend: {
      colors,
      boxShadow: {
        'collage-card':
          '0px 76px 21px 0px rgba(193,195,193,0), 0px 49px 19px 0px rgba(193,195,193,0.01), 0px 27px 16px 0px rgba(193,195,193,0.05), 0px 12px 12px 0px rgba(193,195,193,0.09), 0px 3px 7px 0px rgba(193,195,193,0.1)',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
};
