/**
 * DateBadge Component
 * Displays the date for which tasks are being added
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../styles/theme';

interface DateBadgeProps {
  date: string;
}

export const DateBadge: React.FC<DateBadgeProps> = ({ date }) => {
  return (
    <View style={styles.dateBadge}>
      <Text style={styles.dateBadgeLabel}>Adding task for</Text>
      <Text style={styles.dateBadgeValue}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateBadge: {
    backgroundColor: '#667eea',
    paddingVertical: Theme.spacing.md,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  dateBadgeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateBadgeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
