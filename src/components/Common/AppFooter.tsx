/**
 * AppFooter Component
 * Displays app branding and developer information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../styles/theme';

export const AppFooter: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        habito • preview01 • © 2026 Mofaggol Hoshen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  footerText: {
    fontSize: 11,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    opacity: 0.6,
  },
});
