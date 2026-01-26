/**
 * Weekly Stats Chart Component
 * Shows task completion stats for the last 7 days
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Theme } from '../styles/theme';
import { Task } from '../types/Task';
import { getWeeklyTasksData } from '../utils/chartHelpers';

interface WeeklyStatsChartProps {
  tasks: Task[];
}

const screenWidth = Dimensions.get('window').width;

const WeeklyStatsChart: React.FC<WeeklyStatsChartProps> = ({ tasks }) => {
  const weekData = getWeeklyTasksData(tasks);

  const labels = weekData.map((d) => d.day);
  const data = weekData.map((d) => d.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Statistics</Text>

      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels,
            datasets: [
              {
                data: data.length > 0 ? data : [0],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: Theme.colors.surface,
            backgroundGradientFrom: Theme.colors.surface,
            backgroundGradientTo: Theme.colors.surface,
            decimalPlaces: 0,
            color: () => Theme.colors.success,
            labelColor: () => Theme.colors.text,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.7,
          }}
          fromZero
          showValuesOnTopOfBars
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Total Completed</Text>
          <Text style={styles.statValue}>{data.reduce((a, b) => a + b, 0)}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Daily Average</Text>
          <Text style={styles.statValue}>
            {weekData.length > 0
              ? Math.round((data.reduce((a, b) => a + b, 0) / weekData.length) * 10) / 10
              : 0}
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Best Day</Text>
          <Text style={styles.statValue}>
            {weekData[weekData.findIndex((d) => d.completed === Math.max(...data))]?.day || '-'}
          </Text>
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
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  statValue: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.success,
  },
});

export default WeeklyStatsChart;
