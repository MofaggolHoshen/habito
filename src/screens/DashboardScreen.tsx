/**
 * Dashboard Screen
 * Shows calendar view with real task data and analytics charts
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Theme } from '../styles/theme';
import { DashboardScreenProps } from '../navigation/types';
import { useCalendar } from '../context/CalendarContext';
import { useTasks } from '../context/TasksContext';
import { useTemplates } from '../context/TemplatesContext';
import { formatMonthYear, getMonthDays, getDayOfWeek, isToday } from '../utils';
import TaskCompletionChart from '../components/Charts/TaskCompletionChart';
import WeeklyStatsChart from '../components/Charts/WeeklyStatsChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';
import QuickAddTemplateModal from '../components/QuickAddTemplateModal';

const { width } = Dimensions.get('window');
const CALENDAR_CELL_SIZE = (width - 48) / 7;

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { state, nextMonth, previousMonth } = useCalendar();
  const { state: tasksState, loadTasksForMonth, getTasksByDate } = useTasks();
  const { state: templatesState } = useTemplates();
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);

  // Load tasks when month changes
  useEffect(() => {
    loadTasksForMonth(state.currentMonth, state.currentYear);
  }, [state.currentMonth, state.currentYear]);

  const monthDays = getMonthDays(state.currentMonth, state.currentYear);
  const firstDayOfWeek = getDayOfWeek(new Date(state.currentYear, state.currentMonth, 1));

  // Create calendar array with empty cells at start
  const calendarArray = [
    ...Array(firstDayOfWeek).fill(null),
    ...monthDays.map((date) => date.getDate()),
  ];

  const handleDayPress = (day: number) => {
    const dateStr = `${String(day).padStart(2, '0')}.${String(
      state.currentMonth + 1
    ).padStart(2, '0')}.${state.currentYear}`;
    navigation.navigate('Tasks', { date: dateStr });
  };

  const getDayStats = (day: number) => {
    const dateStr = `${String(day).padStart(2, '0')}.${String(
      state.currentMonth + 1
    ).padStart(2, '0')}.${state.currentYear}`;
    const dayTasks = getTasksByDate(dateStr);
    const completed = dayTasks.filter((t) => t.isCompleted).length;
    const total = dayTasks.length;
    return { completed, total };
  };

  return (
    <View style={styles.container}>
      {/* Status Bar Placeholder */}
      <View style={styles.statusBar} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Add Button */}
        <TouchableOpacity
          style={styles.quickAddButton}
          onPress={() => setShowQuickAddModal(true)}
        >
          <Text style={styles.quickAddButtonText}>⚡ Quick Add from Template</Text>
        </TouchableOpacity>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          {/* Month Header */}
          <View style={styles.monthHeader}>
            <TouchableOpacity
              onPress={previousMonth}
              style={styles.navButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.monthYear}>
              {formatMonthYear(state.currentMonth, state.currentYear)}
            </Text>

            <TouchableOpacity
              onPress={nextMonth}
              style={styles.navButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Day Names */}
          <View style={styles.dayNamesRow}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <View
                key={day}
                style={[styles.dayNameCell, { width: CALENDAR_CELL_SIZE }]}
              >
                <Text style={styles.dayName}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {calendarArray.map((day, index) => {
              const dateStr =
                day !== null
                  ? `${String(day).padStart(2, '0')}.${String(
                      state.currentMonth + 1
                    ).padStart(2, '0')}.${state.currentYear}`
                  : null;

              const isTodayDate = day !== null && isToday(dateStr!);
              const { completed, total } = day !== null ? getDayStats(day) : { completed: 0, total: 0 };
              const completionColor = total === 0 ? Theme.colors.lightGray : 
                completed === total ? Theme.colors.success : 
                Theme.colors.gray;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => day && handleDayPress(day)}
                  style={[
                    styles.dayCell,
                    { width: CALENDAR_CELL_SIZE, height: CALENDAR_CELL_SIZE },
                    day === null && styles.emptryCell,
                    isTodayDate && styles.todayCell,
                  ]}
                  activeOpacity={day ? 0.7 : 1}
                  disabled={!day}
                >
                  {day && (
                    <>
                      <Text style={styles.dayNumber}>{day}</Text>
                      <View style={styles.dayStats}>
                        <Text style={[styles.taskStat, { color: completionColor }]}>
                          {completed}/{total}
                        </Text>
                        <Text style={styles.ratingStat}>-</Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

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

      {/* Quick Add Template Modal */}
      <QuickAddTemplateModal
        visible={showQuickAddModal}
        templates={[...templatesState.defaultTemplates, ...templatesState.customTemplates]}
        onClose={() => setShowQuickAddModal(false)}
        onSuccess={() => loadTasksForMonth(state.currentMonth, state.currentYear)}
      />
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
  quickAddButton: {
    backgroundColor: Theme.colors.primaryStart,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  quickAddButtonText: {
    color: Theme.colors.white,
    ...Theme.textStyles.body,
    fontWeight: 'bold',
  },
  calendarSection: {
    marginBottom: Theme.spacing.lg,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  monthYear: {
    fontSize: Theme.typography.fontSize.h3,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 24,
    color: Theme.colors.text,
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.sm,
  },
  dayNameCell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  dayName: {
    fontSize: Theme.typography.fontSize.caption,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.textSecondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  dayCell: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 4,
    padding: 6,
    backgroundColor: Theme.colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptryCell: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  todayCell: {
    borderColor: Theme.colors.today,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  dayNumber: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    fontWeight: Theme.typography.fontWeight.regular,
    color: Theme.colors.text,
    textAlign: 'center',
    width: '100%',
    marginBottom: 6,
  },
  dayStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 2,
  },
  taskStat: {
    fontSize: 9,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  completeStat: {
    color: Theme.colors.complete,
  },
  ratingStat: {
    fontSize: 9,
    color: Theme.colors.rating,
    fontWeight: Theme.typography.fontWeight.semibold,
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
