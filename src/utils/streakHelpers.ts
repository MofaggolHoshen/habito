/**
 * Streak Calculation Utilities
 * Calculate and track habit streaks
 */

import { Task } from '../types/Task';
import { parseDate, formatDate } from './dateHelpers';

interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
  lastCompletedDate: string | null;
}

/**
 * Calculate streak for a specific task across dates
 * Streak is broken if a day is missed (not completed)
 */
export const calculateStreak = (
  tasksByDate: Map<string, Task[]>,
  taskId: string,
  endDate?: string
): StreakInfo => {
  const today = endDate || formatDate(new Date());

  let currentStreak = 0;
  let longestStreak = 0;
  let lastCompletedDate: string | null = null;
  let tempStreak = 0;
  let streakBroken = false;

  // Iterate backwards from today
  const allDates: [string, Task[]][] = Array.from(tasksByDate.entries());
  const sortedDates = allDates.sort((a, b) => {
    const dateA = parseDate(a[0]);
    const dateB = parseDate(b[0]);
    return dateB.getTime() - dateA.getTime();
  });

  for (const [dateStr, tasks] of sortedDates) {
    // Check if task was completed on this date
    const task = tasks.find((t) => t.id === taskId);
    const isCompleted = task?.isCompleted ?? false;

    if (isCompleted) {
      tempStreak++;
      if (!lastCompletedDate) {
        lastCompletedDate = dateStr;
      }

      // If we haven't broken the streak yet, increment current streak
      if (!streakBroken) {
        currentStreak++;
      }
    } else if (tempStreak > 0) {
      // Streak broken
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
      streakBroken = true;
    }
  }

  // Don't count today's streak if not completed
  if (lastCompletedDate !== today && currentStreak > 0) {
    currentStreak = 0;
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  const isActive = lastCompletedDate === today;

  return {
    currentStreak,
    longestStreak,
    isActive,
    lastCompletedDate,
  };
};

/**
 * Get completed tasks count for a date range
 */
export const getCompletionRate = (
  tasksByDate: Map<string, Task[]>,
  startDate: string,
  endDate: string
): number => {
  parseDate(startDate);
  parseDate(endDate);

  let totalTasks = 0;
  let completedTasks = 0;

  for (const [, tasks] of tasksByDate.entries()) {
    totalTasks += tasks.length;
    completedTasks += tasks.filter((t) => t.isCompleted).length;
  }

  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
};

/**
 * Get average daily completion for a period
 */
export const getAverageDailyCompletion = (
  tasksByDate: Map<string, Task[]>,
  startDate: string,
  endDate: string
): number => {
  parseDate(startDate);
  parseDate(endDate);

  let totalCompleted = 0;
  let daysWithTasks = 0;

  for (const [, tasks] of tasksByDate.entries()) {
    const completed = tasks.filter((t) => t.isCompleted).length;
    if (completed > 0) {
      totalCompleted += completed;
      daysWithTasks++;
    }
  }

  if (daysWithTasks === 0) return 0;
  return Math.round(totalCompleted / daysWithTasks);
};

/**
 * Get consecutive days with at least one completed task
 */
export const getConsecutiveActiveDays = (
  tasksByDate: Map<string, Task[]>,
  endDate?: string
): number => {
  const today = endDate || formatDate(new Date());
  const todayDate = parseDate(today);

  let consecutiveDays = 0;
  const allDates: [string, Task[]][] = Array.from(tasksByDate.entries());
  const sortedDates = allDates.sort((a, b) => {
    const dateA = parseDate(a[0]);
    const dateB = parseDate(b[0]);
    return dateB.getTime() - dateA.getTime();
  });

  let expectedDate = new Date(todayDate);

  for (const [dateStr, tasks] of sortedDates) {
    const dateObj = parseDate(dateStr);
    const hasCompletedTask = tasks.some((t) => t.isCompleted);

    // Check if this date matches expected date
    if (
      dateObj.getFullYear() === expectedDate.getFullYear() &&
      dateObj.getMonth() === expectedDate.getMonth() &&
      dateObj.getDate() === expectedDate.getDate()
    ) {
      if (hasCompletedTask) {
        consecutiveDays++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return consecutiveDays;
};

/**
 * Format streak for display
 */
export const formatStreakDisplay = (streak: number): string => {
  if (streak === 0) return 'No streak';
  if (streak === 1) return '1 day 🔥';
  return `${streak} days 🔥`;
};

/**
 * Get milestone achievements
 */
export const getAchievements = (
  streaks: Map<string, StreakInfo>,
  completionRate: number,
  consecutiveDays: number
): string[] => {
  const achievements: string[] = [];

  // Streak achievements
  for (const [, streak] of streaks.entries()) {
    if (streak.longestStreak >= 7) achievements.push('⭐ Week Warrior');
    if (streak.longestStreak >= 30) achievements.push('🏆 Monthly Master');
    if (streak.longestStreak >= 100) achievements.push('🎖️ Century Champion');
  }

  // Completion achievements
  if (completionRate >= 50) achievements.push('✅ Half-way There');
  if (completionRate >= 75) achievements.push('🎯 Three-Quarter Crusader');
  if (completionRate === 100) achievements.push('💯 Perfect Day');

  // Consecutive achievements
  if (consecutiveDays >= 7) achievements.push('📈 Consistent Climber');
  if (consecutiveDays >= 30) achievements.push('🚀 Momentum Master');

  // Remove duplicates
  return Array.from(new Set(achievements));
};
