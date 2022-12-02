const COLORS = {
  black: [326, 2, 13],
  brown: [28, 11, 14],
  blue: [203, 81, 49],
  purple: [270, 38, 40],
  red: [11, 88, 56],
  orange: [16, 97, 73],
  yellow: [47, 98, 55],
  green: [118, 27, 49],
  white: [0, 4, 98],
  transparent: 'transparent',
}

const FONTS = {
  Monospace: 'monospace',
  'Space Grotesk': 'Space Grotesk, Arial, sans-serif',
  'Times New Roman': 'Times New Roman, sans-serif',
  'Crimson Text': 'Crimson Text, serif',
  Splash: 'Splash, cursive',
  Primary: 'Space Grotesk, Arial, sans-serif',
}

function Theme<
  Colors extends Record<string, [h: number, s: number, l: number]> | typeof COLORS,
  Fonts extends Record<string, string> | typeof FONTS,
>({
  colors,
  fonts,
}: {
  colors?: Colors
  fonts?: Fonts
} = {}) {
  const _colors = { ...COLORS, ...colors }
  const _fonts = { ...FONTS, ...fonts }
  const font = (font: keyof typeof _fonts): string => (<any>_fonts)[font]
  const color = (
    color: keyof typeof _colors,
    opacity: number = 1,
    lightness: number = 0,
  ): string => {
    if (color === 'transparent') return color
    const [h, s, l] = (<any>_colors)[color]
    const hsla = `hsla(${h}deg,${s}%,${l + lightness}%,${opacity})`
    return hsla
  }
  return {
    color,
    font,
  }
}

export { Theme, COLORS, FONTS }
