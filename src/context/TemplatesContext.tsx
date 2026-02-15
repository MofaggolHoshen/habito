/**
 * Templates Context
 * Manages template state and operations
 */

import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Template } from '../types/Template';
import { v4 as uuid } from 'uuid';
import {
  getAllTemplates as getAllTemplatesFromDB,
  addTemplate as addTemplateInDB,
  updateTemplateInDB,
  deleteTemplateFromDB,
} from '../services/database';

export interface TemplatesContextType {
  templates: Template[];
  customTemplates: Template[];
  addTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => Template | undefined;
  getAllTemplates: () => Template[];
}

export const TemplatesContext = createContext<TemplatesContextType | undefined>(undefined);

export interface TemplatesProviderProps {
  children: ReactNode;
}

export const TemplatesProvider: React.FC<TemplatesProviderProps> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load templates from database on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      console.log('[TemplatesContext] Loading templates from database...');
      const allTemplates = await getAllTemplatesFromDB();
      
      // Separate default and custom templates
      const defaultTemplates = allTemplates.filter((t: Template) => t.isDefault);
      const customTemplatesList = allTemplates.filter((t: Template) => !t.isDefault);
      
      console.log('[TemplatesContext] Loaded templates:', {
        default: defaultTemplates.length,
        custom: customTemplatesList.length
      });
      
      setTemplates(defaultTemplates);
      setCustomTemplates(customTemplatesList);
      setIsLoading(false);
    } catch (error) {
      console.error('[TemplatesContext] Failed to load templates:', error);
      setIsLoading(false);
    }
  };

  const addTemplate = useCallback(
    async (template: Omit<Template, 'id' | 'createdAt'>) => {
      const newTemplate: Template = {
        ...template,
        id: `custom_${uuid().toString().substring(0, 8)}`,
        createdAt: new Date().toISOString(),
        isDefault: false,
      };
      
      try {
        await addTemplateInDB(newTemplate);
        setCustomTemplates((prev) => [...prev, newTemplate]);
        console.log('[TemplatesContext] Template added:', newTemplate.id);
      } catch (error) {
        console.error('[TemplatesContext] Failed to add template:', error);
        throw error;
      }
    },
    []
  );

  const updateTemplate = useCallback(async (id: string, updates: Partial<Template>) => {
    console.log('TemplatesContext: updateTemplate called with id:', id, 'updates:', updates);
    
    try {
      // Update in database
      await updateTemplateInDB(id, updates);
      
      // Update in state
      setTemplates((prev) => {
        const templateExists = prev.some((t) => t.id === id);
        if (templateExists) {
          const updated = prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : t
          );
          console.log('TemplatesContext: Updated default templates:', updated);
          return updated;
        }
        return prev;
      });
      
      setCustomTemplates((prev) => {
        const templateExists = prev.some((t) => t.id === id);
        if (templateExists) {
          const updated = prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : t
          );
          console.log('TemplatesContext: Updated custom templates:', updated);
          return updated;
        }
        return prev;
      });
      
      console.log('[TemplatesContext] Template updated successfully:', id);
    } catch (error) {
      console.error('[TemplatesContext] Failed to update template:', error);
      throw error;
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    console.log('TemplatesContext: deleteTemplate called with id:', id);
    
    try {
      await deleteTemplateFromDB(id);
      
      setCustomTemplates((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        console.log('TemplatesContext: After delete:', filtered);
        return filtered;
      });
      
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      
      console.log('[TemplatesContext] Template deleted successfully:', id);
    } catch (error) {
      console.error('[TemplatesContext] Failed to delete template:', error);
      throw error;
    }
  }, []);

  const getTemplate = useCallback(
    (id: string): Template | undefined => {
      const defaultTemplate = templates.find((t) => t.id === id);
      if (defaultTemplate) return defaultTemplate;
      return customTemplates.find((t) => t.id === id);
    },
    [customTemplates, templates]
  );

  const getAllTemplates = useCallback((): Template[] => {
    return [...templates, ...customTemplates];
  }, [customTemplates, templates]);

  const value: TemplatesContextType = {
    templates: templates,
    customTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    getAllTemplates,
  };

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = (): TemplatesContextType => {
  const context = React.useContext(TemplatesContext);
  if (!context) {
    throw new Error('useTemplates must be used within TemplatesProvider');
  }
  return context;
};
