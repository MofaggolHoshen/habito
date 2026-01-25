/**
 * Ratings Context
 * Manages daily rating state
 */

import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { DailyRating } from '../types/DailyRating';
import { v4 as uuid } from 'uuid';

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
  setRating: (date: string, rating: number) => void;
  updateRating: (date: string, rating: number) => void;
  deleteRating: (date: string) => void;
  getRating: (date: string) => number | null;
  getLastNDaysRatings: (days: number) => number[];
  setRatings: (ratings: DailyRating[]) => void;
}

export const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

export interface RatingsProviderProps {
  children: ReactNode;
}

export const RatingsProvider: React.FC<RatingsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ratingsReducer, initialState);

  const setRating = useCallback((date: string, rating: number) => {
    const existing = state.ratings.find((r) => r.date === date);
    const newRating: DailyRating = {
      id: existing?.id || uuid().toString().substring(0, 8),
      date,
      rating,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existing) {
      dispatch({ type: 'UPDATE_RATING', payload: newRating });
    } else {
      dispatch({ type: 'ADD_RATING', payload: newRating });
    }
  }, [state.ratings]);

  const updateRating = useCallback((date: string, rating: number) => {
    setRating(date, rating);
  }, [setRating]);

  const deleteRating = useCallback((date: string) => {
    const rating = state.ratings.find((r) => r.date === date);
    if (rating) {
      dispatch({ type: 'DELETE_RATING', payload: rating.id });
    }
  }, [state.ratings]);

  const getRating = useCallback(
    (date: string): number | null => {
      const rating = state.ratings.find((r) => r.date === date);
      return rating?.rating || null;
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
