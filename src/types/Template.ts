/**
 * Template Type Definition
 */

export interface TemplateTask {
  id?: string;
  description: string;
  time: string; // HH:MM format
  icon?: string; // Emoji
}

export interface Template {
  id: string;
  name: string;
  icon: string; // Single emoji
  isDefault: boolean;
  tasks: TemplateTask[];
  createdAt: string;
  updatedAt?: string;
}

export type CreateTemplateInput = Omit<Template, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTemplateInput = Partial<Template>;
