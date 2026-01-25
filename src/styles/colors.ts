/**
 * Habito Color Palette
 * Based on Brand Guidelines v1.0
 */

export const Colors = {
  // Primary Purple Gradient
  primaryStart: '#667eea',
  primaryEnd: '#764ba2',

  // Supporting Purples
  lightPurple: '#8b9df4',
  darkPurple: '#5568d3',

  // Secondary Colors
  success: '#4CAF50',
  successDark: '#45a049',
  warning: '#FFC107',
  error: '#F44336',
  errorDark: '#D32F2F',
  info: '#2196F3',

  // Slider Gradient
  sliderStart: '#FFD700',
  sliderMid: '#FFA500',
  sliderEnd: '#FF4081',

  // Neutral Colors
  black: '#212121',
  darkGray: '#757575',
  gray: '#9E9E9E',
  lightGray: '#BDBDBD',
  borderGray: '#E0E0E0',
  lightBorder: '#F0F0F0',
  background: '#F5F5F5',
  white: '#FFFFFF',

  // Semantic Colors
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F5',
  border: '#E0E0E0',
  divider: '#F0F0F0',

  // Status Colors
  complete: '#4CAF50',
  partial: '#757575',
  incomplete: '#F44336',
  rating: '#FF4081',
  today: '#FFC107',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorKey = keyof typeof Colors;
