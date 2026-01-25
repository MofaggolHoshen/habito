/**
 * Habito Theme Configuration
 * Centralized theme system combining colors, typography, spacing, and shadows
 */

import { Colors } from './colors';
import { Typography, TextStyles } from './typography';
import { Spacing } from './spacing';
import { Shadows } from './shadows';

export const Theme = {
  colors: Colors,
  typography: Typography,
  textStyles: TextStyles,
  spacing: Spacing,
  shadows: Shadows,

  // Common Gradients
  gradients: {
    primary: {
      start: Colors.primaryStart,
      end: Colors.primaryEnd,
      angle: '135deg',
      colors: [Colors.primaryStart, Colors.primaryEnd],
    },
    success: {
      start: Colors.success,
      end: Colors.successDark,
      angle: '135deg',
      colors: [Colors.success, Colors.successDark],
    },
    slider: {
      start: Colors.sliderStart,
      end: Colors.sliderEnd,
      angle: '90deg',
      colors: [Colors.sliderStart, Colors.sliderMid, Colors.sliderEnd],
    },
  },

  // Border Radius
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Z-Index
  zIndex: {
    hidden: -1,
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
  },

  // Animations (common durations in ms)
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const;

export type ThemeType = typeof Theme;

// Export individual pieces for convenience
export { Colors } from './colors';
export { Typography, TextStyles } from './typography';
export { Spacing } from './spacing';
export { Shadows, ShadowValues } from './shadows';
