/**
 * Database Service
 * Handles all SQLite operations for Habito
 * Manages tasks, ratings, and templates persistence
 */

import SQLite from 'react-native-sqlite-storage';
import { Task } from '../types/Task';
import { DailyRating } from '../types/DailyRating';
import { DEFAULT_TEMPLATES } from '../utils/constants';
import { v4 as uuid } from 'uuid';

// Enable promise support
SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize database - create tables if they don't exist
 */
export async function initDatabase(): Promise<void> {
  try {
    console.log('[DB] Initializing database...');

    // Open or create database
    db = await SQLite.openDatabase({
      name: 'habito.db',
      location: 'default',
    });

    console.log('[DB] Database opened successfully');

    // Create tables
    await createTables();

    console.log('[DB] Database initialization complete');
    
    // Load default templates asynchronously (non-blocking)
    loadDefaultTemplates().catch((error) => {
      console.error('[DB] Failed to load default templates:', error);
    });
  } catch (error) {
    console.error('[DB] Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Create all required tables
 */
async function createTables(): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  // Tasks table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      time TEXT,
      isCompleted INTEGER DEFAULT 0,
      templateId TEXT,
      templateName TEXT,
      createdAt TEXT NOT NULL,
      completedAt TEXT
    );
  `);

  // Create index on date for faster queries
  await db.executeSql(`
    CREATE INDEX IF NOT EXISTS idx_tasks_date ON tasks(date);
  `);

  // Daily ratings table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS daily_ratings (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL UNIQUE,
      rating INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Create index on date
  await db.executeSql(`
    CREATE INDEX IF NOT EXISTS idx_ratings_date ON daily_ratings(date);
  `);

  // Templates table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT,
      isDefault INTEGER DEFAULT 0,
      tasks TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // App settings table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  console.log('[DB] Tables created successfully');
}

/**
 * Load default templates on first run
 */
async function loadDefaultTemplates(): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    // Check if default templates already exist
    const result = await db.executeSql(
      'SELECT COUNT(*) as count FROM templates WHERE isDefault = 1'
    );

    const count = result[0].rows.item(0).count;

    if (count === 0) {
      console.log('[DB] Loading default templates...');

      // Insert default templates - convert object to array of values
      const templates = Object.values(DEFAULT_TEMPLATES);
      for (const template of templates) {
        await db.executeSql(
          `INSERT INTO templates (id, name, icon, isDefault, tasks, createdAt, updatedAt)
           VALUES (?, ?, ?, 1, ?, ?, ?)`,
          [
            template.id,
            template.name,
            template.icon,
            JSON.stringify(template.tasks),
            new Date().toISOString(),
            new Date().toISOString(),
          ]
        );
      }

      console.log('[DB] Default templates loaded successfully');
    }
  } catch (error) {
    console.error('[DB] Failed to load default templates:', error);
    // Non-fatal error, continue
  }
}

// ============================================
// TASK OPERATIONS
// ============================================

/**
 * Create a new task
 */
export async function createTask(task: Task): Promise<Task> {
  if (!db) throw new Error('Database not initialized');

  const id = task.id || uuid();
  const now = new Date().toISOString();

  try {
    await db.executeSql(
      `INSERT INTO tasks (id, date, description, time, isCompleted, templateId, templateName, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        task.date,
        task.description,
        task.time || null,
        task.isCompleted ? 1 : 0,
        task.templateId || null,
        task.templateName || null,
        now,
      ]
    );

    console.log('[DB] Task created:', id);

    return {
      ...task,
      id,
      createdAt: now,
    };
  } catch (error) {
    console.error('[DB] Failed to create task:', error);
    throw error;
  }
}

/**
 * Get all tasks for a specific date
 */
export async function getTasksByDate(date: string): Promise<Task[]> {
  if (!db) throw new Error('Database not initialized');

  try {
    const result = await db.executeSql(
      'SELECT * FROM tasks WHERE date = ? ORDER BY time ASC, createdAt ASC',
      [date]
    );

    const tasks: Task[] = [];
    for (let i = 0; i < result[0].rows.length; i++) {
      const row = result[0].rows.item(i);
      tasks.push({
        ...row,
        isCompleted: row.isCompleted === 1,
      } as Task);
    }

    return tasks;
  } catch (error) {
    console.error('[DB] Failed to get tasks for date:', error);
    throw error;
  }
}

/**
 * Get all tasks for a month
 */
