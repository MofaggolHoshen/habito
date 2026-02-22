/**
 * TemplateCard Component
 * Individual template card with select/edit/delete actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Template } from '../../types/Template';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const isCustom = !template.isDefault;

  return (
    <View style={styles.templateCardWrapper}>
      <TouchableOpacity
        style={[
          styles.templateCard,
          isSelected && styles.templateCardSelected,
          isCustom && styles.templateCardCustom,
        ]}
        onPress={() => onSelect(template.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.templateIcon}>{template.icon}</Text>
        <Text
          style={[
            styles.templateName,
            isSelected && styles.templateNameSelected,
          ]}
        >
          {template.name}
        </Text>
        <Text
          style={[
            styles.templateTaskCount,
            isSelected && styles.templateTaskCountSelected,
          ]}
        >
          {String(template.tasks.length)} tasks
        </Text>

        <View style={styles.templateActionsOverlay}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={(e) => {
              e.stopPropagation();
              onEdit(template);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.editButtonIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              onDelete(template.id);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.deleteButtonIcon}>✖</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
