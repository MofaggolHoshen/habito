/**
 * Services Index
 * Export all service functions
 */

export {
  initDatabase,
  closeDatabase,
  deleteDatabase,
  getDatabaseStats,
  // Task operations
  createTask,
  getTasksByDate,
  getTasksByMonth,
  updateTask,
  toggleTaskComplete,
  deleteTask,
  deleteTasksByDate,
  // Rating operations
  setRating,
  getRating,
  getRatingsForMonth,
  deleteRating,
  // Settings operations
  setSetting,
  getSetting,
} from './database';