export async function getTasksByMonth(
  month: number,
  year: number
): Promise<Task[]> {
  if (!db) throw new Error('Database not initialized');

  // Format: DD.MM.YYYY - match pattern like "%.01.2026"
  const monthSuffix = `.${String(month + 1).padStart(2, '0')}.${year}`;

  try {
    const result = await db.executeSql(
      'SELECT * FROM tasks WHERE date LIKE ? ORDER BY date ASC, time ASC',
      [`%${monthSuffix}`]
    );

    const tasks: Task[] = [];
    for (let i = 0; i < result[0].rows.length; i++) {
      const row = result[0].rows.item(i);
      tasks.push({
        ...row,
        isCompleted: row.isCompleted === 1,
      } as Task);
    }

    return tasks;
  } catch (error) {
    console.error('[DB] Failed to get tasks for month:', error);
    throw error;
  }
}

/**
 * Update a task
 */
export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task> {
  if (!db) throw new Error('Database not initialized');

  try {
    // Build dynamic UPDATE query
    const fields = Object.keys(updates).filter(
      (key) => key !== 'id' && key !== 'createdAt'
    );
    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = fields.map((field) => updates[field as keyof Task]);

    if (fields.length === 0) {
      // No fields to update, fetch and return current task
      const result = await db.executeSql('SELECT * FROM tasks WHERE id = ?', [
        id,
      ]);
      return result[0].rows.item(0) as Task;
    }

    await db.executeSql(`UPDATE tasks SET ${setClause} WHERE id = ?`, [
      ...values,
      id,
    ]);

    // Fetch and return updated task
    const result = await db.executeSql('SELECT * FROM tasks WHERE id = ?', [
      id,
    ]);

    console.log('[DB] Task updated:', id);
    return result[0].rows.item(0) as Task;
  } catch (error) {
    console.error('[DB] Failed to update task:', error);
    throw error;
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskComplete(id: string): Promise<Task> {
  if (!db) throw new Error('Database not initialized');

  try {
    // Get current task
    const result = await db.executeSql('SELECT isCompleted FROM tasks WHERE id = ?', [
      id,
    ]);

    if (result[0].rows.length === 0) {
      throw new Error('Task not found');
    }

    const isCompleted = result[0].rows.item(0).isCompleted;
    const newIsCompleted = isCompleted ? 0 : 1;
    const completedAt = newIsCompleted ? new Date().toISOString() : null;

    // Update task
    await db.executeSql(
      'UPDATE tasks SET isCompleted = ?, completedAt = ? WHERE id = ?',
      [newIsCompleted, completedAt, id]
    );

    // Return updated task
    const updatedResult = await db.executeSql(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    console.log('[DB] Task toggled:', id);
    return updatedResult[0].rows.item(0) as Task;
  } catch (error) {
    console.error('[DB] Failed to toggle task:', error);
    throw error;
  }
}

/**
 * Delete a task
 */
export async function deleteTask(id: string): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    await db.executeSql('DELETE FROM tasks WHERE id = ?', [id]);
    console.log('[DB] Task deleted:', id);
  } catch (error) {
    console.error('[DB] Failed to delete task:', error);
    throw error;
  }
}

/**
 * Delete all tasks for a date
 */
export async function deleteTasksByDate(date: string): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    await db.executeSql('DELETE FROM tasks WHERE date = ?', [date]);
    console.log('[DB] All tasks deleted for date:', date);
  } catch (error) {
    console.error('[DB] Failed to delete tasks by date:', error);
    throw error;
  }
}

// ============================================
// RATING OPERATIONS
// ============================================

/**
 * Save or update a daily rating
 */
export async function setRating(
  date: string,
  rating: number
): Promise<DailyRating> {
  if (!db) throw new Error('Database not initialized');

  if (rating < 0 || rating > 10) {
    throw new Error('Rating must be between 0 and 10');
  }

  const id = uuid();
  const now = new Date().toISOString();

  try {
    // Try to insert
    try {
      await db.executeSql(
        `INSERT INTO daily_ratings (id, date, rating, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?)`,
        [id, date, rating, now, now]
      );

      console.log('[DB] Rating created:', date);
    } catch (error: any) {
      // If duplicate key error, update instead
      if (error.message.includes('UNIQUE constraint failed')) {
        await db.executeSql(
          'UPDATE daily_ratings SET rating = ?, updatedAt = ? WHERE date = ?',
          [rating, now, date]
        );

        console.log('[DB] Rating updated:', date);
      } else {
        throw error;
      }
    }

    // Return the rating
    const result = await db.executeSql(
      'SELECT * FROM daily_ratings WHERE date = ?',
      [date]
    );

    return result[0].rows.item(0) as DailyRating;
  } catch (error) {
    console.error('[DB] Failed to set rating:', error);
    throw error;
  }
}

