import React, { createContext, useReducer, ReactNode, useCallback, useEffect } from 'react';
import { Task } from '../types/Task';
import { getCurrentDate } from '../utils/dateHelpers';
import { v4 as uuid } from 'uuid';
import * as db from '../services/database';

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
  addTask: (description: string, time?: string, date?: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  setSelectedDate: (date: string) => void;
  loadTasksForDate: (date: string) => Promise<void>;
  loadTasksForMonth: (month: number, year: number) => Promise<void>;
  getTasksByDate: (date: string) => Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const loadTasksForDate = useCallback(async (date: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const tasks = await db.getTasksByDate(date);
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to load tasks';
      console.error('[Context] Error loading tasks:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Load tasks for selected date when it changes
  useEffect(() => {
    loadTasksForDate(state.selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedDate]);

  const loadTasksForMonth = useCallback(async (month: number, year: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const tasks = await db.getTasksByMonth(month, year);
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to load tasks';
      console.error('[Context] Error loading month tasks:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const addTask = useCallback(
    async (description: string, time?: string, date?: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const newTask: Task = {
          id: uuid(),
          date: date || state.selectedDate,
          description,
          time,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        };
        const createdTask = await db.createTask(newTask);
        dispatch({ type: 'ADD_TASK', payload: createdTask });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to create task';
        console.error('[Context] Error adding task:', errorMsg);
        dispatch({ type: 'SET_ERROR', payload: errorMsg });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.selectedDate]
  );

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedTask = await db.updateTask(id, updates);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to update task';
      console.error('[Context] Error updating task:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await db.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete task';
      console.error('[Context] Error deleting task:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedTask = await db.toggleTaskComplete(id);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to toggle task';
      console.error('[Context] Error toggling task:', errorMsg);
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
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
    loadTasksForDate,
    loadTasksForMonth,
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
