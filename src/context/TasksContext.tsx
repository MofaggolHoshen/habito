/**
 * Tasks Context with Reducer
 * Manages task state and operations
 */

import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { Task } from '@/types/Task';
import { getCurrentDate } from '@/utils/dateHelpers';
import { v4 as uuid } from 'uuid';

export interface TasksState {
  tasks: Task[];
  selectedDate: string;
  loading: boolean;
  error: string | null;
}

export type TasksAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_SELECTED_DATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: TasksState = {
  tasks: [],
  selectedDate: getCurrentDate(),
  loading: false,
  error: null,
};

const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, error: null };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: null,
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        error: null,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                isCompleted: !task.isCompleted,
                completedAt: !task.isCompleted
                  ? new Date().toISOString()
                  : null,
              }
            : task
        ),
        error: null,
      };

    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export interface TasksContextType {
  state: TasksState;
  addTask: (description: string, time?: string, date?: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setSelectedDate: (date: string) => void;
  getTasksByDate: (date: string) => Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const addTask = useCallback(
    (description: string, time?: string, date?: string) => {
      const newTask: Task = {
        id: uuid().toString().substring(0, 8),
        date: date || state.selectedDate,
        description,
        time,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    },
    [state.selectedDate]
  );

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const task = state.tasks.find((t) => t.id === id);
    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, ...updates },
      });
    }
  }, [state.tasks]);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const toggleTask = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const setSelectedDate = useCallback((date: string) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  }, []);

  const getTasksByDate = useCallback(
    (date: string) => {
      return state.tasks.filter((task) => task.date === date);
    },
    [state.tasks]
  );

  const setTasks = useCallback((tasks: Task[]) => {
    dispatch({ type: 'SET_TASKS', payload: tasks });
  }, []);

  const value: TasksContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setSelectedDate,
    getTasksByDate,
    setTasks,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = React.useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};
