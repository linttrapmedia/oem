// --- Semantic Design Tokens ---

export const theme = {
  // Colors
  bg: '#1a1a2e',
  surface: '#16213e',
  surfaceHover: '#1a2847',
  border: '#0f3460',
  primary: '#e94560',
  primaryHover: '#d63851',
  text: '#eee',
  textMuted: '#888',
  textDone: '#555',
  danger: '#e94560',
  success: '#4ade80',

  // Typography
  fontFamily: "'Segoe UI', system-ui, sans-serif",
  fontSizeBase: '15px',
  fontSizeSmall: '13px',
  fontSizeLarge: '22px',

  // Spacing
  gap: '12px',
  padding: '12px 16px',
  paddingSmall: '6px 10px',
  radius: '6px',
} as const;
