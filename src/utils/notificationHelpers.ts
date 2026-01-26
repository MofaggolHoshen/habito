/**
 * Notifications Service
 * Handles task reminders and notifications
 */

import { Task } from '../types/Task';

export interface Notification {
  id: string;
  taskId: string;
  taskDescription: string;
  scheduledTime: string; // HH:MM format
  message: string;
  type: 'reminder' | 'encouragement' | 'achievement';
  isScheduled: boolean;
  sentAt?: string;
}

interface ReminderSettings {
  enableReminders: boolean;
  reminderTime: string; // HH:MM
  includeEncouragement: boolean;
  quietHours?: { start: string; end: string };
}

/**
 * Create task reminder notification
 */
export const createTaskReminder = (task: Task): Notification => {
  return {
    id: `notif_${task.id}_${Date.now()}`,
    taskId: task.id,
    taskDescription: task.description,
    scheduledTime: task.time || '09:00',
    message: `Don't forget: ${task.description}`,
    type: 'reminder',
    isScheduled: !!task.time,
  };
};

/**
 * Create encouragement notification
 */
export const createEncouragementNotification = (): Notification => {
  const encouragements = [
    "You're doing great! Keep going! 💪",
    'One step at a time. You got this! 🎯',
    'Progress over perfection. Keep moving! 📈',
    'Every task completed is a win! 🎉',
    'You are building better habits! ✨',
  ];

  const random = encouragements[Math.floor(Math.random() * encouragements.length)];

  return {
    id: `notif_enc_${Date.now()}`,
    taskId: '',
    taskDescription: '',
    scheduledTime: '12:00',
    message: random,
    type: 'encouragement',
    isScheduled: false,
  };
};

/**
 * Create achievement notification
 */
export const createAchievementNotification = (achievement: string): Notification => {
  return {
    id: `notif_ach_${Date.now()}`,
    taskId: '',
    taskDescription: '',
    scheduledTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    message: `Achievement Unlocked: ${achievement}`,
    type: 'achievement',
    isScheduled: false,
  };
};

/**
 * Check if reminder is within quiet hours
 */
export const isInQuietHours = (
  reminderTime: string,
  quietHours?: { start: string; end: string }
): boolean => {
  if (!quietHours) return false;

  const [remHour, remMin] = reminderTime.split(':').map(Number);
  const [quietStart, quietEnd] = [
    quietHours.start.split(':').map(Number),
    quietHours.end.split(':').map(Number),
  ];

  const remDate = new Date();
  remDate.setHours(remHour, remMin);

  const startDate = new Date();
  startDate.setHours(quietStart[0], quietStart[1]);

  const endDate = new Date();
  endDate.setHours(quietEnd[0], quietEnd[1]);

  return remDate >= startDate && remDate <= endDate;
};

/**
 * Get pending notifications for a task
 */
export const getPendingNotifications = (
  tasks: Task[],
  reminderSettings: ReminderSettings
): Notification[] => {
  if (!reminderSettings.enableReminders) return [];

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const notifications: Notification[] = [];

  for (const task of tasks) {
    if (task.isCompleted || !task.time) continue;

    const reminder = createTaskReminder(task);

    // Check if reminder time has passed
    if (
      task.time <= currentTime &&
      !isInQuietHours(task.time, reminderSettings.quietHours)
    ) {
      notifications.push(reminder);
    }
  }

  // Add encouragement notification
  if (reminderSettings.includeEncouragement) {
    const hour = now.getHours();
    if (hour === 12 || hour === 18) {
      // Noon or 6 PM
      notifications.push(createEncouragementNotification());
    }
  }

  return notifications;
};

/**
 * Schedule notifications for day
 */
export const scheduleNotificationsForDay = (
  tasks: Task[],
  reminderSettings: ReminderSettings
): Map<string, Notification> => {
  const scheduledNotifications = new Map<string, Notification>();

  if (!reminderSettings.enableReminders) return scheduledNotifications;

  for (const task of tasks) {
    if (task.isCompleted || !task.time) continue;

    const reminder = createTaskReminder(task);
    if (!isInQuietHours(task.time, reminderSettings.quietHours)) {
      scheduledNotifications.set(reminder.id, reminder);
    }
  }

  return scheduledNotifications;
};

/**
 * Format notification for display
 */
export const formatNotification = (notification: Notification): string => {
  switch (notification.type) {
    case 'reminder':
      return `⏰ ${notification.message}`;
    case 'encouragement':
      return `💫 ${notification.message}`;
    case 'achievement':
      return `🏆 ${notification.message}`;
    default:
      return notification.message;
  }
};

/**
 * Validate reminder time format
 */
export const isValidReminderTime = (time: string): boolean => {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};

/**
 * Convert time to minutes since midnight
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Get suggested reminder time
 */
export const getSuggestedReminderTime = (): string => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
    2,
    '0'
  )}`;
};
