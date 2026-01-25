/**
 * Templates Screen
 * Browse, create, edit, and delete task templates
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Theme } from '../styles/theme';
import { TemplatesScreenProps } from '../navigation/types';
import { useTemplates } from '../context/TemplatesContext';
import { Template } from '../types/Template';

interface TemplateListItem extends Template {
  isDefault?: boolean;
}

const TemplatesScreen: React.FC<TemplatesScreenProps> = ({ navigation }) => {
  const { state, createCustomTemplate, deleteCustomTemplate, updateTemplate } = useTemplates();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateListItem | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateIcon, setTemplateIcon] = useState('📋');

  const allTemplates: TemplateListItem[] = [
    ...state.defaultTemplates.map((t) => ({ ...t, isDefault: true })),
    ...state.customTemplates.map((t) => ({ ...t, isDefault: false })),
  ];

  const handleCreateTemplate = () => {
    if (!templateName.trim()) {
      Alert.alert('Error', 'Please enter a template name');
      return;
    }

    try {
      createCustomTemplate({
        name: templateName,
        icon: templateIcon,
        tasks: [],
      });
      setTemplateName('');
      setTemplateIcon('📋');
      setShowCreateModal(false);
      Alert.alert('Success', 'Template created successfully');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create template');
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    Alert.alert('Delete Template', 'Are you sure you want to delete this template?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          try {
            deleteCustomTemplate(templateId);
            Alert.alert('Success', 'Template deleted');
          } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Failed to delete');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderTemplate = ({ item }: { item: TemplateListItem }) => (
    <TouchableOpacity
      style={styles.templateCard}
      onPress={() => {
        setSelectedTemplate(item);
        setShowEditModal(true);
      }}
    >
      <View style={styles.templateHeader}>
        <View style={styles.templateInfo}>
          <Text style={styles.templateIcon}>{item.icon}</Text>
          <View style={styles.templateMeta}>
            <Text style={styles.templateName}>{item.name}</Text>
            <Text style={styles.templateCount}>{item.tasks.length} tasks</Text>
          </View>
        </View>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTemplate(item.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {item.tasks.length > 0 && (
        <View style={styles.tasksList}>
          {item.tasks.slice(0, 3).map((task, idx) => (
            <Text key={idx} style={styles.taskItem}>
              • {task}
            </Text>
          ))}
          {item.tasks.length > 3 && (
            <Text style={styles.moreItems}>+{item.tasks.length - 3} more</Text>
          )}
        </View>
      )}

      {item.tasks.length === 0 && (
        <Text style={styles.emptyTasks}>No tasks in this template</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Templates</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.createButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allTemplates}
        keyExtractor={(item) => item.id}
        renderItem={renderTemplate}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      {/* Create Template Modal */}
      <Modal visible={showCreateModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Template</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Template Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter template name"
                value={templateName}
                onChangeText={setTemplateName}
                placeholderTextColor={Theme.colors.textDisabled}
              />

              <Text style={styles.label}>Icon</Text>
              <View style={styles.iconSelector}>
                {['📋', '⚽', '📚', '🏃', '💪', '🧘', '🎯', '✅'].map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      templateIcon === icon && styles.iconOptionSelected,
                    ]}
                    onPress={() => setTemplateIcon(icon)}
                  >
                    <Text style={styles.iconText}>{icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.helperText}>
                You can add tasks after creating the template
              </Text>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleCreateTemplate}
              >
                <Text style={styles.submitButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Template Modal */}
      <Modal visible={showEditModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Template Details</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.templateDetailCard}>
                <Text style={styles.detailIcon}>{selectedTemplate?.icon}</Text>
                <Text style={styles.detailName}>{selectedTemplate?.name}</Text>
              </View>

              <Text style={styles.sectionTitle}>Tasks ({selectedTemplate?.tasks.length || 0})</Text>
              {selectedTemplate?.tasks && selectedTemplate.tasks.length > 0 ? (
                <View style={styles.taskListSection}>
                  {selectedTemplate.tasks.map((task, idx) => (
                    <View key={idx} style={styles.detailTaskItem}>
                      <Text style={styles.detailTaskText}>{task}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noTasksText}>No tasks in this template</Text>
              )}

              {!selectedTemplate?.isDefault && (
                <>
                  <TouchableOpacity
                    style={styles.deleteTemplateButton}
                    onPress={() => {
                      setShowEditModal(false);
                      if (selectedTemplate) {
                        handleDeleteTemplate(selectedTemplate.id);
                      }
                    }}
                  >
                    <Text style={styles.deleteTemplateText}>Delete Template</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.submitButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
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
    ...Theme.textStyles.heading2,
    color: Theme.colors.text,
  },
  createButton: {
    backgroundColor: Theme.colors.primaryStart,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  createButtonText: {
    color: Theme.colors.white,
    ...Theme.textStyles.body,
    fontWeight: 'bold',
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  templateCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  templateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  templateIcon: {
    fontSize: 32,
    marginRight: Theme.spacing.md,
  },
  templateMeta: {
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
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.errorDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: Theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tasksList: {
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  taskItem: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginVertical: 2,
  },
  moreItems: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primaryStart,
    marginTop: Theme.spacing.xs,
    fontWeight: 'bold',
  },
  emptyTasks: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textDisabled,
    fontStyle: 'italic',
    marginTop: Theme.spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
    maxHeight: '90%',
    paddingTop: Theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  modalTitle: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: Theme.colors.text,
  },
  formContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  label: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    color: Theme.colors.text,
    ...Theme.textStyles.body,
  },
  iconSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  iconOption: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  iconOptionSelected: {
    borderColor: Theme.colors.primaryStart,
    backgroundColor: Theme.colors.surfaceAlt,
  },
  iconText: {
    fontSize: 32,
  },
  helperText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.md,
    fontStyle: 'italic',
  },
  modalFooter: {
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
  templateDetailCard: {
    backgroundColor: Theme.colors.surfaceAlt,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  detailIcon: {
    fontSize: 48,
    marginBottom: Theme.spacing.md,
  },
  detailName: {
    ...Theme.textStyles.heading3,
    color: Theme.colors.text,
  },
  sectionTitle: {
    ...Theme.textStyles.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  taskListSection: {
    marginBottom: Theme.spacing.lg,
  },
  detailTaskItem: {
    backgroundColor: Theme.colors.surfaceAlt,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  detailTaskText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  noTasksText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textDisabled,
    fontStyle: 'italic',
  },
  deleteTemplateButton: {
    backgroundColor: Theme.colors.error,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
  },
  deleteTemplateText: {
    color: Theme.colors.white,
    ...Theme.textStyles.body,
    fontWeight: 'bold',
  },
});

export default TemplatesScreen;
