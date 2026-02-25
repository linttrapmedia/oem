// --- Semantic Design Tokens ---

export const theme = {
  // Colors
  bg: '#f5f5f5',
  surface: '#ffffff',
  surfaceAlt: '#fafafa',
  border: '#e0e0e0',
  borderLight: '#eeeeee',
  primary: '#4a90d9',
  primaryHover: '#3a7bc8',
  text: '#333333',
  textMuted: '#999999',
  textDone: '#bcbcbc',
  danger: '#cc4444',
  dangerHover: '#bb3333',
  checkmark: '#5cb85c',
  shadow: 'rgba(0,0,0,0.08)',

  // Typography
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  fontSizeBase: '15px',
  fontSizeSmall: '13px',
  fontSizeLarge: '28px',
  fontSizeXL: '64px',

  // Spacing
  gap: '12px',
  padding: '12px 16px',
  paddingSmall: '6px 12px',
  radius: '4px',
  radiusLarge: '8px',
} as const;
