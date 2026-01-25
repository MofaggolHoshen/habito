/**
 * Task Type Definition
 */

export interface Task {
  id: string;
  date: string; // DD.MM.YYYY format
  description: string;
  time?: string; // HH:MM format or null
  isCompleted: boolean;
  templateId?: string | null;
  templateName?: string | null;
  createdAt: string; // ISO timestamp
  completedAt?: string | null; // ISO timestamp
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'completedAt'>;
export type UpdateTaskInput = Partial<Task>;
