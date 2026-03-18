/**
 * App Constants
 */

// Default Templates
export const DEFAULT_TEMPLATES = {
  peace: {
    id: 'peace',
    name: 'Peace',
    icon: '🕋 ️',
    isDefault: true,
    tasks: [
      { description: 'Pray 5 times a day', time: '06:00', icon: '🕌' },
      { description: 'Recite Quran', time: '08:00', icon: '📖' },
      { description: 'Hadith/Other Islamic Study', time: '14:30', icon: '🧠' },
      { description: 'Charity/Good Deed', time: '18:00', icon: '🎁' },
      { description: 'I tried not to lie', time: '21:00', icon: '💖' },
      { description: 'Ask for forgiveness 100 times', time: '21:30', icon: '🤲' },
      { description: 'Recite Durood 100 times.', time: '22:00', icon: '📿' },
    ],
  },
  daily: {
    id: 'daily',
    name: 'Daily Routine',
    icon: '☀️',
    isDefault: true,
    tasks: [
      { description: 'Morning Run', time: '06:00', icon: '🏃' },
      { description: 'Drink Water (2L)', time: '08:00', icon: '💧' },
      { description: 'Break - Mid Work', time: '14:30', icon: '☕' },
    ],
  },
  work: {
    id: 'work',
    name: 'Work Day',
    icon: '💼',
    isDefault: true,
    tasks: [
      { description: 'Check Emails', time: '09:00', icon: '📧' },
      { description: 'Team Meeting', time: '10:00', icon: '👥' },
      { description: 'Project Work', time: '11:00', icon: '💼' },
      { description: 'Review Tasks', time: '16:00', icon: '📋' },
    ],
  },
  fitness: {
    id: 'fitness',
    name: 'Fitness',
    icon: '🏃',
    isDefault: true,
    tasks: [
      { description: 'Morning Workout', time: '06:30', icon: '🏋️' },
      { description: 'Protein Shake', time: '07:30', icon: '🥤' },
      { description: 'Evening Stretch', time: '18:00', icon: '🤸' },
    ],
  },
  selfcare: {
    id: 'selfcare',
    name: 'Self Care',
    icon: '🧘',
    isDefault: true,
    tasks: [
      { description: 'Meditation', time: '07:00', icon: '🧘' },
      { description: 'Journal Writing', time: '20:00', icon: '📝' },
      { description: 'Read Book', time: '21:00', icon: '📖' },
    ],
  },
  study: {
    id: 'study',
    name: 'Study Session',
    icon: '📚',
    isDefault: true,
    tasks: [
      { description: 'Review Notes', time: '09:00', icon: '📚' },
      { description: 'Practice Problems', time: '10:30', icon: '✍️' },
      { description: 'Study Break', time: '12:00', icon: '☕' },
      { description: 'Deep Study Session', time: '14:00', icon: '🎯' },
    ],
  },
  evening: {
    id: 'evening',
    name: 'Evening Wind-down',
    icon: '🌙',
    isDefault: true,
    tasks: [
      { description: 'Dinner Preparation', time: '18:00', icon: '🍽️' },
      { description: 'Evening Walk', time: '19:30', icon: '🚶' },
      { description: 'Night Routine', time: '21:30', icon: '🌙' },
    ],
  },
};

// Task Constants
export const TASK_CONFIG = {
  MAX_DESCRIPTION_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 1,
  DEFAULT_TIME: '08:00',
} as const;

// Template Constants
export const TEMPLATE_CONFIG = {
  MAX_NAME_LENGTH: 30,
  MIN_NAME_LENGTH: 1,
  MAX_ICON_LENGTH: 2,
} as const;

// Rating Constants
export const RATING_CONFIG = {
  MIN: 0,
  MAX: 10,
  DEFAULT: 5,
  STEP: 1,
} as const;

// Calendar Constants
export const CALENDAR_CONFIG = {
  DAYS_IN_WEEK: 7,
  WEEKS_TO_DISPLAY: 6,
  MONTHS_TO_PRELOAD: 3,
} as const;

// Chart Constants
export const CHART_CONFIG = {
  RATING_DAYS_TO_SHOW: 10,
  MAX_CHART_HEIGHT: 160,
  PIE_CHART_SIZE: 160,
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Screen Names
export const SCREEN_NAMES = {
  DASHBOARD: 'Dashboard',
  TASKS: 'Tasks',
  ADD_TASK_MODAL: 'AddTaskModal',
  CHARTS: 'Charts',
} as const;

// Date Format
export const DATE_FORMAT = 'DD.MM.YYYY' as const;
export const TIME_FORMAT = 'HH:MM' as const;

// Storage Keys
export const STORAGE_KEYS = {
  TASKS: 'habito_tasks',
  TEMPLATES: 'habito_templates',
  RATINGS: 'habito_ratings',
  SETTINGS: 'habito_settings',
  CUSTOM_TEMPLATES: 'habito_custom_templates',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_TASK: 'Invalid task data',
  INVALID_TEMPLATE: 'Invalid template data',
  INVALID_RATING: 'Rating must be between 0 and 10',
  TASK_NOT_FOUND: 'Task not found',
  TEMPLATE_NOT_FOUND: 'Template not found',
  DATABASE_ERROR: 'Database error occurred',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TASK_ADDED: 'Task added successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TEMPLATE_CREATED: 'Template created successfully',
  TEMPLATE_UPDATED: 'Template updated successfully',
  TEMPLATE_DELETED: 'Template deleted successfully',
  RATING_SAVED: 'Rating saved successfully',
} as const;

// Empty State Messages
export const EMPTY_STATE_MESSAGES = {
  NO_TASKS: 'No tasks for this day',
  NO_TEMPLATES: 'No templates available',
  NO_RATINGS: 'No ratings recorded',
  NO_DATA: 'No data available',
} as const;
