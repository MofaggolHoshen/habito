/**
 * Chart Helper Utilities
 * Functions for calculating chart data from tasks and ratings
 */

import { Task } from '../types/Task';
import { DailyRating } from '../types/DailyRating';
import { getCurrentDate, parseDate } from './dateHelpers';

/**
 * Get today's task completion data for pie chart
 */
export const getTodayTasksData = (tasks: Task[], date: string = getCurrentDate()) => {
  const dayTasks = tasks.filter((t) => t.date === date);
  const completed = dayTasks.filter((t) => t.isCompleted).length;
  const total = dayTasks.length;
  const pending = total - completed;

  return {
    completed,
    pending,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

/**
 * Get task completion data for the last 7 days
 */
export const getWeeklyTasksData = (tasks: Task[]) => {
  const weekData = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;

    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const completed = dayTasks.filter((t) => t.isCompleted).length;
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

    weekData.push({
      date: dateStr,
      day: dayName,
      completed,
      total: dayTasks.length,
      percentage: dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0,
    });
  }

  return weekData;
};

/**
 * Get monthly task completion trend
 */
export const getMonthlyTasksData = (tasks: Task[], month: number, year: number) => {
  const monthData = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;

    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const completed = dayTasks.filter((t) => t.isCompleted).length;

    monthData.push({
      date: dateStr,
      day,
      completed,
      total: dayTasks.length,
      percentage: dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0,
    });
  }

  return monthData;
};

/**
 * Get rating data for the last 30 days
 */
export const getMonthlyRatingsData = (ratings: DailyRating[]) => {
  const monthData = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;

    const rating = ratings.find((r) => r.date === dateStr);

    monthData.push({
      date: dateStr,
      rating: rating?.rating || null,
      emoji: getRatingEmoji(rating?.rating || 0),
    });
  }

  return monthData;
};

/**
 * Get emoji representation of rating
 */
export const getRatingEmoji = (rating: number): string => {
  if (rating <= 2) return '😢';
  if (rating <= 4) return '😕';
  if (rating <= 6) return '😐';
  if (rating <= 8) return '🙂';
  return '😄';
};

/**
 * Get color for rating
 */
export const getRatingColor = (rating: number | null): string => {
  if (!rating) return '#BDBDBD';
  if (rating <= 2) return '#F44336';
  if (rating <= 4) return '#FF9800';
  if (rating <= 6) return '#FFC107';
  if (rating <= 8) return '#8BC34A';
  return '#4CAF50';
};

/**
 * Get weekly rating average
 */
export const getWeeklyRatingAverage = (ratings: DailyRating[]): number => {
  const today = new Date();
  const weekRatings = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;

    const rating = ratings.find((r) => r.date === dateStr);
    if (rating) {
      weekRatings.push(rating.rating);
    }
  }

  if (weekRatings.length === 0) return 0;
  const sum = weekRatings.reduce((a, b) => a + b, 0);
  return Math.round((sum / weekRatings.length) * 10) / 10;
};

/**
 * Get monthly rating average
 */
export const getMonthlyRatingAverage = (ratings: DailyRating[]): number => {
  const today = new Date();
  const monthRatings = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;

    const rating = ratings.find((r) => r.date === dateStr);
    if (rating) {
      monthRatings.push(rating.rating);
    }
  }

  if (monthRatings.length === 0) return 0;
  const sum = monthRatings.reduce((a, b) => a + b, 0);
  return Math.round((sum / monthRatings.length) * 10) / 10;
};

/**
 * Get task completion streak
 */
export const getCompletionStreak = (tasks: Task[]): number => {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;

    const dayTasks = tasks.filter((t) => t.date === dateStr);
    if (dayTasks.length === 0) break;

    const completed = dayTasks.filter((t) => t.isCompleted).length;
    if (completed === dayTasks.length && dayTasks.length > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Get best day of week (by completion)
 */
export const getBestDayOfWeek = (tasks: Task[]): { day: string; percentage: number } => {
  const dayStats = {
    Sun: { completed: 0, total: 0 },
    Mon: { completed: 0, total: 0 },
    Tue: { completed: 0, total: 0 },
    Wed: { completed: 0, total: 0 },
    Thu: { completed: 0, total: 0 },
    Fri: { completed: 0, total: 0 },
    Sat: { completed: 0, total: 0 },
  };

  tasks.forEach((task) => {
    const date = parseDate(task.date);
    if (date) {
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()] as keyof typeof dayStats;
      dayStats[dayName].total++;
      if (task.isCompleted) {
        dayStats[dayName].completed++;
      }
    }
  });

  let bestDay = 'Mon';
  let bestPercentage = 0;

  Object.entries(dayStats).forEach(([day, stats]) => {
    const percentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
    if (percentage > bestPercentage) {
      bestPercentage = percentage;
      bestDay = day;
    }
  });

  return { day: bestDay, percentage: Math.round(bestPercentage) };
};
