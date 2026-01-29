import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { DailyRating } from '../types/DailyRating';
import * as db from '../services/database';

export interface RatingsState {
  ratings: DailyRating[];
  loading: boolean;
  error: string | null;
}

export type RatingsAction =
  | { type: 'SET_RATINGS'; payload: DailyRating[] }
  | { type: 'ADD_RATING'; payload: DailyRating }
  | { type: 'UPDATE_RATING'; payload: DailyRating }
  | { type: 'DELETE_RATING'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: RatingsState = {
  ratings: [],
  loading: false,
  error: null,
};

const ratingsReducer = (state: RatingsState, action: RatingsAction): RatingsState => {
  switch (action.type) {
    case 'SET_RATINGS':
      return { ...state, ratings: action.payload, error: null };

    case 'ADD_RATING':
      return {
        ...state,
        ratings: [...state.ratings, action.payload],
        error: null,
      };

    case 'UPDATE_RATING':
      return {
        ...state,
        ratings: state.ratings.map((r) =>
          r.date === action.payload.date ? action.payload : r
        ),
        error: null,
      };

    case 'DELETE_RATING':
      return {
        ...state,
        ratings: state.ratings.filter((r) => r.id !== action.payload),
        error: null,
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export interface RatingsContextType {
  state: RatingsState;
  setRating: (date: string, rating: number) => Promise<void>;
  updateRating: (date: string, rating: number) => Promise<void>;
  deleteRating: (date: string) => Promise<void>;
  getRating: (date: string) => number | null;
  getLastNDaysRatings: (days: number) => number[];
  loadRatingsForMonth: (month: number, year: number) => Promise<void>;
  setRatings: (ratings: DailyRating[]) => void;
}

export const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

export interface RatingsProviderProps {
  children: ReactNode;
}

export const RatingsProvider: React.FC<RatingsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ratingsReducer, initialState);

  const loadRatingsForMonth = useCallback(async (month: number, year: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const ratings = await db.getRatingsForMonth(month, year);
      dispatch({ type: 'SET_RATINGS', payload: ratings });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to load ratings';
      console.error('[Context] Error loading ratings:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const setRating = useCallback(async (date: string, rating: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const dbRating = await db.setRating(date, rating);
      const existing = state.ratings.find((r) => r.date === date);
      if (existing) {
        dispatch({ type: 'UPDATE_RATING', payload: dbRating });
      } else {
        dispatch({ type: 'ADD_RATING', payload: dbRating });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to save rating';
      console.error('[Context] Error setting rating:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.ratings]);

  const updateRating = useCallback(async (date: string, rating: number) => {
    await setRating(date, rating);
  }, [setRating]);

  const deleteRating = useCallback(async (date: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await db.deleteRating(date);
      const rating = state.ratings.find((r) => r.date === date);
      if (rating) {
        dispatch({ type: 'DELETE_RATING', payload: rating.id });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete rating';
      console.error('[Context] Error deleting rating:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.ratings]);

  const getRating = useCallback(
    (date: string): number | null => {
      const rating = state.ratings.find((r) => r.date === date);
      return rating?.rating ?? null;
    },
    [state.ratings]
  );

  const getLastNDaysRatings = useCallback(
    (days: number): number[] => {
      const ratings: number[] = [];
      const today = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = `${String(date.getDate()).padStart(2, '0')}.${String(
          date.getMonth() + 1
        ).padStart(2, '0')}.${date.getFullYear()}`;

        const rating = state.ratings.find((r) => r.date === dateStr);
        ratings.push(rating?.rating || 5);
      }

      return ratings;
    },
    [state.ratings]
  );

  const setRatings = useCallback((ratings: DailyRating[]) => {
    dispatch({ type: 'SET_RATINGS', payload: ratings });
  }, []);

  const value: RatingsContextType = {
    state,
    setRating,
    updateRating,
    deleteRating,
    getRating,
    getLastNDaysRatings,
    loadRatingsForMonth,
    setRatings,
  };

  return (
    <RatingsContext.Provider value={value}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = (): RatingsContextType => {
  const context = React.useContext(RatingsContext);
  if (!context) {
    throw new Error('useRatings must be used within RatingsProvider');
  }
  return context;
};
