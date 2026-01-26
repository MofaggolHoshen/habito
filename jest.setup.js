/**
 * Jest Setup File
 * Configure testing environment
 */

/* eslint-disable no-undef */
// Suppress warnings during testing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock async storage for tests
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));
/* eslint-enable no-undef */

