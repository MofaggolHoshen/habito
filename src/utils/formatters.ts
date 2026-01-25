/**
 * Formatter Utilities
 */

import { formatDate, getMonthName } from './dateHelpers';

/**
 * Format task count as "X/Y"
 */
export const formatTaskCount = (completed: number, total: number): string => {
  return `${completed}/${total}`;
};

/**
 * Format rating as string with optional emoji
 */
export const formatRating = (rating: number, withEmoji: boolean = false): string => {
  if (withEmoji) {
    return `${rating} ${getEmojiForRating(rating)}`;
  }
  return `${rating}`;
};

/**
 * Get emoji for rating (0-10 scale)
 */
export const getEmojiForRating = (rating: number): string => {
  const emojiMap: Record<number, string> = {
    0: '😢',
    1: '😔',
    2: '😕',
    3: '🙁',
    4: '😐',
    5: '😊',
    6: '🙂',
    7: '😃',
    8: '😄',
    9: '🤩',
    10: '🎉',
  };

  // Clamp rating between 0 and 10
  const clampedRating = Math.max(0, Math.min(10, Math.round(rating)));
  return emojiMap[clampedRating] || '😊';
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 0): string => {
  const percentage = (value * 100).toFixed(decimals);
  return `${percentage}%`;
};

/**
 * Format completion percentage from tasks
 */
export const formatCompletionPercentage = (completed: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (completed / total) * 100;
  return formatPercentage(percentage, 0);
};

/**
 * Format month and year (e.g., "February 2026")
 */
export const formatMonthYear = (month: number, year: number): string => {
  return `${getMonthName(month)} ${year}`;
};

/**
 * Format full date with day name (e.g., "Monday, 24 January 2026")
 */
export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString.split('.').reverse().join('-'));
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
};

/**
 * Format short date (e.g., "24.01.2026" or "Today", "Tomorrow", "Yesterday")
 */
export const formatShortDate = (dateString: string): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);
  const tomorrowStr = formatDate(tomorrow);

  if (dateString === todayStr) return 'Today';
  if (dateString === yesterdayStr) return 'Yesterday';
  if (dateString === tomorrowStr) return 'Tomorrow';

  return dateString;
};

/**
 * Format task status as text
 */
export const formatTaskStatus = (isCompleted: boolean): string => {
  return isCompleted ? 'Completed' : 'Pending';
};

/**
 * Format duration in milliseconds to readable string
 */
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength - 3)}...`;
};

/**
 * Format template task count
 */
export const formatTemplateTaskCount = (count: number): string => {
  return count === 1 ? '1 task' : `${count} tasks`;
};

/**
 * Format daily stats (e.g., "5 tasks completed")
 */
export const formatDailyStats = (completed: number, total: number): string => {
  if (total === 0) {
    return 'No tasks';
  }
  if (completed === total) {
    return `All ${total} tasks completed`;
  }
  return `${completed} of ${total} tasks completed`;
};

/**
 * Format streak information
 */
export const formatStreak = (days: number): string => {
  if (days === 0) return 'No streak';
  if (days === 1) return '1 day streak';
  return `${days} day streak`;
};

/**
 * Get rating description
 */
export const getRatingDescription = (rating: number): string => {
  if (rating <= 2) return 'Not great';
  if (rating <= 4) return 'Below average';
  if (rating <= 6) return 'Average';
  if (rating <= 8) return 'Good';
  return 'Excellent';
};
