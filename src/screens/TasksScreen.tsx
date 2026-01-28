/**
 * Tasks Screen
 * Shows tasks for a selected date with rating slider
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  SectionListData,
} from 'react-native';
import { Theme } from '../styles/theme';
import { TasksScreenProps } from '../navigation/types';
import { Task } from '../types/Task';
import { useTasks } from '../context/TasksContext';
import { useRatings } from '../context/RatingsContext';
import { formatFullDate, getEmojiForRating } from '../utils';

const TasksScreen: React.FC<TasksScreenProps> = ({ route, navigation }) => {
  const { date } = route.params;
  const { getTasksByDate, setSelectedDate, toggleTask } = useTasks();
  const { getRating, setRating } = useRatings();

  const dateString = date || '';
  const [sliderValue, setSliderValue] = useState(getRating(dateString) || 5);

  // Update selected date when screen loads
  useEffect(() => {
    setSelectedDate(dateString);
  }, [dateString, setSelectedDate]);

  const tasks = getTasksByDate(dateString);
  const pendingTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const sections: SectionListData<Task>[] = [
    {
      title: 'Pending Tasks',
      data: pendingTasks,
      key: 'pending',
    },
    {
      title: 'Completed Tasks',
      data: completedTasks,
      key: 'completed',
    },
  ];

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



  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        item.isCompleted && styles.taskItemCompleted,
      ]}
      onPress={() => handleTaskToggle(item.id)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          item.isCompleted && styles.checkboxCompleted,
        ]}
      >
        {item.isCompleted && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskDescription,
            item.isCompleted && styles.taskDescriptionCompleted,
          ]}
        >
          {item.description}
        </Text>
        {item.time && (
          <Text style={styles.taskTime}>{item.time}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: (typeof sections)[0];
  }) => {
    if (data.length === 0) return null;

    return (
      <Text style={styles.sectionHeader}>
        {title.toUpperCase()}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Date: {formatFullDate(dateString)}</Text>
        </View>
      </View>

      {/* Content with bordered container */}
      <View style={styles.contentWrapper}>
        <View style={styles.taskListContainer}>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderTaskItem}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks for this day</Text>
              </View>
            }
          />

          {/* FAB Button - inside task container */}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('AddTaskModal', { date: dateString })}
            activeOpacity={0.7}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rating Slider Section */}
      <View style={styles.sliderSection}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Your Day Rating</Text>
          <View style={styles.ratingValueContainer}>
            <Text style={styles.ratingValue}>{sliderValue}</Text>
            <Text style={styles.ratingEmoji}>{getEmojiForRating(sliderValue)}</Text>
          </View>

          {/* Slider */}
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${(sliderValue / 10) * 100}%` },
              ]}
            />
          </View>

          {/* Slider Labels */}
          <View style={styles.sliderLabels}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.labelButton}
                onPress={() => handleSliderChange(num)}
              >
                <Text
                  style={[
                    styles.labelText,
                    sliderValue === num && styles.labelTextActive,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 32,
    color: Theme.colors.text,
    fontWeight: '300',
  },
  dateContainer: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Theme.colors.text,
    paddingBottom: Theme.spacing.xs,
  },
  dateText: {
    fontSize: 20,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
  },
  taskListContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: Theme.colors.text,
    borderRadius: 8,
    backgroundColor: Theme.colors.white,
    marginBottom: Theme.spacing.md,
    position: 'relative',
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingBottom: 80,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Theme.spacing.md,
    marginBottom: 1,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  taskItemCompleted: {
    backgroundColor: Theme.colors.white,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
    backgroundColor: Theme.colors.white,
  },
  checkboxCompleted: {
    backgroundColor: Theme.colors.today,
    borderColor: Theme.colors.today,
  },
  checkmark: {
    color: Theme.colors.text,
    fontWeight: Theme.typography.fontWeight.bold,
  },
  taskContent: {
    flex: 1,
  },
  taskDescription: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.text,
    fontWeight: Theme.typography.fontWeight.regular,
  },
  taskDescriptionCompleted: {
    textDecorationLine: 'line-through',
    color: Theme.colors.textSecondary,
  },
  taskTime: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: Theme.spacing.md,
    right: Theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: Theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.elevation4,
  },
  fabText: {
    fontSize: 28,
    color: Theme.colors.white,
    fontWeight: Theme.typography.fontWeight.bold,
  },
  sliderSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Theme.shadows.elevation3,
  },
  ratingContainer: {
    width: '100%',
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  ratingValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  ratingValue: {
    fontSize: 40,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ratingEmoji: {
    fontSize: 32,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: Theme.spacing.sm,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 4,
    background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FF4081 100%)',
    backgroundColor: '#FF4081',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  labelButton: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: Theme.typography.fontWeight.medium,
  },
  labelTextActive: {
    color: Theme.colors.white,
    fontWeight: Theme.typography.fontWeight.bold,
  },
});

export default TasksScreen;
