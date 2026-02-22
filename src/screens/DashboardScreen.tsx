/**
 * Dashboard Screen
 * Shows calendar view with real task data and analytics charts
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Theme } from '../styles/theme';
import { DashboardScreenProps } from '../navigation/types';
import { useCalendar } from '../context/CalendarContext';
import { useTasks } from '../context/TasksContext';
import { useRatings } from '../context/RatingsContext';
import { Calendar } from '../components/Calendar';
import TaskCompletionChart from '../components/Charts/TaskCompletionChart';
import WeeklyStatsChart from '../components/Charts/WeeklyStatsChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { state, nextMonth, previousMonth, selectDate } = useCalendar();
  const { state: tasksState, loadTasksForMonth, getTasksByDate } = useTasks();
  const { getRating, loadRatingsForMonth } = useRatings();

  // Load tasks and ratings when month changes
  useEffect(() => {
    loadTasksForMonth(state.currentMonth, state.currentYear);
    loadRatingsForMonth(state.currentMonth, state.currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentMonth, state.currentYear]);

  const handleDayPress = (day: number) => {
    const dateStr = `${String(day).padStart(2, '0')}.${String(
      state.currentMonth + 1
    ).padStart(2, '0')}.${state.currentYear}`;
    selectDate(dateStr);
    navigation.navigate('Tasks', { date: dateStr });
  };

  return (
    <View style={styles.container}>
      {/* Status Bar Placeholder */}
      <View style={styles.statusBar} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar Section */}
        <Calendar
          currentMonth={state.currentMonth}
          currentYear={state.currentYear}
          selectedDate={state.selectedDate}
          onDayPress={handleDayPress}
          onPreviousMonth={previousMonth}
          onNextMonth={nextMonth}
          getTasksByDate={getTasksByDate}
          getRating={getRating}
        />

        {/* Task Completion Chart */}
        <TaskCompletionChart tasks={tasksState.tasks} />

        {/* Weekly Stats Chart */}
        <WeeklyStatsChart tasks={tasksState.tasks} />

        {/* Monthly Trend Chart */}
        <MonthlyTrendChart 
          tasks={tasksState.tasks}
          month={state.currentMonth}
          year={state.currentYear}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  statusBar: {
    height: 44,
    backgroundColor: Theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  chartSection: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
  },
  pieChartPlaceholder: {
    height: 160,
    borderRadius: 8,
    backgroundColor: Theme.colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  lineChartPlaceholder: {
    height: 160,
    borderRadius: 8,
    backgroundColor: Theme.colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  placeholderText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.fontSize.bodyRegular,
  },
});

export default DashboardScreen;
