/**
 * Templates Context
 * Manages template state and operations
 */

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Template } from '@/types/Template';
import { DEFAULT_TEMPLATES } from '@/utils/constants';
import { v4 as uuid } from 'uuid';

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
  const defaultTemplates: Template[] = Object.values(DEFAULT_TEMPLATES).map((t) => ({
    ...t,
    createdAt: new Date().toISOString(),
  }));

  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);

  const addTemplate = useCallback(
    (template: Omit<Template, 'id' | 'createdAt'>) => {
      const newTemplate: Template = {
        ...template,
        id: `custom_${uuid().toString().substring(0, 8)}`,
        createdAt: new Date().toISOString(),
      };
      setCustomTemplates((prev) => [...prev, newTemplate]);
    },
    []
  );

  const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
    setCustomTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTemplate = useCallback(
    (id: string): Template | undefined => {
      const custom = customTemplates.find((t) => t.id === id);
      if (custom) return custom;
      return defaultTemplates.find((t) => t.id === id);
    },
    [customTemplates]
  );

  const getAllTemplates = useCallback((): Template[] => {
    return [...defaultTemplates, ...customTemplates];
  }, [customTemplates]);

  const value: TemplatesContextType = {
    templates: defaultTemplates,
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
