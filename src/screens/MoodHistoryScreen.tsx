/**
 * Mood History Screen
 * View and analyze mood history over time
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Theme } from '../styles/theme';
import { MoodHistoryScreenProps } from '../navigation/types';
import { useTasks } from '../context/TasksContext';
import { getMoodEmoji, getMoodLabel, getMoodColor } from '../utils/moodHelpers';

interface MoodEntry {
  date: string;
  dayName: string;
  mood: number;
  emoji: string;
  label: string;
  color: string;
}

const MOOD_OPTIONS = [
  { emoji: '😢', label: 'Very Bad', value: 1 },
  { emoji: '😕', label: 'Bad', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😄', label: 'Excellent', value: 5 },
];

const MoodHistoryScreen: React.FC<MoodHistoryScreenProps> = ({ navigation }) => {
  const { getMoodHistoryForMonth } = useTasks();
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('month');
  const [stats, setStats] = useState({
    average: 0,
    best: 0,
    worst: 0,
    entries: 0,
  });

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = () => {
    // Get last 30 days of mood data
    const history = getMoodHistoryForMonth(new Date().getMonth(), new Date().getFullYear());
    
    const entries: MoodEntry[] = history.map((h) => ({
      date: h.date,
      dayName: getDayName(h.date),
      mood: h.mood,
      emoji: getMoodEmoji(h.mood),
      label: getMoodLabel(h.mood),
      color: getMoodColor(h.mood),
    }));

    setMoodHistory(entries);
    calculateStats(entries);
  };

  const getDayName = (dateStr: string): string => {
    const [day, month, year] = dateStr.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const calculateStats = (entries: MoodEntry[]) => {
    if (entries.length === 0) {
      setStats({ average: 0, best: 0, worst: 0, entries: 0 });
      return;
    }

    const moods = entries.map((e) => e.mood);
    const average = Math.round((moods.reduce((a, b) => a + b, 0) / moods.length) * 10) / 10;
    const best = Math.max(...moods);
    const worst = Math.min(...moods);

    setStats({
      average,
      best,
      worst,
      entries: entries.length,
    });
  };

  const getFilteredHistory = (): MoodEntry[] => {
    if (selectedPeriod === 'week') {
      return moodHistory.slice(-7);
    }
    return moodHistory;
  };

  const renderMoodEntry = ({ item }: { item: MoodEntry }) => (
    <TouchableOpacity style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <View style={styles.entryDate}>
          <Text style={styles.entryDay}>{item.dayName}</Text>
          <Text style={styles.entryDateText}>{item.date}</Text>
        </View>
        <View style={[styles.moodBadge, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.moodBadgeEmoji}>{item.emoji}</Text>
          <Text style={[styles.moodBadgeText, { color: item.color }]}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredHistory = getFilteredHistory();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood History</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === 'week' && styles.periodButtonTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === 'month' && styles.periodButtonTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Average Mood</Text>
            <Text style={styles.statValue}>{stats.average}</Text>
            <Text style={styles.statEmoji}>{getMoodEmoji(Math.round(stats.average))}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Best Day</Text>
            <Text style={styles.statValue}>{getMoodLabel(stats.best)}</Text>
            <Text style={styles.statEmoji}>{getMoodEmoji(stats.best)}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Days</Text>
            <Text style={styles.statValue}>{stats.entries}</Text>
            <Text style={styles.statEmoji}>📊</Text>
          </View>
        </View>

        {/* Mood Distribution */}
        <View style={styles.distributionContainer}>
          <Text style={styles.distributionTitle}>Distribution</Text>
          {MOOD_OPTIONS.map((mood) => {
            const count = moodHistory.filter((m) => m.mood === mood.value).length;
            const percentage = moodHistory.length > 0 ? (count / moodHistory.length) * 100 : 0;

            return (
              <View key={mood.value} style={styles.distributionRow}>
                <Text style={styles.distributionEmoji}>{mood.emoji}</Text>
                <View style={styles.distributionBar}>
                  <View
                    style={[
                      styles.distributionBarFill,
                      { width: `${percentage}%`, backgroundColor: getMoodColor(mood.value) },
                    ]}
                  />
                </View>
                <Text style={styles.distributionCount}>{count}</Text>
              </View>
            );
          })}
        </View>

        {/* Mood History List */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Recent Entries ({filteredHistory.length})</Text>
        </View>

        {filteredHistory.length > 0 ? (
          <FlatList
            data={filteredHistory.reverse()}
            keyExtractor={(item) => item.date}
            renderItem={renderMoodEntry}
            scrollEnabled={false}
            contentContainerStyle={styles.historyList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>📭</Text>
            <Text style={styles.emptyStateText}>No mood entries yet</Text>
            <Text style={styles.emptyStateSubtext}>Start tracking your mood from the dashboard</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    ...Theme.textStyles.heading2,
    color: Theme.colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginVertical: Theme.spacing.lg,
  },
  periodButton: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Theme.colors.primaryStart,
    borderColor: Theme.colors.primaryStart,
  },
  periodButtonText: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  periodButtonTextActive: {
    color: Theme.colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  statLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  statValue: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  statEmoji: {
    fontSize: 28,
  },
  distributionContainer: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.small,
  },
  distributionTitle: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  distributionEmoji: {
    fontSize: 20,
    marginRight: Theme.spacing.md,
    width: 24,
  },
  distributionBar: {
    flex: 1,
    height: 24,
    backgroundColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.sm,
    overflow: 'hidden',
  },
  distributionBarFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.sm,
  },
  distributionCount: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.md,
    minWidth: 24,
    textAlign: 'right',
  },
  historyHeader: {
    marginBottom: Theme.spacing.md,
  },
  historyTitle: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  historyList: {
    paddingBottom: Theme.spacing.lg,
  },
  entryCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.small,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    flex: 1,
  },
  entryDay: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  entryDateText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.xs,
  },
  moodBadgeEmoji: {
    fontSize: 20,
  },
  moodBadgeText: {
    ...Theme.textStyles.caption,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: Theme.spacing.md,
  },
  emptyStateText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    fontWeight: 'bold',
  },
  emptyStateSubtext: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
});

export default MoodHistoryScreen;
