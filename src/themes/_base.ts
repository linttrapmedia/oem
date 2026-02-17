export type DesignTokens = {
  colors: {
    // Primary palette
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryDisabled: string;
    primarySubtle: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary palette
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    secondaryDisabled: string;
    secondarySubtle: string;
    secondaryLight: string;
    secondaryDark: string;

    // Semantic colors
    success: string;
    successHover: string;
    successActive: string;
    successSubtle: string;
    successLight: string;
    successDark: string;

    error: string;
    errorHover: string;
    errorActive: string;
    errorSubtle: string;
    errorLight: string;
    errorDark: string;

    warning: string;
    warningHover: string;
    warningActive: string;
    warningSubtle: string;
    warningLight: string;
    warningDark: string;

    info: string;
    infoHover: string;
    infoActive: string;
    infoSubtle: string;
    infoLight: string;
    infoDark: string;

    // Neutral/Gray scale
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
    neutral950: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textDisabled: string;
    textInverse: string;
    textLink: string;
    textLinkHover: string;
    textSuccess: string;
    textError: string;
    textWarning: string;
    textInfo: string;

    // Background colors
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    bgOverlay: string;
    bgInverse: string;
    bgDisabled: string;
    bgHover: string;
    bgActive: string;
    bgSelected: string;

    // Border colors
    borderPrimary: string;
    borderSecondary: string;
    borderTertiary: string;
    borderDisabled: string;
    borderFocus: string;
    borderError: string;
    borderSuccess: string;
    borderWarning: string;
    borderInfo: string;

    // Surface colors
    surfaceDefault: string;
    surfaceSubtle: string;
    surfaceRaised: string;
    surfaceOverlay: string;
    surfaceInverse: string;

    // State colors
    focusRing: string;
    selected: string;
    hover: string;
    active: string;
    disabled: string;
  };

  spacing: {
    // Numeric scale
    '0': string;
    '1': string;  // 0.25rem / 4px
    '2': string;  // 0.5rem / 8px
    '3': string;  // 0.75rem / 12px
    '4': string;  // 1rem / 16px
    '5': string;  // 1.25rem / 20px
    '6': string;  // 1.5rem / 24px
    '7': string;  // 1.75rem / 28px
    '8': string;  // 2rem / 32px
    '10': string; // 2.5rem / 40px
    '12': string; // 3rem / 48px
    '16': string; // 4rem / 64px
    '20': string; // 5rem / 80px
    '24': string; // 6rem / 96px
    '32': string; // 8rem / 128px
    '40': string; // 10rem / 160px
    '48': string; // 12rem / 192px
    '56': string; // 14rem / 224px
    '64': string; // 16rem / 256px

    // Semantic names
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;

    // Component-specific
    gutter: string;
    containerPadding: string;
    sectionPadding: string;
  };

  typography: {
    // Font families
    fontFamilyBase: string;
    fontFamilyHeading: string;
    fontFamilyMono: string;

    // Font sizes
    fontSizeXxs: string;   // 0.625rem / 10px
    fontSizeXs: string;    // 0.75rem / 12px
    fontSizeSm: string;    // 0.875rem / 14px
    fontSizeBase: string;  // 1rem / 16px
    fontSizeMd: string;    // 1.125rem / 18px
    fontSizeLg: string;    // 1.25rem / 20px
    fontSizeXl: string;    // 1.5rem / 24px
    fontSize2xl: string;   // 1.875rem / 30px
    fontSize3xl: string;   // 2.25rem / 36px
    fontSize4xl: string;   // 3rem / 48px
    fontSize5xl: string;   // 3.75rem / 60px
    fontSize6xl: string;   // 4.5rem / 72px

    // Font weights
    fontWeightThin: string;       // 100
    fontWeightExtralight: string; // 200
    fontWeightLight: string;      // 300
    fontWeightNormal: string;     // 400
    fontWeightMedium: string;     // 500
    fontWeightSemibold: string;   // 600
    fontWeightBold: string;       // 700
    fontWeightExtrabold: string;  // 800
    fontWeightBlack: string;      // 900

    // Line heights
    lineHeightNone: string;   // 1
    lineHeightTight: string;  // 1.25
    lineHeightSnug: string;   // 1.375
    lineHeightNormal: string; // 1.5
    lineHeightRelaxed: string; // 1.625
    lineHeightLoose: string;  // 2

    // Letter spacing
    letterSpacingTighter: string; // -0.05em
    letterSpacingTight: string;   // -0.025em
    letterSpacingNormal: string;  // 0
    letterSpacingWide: string;    // 0.025em
    letterSpacingWider: string;   // 0.05em
    letterSpacingWidest: string;  // 0.1em

    // Heading styles
    h1FontSize: string;
    h1FontWeight: string;
    h1LineHeight: string;
    h1LetterSpacing: string;

    h2FontSize: string;
    h2FontWeight: string;
    h2LineHeight: string;
    h2LetterSpacing: string;

    h3FontSize: string;
    h3FontWeight: string;
    h3LineHeight: string;
    h3LetterSpacing: string;

    h4FontSize: string;
    h4FontWeight: string;
    h4LineHeight: string;
    h4LetterSpacing: string;

    h5FontSize: string;
    h5FontWeight: string;
    h5LineHeight: string;
    h5LetterSpacing: string;

    h6FontSize: string;
    h6FontWeight: string;
    h6LineHeight: string;
    h6LetterSpacing: string;

    // Body styles
    bodyFontSize: string;
    bodyFontWeight: string;
    bodyLineHeight: string;

    // Small text
    smallFontSize: string;
    smallFontWeight: string;
    smallLineHeight: string;

    // Caption
    captionFontSize: string;
    captionFontWeight: string;
    captionLineHeight: string;
  };

  borders: {
    // Border widths
    borderWidthNone: string;
    borderWidthThin: string;   // 1px
    borderWidthMedium: string; // 2px
    borderWidthThick: string;  // 4px
    borderWidthHeavy: string;  // 8px

    // Border radii
    borderRadiusNone: string;
    borderRadiusXs: string;    // 0.125rem / 2px
    borderRadiusSm: string;    // 0.25rem / 4px
    borderRadiusMd: string;    // 0.375rem / 6px
    borderRadiusLg: string;    // 0.5rem / 8px
    borderRadiusXl: string;    // 0.75rem / 12px
    borderRadius2xl: string;   // 1rem / 16px
    borderRadius3xl: string;   // 1.5rem / 24px
    borderRadiusFull: string;  // 9999px

    // Component-specific radii
    borderRadiusButton: string;
    borderRadiusInput: string;
    borderRadiusCard: string;
    borderRadiusModal: string;
    borderRadiusPill: string;

    // Border styles
    borderStyleSolid: string;
    borderStyleDashed: string;
    borderStyleDotted: string;
  };

  shadows: {
    // Elevation shadows
    shadowNone: string;
    shadowXs: string;   // Subtle shadow
    shadowSm: string;   // Small elevation
    shadowMd: string;   // Medium elevation
    shadowLg: string;   // Large elevation
    shadowXl: string;   // Extra large elevation
    shadow2xl: string;  // Huge elevation
    shadowInner: string; // Inset shadow

    // Colored shadows
    shadowPrimary: string;
    shadowSecondary: string;
    shadowSuccess: string;
    shadowError: string;
    shadowWarning: string;
    shadowInfo: string;

    // Focus shadows
    shadowFocus: string;
    shadowFocusPrimary: string;
    shadowFocusError: string;

    // Component-specific shadows
    shadowButton: string;
    shadowButtonHover: string;
    shadowCard: string;
    shadowCardHover: string;
    shadowDropdown: string;
    shadowModal: string;
    shadowPopover: string;
    shadowTooltip: string;
  };

  // Allow custom token categories
  [key: string]: Record<string, string>;
};
