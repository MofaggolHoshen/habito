/**
 * Task Completion Chart Component
 * Shows today's task completion as a pie/doughnut chart
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Theme } from '../../styles/theme';
import { Task } from '../../types/Task';
import { getTodayTasksData } from '../../utils/chartHelpers';
import { getCurrentDate } from '../../utils/dateHelpers';

interface TaskCompletionChartProps {
  tasks: Task[];
  date?: string;
}

const screenWidth = Dimensions.get('window').width;

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ tasks, date }) => {
  const data = getTodayTasksData(tasks, date || getCurrentDate());

  if (data.total === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks for today yet</Text>
        <Text style={styles.emptySubtext}>Add tasks to see your progress</Text>
      </View>
    );
  }

  const chartData = [
    {
      name: 'Completed',
      count: data.completed,
      color: Theme.colors.success,
      legendFontColor: Theme.colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      count: data.pending,
      color: Theme.colors.lightGray,
      legendFontColor: Theme.colors.text,
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Progress</Text>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: Theme.colors.surface,
            backgroundGradientFrom: Theme.colors.surface,
            backgroundGradientTo: Theme.colors.surface,
            color: () => Theme.colors.primary,
            labelColor: () => Theme.colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={styles.statValue}>{data.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Theme.colors.success }]}>
            {data.percentage}%
          </Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.md,
    ...Theme.shadows.medium,
  },
  title: {
    ...Theme.textStyles.heading3,
    marginBottom: Theme.spacing.md,
    color: Theme.colors.text,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: Theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    fontSize: 12,
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.sm,
  },
  emptyContainer: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.md,
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  emptyText: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  emptySubtext: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textDisabled,
  },
});

export default TaskCompletionChart;
