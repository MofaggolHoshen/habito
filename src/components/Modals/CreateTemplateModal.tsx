/**
 * CreateTemplateModal Component
 * Modal for creating or editing custom templates
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../styles/theme';
import { Template } from '../../types/Template';
import { ModalHeader } from '../Common/ModalHeader';

interface TemplateTask {
  description: string;
  time: string;
}

interface CreateTemplateModalProps {
  visible: boolean;
  editingTemplate: Template | null;
  onClose: () => void;
  onSave: (
    name: string,
    icon: string,
    tasks: TemplateTask[],
    editingId: string | null
  ) => void;
  onError: (error: string | null) => void;
}

export const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  visible,
  editingTemplate,
  onClose,
  onSave,
  onError,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [templateIcon, setTemplateIcon] = useState('⭐');
  const [tasks, setTasks] = useState<TemplateTask[]>([
    { description: '', time: '08:00' },
  ]);

  useEffect(() => {
    if (editingTemplate) {
      setTemplateName(editingTemplate.name);
      setTemplateIcon(editingTemplate.icon);
      setTasks(
        editingTemplate.tasks.map((t) => ({
          description: t.description,
          time: t.time || '08:00',
        }))
      );
    } else {
      resetForm();
    }
  }, [editingTemplate]);

  const resetForm = () => {
    setTemplateName('');
    setTemplateIcon('⭐');
    setTasks([{ description: '', time: '08:00' }]);
  };

  const addTaskRow = () => {
    setTasks([...tasks, { description: '', time: '08:00' }]);
  };

  const removeTaskRow = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTaskRow = (
    index: number,
    field: 'description' | 'time',
    value: string
  ) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      onError('Please enter a template name');
      return;
    }

    const validTasks = tasks.filter(
      (t) => t.description.trim() && t.time.trim()
    );
    if (validTasks.length === 0) {
      onError('Please add at least one task');
      return;
    }

    onSave(templateName, templateIcon, validTasks, editingTemplate?.id || null);
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ModalHeader
            title={editingTemplate ? 'Edit Template' : 'Create Custom Template'}
            onClose={handleClose}
          />

          <ScrollView style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Template Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., My Morning Routine"
                placeholderTextColor="#BDBDBD"
                value={templateName}
                onChangeText={setTemplateName}
                maxLength={30}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Template Icon (emoji)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., ☀️"
                placeholderTextColor="#BDBDBD"
                value={templateIcon}
                onChangeText={setTemplateIcon}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tasks</Text>
              {tasks.map((task, index) => (
                <View key={index} style={styles.taskRow}>
                  <TextInput
                    style={[styles.input, styles.taskInput]}
                    placeholder="Task description"
                    placeholderTextColor="#BDBDBD"
                    value={task.description}
                    onChangeText={(text) =>
                      updateTaskRow(index, 'description', text)
                    }
                  />
                  <TextInput
                    style={[styles.input, styles.taskTimeInput]}
                    placeholder="08:00"
                    placeholderTextColor="#BDBDBD"
                    value={task.time}
                    onChangeText={(text) => updateTaskRow(index, 'time', text)}
                    maxLength={5}
                  />
                  <TouchableOpacity
                    style={styles.removeRowButton}
                    onPress={() => removeTaskRow(index)}
                  >
                    <Text style={styles.removeRowButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addTaskRowButton} onPress={addTaskRow}>
                <Text style={styles.addTaskRowButtonText}>+ Add Task</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>
                  {editingTemplate ? 'Update Template' : 'Save Template'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  content: {
    padding: Theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: Theme.spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FFFFFF',
  },
  taskRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  taskInput: {
    flex: 1,
  },
  taskTimeInput: {
    width: 80,
  },
  removeRowButton: {
    backgroundColor: '#F44336',
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeRowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addTaskRowButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addTaskRowButtonText: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#667eea',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
