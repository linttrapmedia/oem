import { Test, useThemeState, useTokenState } from '@/registry';

export const CanCreateTokenState: Test = async () => {
  const theme = useThemeState('light');
  const token = useTokenState('light-val', 'dark-val', theme);

  const t1 = token.val() === 'light-val';

  theme.set('dark');
  const t2 = token.val() === 'dark-val';

  theme.set('light');
  const t3 = token.val() === 'light-val';

  const tests = [t1, t2, t3];
  return { pass: tests.every(Boolean) };
};
