/**
 * Monthly Trend Chart Component
 * Shows task completion trend for the current month
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Theme } from '../styles/theme';
import { Task } from '../types/Task';
import { getMonthlyTasksData } from '../utils/chartHelpers';

interface MonthlyTrendChartProps {
  tasks: Task[];
  month: number;
  year: number;
}

const screenWidth = Dimensions.get('window').width;

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ tasks, month, year }) => {
  const monthData = getMonthlyTasksData(tasks, month, year);

  // Sample every 3-4 days to avoid crowded x-axis
  const sampleInterval = Math.max(1, Math.floor(monthData.length / 8));
  const sampledData = monthData.filter((_, i) => i % sampleInterval === 0);

  const labels = sampledData.map((d) => String(d.day));
  const data = sampledData.map((d) => d.percentage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Trend</Text>
      <Text style={styles.subtitle}>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]} {year}
      </Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: labels.length > 0 ? labels : ['0'],
            datasets: [
              {
                data: data.length > 0 ? data : [0],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="%"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: Theme.colors.surface,
            backgroundGradientFrom: Theme.colors.surface,
            backgroundGradientTo: Theme.colors.surface,
            decimalPlaces: 0,
            color: () => Theme.colors.primaryStart,
            labelColor: () => Theme.colors.text,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: Theme.colors.primaryStart,
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>
            {data.length > 0 ? Math.round(data.reduce((a, b) => a + b, 0) / data.length) : 0}%
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Highest</Text>
          <Text style={styles.statValue}>{data.length > 0 ? Math.max(...data) : 0}%</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Lowest</Text>
          <Text style={styles.statValue}>
            {data.length > 0 && data.some((d) => d > 0) ? Math.min(...data.filter((d) => d > 0)) : 0}%
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
    color: Theme.colors.text,
  },
  subtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
    fontSize: 12,
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
    color: Theme.colors.primaryStart,
  },
});

export default MonthlyTrendChart;
