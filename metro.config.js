const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    ...baseConfig.resolver,
    alias: {
      '@': path.resolve(__dirname, 'src') + '/',
    },
  },
};

module.exports = mergeConfig(baseConfig, config);
