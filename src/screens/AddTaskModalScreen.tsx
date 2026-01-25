/**
 * Add Task Modal Screen
 * Modal for adding new tasks
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Theme } from '../styles/theme';
import { AddTaskModalScreenProps } from '../navigation/types';
import { useTasks } from '../context/TasksContext';
import { formatDate as formatDateFn, isValidTaskDescription, isValidTime } from '../utils';

const AddTaskModalScreen: React.FC<AddTaskModalScreenProps> = ({ route, navigation }) => {
  const { date } = route.params;
  const { addTask } = useTasks();

  const [taskDescription, setTaskDescription] = useState('');
  const [taskTime, setTaskTime] = useState('08:00');
  const [addedTasks, setAddedTasks] = useState<{ description: string; time: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    if (!isValidTaskDescription(taskDescription)) {
      setError('Task description must be 1-100 characters');
      return;
    }

    if (taskTime && !isValidTime(taskTime)) {
      setError('Invalid time format (use HH:MM)');
      return;
    }

    setAddedTasks([...addedTasks, { description: taskDescription, time: taskTime }]);
    setTaskDescription('');
    setTaskTime('08:00');
    setError(null);
  };

  const handleRemoveTask = (index: number) => {
    setAddedTasks(addedTasks.filter((_, i) => i !== index));
  };

  const handleSaveTasks = async () => {
    if (addedTasks.length === 0) {
      setError('Add at least one task');
      return;
    }

    try {
      // Add all tasks to database
      for (const task of addedTasks) {
        await addTask(task.description, task.time, date);
      }
      navigation.goBack();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save tasks';
      setError(errorMsg);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      />

      {/* Modal Content */}
      <View style={styles.modal}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add New Task</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Date Display */}
        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>Adding task for: {date}</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Manual Task Entry */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manual Task Entry</Text>

            {/* Task Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>What do you need to do?</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task description"
                placeholderTextColor={Theme.colors.textDisabled}
                value={taskDescription}
                onChangeText={setTaskDescription}
                maxLength={100}
              />
              <Text style={styles.charCounter}>
                {taskDescription.length}/100
              </Text>
            </View>

            {/* Time Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>🕐 Time (HH:MM)</Text>
              <TextInput
                style={styles.input}
                placeholder="08:00"
                placeholderTextColor={Theme.colors.textDisabled}
                value={taskTime}
                onChangeText={setTaskTime}
                maxLength={5}
              />
            </View>

            {/* Error Message */}
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Add Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTask}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>
              Add individual tasks one at a time
            </Text>
          </View>

          {/* Tasks Preview */}
          {addedTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Manual tasks to add: ({addedTasks.length})
              </Text>
              {addedTasks.map((task, index) => (
                <View key={index} style={styles.previewTask}>
                  <View style={styles.previewTaskContent}>
                    <Text style={styles.previewTaskDescription}>
                      {task.description}
                    </Text>
                    <Text style={styles.previewTaskTime}>{task.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveTask(index)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.removeButton}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                addedTasks.length === 0 && styles.saveButtonDisabled,
              ]}
              onPress={handleSaveTasks}
              disabled={addedTasks.length === 0}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>
                Add {addedTasks.length} Task{addedTasks.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    ...Theme.shadows.elevation3,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  closeButton: {
    fontSize: 28,
    color: Theme.colors.text,
    fontWeight: Theme.typography.fontWeight.bold,
  },
  modalTitle: {
    fontSize: Theme.typography.fontSize.h3,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
  headerSpacer: {
    width: 28,
  },
  dateDisplay: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 8,
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  dateText: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.text,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  content: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  inputGroup: {
    marginBottom: Theme.spacing.md,
  },
  inputLabel: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    fontWeight: Theme.typography.fontWeight.semibold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.text,
    backgroundColor: Theme.colors.white,
  },
  charCounter: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: Theme.colors.info,
    borderRadius: 8,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  addButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  helperText: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
  errorText: {
    color: Theme.colors.error,
    fontSize: Theme.typography.fontSize.caption,
    marginTop: Theme.spacing.sm,
  },
  previewTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.info,
  },
  previewTaskContent: {
    flex: 1,
  },
  previewTaskDescription: {
    fontSize: Theme.typography.fontSize.bodyRegular,
    color: Theme.colors.text,
    fontWeight: Theme.typography.fontWeight.regular,
  },
  previewTaskTime: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  removeButton: {
    fontSize: 20,
    color: Theme.colors.error,
    fontWeight: Theme.typography.fontWeight.bold,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  cancelButtonText: {
    color: Theme.colors.text,
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
  saveButton: {
    backgroundColor: Theme.colors.info,
  },
  saveButtonDisabled: {
    backgroundColor: Theme.colors.lightGray,
  },
  saveButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.semibold,
  },
});

export default AddTaskModalScreen;
