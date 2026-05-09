import { Img } from 'react-email';
import { AvatarBadgeProps } from '@/fuwari/types';

// 头像组件
export function AvatarBadge({ src, name }: AvatarBadgeProps) {
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
