import { type TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';
import { colors, fontScale } from '@/rainafter/config';

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
        sans: ['Noto Serif SC', 'Georgia', 'Times New Roman', 'Songti SC', 'STSong', 'SimSun', 'serif'],
      },
    },
  },
};

// 评论文本样式
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
    background-color: ${colors.richContentCodeBackground};
    color: ${colors.richContentCodeText};
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
    color: ${colors.actionPrimarySubtle};
    text-decoration: underline;
    word-break: break-word;
  }
`;
