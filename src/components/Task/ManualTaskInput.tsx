/**
 * ManualTaskInput Component
 * Form for adding manual tasks one at a time
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Theme } from '../../styles/theme';
import { isValidTaskDescription, isValidTime } from '../../utils';

interface ManualTaskInputProps {
  onAddTask: (description: string, time: string) => void;
  onError: (error: string | null) => void;
}

export const ManualTaskInput: React.FC<ManualTaskInputProps> = ({
  onAddTask,
  onError,
}) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTime, setTaskTime] = useState('08:00');

  const handleAdd = () => {
    if (!isValidTaskDescription(taskDescription)) {
      onError('Task description must be 1-100 characters');
      return;
    }

    if (taskTime && !isValidTime(taskTime)) {
      onError('Invalid time format (use HH:MM)');
      return;
    }

    onAddTask(taskDescription, taskTime);
    setTaskDescription('');
    setTaskTime('08:00');
    onError(null);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Manual Task Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        placeholderTextColor="#BDBDBD"
        value={taskDescription}
        onChangeText={setTaskDescription}
        maxLength={100}
      />
      <Text style={styles.charCounter}>{String(taskDescription.length)}/100</Text>

      <View style={styles.timeRow}>
        <Text style={styles.timeIcon}>🕐</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="08:00"
          placeholderTextColor="#BDBDBD"
          value={taskTime}
          onChangeText={setTaskTime}
          maxLength={5}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.helperText}>Add individual tasks one at a time</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: Theme.spacing.sm,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212121',
    backgroundColor: Theme.colors.white,
  },
  charCounter: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
    marginTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: Theme.spacing.md,
  },
  timeIcon: {
    fontSize: 24,
  },
  timeInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212121',
  },
  addButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
});
