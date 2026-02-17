import type { DesignTokens } from './_base';

export const darkTheme: DesignTokens = {
  colors: {
    // Primary palette
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    primaryActive: '#2563eb',
    primaryDisabled: '#1e3a8a',
    primarySubtle: '#1e3a8a',
    primaryLight: '#172554',
    primaryDark: '#93c5fd',

    // Secondary palette
    secondary: '#a78bfa',
    secondaryHover: '#8b5cf6',
    secondaryActive: '#7c3aed',
    secondaryDisabled: '#4c1d95',
    secondarySubtle: '#4c1d95',
    secondaryLight: '#2e1065',
    secondaryDark: '#c4b5fd',

    // Semantic colors - Success
    success: '#34d399',
    successHover: '#10b981',
    successActive: '#059669',
    successSubtle: '#064e3b',
    successLight: '#022c22',
    successDark: '#6ee7b7',

    // Semantic colors - Error
    error: '#f87171',
    errorHover: '#ef4444',
    errorActive: '#dc2626',
    errorSubtle: '#7f1d1d',
    errorLight: '#450a0a',
    errorDark: '#fca5a5',

    // Semantic colors - Warning
    warning: '#fbbf24',
    warningHover: '#f59e0b',
    warningActive: '#d97706',
    warningSubtle: '#78350f',
    warningLight: '#451a03',
    warningDark: '#fde68a',

    // Semantic colors - Info
    info: '#22d3ee',
    infoHover: '#06b6d4',
    infoActive: '#0891b2',
    infoSubtle: '#164e63',
    infoLight: '#083344',
    infoDark: '#a5f3fc',

    // Neutral/Gray scale
    neutral50: '#0a0a0a',
    neutral100: '#171717',
    neutral200: '#262626',
    neutral300: '#404040',
    neutral400: '#525252',
    neutral500: '#737373',
    neutral600: '#a3a3a3',
    neutral700: '#d4d4d4',
    neutral800: '#e5e5e5',
    neutral900: '#f5f5f5',
    neutral950: '#fafafa',

    // Text colors
    textPrimary: '#fafafa',
    textSecondary: '#d4d4d4',
    textTertiary: '#a3a3a3',
    textDisabled: '#525252',
    textInverse: '#171717',
    textLink: '#60a5fa',
    textLinkHover: '#93c5fd',
    textSuccess: '#6ee7b7',
    textError: '#fca5a5',
    textWarning: '#fde68a',
    textInfo: '#a5f3fc',

    // Background colors
    bgPrimary: '#0a0a0a',
    bgSecondary: '#171717',
    bgTertiary: '#262626',
    bgOverlay: 'rgba(0, 0, 0, 0.75)',
    bgInverse: '#fafafa',
    bgDisabled: '#262626',
    bgHover: '#171717',
    bgActive: '#262626',
    bgSelected: '#1e3a8a',

    // Border colors
    borderPrimary: '#262626',
    borderSecondary: '#404040',
    borderTertiary: '#525252',
    borderDisabled: '#262626',
    borderFocus: '#60a5fa',
    borderError: '#f87171',
    borderSuccess: '#34d399',
    borderWarning: '#fbbf24',
    borderInfo: '#22d3ee',

    // Surface colors
    surfaceDefault: '#0a0a0a',
    surfaceSubtle: '#171717',
    surfaceRaised: '#262626',
    surfaceOverlay: '#171717',
    surfaceInverse: '#fafafa',

    // State colors
    focusRing: '#60a5fa',
    selected: '#1e3a8a',
    hover: '#171717',
    active: '#262626',
    disabled: '#525252',
  },

  spacing: {
    // Numeric scale
    '0': '0',
    '1': '0.25rem',   // 4px
    '2': '0.5rem',    // 8px
    '3': '0.75rem',   // 12px
    '4': '1rem',      // 16px
    '5': '1.25rem',   // 20px
    '6': '1.5rem',    // 24px
    '7': '1.75rem',   // 28px
    '8': '2rem',      // 32px
    '10': '2.5rem',   // 40px
    '12': '3rem',     // 48px
    '16': '4rem',     // 64px
    '20': '5rem',     // 80px
    '24': '6rem',     // 96px
    '32': '8rem',     // 128px
    '40': '10rem',    // 160px
    '48': '12rem',    // 192px
    '56': '14rem',    // 224px
    '64': '16rem',    // 256px

    // Semantic names
    xxs: '0.25rem',   // 4px
    xs: '0.5rem',     // 8px
    sm: '0.75rem',    // 12px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px

    // Component-specific
    gutter: '1rem',
    containerPadding: '1.5rem',
    sectionPadding: '4rem',
  },

  typography: {
    // Font families
    fontFamilyBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyHeading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',

    // Font sizes
    fontSizeXxs: '0.625rem',   // 10px
    fontSizeXs: '0.75rem',     // 12px
    fontSizeSm: '0.875rem',    // 14px
    fontSizeBase: '1rem',      // 16px
    fontSizeMd: '1.125rem',    // 18px
    fontSizeLg: '1.25rem',     // 20px
    fontSizeXl: '1.5rem',      // 24px
    fontSize2xl: '1.875rem',   // 30px
    fontSize3xl: '2.25rem',    // 36px
    fontSize4xl: '3rem',       // 48px
    fontSize5xl: '3.75rem',    // 60px
    fontSize6xl: '4.5rem',     // 72px

    // Font weights
    fontWeightThin: '100',
    fontWeightExtralight: '200',
    fontWeightLight: '300',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
    fontWeightExtrabold: '800',
    fontWeightBlack: '900',

    // Line heights
    lineHeightNone: '1',
    lineHeightTight: '1.25',
    lineHeightSnug: '1.375',
    lineHeightNormal: '1.5',
    lineHeightRelaxed: '1.625',
    lineHeightLoose: '2',

    // Letter spacing
    letterSpacingTighter: '-0.05em',
    letterSpacingTight: '-0.025em',
    letterSpacingNormal: '0',
    letterSpacingWide: '0.025em',
    letterSpacingWider: '0.05em',
    letterSpacingWidest: '0.1em',

    // Heading styles - h1
    h1FontSize: '3rem',        // 48px
    h1FontWeight: '700',
    h1LineHeight: '1.2',
    h1LetterSpacing: '-0.025em',

    // Heading styles - h2
    h2FontSize: '2.25rem',     // 36px
    h2FontWeight: '700',
    h2LineHeight: '1.25',
    h2LetterSpacing: '-0.025em',

    // Heading styles - h3
    h3FontSize: '1.875rem',    // 30px
    h3FontWeight: '600',
    h3LineHeight: '1.3',
    h3LetterSpacing: '0',

    // Heading styles - h4
    h4FontSize: '1.5rem',      // 24px
    h4FontWeight: '600',
    h4LineHeight: '1.375',
    h4LetterSpacing: '0',

    // Heading styles - h5
    h5FontSize: '1.25rem',     // 20px
    h5FontWeight: '600',
    h5LineHeight: '1.5',
    h5LetterSpacing: '0',

    // Heading styles - h6
    h6FontSize: '1rem',        // 16px
    h6FontWeight: '600',
    h6LineHeight: '1.5',
    h6LetterSpacing: '0',

    // Body styles
    bodyFontSize: '1rem',
    bodyFontWeight: '400',
    bodyLineHeight: '1.5',

    // Small text
    smallFontSize: '0.875rem',
    smallFontWeight: '400',
    smallLineHeight: '1.5',

    // Caption
    captionFontSize: '0.75rem',
    captionFontWeight: '400',
    captionLineHeight: '1.5',
  },

  borders: {
    // Border widths
    borderWidthNone: '0',
    borderWidthThin: '1px',
    borderWidthMedium: '2px',
    borderWidthThick: '4px',
    borderWidthHeavy: '8px',

    // Border radii
    borderRadiusNone: '0',
    borderRadiusXs: '0.125rem',   // 2px
    borderRadiusSm: '0.25rem',    // 4px
    borderRadiusMd: '0.375rem',   // 6px
    borderRadiusLg: '0.5rem',     // 8px
    borderRadiusXl: '0.75rem',    // 12px
    borderRadius2xl: '1rem',      // 16px
    borderRadius3xl: '1.5rem',    // 24px
    borderRadiusFull: '9999px',

    // Component-specific radii
    borderRadiusButton: '0.375rem',
    borderRadiusInput: '0.375rem',
    borderRadiusCard: '0.5rem',
    borderRadiusModal: '0.75rem',
    borderRadiusPill: '9999px',

    // Border styles
    borderStyleSolid: 'solid',
    borderStyleDashed: 'dashed',
    borderStyleDotted: 'dotted',
  },

  shadows: {
    // Elevation shadows - enhanced for dark mode visibility
    shadowNone: 'none',
    shadowXs: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    shadowSm: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px -1px rgba(0, 0, 0, 0.6)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)',
    shadow2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    shadowInner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',

    // Colored shadows - brighter for dark mode
    shadowPrimary: '0 4px 14px 0 rgba(96, 165, 250, 0.4)',
    shadowSecondary: '0 4px 14px 0 rgba(167, 139, 250, 0.4)',
    shadowSuccess: '0 4px 14px 0 rgba(52, 211, 153, 0.4)',
    shadowError: '0 4px 14px 0 rgba(248, 113, 113, 0.4)',
    shadowWarning: '0 4px 14px 0 rgba(251, 191, 36, 0.4)',
    shadowInfo: '0 4px 14px 0 rgba(34, 211, 238, 0.4)',

    // Focus shadows
    shadowFocus: '0 0 0 3px rgba(96, 165, 250, 0.4)',
    shadowFocusPrimary: '0 0 0 3px rgba(96, 165, 250, 0.4)',
    shadowFocusError: '0 0 0 3px rgba(248, 113, 113, 0.4)',

    // Component-specific shadows
    shadowButton: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    shadowButtonHover: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)',
    shadowCard: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px -1px rgba(0, 0, 0, 0.6)',
    shadowCardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)',
    shadowDropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)',
    shadowModal: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    shadowPopover: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)',
    shadowTooltip: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)',
  },
};
