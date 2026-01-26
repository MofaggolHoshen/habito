/**
 * App Context Provider
 * Combines all providers for the app
 */

import React, { ReactNode } from 'react';
import { TasksProvider } from './TasksContext';
import { CalendarProvider } from './CalendarContext';
import { RatingsProvider } from './RatingsContext';
import { TemplatesProvider } from './TemplatesContext';
import { AnalyticsProvider } from './AnalyticsContext';

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <TasksProvider>
      <CalendarProvider>
        <RatingsProvider>
          <TemplatesProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </TemplatesProvider>
        </RatingsProvider>
      </CalendarProvider>
    </TasksProvider>
  );
};

export default AppProvider;

// Export all contexts and hooks
export { TasksContext, useTasks } from './TasksContext';
export type { TasksContextType, TasksState } from './TasksContext';

export { CalendarContext, useCalendar } from './CalendarContext';
export type { CalendarContextType, CalendarState } from './CalendarContext';

export { RatingsContext, useRatings } from './RatingsContext';
export type { RatingsContextType, RatingsState } from './RatingsContext';

export { TemplatesContext, useTemplates } from './TemplatesContext';
export type { TemplatesContextType } from './TemplatesContext';

export { AnalyticsContext, useAnalytics } from './AnalyticsContext';
export type { AnalyticsContextType } from './AnalyticsContext';
