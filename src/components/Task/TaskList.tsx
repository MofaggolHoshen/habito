/**
 * TaskList Component
 * Displays a sectioned list of tasks (pending/completed)
 */

import React from 'react';
import { View, Text, StyleSheet, SectionList, SectionListData } from 'react-native';
import { Theme } from '../../styles/theme';
import { Task } from '../../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle }) => {
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

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} onToggle={onTaskToggle} />
  );

  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: (typeof sections)[0];
  }) => {
    if (data.length === 0) return null;

    return (
      <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id + index}
      renderItem={renderTaskItem}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks for this day</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.textSecondary,
  },
});
