/**
 * Analytics Utilities
 * Calculate metrics and insights
 */

import { Task } from '../types/Task';

interface DailyStats {
  date: string;
  completedTasks: number;
  totalTasks: number;
  completionRate: number;
  rating: number | null;
  mood: string;
}

interface WeeklyStats {
  week: number;
  totalCompleted: number;
  totalTasks: number;
  averageRating: number;
  completionTrend: number; // percentage
}

interface MonthlyStats {
  month: number;
  year: number;
  totalCompleted: number;
  totalTasks: number;
  averageRating: number;
  completionTrend: number;
  bestDay: string;
  bestRating: number;
}

/**
 * Calculate daily statistics
 */
export const calculateDailyStats = (
  date: string,
  tasks: Task[],
  rating: number | null
): DailyStats => {
  const completed = tasks.filter((t) => t.isCompleted).length;
  const total = tasks.length;
  const rate = total > 0 ? (completed / total) * 100 : 0;

  // Map rating to mood emoji
  let mood = '🙁';
  if (rating !== null) {
    if (rating <= 2) mood = '😢';
    else if (rating <= 4) mood = '😔';
    else if (rating <= 5) mood = '😕';
    else if (rating <= 7) mood = '😊';
    else if (rating <= 9) mood = '😃';
    else mood = '🤩';
  }

  return {
    date,
    completedTasks: completed,
    totalTasks: total,
    completionRate: Math.round(rate),
    rating,
    mood,
  };
};

/**
 * Calculate weekly statistics from daily stats
 */
export const calculateWeeklyStats = (
  dailyStats: DailyStats[],
  weekNumber: number
): WeeklyStats => {
  const validStats = dailyStats.filter((s) => s.totalTasks > 0);

  const totalCompleted = validStats.reduce((sum, s) => sum + s.completedTasks, 0);
  const totalTasks = validStats.reduce((sum, s) => sum + s.totalTasks, 0);
  const ratingCount = validStats.filter((s) => s.rating !== null).length;
  const totalRating = validStats.reduce((sum, s) => (s.rating || 0), 0);

  const completionTrend =
    totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  const averageRating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;

  return {
    week: weekNumber,
    totalCompleted,
    totalTasks,
    averageRating,
    completionTrend,
  };
};

/**
 * Calculate monthly statistics
 */
export const calculateMonthlyStats = (
  dailyStats: DailyStats[],
  month: number,
  year: number
): MonthlyStats => {
  const validStats = dailyStats.filter((s) => s.totalTasks > 0);

  const totalCompleted = validStats.reduce((sum, s) => sum + s.completedTasks, 0);
  const totalTasks = validStats.reduce((sum, s) => sum + s.totalTasks, 0);
  const ratingCount = validStats.filter((s) => s.rating !== null).length;
  const totalRating = validStats.reduce((sum, s) => (s.rating || 0), 0);

  const completionTrend =
    totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  const averageRating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;

  // Find best day
  const bestDayStats = validStats.reduce((best, current) =>
    current.completionRate > best.completionRate ? current : best
  );
  const bestDay = bestDayStats?.date || '';
  const bestRating = validStats.reduce((max, s) => Math.max(max, s.rating || 0), 0);

  return {
    month,
    year,
    totalCompleted,
    totalTasks,
    averageRating,
    completionTrend,
    bestDay,
    bestRating,
  };
};

/**
 * Get trend direction (up, stable, down)
 */
export const getTrend = (previous: number, current: number): 'up' | 'stable' | 'down' => {
  const difference = current - previous;
  if (difference > 5) return 'up';
  if (difference < -5) return 'down';
  return 'stable';
};

/**
 * Get trend emoji
 */
export const getTrendEmoji = (trend: 'up' | 'stable' | 'down'): string => {
  switch (trend) {
    case 'up':
      return '📈';
    case 'down':
      return '📉';
    case 'stable':
      return '➡️';
  }
};

/**
 * Calculate insights from monthly data
 */
export const getInsights = (
  currentMonth: MonthlyStats,
  previousMonth: MonthlyStats
): string[] => {
  const insights: string[] = [];

  // Trend analysis
  if (currentMonth.completionTrend > previousMonth.completionTrend + 10) {
    insights.push('🎉 Great progress! Your completion rate is improving.');
  } else if (currentMonth.completionTrend < previousMonth.completionTrend - 10) {
    insights.push('⚠️ Your completion rate has decreased. Try to stay consistent!');
  }

  // Mood analysis
  if (currentMonth.averageRating > previousMonth.averageRating) {
    insights.push("😊 Your mood has improved! Keep up the good work.");
  } else if (currentMonth.averageRating < previousMonth.averageRating - 2) {
    insights.push("💙 Your mood has been lower. Remember to take care of yourself.");
  }

  // Completion milestones
  if (currentMonth.completionTrend >= 80) {
    insights.push('🏆 Excellent consistency! You\'re completing most of your tasks.');
  } else if (currentMonth.completionTrend >= 50) {
    insights.push('✅ Good effort! You\'re on the right track.');
  } else if (currentMonth.completionTrend < 25) {
    insights.push('💪 Consider starting with fewer tasks for better success.');
  }

  return insights;
};

/**
 * Calculate productivity score (0-100)
 */
export const calculateProductivityScore = (
  completionRate: number,
  averageRating: number,
  consecutiveDays: number
): number => {
  const completionScore = Math.min(completionRate, 100) * 0.5; // 50% weight
  const moodScore = Math.min(averageRating * 10, 100) * 0.3; // 30% weight
  const consistencyScore = Math.min(consecutiveDays * 5, 100) * 0.2; // 20% weight

  return Math.round(completionScore + moodScore + consistencyScore);
};

/**
 * Get productivity level
 */
export const getProductivityLevel = (score: number): string => {
  if (score >= 90) return 'Exceptional 🌟';
  if (score >= 75) return 'Excellent ⭐';
  if (score >= 60) return 'Good 👍';
  if (score >= 40) return 'Fair ➡️';
  return 'Needs Improvement 💪';
};
