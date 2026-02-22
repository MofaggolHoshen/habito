/**
 * TemplateGrid Component
 * Grid of template cards with create button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../styles/theme';
import { Template } from '../../types/Template';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  selectedTemplates: Set<string>;
  onToggleTemplate: (templateId: string) => void;
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (templateId: string) => void;
  onCreateTemplate: () => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  selectedTemplates,
  onToggleTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onCreateTemplate,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.templateSectionHeader}>
        <Text style={styles.templateSectionLabel}>
          Or Choose from Templates {'\n'} (Optional)
        </Text>

        <TouchableOpacity
          style={styles.createTemplateButton}
          onPress={onCreateTemplate}
          activeOpacity={0.7}
        >
          <Text style={styles.createTemplateButtonText}>+ Create Template</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.templatesGrid}>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplates.has(template.id)}
            onSelect={onToggleTemplate}
            onEdit={onEditTemplate}
            onDelete={onDeleteTemplate}
          />
        ))}
      </View>

      <Text style={styles.helperText}>
        Click to select/deselect templates. You can select multiple templates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.lg,
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
  helperText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
});
