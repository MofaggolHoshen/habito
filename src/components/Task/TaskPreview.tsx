/**
 * TaskPreview Component
 * Shows preview of tasks to be added with selection controls
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../styles/theme';
import { Template } from '../../types/Template';

interface TemplateTask {
  description: string;
  time: string;
  icon?: string;
}

interface TaskPreviewProps {
  manualTasks: TemplateTask[];
  templates: Template[];
  selectedTemplates: Set<string>;
  selectedTemplateTasks: Map<string, Set<number>>;
  onRemoveManualTask: (index: number) => void;
  onToggleTemplateTask: (templateId: string, taskIndex: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const TaskPreview: React.FC<TaskPreviewProps> = ({
  manualTasks,
  templates,
  selectedTemplates,
  selectedTemplateTasks,
  onRemoveManualTask,
  onToggleTemplateTask,
  onSelectAll,
  onClearAll,
}) => {
  if (manualTasks.length === 0 && selectedTemplates.size === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.previewHeader}>
        <Text style={styles.sectionLabel}>Tasks to add:</Text>
        <View style={styles.previewActions}>
          {selectedTemplates.size > 0 && (
            <TouchableOpacity onPress={onSelectAll}>
              <Text style={styles.actionButton}>Select All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.actionButton}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Tasks */}
      {manualTasks.length > 0 && (
        <View>
          <Text style={styles.previewSectionLabel}>MANUAL TASKS</Text>
          {manualTasks.map((task, index) => (
            <View key={`manual-${index}`} style={styles.previewTask}>
              <View style={styles.previewCheckbox}>
                <Text style={styles.previewCheckmark}>✓</Text>
              </View>
              <Text style={styles.previewIcon}>{task.icon}</Text>
              <Text style={styles.previewTaskName}>{task.description}</Text>
              <Text style={styles.previewTaskTime}>{task.time}</Text>
              <TouchableOpacity onPress={() => onRemoveManualTask(index)}>
                <Text style={styles.removeTaskButton}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Template Tasks */}
      {Array.from(selectedTemplates).map((templateId) => {
        const template = templates.find((t) => t.id === templateId);
        if (!template) return null;

        const selectedTasks = selectedTemplateTasks.get(templateId) || new Set();

        return (
          <View key={templateId}>
            <Text style={styles.previewSectionLabel}>
              {template.name.toUpperCase()}
            </Text>
            {template.tasks.map((task, taskIndex) => {
              const isSelected = selectedTasks.has(taskIndex);

              return (
                <TouchableOpacity
                  key={`${templateId}-${taskIndex}`}
                  style={[
                    styles.previewTask,
                    isSelected && styles.previewTaskSelected,
                  ]}
                  onPress={() => onToggleTemplateTask(templateId, taskIndex)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.previewCheckbox,
                      isSelected && styles.previewCheckboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Text style={styles.previewCheckmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.previewIcon}>📌</Text>
                  <Text style={styles.previewTaskName}>{task.description}</Text>
                  <Text style={styles.previewTaskTime}>{task.time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
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
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  previewSectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  previewTask: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  previewTaskSelected: {
    backgroundColor: '#E8EBFF',
  },
  previewCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCheckboxSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  previewCheckmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  previewIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  previewTaskName: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  previewTaskTime: {
    fontSize: 13,
    color: '#757575',
  },
  removeTaskButton: {
    fontSize: 18,
    color: '#F44336',
    fontWeight: 'bold',
    marginLeft: 8,
    paddingHorizontal: 4,
  },
});
