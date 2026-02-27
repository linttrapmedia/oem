import { Test, useThemeState } from '@/registry';

export const CanCreateThemeState: Test = async () => {
  const theme = useThemeState('light');

  const t1 = theme.val() === 'light';

  theme.set('dark');
  const t2 = theme.val() === 'dark';

  const seen: string[] = [];
  theme.sub((val) => seen.push(val));
  theme.set('light');

  const t3 = seen[seen.length - 1] === 'light';

  const tests = [t1, t2, t3];
  return { pass: tests.every(Boolean) };
};
