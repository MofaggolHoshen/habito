/**
 * Calendar Component
 * Reusable calendar view with task stats and ratings
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Theme } from '../../styles/theme';
import { formatMonthYear, getMonthDays, getDayOfWeek, isToday } from '../../utils';
import { Task } from '../../types/Task';

const { width } = Dimensions.get('window');
const CALENDAR_CELL_SIZE = (width - 48) / 7;

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  selectedDate: string | null;
  onDayPress: (day: number) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  getTasksByDate: (date: string) => Task[];
  getRating: (date: string) => number | null;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  currentYear,
  selectedDate,
  onDayPress,
  onPreviousMonth,
  onNextMonth,
  getTasksByDate,
  getRating,
}) => {
  const monthDays = getMonthDays(currentMonth, currentYear);
  const firstDayOfWeek = getDayOfWeek(new Date(currentYear, currentMonth, 1));

  // Create calendar array with empty cells at start
  const calendarArray = [
    ...Array(firstDayOfWeek).fill(null),
    ...monthDays.map((date) => date.getDate()),
  ];

  const getDayStats = (day: number) => {
    const dateStr = `${String(day).padStart(2, '0')}.${String(
      currentMonth + 1
    ).padStart(2, '0')}.${currentYear}`;
    const dayTasks = getTasksByDate(dateStr);
    const completed = dayTasks.filter((t) => t.isCompleted).length;
    const total = dayTasks.length;
    return { completed, total };
  };

  return (
    <View style={styles.calendarSection}>
      {/* Month Header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          onPress={onPreviousMonth}
          style={styles.navButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthYear}>
          {formatMonthYear(currentMonth, currentYear)}
        </Text>

        <TouchableOpacity
          onPress={onNextMonth}
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
                  currentMonth + 1
                ).padStart(2, '0')}.${currentYear}`
              : null;

          const isTodayDate = day !== null && isToday(dateStr!);
          const isSelectedDate = day !== null && dateStr === selectedDate;
          const { completed, total } = day !== null ? getDayStats(day) : { completed: 0, total: 0 };
          const completionColor = total === 0 ? Theme.colors.lightGray : 
            completed === total ? Theme.colors.success : 
            Theme.colors.gray;
          const dayRating = day !== null && dateStr ? getRating(dateStr) : null;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => day && onDayPress(day)}
              style={[
                styles.dayCell,
                { width: CALENDAR_CELL_SIZE, height: CALENDAR_CELL_SIZE },
                day === null ? styles.emptryCell : undefined,
                isTodayDate ? styles.todayCell : undefined,
                isSelectedDate ? styles.selectedCell : undefined,
              ]}
              activeOpacity={day ? 0.7 : 1}
              disabled={!day}
            >
              {day && (
                <>
                  <Text style={styles.dayNumber}>{String(day)}</Text>
                  <View style={styles.dayStats}>
                    <Text style={[styles.taskStat, { color: completionColor }]}>
                      {String(completed)}/{String(total)}
                    </Text>
                    <Text style={styles.ratingStat}>
                      {dayRating !== null ? String(dayRating) : '-'}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  selectedCell: {
    borderColor: Theme.colors.success,
    borderWidth: 2,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
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
  ratingStat: {
    fontSize: 9,
    color: Theme.colors.rating,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});

export default Calendar;
