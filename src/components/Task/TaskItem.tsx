/**
 * TaskItem Component
 * Displays a single task with checkbox and details
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../styles/theme';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        task.isCompleted ? styles.taskItemCompleted : undefined,
      ]}
      onPress={() => onToggle(task.id)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          task.isCompleted ? styles.checkboxCompleted : undefined,
        ]}
      >
        {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskDescription,
            task.isCompleted ? styles.taskDescriptionCompleted : undefined,
          ]}
        >
          {task.description}
        </Text>
        {task.time && <Text style={styles.taskTime}>{task.time}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
