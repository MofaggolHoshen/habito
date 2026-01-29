/**
 * Quick Add from Template Modal
 * Quick add all tasks from a template to selected date
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Theme } from '../styles/theme';
import { Template } from '../types/Template';
import { useTasks } from '../context/TasksContext';
import { useCalendar } from '../context/CalendarContext';

interface QuickAddTemplateModalProps {
  visible: boolean;
  templates: Template[];
  onClose: () => void;
  onSuccess?: () => void;
}

const QuickAddTemplateModal: React.FC<QuickAddTemplateModalProps> = ({
  visible,
  templates,
  onClose,
  onSuccess,
}) => {
  const { addTask } = useTasks();
  const { state } = useCalendar();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleAddTemplateToDate = async () => {
    if (!selectedTemplate) {
      Alert.alert('Error', 'Please select a template');
      return;
    }

    const dateString = `${String(state.selectedDay).padStart(2, '0')}.${String(
      state.currentMonth + 1
    ).padStart(2, '0')}.${state.currentYear}`;

    try {
      // Add all tasks from template
      for (const taskName of selectedTemplate.tasks) {
        await addTask(taskName, '09:00', dateString);
      }

      Alert.alert('Success', `Added ${selectedTemplate.tasks.length} tasks from template`);
      setSelectedTemplate(null);
      onClose();
      onSuccess?.();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to add tasks');
    }
  };

  const renderTemplate = ({ item }: { item: Template }) => (
    <TouchableOpacity
      style={[
        styles.templateCard,
        selectedTemplate?.id === item.id && styles.templateCardSelected,
      ]}
      onPress={() => setSelectedTemplate(item)}
    >
      <View style={styles.templateContent}>
        <Text style={styles.templateIcon}>{item.icon}</Text>
        <View style={styles.templateInfo}>
          <Text style={styles.templateName}>{item.name}</Text>
          <Text style={styles.templateCount}>{String(item.tasks.length)} tasks</Text>
        </View>
      </View>
      {selectedTemplate?.id === item.id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Quick Add from Template</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Select a template to add all its tasks to your selected date
            </Text>
          </View>

          {/* Templates List */}
          <FlatList
            data={templates}
            keyExtractor={(item) => item.id}
            renderItem={renderTemplate}
            contentContainerStyle={styles.listContent}
          />

          {/* Selected Template Preview */}
          {selectedTemplate && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Tasks to be added:</Text>
              <View style={styles.tasksList}>
                {selectedTemplate.tasks.map((task, idx) => (
                  <View key={idx} style={styles.taskItem}>
                    <Text style={styles.taskItemText}>• {task}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                !selectedTemplate && styles.buttonDisabled,
              ]}
              onPress={handleAddTemplateToDate}
              disabled={!selectedTemplate}
            >
              <Text style={styles.submitButtonText}>Add Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
    maxHeight: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: Theme.colors.text,
  },
  instructionsContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.surfaceAlt,
  },
  instructions: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  templateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 2,
    borderColor: Theme.colors.border,
  },
  templateCardSelected: {
    borderColor: Theme.colors.primaryStart,
    backgroundColor: Theme.colors.surfaceAlt,
  },
  templateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  templateIcon: {
    fontSize: 28,
    marginRight: Theme.spacing.md,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  templateCount: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    backgroundColor: Theme.colors.surfaceAlt,
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  previewTitle: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  tasksList: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.md,
  },
  taskItem: {
    marginBottom: Theme.spacing.xs,
  },
  taskItemText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  button: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: Theme.colors.border,
  },
  cancelButtonText: {
    color: Theme.colors.text,
    ...Theme.textStyles.body,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: Theme.colors.primaryStart,
  },
  submitButtonText: {
    color: Theme.colors.white,
    ...Theme.textStyles.body,
    fontWeight: 'bold',
  },
});

export default QuickAddTemplateModal;
