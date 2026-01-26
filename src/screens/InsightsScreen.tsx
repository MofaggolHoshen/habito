/**
 * Insights Screen
 * Display analytics, streaks, and productivity metrics
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../styles/theme';
import { InsightsScreenProps } from '../navigation/types';
import { useTasks } from '../context/TasksContext';
import { useRatings } from '../context/RatingsContext';
import { useAnalytics } from '../context/AnalyticsContext';
import * as analyticsHelpers from '../utils/analyticsHelpers';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ _navigation }) => {
  const { state: tasksState } = useTasks();
  const { state: ratingsState } = useRatings();
  const { state: analyticsState, calculateAnalytics } = useAnalytics();
  const [stats, setStats] = useState<Stat[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Calculate analytics on mount and when period changes
  useEffect(() => {
    const calculatePeriodAnalytics = async () => {
      const today = new Date();
      let startDate = new Date();

      if (selectedPeriod === 'week') {
        startDate.setDate(today.getDate() - 7);
      } else if (selectedPeriod === 'month') {
        startDate.setMonth(today.getMonth() - 1);
      } else {
        startDate = new Date(today.getFullYear() - 1, 0, 1);
      }

      const formatDate = (date: Date) =>
        `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}.${date.getFullYear()}`;

      await calculateAnalytics(
        tasksState.tasks,
        ratingsState.ratings,
        formatDate(startDate),
        formatDate(today)
      );
    };

    calculatePeriodAnalytics();
  }, [selectedPeriod, tasksState.tasks, ratingsState.ratings, calculateAnalytics]);

  // Update stats display
  useEffect(() => {
    const newStats: Stat[] = [
      {
        label: 'Productivity Score',
        value: `${analyticsState.productivityScore}%`,
        icon: '📊',
      },
      {
        label: 'Completion Rate',
        value: `${analyticsState.completionRate}%`,
        icon: '✅',
      },
      {
        label: 'Average Mood',
        value: `${analyticsState.averageRating}/10`,
        icon: '😊',
      },
      {
        label: 'Current Streak',
        value: `${analyticsState.consecutiveDays} days`,
        icon: '🔥',
      },
    ];
    setStats(newStats);
  }, [analyticsState]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Insights</Text>
        <Text style={styles.subtitle}>Track your progress and achievements</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['week', 'month', 'all'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period === 'all' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements Section */}
        {analyticsState.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
            <View style={styles.achievementsList}>
              {analyticsState.achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <Text style={styles.achievementText}>{achievement}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Insights Section */}
        {analyticsState.insights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Insights</Text>
            <View style={styles.insightsList}>
              {analyticsState.insights.map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <Text style={styles.insightText}>{insight}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Productivity Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Productivity Level</Text>
          <View style={styles.productivityCard}>
            <Text style={styles.productivityLevel}>
              {analyticsHelpers.getProductivityLevel(analyticsState.productivityScore)}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${analyticsState.productivityScore}%` },
                ]}
              />
            </View>
            <Text style={styles.productivityDesc}>Keep building your habits!</Text>
          </View>
        </View>

        {/* Streak Information */}
        {analyticsState.streaks.size > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔥 Streaks</Text>
            <View style={styles.streaksList}>
              {Array.from(analyticsState.streaks.entries()).map(([_taskId, streak], index) => (
                <View key={index} style={styles.streakItem}>
                  <View style={styles.streakInfo}>
                    <Text style={styles.streakCurrent}>
                      Current: {streak.currentStreak} days
                    </Text>
                    <Text style={styles.streakLongest}>
                      Longest: {streak.longestStreak} days
                    </Text>
                  </View>
                  {streak.isActive && <Text style={styles.streakActive}>🔥 Active!</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {stats.length === 0 && analyticsState.achievements.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📊</Text>
            <Text style={styles.emptyStateText}>No data yet</Text>
            <Text style={styles.emptyStateDesc}>
              Complete some tasks to see your analytics
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  periodButton: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    marginHorizontal: Theme.spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    alignItems: 'center',
    ...Theme.shadows.elevation1,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: Theme.spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  achievementsList: {
    flexDirection: 'column',
  },
  achievementItem: {
    backgroundColor: Theme.colors.success + '20',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.success,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 14,
    color: Theme.colors.text,
    fontWeight: '600',
  },
  insightsList: {
    flexDirection: 'column',
  },
  insightItem: {
    backgroundColor: Theme.colors.info + '20',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.info,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderRadius: 8,
  },
  insightText: {
    fontSize: 14,
    color: Theme.colors.text,
  },
  productivityCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    padding: Theme.spacing.md,
    ...Theme.shadows.elevation1,
  },
  productivityLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: Theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.success,
    borderRadius: 4,
  },
  productivityDesc: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  streaksList: {
    flexDirection: 'column',
  },
  streakItem: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Theme.shadows.elevation1,
  },
  streakInfo: {
    flex: 1,
  },
  streakCurrent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  streakLongest: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  streakActive: {
    fontSize: 16,
    marginLeft: Theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: Theme.spacing.md,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  emptyStateDesc: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default InsightsScreen;
