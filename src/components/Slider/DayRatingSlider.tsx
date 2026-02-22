/**
 * DayRatingSlider Component
 * Interactive slider for rating the day (0-10 scale)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Theme } from '../../styles/theme';
import { getEmojiForRating } from '../../utils';

interface DayRatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const DayRatingSlider: React.FC<DayRatingSliderProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.sliderSection}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Your Day Rating</Text>
        <View style={styles.ratingValueContainer}>
          <Text style={styles.ratingValue}>{String(value)}</Text>
          <Text style={styles.ratingEmoji}>{getEmojiForRating(value)}</Text>
        </View>

        {/* Slider - Interactive */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor="#FFD700"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="#FFFFFF"
        />

        {/* Slider Labels */}
        <View style={styles.sliderLabels}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.labelButton}
              onPress={() => onChange(num)}
            >
              <Text
                style={[
                  styles.labelText,
                  value === num && styles.labelTextActive,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#667eea',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    paddingTop: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  ratingContainer: {
    width: '100%',
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  ratingValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  ratingValue: {
    fontSize: 40,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ratingEmoji: {
    fontSize: 32,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  labelButton: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: Theme.typography.fontWeight.medium,
  },
  labelTextActive: {
    color: Theme.colors.white,
    fontWeight: Theme.typography.fontWeight.bold,
    fontSize: 13,
  },
});
