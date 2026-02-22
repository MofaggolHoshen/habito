/**
 * Tasks Screen
 * Shows tasks for a selected date with rating slider
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../styles/theme';
import { TasksScreenProps } from '../navigation/types';
import { useTasks } from '../context/TasksContext';
import { useRatings } from '../context/RatingsContext';
import { formatFullDate } from '../utils';
import {
  ScreenHeader,
  TaskList,
  DayRatingSlider,
  FloatingActionButton,
} from '../components';

const TasksScreen: React.FC<TasksScreenProps> = ({ route, navigation }) => {
  const { date } = route.params;
  const { getTasksByDate, setSelectedDate, toggleTask } = useTasks();
  const { getRating, setRating } = useRatings();

  const dateString = date || '';
  const [sliderValue, setSliderValue] = useState(getRating(dateString) || 0);

  // Update selected date when screen loads
  useEffect(() => {
    setSelectedDate(dateString);
  }, [dateString, setSelectedDate]);

  const tasks = getTasksByDate(dateString);

  const handleSliderChange = async (value: number) => {
    setSliderValue(value);
    try {
      await setRating(dateString, value);
    } catch (error) {
      console.error('Failed to save rating:', error);
    }
  };

  const handleTaskToggle = async (taskId: string) => {
    try {
      await toggleTask(taskId);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Date: ${formatFullDate(dateString)}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.taskListContainer}>
          <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
          <FloatingActionButton
            onPress={() => navigation.navigate('AddTaskModal', { date: dateString })}
          />
        </View>
      </View>

      <DayRatingSlider value={sliderValue} onChange={handleSliderChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    paddingBottom: 200,
  },
  taskListContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: Theme.colors.text,
    borderRadius: 8,
    backgroundColor: Theme.colors.white,
    position: 'relative',
    overflow: 'hidden',
  },
});

export default TasksScreen;
