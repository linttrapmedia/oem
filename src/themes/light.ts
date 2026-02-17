import type { DesignTokens } from './_base';

export const lightTheme: DesignTokens = {
  colors: {
    // Primary palette
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryActive: '#1d4ed8',
    primaryDisabled: '#93c5fd',
    primarySubtle: '#dbeafe',
    primaryLight: '#eff6ff',
    primaryDark: '#1e40af',

    // Secondary palette
    secondary: '#8b5cf6',
    secondaryHover: '#7c3aed',
    secondaryActive: '#6d28d9',
    secondaryDisabled: '#c4b5fd',
    secondarySubtle: '#ede9fe',
    secondaryLight: '#f5f3ff',
    secondaryDark: '#5b21b6',

    // Semantic colors - Success
    success: '#10b981',
    successHover: '#059669',
    successActive: '#047857',
    successSubtle: '#d1fae5',
    successLight: '#ecfdf5',
    successDark: '#065f46',

    // Semantic colors - Error
    error: '#ef4444',
    errorHover: '#dc2626',
    errorActive: '#b91c1c',
    errorSubtle: '#fecaca',
    errorLight: '#fef2f2',
    errorDark: '#991b1b',

    // Semantic colors - Warning
    warning: '#f59e0b',
    warningHover: '#d97706',
    warningActive: '#b45309',
    warningSubtle: '#fde68a',
    warningLight: '#fffbeb',
    warningDark: '#92400e',

    // Semantic colors - Info
    info: '#06b6d4',
    infoHover: '#0891b2',
    infoActive: '#0e7490',
    infoSubtle: '#cffafe',
    infoLight: '#ecfeff',
    infoDark: '#155e75',

    // Neutral/Gray scale
    neutral50: '#fafafa',
    neutral100: '#f5f5f5',
    neutral200: '#e5e5e5',
    neutral300: '#d4d4d4',
    neutral400: '#a3a3a3',
    neutral500: '#737373',
    neutral600: '#525252',
    neutral700: '#404040',
    neutral800: '#262626',
    neutral900: '#171717',
    neutral950: '#0a0a0a',

    // Text colors
    textPrimary: '#171717',
    textSecondary: '#525252',
    textTertiary: '#737373',
    textDisabled: '#a3a3a3',
    textInverse: '#ffffff',
    textLink: '#3b82f6',
    textLinkHover: '#2563eb',
    textSuccess: '#065f46',
    textError: '#991b1b',
    textWarning: '#92400e',
    textInfo: '#155e75',

    // Background colors
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    bgTertiary: '#f5f5f5',
    bgOverlay: 'rgba(0, 0, 0, 0.5)',
    bgInverse: '#171717',
    bgDisabled: '#f5f5f5',
    bgHover: '#fafafa',
    bgActive: '#f5f5f5',
    bgSelected: '#eff6ff',

    // Border colors
    borderPrimary: '#e5e5e5',
    borderSecondary: '#d4d4d4',
    borderTertiary: '#a3a3a3',
    borderDisabled: '#f5f5f5',
    borderFocus: '#3b82f6',
    borderError: '#ef4444',
    borderSuccess: '#10b981',
    borderWarning: '#f59e0b',
    borderInfo: '#06b6d4',

    // Surface colors
    surfaceDefault: '#ffffff',
    surfaceSubtle: '#fafafa',
    surfaceRaised: '#ffffff',
    surfaceOverlay: '#ffffff',
    surfaceInverse: '#171717',

    // State colors
    focusRing: '#3b82f6',
    selected: '#eff6ff',
    hover: '#fafafa',
    active: '#f5f5f5',
    disabled: '#a3a3a3',
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
    // Elevation shadows
    shadowNone: 'none',
    shadowXs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    shadowSm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    shadow2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    shadowInner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

    // Colored shadows
    shadowPrimary: '0 4px 14px 0 rgba(59, 130, 246, 0.25)',
    shadowSecondary: '0 4px 14px 0 rgba(139, 92, 246, 0.25)',
    shadowSuccess: '0 4px 14px 0 rgba(16, 185, 129, 0.25)',
    shadowError: '0 4px 14px 0 rgba(239, 68, 68, 0.25)',
    shadowWarning: '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
    shadowInfo: '0 4px 14px 0 rgba(6, 182, 212, 0.25)',

    // Focus shadows
    shadowFocus: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    shadowFocusPrimary: '0 0 0 3px rgba(59, 130, 246, 0.3)',
    shadowFocusError: '0 0 0 3px rgba(239, 68, 68, 0.3)',

    // Component-specific shadows
    shadowButton: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    shadowButtonHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    shadowCard: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    shadowCardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    shadowDropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    shadowModal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    shadowPopover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    shadowTooltip: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
};
