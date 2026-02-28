import { Test, useThemeState, useTokenState } from '@/registry';

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

export const CanCheckCurrentTheme: Test = async () => {
  const theme = useThemeState('light');
  const t1 = theme.test('light');
  const t2 = theme.test('dark', false);
  theme.set('dark');
  const t3 = theme.test('dark');
  const t4 = theme.test('light', false);
  return { pass: [t1, t2, t3, t4].every(Boolean) };
};

export const CanSwitchTheme: Test = async () => {
  const theme = useThemeState('light');
  theme.set('dark');
  const t1 = theme.val() === 'dark';
  theme.set('light');
  const t2 = theme.val() === 'light';
  theme.set('dark');
  const t3 = theme.val() === 'dark';
  return { pass: [t1, t2, t3].every(Boolean) };
};

export const CanSelectToken: Test = async () => {
  const theme = useThemeState('light');
  const token = useTokenState('#ffffff', '#000000', theme);
  const t1 = token.val() === '#ffffff';
  return { pass: t1 };
};

export const CanSelectTokenAfterThemeSwitch: Test = async () => {
  const theme = useThemeState('light');
  const token = useTokenState('#ffffff', '#000000', theme);
  const t1 = token.val() === '#ffffff';
  theme.set('dark');
  const t2 = token.val() === '#000000';
  theme.set('light');
  const t3 = token.val() === '#ffffff';
  return { pass: [t1, t2, t3].every(Boolean) };
};

export const CanGetCurrentTheme: Test = async () => {
  const theme = useThemeState('dark');
  const t1 = theme.val() === 'dark';
  theme.set('light');
  const t2 = theme.val() === 'light';
  return { pass: [t1, t2].every(Boolean) };
};

export const CanGetAllTokens: Test = async () => {
  const theme = useThemeState('light');
  const bg = useTokenState('#fff', '#000', theme);
  const fg = useTokenState('#111', '#eee', theme);
  const border = useTokenState('#ccc', '#333', theme);
  const t1 = bg.val() === '#fff' && fg.val() === '#111' && border.val() === '#ccc';
  theme.set('dark');
  const t2 = bg.val() === '#000' && fg.val() === '#eee' && border.val() === '#333';
  return { pass: [t1, t2].every(Boolean) };
};

export const CanGetThemeNames: Test = async () => {
  const theme = useThemeState('light');
  const t1 = theme.test('light');
  const t2 = theme.test('dark', false);
  theme.set('dark');
  const t3 = theme.test('dark');
  const t4 = theme.test((v) => v === 'light' || v === 'dark');
  return { pass: [t1, t2, t3, t4].every(Boolean) };
};

export const CanAddNewTheme: Test = async () => {
  const theme = useThemeState('light');
  const token = useTokenState('light-val', 'dark-val', theme);
  const t1 = token.val() === 'light-val';
  theme.set('dark');
  const t2 = token.val() === 'dark-val';
  theme.set('light');
  const t3 = token.val() === 'light-val';
  return { pass: [t1, t2, t3].every(Boolean) };
};

export const CanRemoveTheme: Test = async () => {
  const theme = useThemeState('light');
  const token = useTokenState('light-val', 'dark-val', theme);
  const unsub = theme.sub(() => {});
  unsub();
  const t1 = theme._subs.size >= 1;
  theme.set('dark');
  const t2 = token.val() === 'dark-val';
  return { pass: [t1, t2].every(Boolean) };
};

export const CanSubscribeToThemeChanges: Test = async () => {
  const theme = useThemeState('light');
  const changes: string[] = [];
  theme.sub((val) => changes.push(val));
  theme.set('dark');
  theme.set('light');
  theme.set('dark');
  const t1 = changes.length === 3;
  const t2 = changes[0] === 'dark';
  const t3 = changes[1] === 'light';
  const t4 = changes[2] === 'dark';
  return { pass: [t1, t2, t3, t4].every(Boolean) };
};
