/**
 * Add Task Modal Screen - Complete Redesign
 * Modal for adding new tasks with template selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Theme } from '../styles/theme';
import { AddTaskModalScreenProps } from '../navigation/types';
import { useTasks } from '../context/TasksContext';
import { useTemplates } from '../context/TemplatesContext';
import { isValidTaskDescription, isValidTime } from '../utils';
import { Template } from '../types/Template';

interface TemplateTask {
  description: string;
  time: string;
  icon?: string;
}

const AddTaskModalScreen: React.FC<AddTaskModalScreenProps> = ({ route, navigation }) => {
  const { date } = route.params;
  const { addTask } = useTasks();
  const { templates, customTemplates, addTemplate: saveCustomTemplate, updateTemplate, deleteTemplate } = useTemplates();

  // Manual task entry state
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTime, setTaskTime] = useState('08:00');
  const [manualTasks, setManualTasks] = useState<TemplateTask[]>([]);
  
  // Template selection state
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [selectedTemplateTasks, setSelectedTemplateTasks] = useState<Map<string, Set<number>>>(new Map());
  
  // Create template modal state
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateIcon, setNewTemplateIcon] = useState('⭐');
  const [templateTaskInputs, setTemplateTaskInputs] = useState<TemplateTask[]>([
    { description: '', time: '08:00' }
  ]);
  
  const [error, setError] = useState<string | null>(null);

  const allTemplates = [...templates, ...customTemplates];

  // Manual task handlers
  const handleAddManualTask = () => {
    if (!isValidTaskDescription(taskDescription)) {
      setError('Task description must be 1-100 characters');
      return;
    }

    if (taskTime && !isValidTime(taskTime)) {
      setError('Invalid time format (use HH:MM)');
      return;
    }

    setManualTasks([...manualTasks, { description: taskDescription, time: taskTime, icon: '📝' }]);
    setTaskDescription('');
    setTaskTime('08:00');
    setError(null);
  };

  const handleRemoveManualTask = (index: number) => {
    setManualTasks(manualTasks.filter((_, i) => i !== index));
  };

  // Template selection handlers
  const toggleTemplateSelection = (templateId: string) => {
    const newSelected = new Set(selectedTemplates);
    const template = allTemplates.find(t => t.id === templateId);
    
    if (newSelected.has(templateId)) {
      // Deselect template
      newSelected.delete(templateId);
      const newTaskSelection = new Map(selectedTemplateTasks);
      newTaskSelection.delete(templateId);
      setSelectedTemplateTasks(newTaskSelection);
    } else {
      // Select template and auto-select all its tasks
      newSelected.add(templateId);
      const taskSet = new Set<number>();
      template?.tasks.forEach((_, index) => taskSet.add(index));
      const newTaskSelection = new Map(selectedTemplateTasks);
      newTaskSelection.set(templateId, taskSet);
      setSelectedTemplateTasks(newTaskSelection);
    }
    
    setSelectedTemplates(newSelected);
  };

  const toggleTemplateTask = (templateId: string, taskIndex: number) => {
    const taskSelection = new Map(selectedTemplateTasks);
    const taskSet = taskSelection.get(templateId) || new Set<number>();
    
    if (taskSet.has(taskIndex)) {
      taskSet.delete(taskIndex);
    } else {
      taskSet.add(taskIndex);
    }
    
    if (taskSet.size === 0) {
      taskSelection.delete(templateId);
      const newSelected = new Set(selectedTemplates);
      newSelected.delete(templateId);
      setSelectedTemplates(newSelected);
    } else {
      taskSelection.set(templateId, taskSet);
    }
    
    setSelectedTemplateTasks(taskSelection);
  };

  const selectAllTemplateTasks = () => {
    const newTaskSelection = new Map<string, Set<number>>();
    selectedTemplates.forEach(templateId => {
      const template = allTemplates.find(t => t.id === templateId);
      const taskSet = new Set<number>();
      template?.tasks.forEach((_, index) => taskSet.add(index));
      newTaskSelection.set(templateId, taskSet);
    });
    setSelectedTemplateTasks(newTaskSelection);
  };

  const clearAllSelections = () => {
    setSelectedTemplates(new Set());
    setSelectedTemplateTasks(new Map());
    setManualTasks([]);
  };

  // Create template handlers
  const addTemplateTaskRow = () => {
    setTemplateTaskInputs([...templateTaskInputs, { description: '', time: '08:00' }]);
  };

  const removeTemplateTaskRow = (index: number) => {
    setTemplateTaskInputs(templateTaskInputs.filter((_, i) => i !== index));
  };

  const updateTemplateTaskRow = (index: number, field: 'description' | 'time', value: string) => {
    const updated = [...templateTaskInputs];
    updated[index][field] = value;
    setTemplateTaskInputs(updated);
  };

  const handleSaveCustomTemplate = () => {
    if (!newTemplateName.trim()) {
      setError('Please enter a template name');
      return;
    }

    const validTasks = templateTaskInputs.filter(t => t.description.trim() && t.time.trim());
    if (validTasks.length === 0) {
      setError('Please add at least one task');
      return;
    }

    console.log('Saving template - editingTemplateId:', editingTemplateId);

    if (editingTemplateId) {
      // Update existing template
      console.log('Updating template:', editingTemplateId);
      updateTemplate(editingTemplateId, {
        name: newTemplateName,
        icon: newTemplateIcon || '⭐',
        tasks: validTasks.map(t => ({
          description: t.description,
          time: t.time,
        })),
      });
    } else {
      // Create new template
      console.log('Creating new template');
      const newTemplate: Omit<Template, 'id' | 'createdAt'> = {
        name: newTemplateName,
        icon: newTemplateIcon || '⭐',
        tasks: validTasks.map(t => ({
          description: t.description,
          time: t.time,
        })),
        isDefault: false,
      };

      saveCustomTemplate(newTemplate);
    }
    
    // Reset form
    setShowCreateTemplate(false);
    setEditingTemplateId(null);
    setNewTemplateName('');
    setNewTemplateIcon('⭐');
    setTemplateTaskInputs([{ description: '', time: '08:00' }]);
  };

  const handleEditTemplate = (template: Template) => {
    console.log('Edit template clicked:', template.name, 'isDefault:', template.isDefault, 'id:', template.id);
    
    // Always edit the existing template (both default and custom)
    console.log('Editing existing template, id:', template.id);
    setEditingTemplateId(template.id);
    setNewTemplateName(template.name);
    setNewTemplateIcon(template.icon);
    setTemplateTaskInputs(template.tasks.map(t => ({
      description: t.description,
      time: t.time || '08:00',
    })));
    setShowCreateTemplate(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // Deselect if selected
    const newSelected = new Set(selectedTemplates);
    newSelected.delete(templateId);
    setSelectedTemplates(newSelected);
    
    const newTaskSelection = new Map(selectedTemplateTasks);
    newTaskSelection.delete(templateId);
    setSelectedTemplateTasks(newTaskSelection);
    
    // Delete the template
    deleteTemplate(templateId);
  };

  // Save all tasks
  const handleSaveTasks = async () => {
    const allTasksToAdd: TemplateTask[] = [];

    // Add manual tasks
    allTasksToAdd.push(...manualTasks);

    // Add selected template tasks
    selectedTemplateTasks.forEach((taskIndices, templateId) => {
      const template = allTemplates.find(t => t.id === templateId);
      if (template) {
        taskIndices.forEach(index => {
          const task = template.tasks[index];
          if (task) {
            allTasksToAdd.push({
              description: task.description,
              time: task.time || '08:00',
            });
          }
        });
      }
    });

    if (allTasksToAdd.length === 0) {
      setError('Add at least one task');
      return;
    }

    try {
      // Add all tasks to database
      for (const task of allTasksToAdd) {
        await addTask(task.description, task.time, date);
      }
      navigation.goBack();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save tasks';
      setError(errorMsg);
    }
  };

  const getTotalTaskCount = () => {
    let count = manualTasks.length;
    selectedTemplateTasks.forEach(taskSet => {
      count += taskSet.size;
    });
    return count;
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const totalTasks = getTotalTaskCount();

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
          <Text style={styles.modalTitle}>Add New Task</Text>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Date Badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeLabel}>Adding task for</Text>
          <Text style={styles.dateBadgeValue}>{date}</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Manual Task Entry */}
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
                onPress={handleAddManualTask}
                activeOpacity={0.7}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>Add individual tasks one at a time</Text>
          </View>

          {/* Templates Section */}
          <View style={styles.section}>
            <View style={styles.templateSectionHeader}>
              <Text style={styles.templateSectionLabel}>Or Choose from Templates {'\n'} (Optional)</Text>
              
              <TouchableOpacity
                style={styles.createTemplateButton}
                onPress={() => setShowCreateTemplate(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.createTemplateButtonText}>+ Create Template</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.templatesGrid}>
              {allTemplates.map(template => {
                const isSelected = selectedTemplates.has(template.id);
                const isCustom = !template.isDefault;
                
                return (
                  <View key={template.id} style={styles.templateCardWrapper}>
                    <TouchableOpacity
                      style={[
                        styles.templateCard,
                        isSelected ? styles.templateCardSelected : undefined,
                        isCustom ? styles.templateCardCustom : undefined,
                      ]}
                      onPress={() => toggleTemplateSelection(template.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.templateIcon}>{template.icon}</Text>
                      <Text style={[styles.templateName, isSelected ? styles.templateNameSelected : undefined]}>
                        {template.name}
                      </Text>
                      <Text style={[styles.templateTaskCount, isSelected ? styles.templateTaskCountSelected : undefined]}>
                        {String(template.tasks.length)} tasks
                      </Text>
                      
                      <View style={styles.templateActionsOverlay}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleEditTemplate(template);
                          }}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Text style={styles.editButtonIcon}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.id);
                          }}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Text style={styles.deleteButtonIcon}>✖</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <Text style={styles.helperText}>
              Click to select/deselect templates. You can select multiple templates.
            </Text>
          </View>

          {/* Combined Preview */}
          {(manualTasks.length > 0 || selectedTemplates.size > 0) && (
            <View style={styles.section}>
              <View style={styles.previewHeader}>
                <Text style={styles.sectionLabel}>Tasks to add:</Text>
                <View style={styles.previewActions}>
                  {selectedTemplates.size > 0 && (
                    <TouchableOpacity onPress={selectAllTemplateTasks}>
                      <Text style={styles.actionButton}>Select All</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={clearAllSelections}>
                    <Text style={styles.actionButton}>Clear All</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                      <TouchableOpacity onPress={() => handleRemoveManualTask(index)}>
                        <Text style={styles.removeTaskButton}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {Array.from(selectedTemplates).map(templateId => {
                const template = allTemplates.find(t => t.id === templateId);
                if (!template) return null;

                const selectedTasks = selectedTemplateTasks.get(templateId) || new Set();

                return (
                  <View key={templateId}>
                    <Text style={styles.previewSectionLabel}>{template.name.toUpperCase()}</Text>
                    {template.tasks.map((task, taskIndex) => {
                      const isSelected = selectedTasks.has(taskIndex);
                      
                      return (
                        <TouchableOpacity
                          key={`${templateId}-${taskIndex}`}
                          style={[styles.previewTask, isSelected ? styles.previewTaskSelected : undefined]}
                          onPress={() => toggleTemplateTask(templateId, taskIndex)}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.previewCheckbox, isSelected ? styles.previewCheckboxSelected : undefined]}>
                            {isSelected && <Text style={styles.previewCheckmark}>✓</Text>}
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
          )}

          {/* Error Message */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
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
                totalTasks === 0 ? styles.saveButtonDisabled : undefined,
              ]}
              onPress={handleSaveTasks}
              disabled={totalTasks === 0}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>
                Add {String(totalTasks)} Task{totalTasks !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Create Template Modal */}
      <Modal
        visible={showCreateTemplate}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCreateTemplate(false)}
      >
        <View style={styles.createTemplateOverlay}>
          <View style={styles.createTemplateModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingTemplateId ? 'Edit Template' : 'Create Custom Template'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCreateTemplate(false);
                  setEditingTemplateId(null);
                  setNewTemplateName('');
                  setNewTemplateIcon('⭐');
                  setTemplateTaskInputs([{ description: '', time: '08:00' }]);
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.createTemplateContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Template Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., My Morning Routine"
                  placeholderTextColor="#BDBDBD"
                  value={newTemplateName}
                  onChangeText={setNewTemplateName}
                  maxLength={30}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Template Icon (emoji)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., ☀️"
                  placeholderTextColor="#BDBDBD"
                  value={newTemplateIcon}
                  onChangeText={setNewTemplateIcon}
                  maxLength={2}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tasks</Text>
                {templateTaskInputs.map((task, index) => (
                  <View key={index} style={styles.templateTaskRow}>
                    <TextInput
                      style={[styles.input, styles.templateTaskInput]}
                      placeholder="Task description"
                      placeholderTextColor="#BDBDBD"
                      value={task.description}
                      onChangeText={(text) => updateTemplateTaskRow(index, 'description', text)}
                    />
                    <TextInput
                      style={[styles.input, styles.templateTaskTimeInput]}
                      placeholder="08:00"
                      placeholderTextColor="#BDBDBD"
                      value={task.time}
                      onChangeText={(text) => updateTemplateTaskRow(index, 'time', text)}
                      maxLength={5}
                    />
                    <TouchableOpacity
                      style={styles.removeRowButton}
                      onPress={() => removeTemplateTaskRow(index)}
                    >
                      <Text style={styles.removeRowButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.addTaskRowButton}
                  onPress={addTemplateTaskRow}
                >
                  <Text style={styles.addTaskRowButtonText}>+ Add Task</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setShowCreateTemplate(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSaveCustomTemplate}
                >
                  <Text style={styles.saveButtonText}>
                    {editingTemplateId ? 'Update Template' : 'Save Template'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 32,
    color: '#757575',
    fontWeight: '300',
  },
  dateBadge: {
    backgroundColor: '#667eea',
    paddingVertical: Theme.spacing.md,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  dateBadgeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateBadgeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
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
  templateSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  templateSectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  createTemplateButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  createTemplateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCardWrapper: {
    width: '48%',
    position: 'relative',
    overflow: 'visible',
  },
  templateCard: {
    width: '100%',
    padding: 16,
    paddingTop: 36,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  templateCardSelected: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  templateCardCustom: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4',
  },
  templateIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  templateName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  templateNameSelected: {
    color: '#FFFFFF',
  },
  templateTaskCount: {
    fontSize: 11,
    color: '#757575',
  },
  templateTaskCountSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  templateActionsOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
    elevation: 10,
  },
  editButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5C7CFA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 11,
  },
  editButtonIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 11,
  },
  deleteButtonIcon: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  errorText: {
    color: Theme.colors.error,
    fontSize: 12,
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
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
  saveButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Create Template Modal
  createTemplateOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  createTemplateModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  createTemplateContent: {
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
  templateTaskRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  templateTaskInput: {
    flex: 1,
  },
  templateTaskTimeInput: {
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
});

export default AddTaskModalScreen;
