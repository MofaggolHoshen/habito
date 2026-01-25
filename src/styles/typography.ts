/**
 * Habito Typography System
 * Based on Brand Guidelines v1.0
 */

export const Typography = {
  // Font Family
  fontFamily: {
    default: 'System', // -apple-system, BlinkMacSystemFont on iOS, Roboto on Android
  },

  // Font Sizes
  fontSize: {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 16,
    bodyLarge: 16,
    bodyRegular: 14,
    caption: 12,
    micro: 11,
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeight: {
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 22,
    bodyLarge: 24,
    bodyRegular: 20,
    caption: 16,
    micro: 14,
  },

  // Letter Spacing
  letterSpacing: {
    normal: 0,
    sliderValue: 1,
    button: 0.5,
    label: 1.5,
  },
} as const;

// Text Style Presets
export const TextStyles = {
  h1: {
    fontSize: Typography.fontSize.h1,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.h1,
  },
  h2: {
    fontSize: Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.h2,
  },
  h3: {
    fontSize: Typography.fontSize.h3,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.h3,
  },
  h4: {
    fontSize: Typography.fontSize.h4,
    fontWeight: Typography.fontWeight.semibold,
    lineHeight: Typography.lineHeight.h4,
  },
  bodyLarge: {
    fontSize: Typography.fontSize.bodyLarge,
    fontWeight: Typography.fontWeight.regular,
    lineHeight: Typography.lineHeight.bodyLarge,
  },
  bodyRegular: {
    fontSize: Typography.fontSize.bodyRegular,
    fontWeight: Typography.fontWeight.regular,
    lineHeight: Typography.lineHeight.bodyRegular,
  },
  caption: {
    fontSize: Typography.fontSize.caption,
    fontWeight: Typography.fontWeight.regular,
    lineHeight: Typography.lineHeight.caption,
  },
  micro: {
    fontSize: Typography.fontSize.micro,
    fontWeight: Typography.fontWeight.medium,
    lineHeight: Typography.lineHeight.micro,
  },
  button: {
    fontSize: Typography.fontSize.h4,
    fontWeight: Typography.fontWeight.semibold,
    letterSpacing: Typography.letterSpacing.button,
  },
  label: {
    fontSize: Typography.fontSize.h4,
    fontWeight: Typography.fontWeight.semibold,
  },
} as const;
