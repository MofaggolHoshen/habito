/**
 * Calendar Context
 * Manages calendar state (current month/year)
 */

import React, { createContext, useState, ReactNode, useCallback } from 'react';

export interface CalendarState {
  currentMonth: number;
  currentYear: number;
  selectedDate: string;
}

export interface CalendarContextType {
  state: CalendarState;
  nextMonth: () => void;
  previousMonth: () => void;
  goToToday: () => void;
  selectDate: (date: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const today = new Date();
  const [state, setState] = useState<CalendarState>({
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    selectedDate: `${String(today.getDate()).padStart(2, '0')}.${String(
      today.getMonth() + 1
    ).padStart(2, '0')}.${today.getFullYear()}`,
  });

  const nextMonth = useCallback(() => {
    setState((prev) => {
      let month = prev.currentMonth + 1;
      let year = prev.currentYear;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      return { ...prev, currentMonth: month, currentYear: year };
    });
  }, []);

  const previousMonth = useCallback(() => {
    setState((prev) => {
      let month = prev.currentMonth - 1;
      let year = prev.currentYear;
      if (month < 0) {
        month = 11;
        year -= 1;
      }
      return { ...prev, currentMonth: month, currentYear: year };
    });
  }, []);

  const goToToday = useCallback(() => {
    const currentDate = new Date();
    setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      selectedDate: `${String(currentDate.getDate()).padStart(2, '0')}.${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}.${currentDate.getFullYear()}`,
    });
  }, []);

  const selectDate = useCallback((date: string) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  }, []);

  const value: CalendarContextType = {
    state,
    nextMonth,
    previousMonth,
    goToToday,
    selectDate,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = (): CalendarContextType => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};
