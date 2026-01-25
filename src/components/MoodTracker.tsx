/**
 * Mood Tracker Component
 * Rate daily mood with emoji reactions
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Theme } from '../styles/theme';
import { useTasks } from '../context/TasksContext';
import { useCalendar } from '../context/CalendarContext';

interface MoodTrackerProps {
  date?: string;
  onMoodChanged?: () => void;
}

const MOOD_OPTIONS = [
  { emoji: '😢', label: 'Very Bad', value: 1, color: Theme.colors.error },
  { emoji: '😕', label: 'Bad', value: 2, color: '#FF6B6B' },
  { emoji: '😐', label: 'Okay', value: 3, color: Theme.colors.warning },
  { emoji: '🙂', label: 'Good', value: 4, color: '#FFD93D' },
  { emoji: '😄', label: 'Excellent', value: 5, color: Theme.colors.success },
];

const MoodTracker: React.FC<MoodTrackerProps> = ({ date, onMoodChanged }) => {
  const { state } = useCalendar();
  const { getMoodForDate, setMoodForDate } = useTasks();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const targetDate = date || `${String(state.selectedDay).padStart(2, '0')}.${String(state.currentMonth + 1).padStart(2, '0')}.${state.currentYear}`;

  // Load mood on mount or when date changes
  useEffect(() => {
    const mood = getMoodForDate(targetDate);
    setSelectedMood(mood);
  }, [targetDate]);

  const handleMoodSelect = async (moodValue: number) => {
    try {
      await setMoodForDate(targetDate, moodValue);
      setSelectedMood(moodValue);
      onMoodChanged?.();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save mood');
    }
  };

  const currentMood = MOOD_OPTIONS.find((m) => m.value === selectedMood);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How was your day?</Text>
        {currentMood && (
          <Text style={styles.currentMood}>
            {currentMood.label} {currentMood.emoji}
          </Text>
        )}
      </View>

      <View style={styles.moodGrid}>
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodButton,
              selectedMood === mood.value && styles.moodButtonSelected,
              selectedMood === mood.value && { borderColor: mood.color },
            ]}
            onPress={() => handleMoodSelect(mood.value)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[styles.moodLabel, selectedMood === mood.value && { color: mood.color }]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>Mood saved for today</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.md,
    ...Theme.shadows.medium,
  },
  header: {
    marginBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  currentMood: {
    ...Theme.textStyles.body,
    color: Theme.colors.primaryStart,
    fontWeight: 'bold',
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
  },
  moodButtonSelected: {
    backgroundColor: Theme.colors.surfaceAlt,
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: Theme.spacing.xs,
  },
  moodLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  feedback: {
    backgroundColor: Theme.colors.success + '15',
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
  },
  feedbackText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.success,
    fontWeight: 'bold',
  },
});

export default MoodTracker;