/**
 * Get rating for a specific date
 */
export async function getRating(date: string): Promise<DailyRating | null> {
  if (!db) throw new Error('Database not initialized');

  try {
    const result = await db.executeSql(
      'SELECT * FROM daily_ratings WHERE date = ?',
      [date]
    );

    if (result[0].rows.length === 0) {
      return null;
    }

    return result[0].rows.item(0) as DailyRating;
  } catch (error) {
    console.error('[DB] Failed to get rating:', error);
    throw error;
  }
}

/**
 * Get all ratings for a month
 */
export async function getRatingsForMonth(
  month: number,
  year: number
): Promise<DailyRating[]> {
  if (!db) throw new Error('Database not initialized');

  // Format: DD.MM.YYYY - match pattern like "%.01.2026"
  const monthSuffix = `.${String(month + 1).padStart(2, '0')}.${year}`;

  try {
    const result = await db.executeSql(
      'SELECT * FROM daily_ratings WHERE date LIKE ? ORDER BY date ASC',
      [`%${monthSuffix}`]
    );

    const ratings: DailyRating[] = [];
    for (let i = 0; i < result[0].rows.length; i++) {
      ratings.push(result[0].rows.item(i) as DailyRating);
    }

    return ratings;
  } catch (error) {
    console.error('[DB] Failed to get ratings for month:', error);
    throw error;
  }
}

/**
 * Delete a rating
 */
export async function deleteRating(date: string): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    await db.executeSql('DELETE FROM daily_ratings WHERE date = ?', [date]);
    console.log('[DB] Rating deleted:', date);
  } catch (error) {
    console.error('[DB] Failed to delete rating:', error);
    throw error;
  }
}

// ============================================
// SETTINGS OPERATIONS
// ============================================

/**
 * Save an app setting
 */
export async function setSetting(key: string, value: any): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    const valueStr = typeof value === 'string' ? value : JSON.stringify(value);

    await db.executeSql(
      `INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)`,
      [key, valueStr]
    );

    console.log('[DB] Setting saved:', key);
  } catch (error) {
    console.error('[DB] Failed to save setting:', error);
    throw error;
  }
}

/**
 * Get an app setting
 */
export async function getSetting(key: string): Promise<any | null> {
  if (!db) throw new Error('Database not initialized');

  try {
    const result = await db.executeSql(
      'SELECT value FROM app_settings WHERE key = ?',
      [key]
    );

    if (result[0].rows.length === 0) {
      return null;
    }

    const value = result[0].rows.item(0).value;

    // Try to parse as JSON, otherwise return as string
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error('[DB] Failed to get setting:', error);
    throw error;
  }
}

// ============================================
// UTILITY OPERATIONS
// ============================================

/**
 * Close database connection
 */
export async function closeDatabase(): Promise<void> {
  if (db) {
    try {
      await db.close();
      db = null;
      console.log('[DB] Database closed');
    } catch (error) {
      console.error('[DB] Failed to close database:', error);
    }
  }
}

/**
 * Delete entire database (for testing/debugging)
 */
export async function deleteDatabase(): Promise<void> {
  try {
    await closeDatabase();
    await SQLite.deleteDatabase({ name: 'habito.db', location: 'default' });
    console.log('[DB] Database deleted');
  } catch (error) {
    console.error('[DB] Failed to delete database:', error);
    throw error;
  }
}

/**
 * Get database statistics
 */
export async function getDatabaseStats(): Promise<{
  taskCount: number;
  ratingCount: number;
  templateCount: number;
}> {
  if (!db) throw new Error('Database not initialized');

  try {
    const tasks = await db.executeSql('SELECT COUNT(*) as count FROM tasks');
    const ratings = await db.executeSql(
      'SELECT COUNT(*) as count FROM daily_ratings'
    );
    const templates = await db.executeSql(
      'SELECT COUNT(*) as count FROM templates'
    );

    return {
      taskCount: tasks[0].rows.item(0).count,
      ratingCount: ratings[0].rows.item(0).count,
      templateCount: templates[0].rows.item(0).count,
    };
  } catch (error) {
    console.error('[DB] Failed to get database stats:', error);
    throw error;
  }
}
