// 获取姓名首字母
export function getInitial(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return '?';
  }

  return Array.from(trimmedName)[0]?.toLocaleUpperCase() ?? '?';
}
