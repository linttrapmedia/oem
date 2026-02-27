import { Test } from '@/registry';
import { Theme, useThemeState } from '@/states/ThemeState';

// Test data
const mockThemes: Theme[] = [
  {
    name: 'light',
    tokens: {
      colors: {
        primary: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
      },
      borders: {
        radius: '4px',
      },
      shadows: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  {
    name: 'dark',
    tokens: {
      colors: {
        primary: '#60a5fa',
        background: '#1f2937',
        text: '#f9fafb',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
      },
      borders: {
        radius: '4px',
      },
      shadows: {
        card: '0 4px 6px rgba(0,0,0,0.3)',
      },
    },
  },
];

export const CanCreateThemeState: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Should initialize with correct theme
  const t1 = themeState.val().currentTheme === 'light';
  tests.push(t1);

  // Should have all themes
  const t2 = themeState.val().themes.length === 2;
  tests.push(t2);

  return { pass: tests.every(Boolean) };
};

export const CanCheckCurrentTheme: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Should correctly identify current theme
  const t1 = themeState.isCurrentTheme('light') === true;
  tests.push(t1);

  // Should return false for non-current theme
  const t2 = themeState.isCurrentTheme('dark') === false;
  tests.push(t2);

  return { pass: tests.every(Boolean) };
};

export const CanSwitchTheme: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Initial theme should be light
  const t1 = themeState.isCurrentTheme('light');
  tests.push(t1);

  // Switch to dark theme
  themeState.setTheme('dark');

  const t2 = themeState.isCurrentTheme('dark');
  tests.push(t2);

  const t3 = !themeState.isCurrentTheme('light');
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanSelectToken: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Should select token from current theme
  const primaryColor = themeState.selectToken('colors', 'primary');
  const t1 = primaryColor === '#3b82f6';
  tests.push(t1);

  // Should select spacing token
  const spacing = themeState.selectToken('spacing', 'md');
  const t2 = spacing === '16px';
  tests.push(t2);

  // Should return undefined for non-existent token
  const nonExistent = themeState.selectToken('colors', 'nonexistent');
  const t3 = nonExistent === undefined;
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanSelectTokenAfterThemeSwitch: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Light theme primary color
  const lightPrimary = themeState.selectToken('colors', 'primary');
  const t1 = lightPrimary === '#3b82f6';
  tests.push(t1);

  // Switch to dark theme
  themeState.setTheme('dark');

  // Dark theme primary color should be different
  const darkPrimary = themeState.selectToken('colors', 'primary');
  const t2 = darkPrimary === '#60a5fa';
  tests.push(t2);

  const t3 = lightPrimary !== darkPrimary;
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanGetCurrentTheme: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  const currentTheme = themeState.getCurrentTheme();
  const t1 = currentTheme?.name === 'light';
  tests.push(t1);

  const t2 = currentTheme?.tokens.colors.primary === '#3b82f6';
  tests.push(t2);

  return { pass: tests.every(Boolean) };
};

export const CanGetAllTokens: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  const tokens = themeState.getAllTokens();
  const t1 = tokens !== undefined;
  tests.push(t1);

  const t2 = tokens?.colors.primary === '#3b82f6';
  tests.push(t2);

  const t3 = tokens?.spacing.md === '16px';
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanGetThemeNames: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  const names = themeState.getThemeNames();
  const t1 = names.length === 2;
  tests.push(t1);

  const t2 = names.includes('light');
  tests.push(t2);

  const t3 = names.includes('dark');
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanAddNewTheme: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  const initialCount = themeState.getThemeNames().length;
  const t1 = initialCount === 2;
  tests.push(t1);

  // Add a new theme
  const newTheme: Theme = {
    name: 'custom',
    tokens: {
      colors: { primary: '#ff0000', background: '#fff', text: '#000' },
      spacing: { sm: '4px', md: '8px', lg: '16px' },
      typography: { fontFamily: 'Arial', fontSize: '14px' },
      borders: { radius: '2px' },
      shadows: { card: 'none' },
    },
  };

  themeState.addTheme(newTheme);

  const newCount = themeState.getThemeNames().length;
  const t2 = newCount === 3;
  tests.push(t2);

  const t3 = themeState.getThemeNames().includes('custom');
  tests.push(t3);

  // Should be able to switch to the new theme
  themeState.setTheme('custom');
  const t4 = themeState.isCurrentTheme('custom');
  tests.push(t4);

  return { pass: tests.every(Boolean) };
};

export const CanRemoveTheme: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  // Add a third theme so we can remove one
  const extraTheme: Theme = {
    name: 'extra',
    tokens: {
      colors: { primary: '#00ff00', background: '#fff', text: '#000' },
      spacing: { sm: '4px', md: '8px', lg: '16px' },
      typography: { fontFamily: 'Arial', fontSize: '14px' },
      borders: { radius: '2px' },
      shadows: { card: 'none' },
    },
  };

  themeState.addTheme(extraTheme);

  const beforeRemove = themeState.getThemeNames().length;
  const t1 = beforeRemove === 3;
  tests.push(t1);

  // Remove the extra theme
  themeState.removeTheme('extra');

  const afterRemove = themeState.getThemeNames().length;
  const t2 = afterRemove === 2;
  tests.push(t2);

  const t3 = !themeState.getThemeNames().includes('extra');
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};

export const CanSubscribeToThemeChanges: Test = async () => {
  const themeState = useThemeState(mockThemes, 'light');
  const tests: boolean[] = [];

  let callbackFired = false;
  let receivedTheme = '';

  // Subscribe to theme changes
  themeState.sub((value) => {
    callbackFired = true;
    receivedTheme = value.currentTheme;
  });

  // Change theme
  themeState.setTheme('dark');

  const t1 = callbackFired === true;
  tests.push(t1);

  const t2 = receivedTheme === 'dark';
  tests.push(t2);

  return { pass: tests.every(Boolean) };
};
