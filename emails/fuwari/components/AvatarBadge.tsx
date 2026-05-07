import { Img, Text } from 'react-email';
import { AvatarBadgeProps } from '../types';
import { getInitial } from '../utils';

// 头像组件
export function AvatarBadge({ src, name, backgroundColor, textColor }: AvatarBadgeProps) {
  if (src) {
    return (
      <Img
        src={src}
        alt={`${name} 的头像`}
        width={42}
        height={42}
        className="block rounded-full"
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Text
      className="font-15 font-inter m-0 rounded-full text-center"
      style={{
        width: '42px',
        height: '42px',
        lineHeight: '42px',
        backgroundColor,
        color: textColor,
      }}
    >
      {getInitial(name)}
    </Text>
  );
}
