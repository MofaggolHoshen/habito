/**
 * App State Type Definitions
 */

import { Task } from './Task';
import { Template } from './Template';
import { DailyRating } from './DailyRating';

export interface AppState {
  tasks: Task[];
  templates: Template[];
  ratings: DailyRating[];
  currentDate: string; // DD.MM.YYYY format
  selectedDate: string; // DD.MM.YYYY format
  isLoading: boolean;
  error: string | null;
}

export interface CalendarState {
  currentMonth: number; // 0-11
  currentYear: number;
  selectedDate: string; // DD.MM.YYYY
}

export interface ModalState {
  isVisible: boolean;
  type: 'addTask' | 'createTemplate' | 'editTemplate' | null;
}
