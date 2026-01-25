/**
 * Habito Spacing System
 * Based on 8px base unit grid
 */

export const Spacing = {
  // Base unit (8px)
  xs: 4,      // Half unit
  sm: 8,      // 1 unit
  md: 16,     // 2 units
  lg: 24,     // 3 units
  xl: 32,     // 4 units
  xxl: 48,    // 6 units
  xxxl: 64,   // 8 units

  // Common Measurements
  statusBarHeight: 44,
  safeAreaTop: 0, // Handled by SafeAreaView
  safeAreaBottom: 0, // Handled by SafeAreaView

  // Touch Target (minimum 44pt)
  touchTarget: 44,

  // Modal
  modalRadius: 24,
  modalPaddingTop: 24,
  modalPaddingBottom: 24,
  modalPaddingHorizontal: 24,

  // Card
  cardRadius: 8,
  cardPadding: 16,
  cardBorderWidth: 2,

  // Button
  buttonPadding: 16,
  buttonRadius: 12,
  buttonMinHeight: 48,

  // Input
  inputPadding: 14,
  inputPaddingHorizontal: 16,
  inputRadius: 8,

  // List Item
  listItemPadding: 12,

  // Calendar Grid
  calendarGap: 4,
  calendarCellPadding: 4,

  // Slider
  sliderHeight: 8,
  sliderThumbSize: 28,
  sliderPadding: 20,

  // Tab/Divider
  dividerHeight: 1,
  dividerMarginVertical: 16,

  // Shadow/Elevation
  shadowRadius: 8,
} as const;

export type SpacingKey = keyof typeof Spacing;
