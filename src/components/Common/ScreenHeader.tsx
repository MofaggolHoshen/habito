/**
 * ScreenHeader Component
 * Reusable header with back button and title
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../styles/theme';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  showStatusBar?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  showStatusBar = true,
}) => {
  return (
    <>
      {showStatusBar && <View style={styles.statusBar} />}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButtonContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 32,
    color: Theme.colors.text,
    fontWeight: '300',
  },
  titleContainer: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Theme.colors.text,
    paddingBottom: Theme.spacing.xs,
  },
  titleText: {
    fontSize: 20,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
});
