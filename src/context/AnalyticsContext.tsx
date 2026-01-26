/**
 * Analytics Context
 * Manages analytics, insights, and progress tracking
 */

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import * as analyticsHelpers from '../utils/analyticsHelpers';
import * as streakHelpers from '../utils/streakHelpers';
import { Task } from '../types/Task';
import { DailyRating } from '../types/DailyRating';

interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
  lastCompletedDate: string | null;
}

interface AnalyticsState {
  productivityScore: number;
  completionRate: number;
  averageRating: number;
  streaks: Map<string, StreakInfo>;
  consecutiveDays: number;
  achievements: string[];
  insights: string[];
  loading: boolean;
  error: string | null;
}

export interface AnalyticsContextType {
  state: AnalyticsState;
  calculateAnalytics: (
    tasks: Task[],
    ratings: DailyRating[],
    startDate: string,
    endDate: string
  ) => Promise<void>;
  getProductivityTrend: (days: number) => number[];
  getCompletionTrend: (days: number) => number[];
  getMoodTrend: (days: number) => number[];
}

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export interface AnalyticsProviderProps {
  children: ReactNode;
}

const initialState: AnalyticsState = {
  productivityScore: 0,
  completionRate: 0,
  averageRating: 0,
  streaks: new Map(),
  consecutiveDays: 0,
  achievements: [],
  insights: [],
  loading: false,
  error: null,
};

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [state, setState] = useState<AnalyticsState>(initialState);

  const calculateAnalytics = useCallback(
    async (tasks: Task[], ratings: DailyRating[], startDate: string, endDate: string) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        // Build tasks by date map
        const tasksByDate = new Map<string, Task[]>();
        tasks.forEach((task) => {
          if (!tasksByDate.has(task.date)) {
            tasksByDate.set(task.date, []);
          }
          tasksByDate.get(task.date)!.push(task);
        });

        // Calculate completion rate
        const completionRate = streakHelpers.getCompletionRate(
          tasksByDate,
          startDate,
          endDate
        );

        // Calculate average rating
        const averageRating =
          ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

        // Calculate streaks for each task
        const streaks = new Map<string, StreakInfo>();
        const uniqueTasks = new Map<string, Task>();
        tasks.forEach((task) => {
          if (!uniqueTasks.has(task.id)) {
            uniqueTasks.set(task.id, task);
            const streak = streakHelpers.calculateStreak(tasksByDate, task.id);
            streaks.set(task.id, streak);
          }
        });

        // Calculate consecutive days
        const consecutiveDays = streakHelpers.getConsecutiveActiveDays(tasksByDate, endDate);

        // Get achievements
        const achievements = streakHelpers.getAchievements(
          streaks,
          completionRate,
          consecutiveDays
        );

        // Calculate productivity score
        const productivityScore = analyticsHelpers.calculateProductivityScore(
          completionRate,
          Math.round(averageRating),
          consecutiveDays
        );

        setState({
          productivityScore,
          completionRate,
          averageRating: Math.round(averageRating * 10) / 10,
          streaks,
          consecutiveDays,
          achievements,
          insights: [], // Can be enhanced with more complex logic
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to calculate analytics';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMsg,
        }));
      }
    },
    []
  );

  const getProductivityTrend = useCallback((days: number): number[] => {
    // Mock data - would be calculated from historical data
    const trend: number[] = [];
    for (let i = 0; i < days; i++) {
      trend.push(Math.floor(Math.random() * 100));
    }
    return trend;
  }, []);

  const getCompletionTrend = useCallback((days: number): number[] => {
    const trend: number[] = [];
    for (let i = 0; i < days; i++) {
      trend.push(Math.floor(Math.random() * 100));
    }
    return trend;
  }, []);

  const getMoodTrend = useCallback((days: number): number[] => {
    const trend: number[] = [];
    for (let i = 0; i < days; i++) {
      trend.push(Math.floor(Math.random() * 10));
    }
    return trend;
  }, []);

  const value: AnalyticsContextType = {
    state,
    calculateAnalytics,
    getProductivityTrend,
    getCompletionTrend,
    getMoodTrend,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = React.useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};
