/**
 * Daily Rating Type Definition
 */

export interface DailyRating {
  id: string;
  date: string; // DD.MM.YYYY format
  rating: number; // 0-10 scale
  createdAt: string;
  updatedAt: string;
}

export type CreateRatingInput = Omit<DailyRating, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRatingInput = Omit<DailyRating, 'id' | 'createdAt'>;
