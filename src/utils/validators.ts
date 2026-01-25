/**
 * Validation Utilities
 */

import { isValidTime as validateTime } from './timeHelpers';

/**
 * Validate task description
 */
export const isValidTaskDescription = (description: string): boolean => {
  if (!description || typeof description !== 'string') {
    return false;
  }

  const trimmed = description.trim();
  return trimmed.length > 0 && trimmed.length <= 100;
};

/**
 * Validate template name
 */
export const isValidTemplateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 30;
};

/**
 * Validate template icon (single emoji)
 */
export const isValidTemplateIcon = (icon: string): boolean => {
  if (!icon || typeof icon !== 'string') {
    return false;
  }

  // Check if it's a single emoji/character
  return icon.length > 0 && icon.length <= 2;
};

/**
 * Validate rating (0-10 scale)
 */
export const isValidRating = (rating: number): boolean => {
  return typeof rating === 'number' && rating >= 0 && rating <= 10 && rating === Math.round(rating);
};

/**
 * Validate date format (DD.MM.YYYY)
 */
export const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[012])\.(\d{4})$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split('.').map(Number);

  // Check if it's a valid date
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

/**
 * Validate email (basic)
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate if a value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

/**
 * Validate task object
 */
export const isValidTask = (task: any): boolean => {
  return (
    task &&
    typeof task === 'object' &&
    isValidTaskDescription(task.description) &&
    (!task.time || validateTime(task.time))
  );
};

/**
 * Validate template object
 */
export const isValidTemplate = (template: any): boolean => {
  return (
    template &&
    typeof template === 'object' &&
    isValidTemplateName(template.name) &&
    isValidTemplateIcon(template.icon) &&
    Array.isArray(template.tasks) &&
    template.tasks.length > 0 &&
    template.tasks.every(
      (task: any) =>
        isValidTaskDescription(task.description) &&
        validateTime(task.time)
    )
  );
};

/**
 * Validate object ID (UUID or string ID)
 */
export const isValidId = (id: string): boolean => {
  if (!id || typeof id !== 'string') {
    return false;
  }

  const trimmed = id.trim();
  return trimmed.length > 0 && trimmed.length <= 50;
};

/**
 * Validate number is in range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return typeof value === 'number' && value >= min && value <= max;
};

/**
 * Get validation error message
 */
export const getValidationError = (field: string, type: string): string => {
  const errors: Record<string, Record<string, string>> = {
    description: {
      required: 'Task description is required',
      maxLength: 'Task description must be 100 characters or less',
      invalid: 'Please enter a valid task description',
    },
    time: {
      invalid: 'Please enter a valid time (HH:MM)',
      required: 'Time is required',
    },
    name: {
      required: 'Name is required',
      maxLength: 'Name must be 30 characters or less',
      invalid: 'Please enter a valid name',
    },
    icon: {
      required: 'Icon is required',
      invalid: 'Please enter a valid emoji',
    },
    rating: {
      invalid: 'Rating must be a number between 0 and 10',
      required: 'Rating is required',
    },
    date: {
      invalid: 'Please enter a valid date',
      required: 'Date is required',
    },
  };

  return errors[field]?.[type] || 'Invalid input';
};
