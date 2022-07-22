// Fonts

const Fonts = {
  Monospace: 'monospace',
  'Space Grotesk': 'Space Grotesk, Arial, sans-serif',
  'Times New Roman': 'Times New Roman, sans-serif',
  Splash: 'Splash, cursive',
};

const Font = (font: keyof typeof Fonts) => {
  return Fonts[font];
};

// Colors

const Colors = {
  black: [326, 2, 13],
  brown: [28, 11, 14],
  blue: [203, 81, 49],
  purple: [270, 38, 40],
  red: [11, 88, 56],
  orange: [40, 61, 45],
  yellow: [47, 98, 55],
  green: [118, 27, 49],
  white: [0, 4, 98],
  transparent: 'transparent',
};

const Color = (color: keyof typeof Colors, adjustLightness: number = 0, opacity: number = 1) => {
  if (color === 'transparent') return color;
  const [h, s, l] = Colors[color];
  const hsla = `hsla(${h}deg,${s}%,${l + adjustLightness}%,${opacity})`;
  return hsla;
};

export const Theme = {
  Font,
  Fonts,
  Colors,
  Color,
};
