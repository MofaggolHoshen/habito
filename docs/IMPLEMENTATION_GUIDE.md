# 🏗️ Habito - Comprehensive Implementation Guide

> **Complete technical documentation for developers**  
> Last Updated: February 22, 2026  
> Version: 1.0.0

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [State Management](#state-management)
6. [Navigation System](#navigation-system)
7. [Design System](#design-system)
8. [Core Features Implementation](#core-features-implementation)
9. [API Reference](#api-reference)
10. [Testing Strategy](#testing-strategy)
11. [Performance Optimization](#performance-optimization)
12. [Deployment Guide](#deployment-guide)
13. [Troubleshooting](#troubleshooting)

---

## 🏛️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx (Root)                       │
│                    - Database Initialization                 │
│                    - Error Boundary                          │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AppProvider (Context)                     │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐  │
│  │ TasksContext │CalendarContext│RatingsContext│Analytics │  │
│  │TemplatesCtx  │              │              │Context   │  │
│  └──────────────┴──────────────┴──────────────┴──────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  NavigationContainer                         │
│                    RootNavigator (Stack)                     │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
        ┌────────────────────┴────────────────────┐
        │                                          │
        ▼                                          ▼
┌──────────────┐                          ┌──────────────┐
│   Screens    │                          │  Components  │
│              │                          │              │
│ - Dashboard  │◄─────────────────────────┤ - Charts     │
│ - Tasks      │                          │ - Modals     │
│ - Insights   │                          │ - Trackers   │
│ - Templates  │                          │              │
└──────┬───────┘                          └──────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│         Database Layer (SQLite)          │
│                                          │
│  ┌──────────┬──────────┬──────────┐     │
│  │  tasks   │ ratings  │templates │     │
│  └──────────┴──────────┴──────────┘     │
└──────────────────────────────────────────┘
```

### Data Flow Pattern

```
User Action → Screen Component → Context Hook → 
Reducer Dispatch → Database Operation → State Update → 
Component Re-render → UI Update
```

### Key Design Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data
2. **Single Responsibility**: Each module handles one specific aspect
3. **Type Safety**: 100% TypeScript coverage with strict mode
4. **Immutability**: All state updates create new objects
5. **Centralized State**: Context API for global state management
6. **Pure Functions**: Utility functions with no side effects

---

## 🔧 Technology Stack

### Core Technologies

```json
{
  "framework": "React Native 0.83.1",
  "language": "TypeScript 5.8.3",
  "runtime": "React 19.2.0",
  "state": "Context API + useReducer",
  "navigation": "React Navigation 7",
  "database": "SQLite (react-native-sqlite-storage 6.0.1)",
  "charts": "react-native-chart-kit 6.12.0"
}
```

### Dependencies Breakdown

#### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react-native` | 0.83.1 | Core framework |
| `react` | 19.2.0 | UI library |
| `@react-navigation/native` | 7.1.28 | Navigation framework |
| `@react-navigation/native-stack` | 7.10.1 | Stack navigator |
| `react-native-sqlite-storage` | 6.0.1 | Database persistence |
| `@react-native-async-storage/async-storage` | 2.2.0 | Key-value storage |
| `react-native-chart-kit` | 6.12.0 | Data visualization |
| `react-native-svg` | 15.15.1 | SVG rendering |
| `uuid` | 13.0.0 | Unique ID generation |
| `react-native-get-random-values` | 2.0.0 | UUID polyfill |

#### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.8.3 | Type checking |
| `@types/react` | 19.2.0 | React type definitions |
| `jest` | 29.6.3 | Testing framework |
| `@babel/core` | 7.25.2 | JavaScript compiler |
| `eslint` | 8.19.0 | Code linting |
| `prettier` | 2.8.8 | Code formatting |

### Build Tools

- **Metro Bundler**: JavaScript bundler for React Native
- **Babel**: JavaScript transpiler with React Native preset
- **TypeScript Compiler**: Type checking and compilation
- **ESLint**: Code quality and style enforcement
- **Jest**: Unit and integration testing

---

## 📁 Project Structure

### Complete Directory Tree

```
habito/
├── android/                    # Android native code
│   ├── app/
│   ├── gradle/
│   └── build.gradle
│
├── ios/                        # iOS native code (macOS only)
│   ├── habito/
│   ├── Pods/
│   └── habito.xcworkspace
│
├── src/                        # Source code
│   ├── components/            # Reusable UI components
│   │   ├── Charts/
│   │   │   ├── WeeklyStatsChart.tsx
│   │   │   ├── TaskCompletionChart.tsx
│   │   │   └── MonthlyTrendChart.tsx
│   │   ├── MoodTracker.tsx
│   │   └── QuickAddTemplateModal.tsx
│   │
│   ├── context/               # State management
│   │   ├── index.tsx          # AppProvider wrapper
│   │   ├── TasksContext.tsx   # Task state & operations
│   │   ├── CalendarContext.tsx # Calendar navigation
│   │   ├── RatingsContext.tsx # Daily ratings
│   │   ├── TemplatesContext.tsx # Template management
│   │   └── AnalyticsContext.tsx # Analytics & insights
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── (future hooks)
│   │
│   ├── navigation/            # Navigation configuration
│   │   ├── index.ts
│   │   ├── RootNavigator.tsx  # Main stack navigator
│   │   └── types.ts           # Navigation type definitions
│   │
│   ├── screens/               # Screen components
│   │   ├── index.ts
│   │   ├── DashboardScreen.tsx      # Calendar view
│   │   ├── TasksScreen.tsx          # Task list & management
│   │   ├── AddTaskModalScreen.tsx   # Task creation modal
│   │   ├── InsightsScreen.tsx       # Analytics dashboard
│   │   ├── TemplatesScreen.tsx      # Template management
│   │   └── MoodHistoryScreen.tsx    # Mood history view
│   │
│   ├── services/              # External services
│   │   ├── index.ts
│   │   └── database.ts        # SQLite operations
│   │
│   ├── styles/                # Design system
│   │   ├── colors.ts          # Color palette
│   │   ├── typography.ts      # Text styles
│   │   ├── spacing.ts         # Spacing system
│   │   ├── shadows.ts         # Elevation/shadows
│   │   └── theme.ts           # Unified theme
│   │
│   ├── types/                 # TypeScript definitions
│   │   ├── Task.ts            # Task type
│   │   ├── Template.ts        # Template type
│   │   ├── DailyRating.ts     # Rating type
│   │   └── AppState.ts        # App state types
│   │
│   └── utils/                 # Utility functions
│       ├── index.ts           # Export barrel
│       ├── constants.ts       # App constants
│       ├── dateHelpers.ts     # Date utilities (16 functions)
│       ├── timeHelpers.ts     # Time utilities (15 functions)
│       ├── formatters.ts      # Data formatters (14 functions)
│       ├── validators.ts      # Input validators (13 functions)
│       ├── chartHelpers.ts    # Chart data preparation
│       ├── analyticsHelpers.ts # Analytics calculations
│       ├── streakHelpers.ts   # Streak tracking
│       └── notificationHelpers.ts # Notification logic
│
├── docs/                       # Documentation
│   ├── README.md
│   ├── IMPLEMENTATION_GUIDE.md (this file)
│   ├── IMPLEMENTATION_PLAN.md
│   ├── PHASE_1_FINAL_SUMMARY.md
│   ├── DIAGNOSTIC_REPORT.md
│   └── DEVELOPER_REFERENCE.md
│
├── __tests__/                  # Test files
│   └── (test files)
│
├── App.tsx                     # Root component
├── index.js                    # Entry point
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── babel.config.js             # Babel config
├── metro.config.js             # Metro config
├── jest.config.js              # Jest config
├── jest.setup.js               # Jest setup
├── .eslintrc.js                # ESLint config
├── .prettierrc.js              # Prettier config
└── .gitignore                  # Git ignore rules
```

### Module Organization

Each module follows this pattern:

```typescript
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@/styles/theme';

// 2. Type Definitions
interface Props {
  // ...
}

// 3. Component/Function Implementation
const Component: React.FC<Props> = (props) => {
  // ...
};

// 4. Styles (if React Native component)
const styles = StyleSheet.create({
  // ...
});

// 5. Export
export default Component;
```

---

## 💾 Database Schema

### SQLite Database: `habito.db`

#### Table: `tasks`

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  time TEXT,
  completed INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX idx_tasks_date ON tasks(date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

**Columns:**
- `id` (TEXT): UUID primary key
- `date` (TEXT): Date in DD.MM.YYYY format
- `description` (TEXT): Task description (1-100 chars)
- `time` (TEXT): Optional time in HH:MM format
- `completed` (INTEGER): 0 = pending, 1 = completed
- `createdAt` (TEXT): ISO timestamp
- `updatedAt` (TEXT): ISO timestamp

#### Table: `ratings`

```sql
CREATE TABLE IF NOT EXISTS ratings (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL UNIQUE,
  rating INTEGER NOT NULL CHECK(rating >= 0 AND rating <= 10),
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX idx_ratings_date ON ratings(date);
```

**Columns:**
- `id` (TEXT): UUID primary key
- `date` (TEXT): Date in DD.MM.YYYY format (unique)
- `rating` (INTEGER): 0-10 scale
- `createdAt` (TEXT): ISO timestamp
- `updatedAt` (TEXT): ISO timestamp

#### Table: `templates`

```sql
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  tasks TEXT NOT NULL,
  icon TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

**Columns:**
- `id` (TEXT): UUID primary key
- `name` (TEXT): Template name (unique)
- `tasks` (TEXT): JSON array of template tasks
- `icon` (TEXT): Emoji icon
- `createdAt` (TEXT): ISO timestamp
- `updatedAt` (TEXT): ISO timestamp

### Database Operations

#### Initialization

```typescript
import { initDatabase } from '@/services/database';

// In App.tsx
useEffect(() => {
  const init = async () => {
    try {
      await initDatabase();
      setDbReady(true);
    } catch (error) {
      console.error('DB Init failed:', error);
    }
  };
  init();
}, []);
```

#### Task Operations

```typescript
// Create
await db.insertTask(task);

// Read
const tasks = await db.getTasksByDate(date);
const allTasks = await db.getAllTasks();

// Update
await db.updateTask(task);

// Delete
await db.deleteTask(taskId);

// Toggle completion
await db.toggleTaskCompletion(taskId);
```

#### Rating Operations

```typescript
// Create/Update
await db.insertRating(rating);

// Read
const rating = await db.getRatingByDate(date);
const allRatings = await db.getAllRatings();

// Range query
const ratings = await db.getRatingsByDateRange(startDate, endDate);
```

#### Template Operations

```typescript
// Create
await db.insertTemplate(template);

// Read
const templates = await db.getAllTemplates();
const template = await db.getTemplateById(id);

// Update
await db.updateTemplate(template);

// Delete
await db.deleteTemplate(id);
```

### Data Migration Strategy

For future schema changes:

```typescript
const DB_VERSION = 1;

async function migrateDatabase(currentVersion: number) {
  if (currentVersion < 1) {
    // Migration to version 1
    await db.executeSql('ALTER TABLE tasks ADD COLUMN priority INTEGER');
  }
  
  if (currentVersion < 2) {
    // Migration to version 2
    // ...
  }
}
```

---

## 🔄 State Management

### Context Architecture

All state managed through React Context API with `useReducer`:

```
AppProvider
  ├── TasksProvider
  ├── CalendarProvider
  ├── RatingsProvider
  ├── TemplatesProvider
  └── AnalyticsProvider
```

### TasksContext

**State Structure:**
```typescript
interface TasksState {
  tasks: Task[];
  selectedDate: string;
  loading: boolean;
  error: string | null;
  viewMode: 'date' | 'month';
}
```

**Actions:**
```typescript
type TasksAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_SELECTED_DATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_VIEW_MODE'; payload: 'date' | 'month' };
```

**Hook Usage:**
```typescript
import { useTasks } from '@/context';

const MyComponent = () => {
  const { 
    state, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTask,
    setSelectedDate,
    refreshTasks 
  } = useTasks();

  // Use state and actions
  const { tasks, selectedDate, loading, error } = state;
};
```

**Implementation Pattern:**
```typescript
// 1. Define reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ACTION':
      return { ...state, /* updates */ };
    default:
      return state;
  }
};

// 2. Create context
const Context = createContext<ContextValue | undefined>(undefined);

// 3. Create provider
export const Provider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Async operations
  const asyncAction = useCallback(async (data: Data) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await dbOperation(data);
      dispatch({ type: 'SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);
  
  return (
    <Context.Provider value={{ state, asyncAction }}>
      {children}
    </Context.Provider>
  );
};

// 4. Create hook
export const useHook = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useHook must be used within Provider');
  return context;
};
```

### CalendarContext

**State:**
```typescript
interface CalendarState {
  currentMonth: number;   // 0-11
  currentYear: number;
  today: string;
}
```

**Operations:**
- `nextMonth()`: Navigate to next month
- `previousMonth()`: Navigate to previous month
- `goToToday()`: Jump to current date
- `goToMonth(month, year)`: Jump to specific month

### RatingsContext

**State:**
```typescript
interface RatingsState {
  ratings: Map<string, DailyRating>;
  loading: boolean;
  error: string | null;
}
```

**Operations:**
- `setRating(date, rating)`: Set rating for a date
- `getRating(date)`: Get rating for a date
- `getLastNDaysRatings(n)`: Get recent ratings
- `refreshRatings()`: Reload from database

### TemplatesContext

**State:**
```typescript
interface TemplatesState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}
```

**Operations:**
- `addTemplate(template)`: Create new template
- `updateTemplate(template)`: Update existing template
- `deleteTemplate(id)`: Remove template
- `getTemplate(id)`: Get template by ID

### AnalyticsContext

**State:**
```typescript
interface AnalyticsState {
  currentStreak: number;
  longestStreak: number;
  productivityScore: number;
  completionRate: number;
  averageMood: number;
  badges: Achievement[];
  insights: Insight[];
  loading: boolean;
}
```

**Operations:**
- `calculateAnalytics()`: Compute all metrics
- `getWeeklySummary()`: Get week statistics
- `getMonthlySummary()`: Get month statistics
- `refreshAnalytics()`: Reload analytics

---

## 🧭 Navigation System

### Stack Navigator

```typescript
type RootStackParamList = {
  Dashboard: undefined;
  Tasks: { date: string };
  AddTaskModal: { date: string; mode?: 'add' | 'template' };
  Insights: undefined;
  Templates: undefined;
  MoodHistory: { startDate?: string; endDate?: string };
};
```

### Navigation Flow

```
Dashboard (Calendar)
  ├─→ Tasks (for selected date)
  │    └─→ AddTaskModal (create tasks)
  │
  ├─→ Insights (analytics)
  ├─→ Templates (manage templates)
  └─→ MoodHistory (rating history)
```

### Navigation Usage

```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Navigate with params
  navigation.navigate('Tasks', { date: '22.02.2026' });

  // Navigate back
  navigation.goBack();

  // Replace current screen
  navigation.replace('Dashboard');
};
```

### Screen Options

```typescript
<Stack.Screen
  name="ScreenName"
  component={ScreenComponent}
  options={{
    headerShown: false,
    presentation: 'modal',
    animation: 'slide_from_bottom',
    gestureEnabled: true,
  }}
/>
```

---

## 🎨 Design System

### Color Palette

```typescript
// Primary Colors
export const colors = {
  primary: '#667FEA',
  primaryDark: '#764BA2',
  primaryLight: '#F8F9FF',
  
  // Semantic Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Neutral Colors
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // UI Colors
  background: '#FFFFFF',
  surface: '#F8F9FF',
  border: '#E0E0E0',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },
};
```

### Typography

```typescript
export const typography = {
  heading1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: 0,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
    letterSpacing: 0,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  heading4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 1.25,
    textTransform: 'uppercase' as const,
  },
};
```

### Spacing System

8px grid system:

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};
```

### Shadow/Elevation System

```typescript
export const shadows = {
  elevation1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  elevation2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  // ... up to elevation4
};
```

### Theme Usage

```typescript
import { Theme } from '@/styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
  },
  heading: {
    ...Theme.typography.heading2,
    color: Theme.colors.text.primary,
  },
  card: {
    ...Theme.shadows.elevation2,
    borderRadius: Theme.borderRadius.md,
  },
});
```

---

## ⚙️ Core Features Implementation

### 1. Calendar System

**Components:**
- Month header with navigation
- Calendar grid (7 columns × 5-6 rows)
- Day cells with task indicators

**Implementation:**
```typescript
// Get days in month
const days = getMonthDays(year, month);

// Render grid
days.map((day) => {
  const tasksForDay = getTasksForDate(day.date);
  const rating = getRating(day.date);
  
  return (
    <DayCell
      date={day.date}
      taskCount={tasksForDay.length}
      completedCount={tasksForDay.filter(t => t.completed).length}
      rating={rating}
      isToday={isToday(day.date)}
      onPress={() => navigateToTasks(day.date)}
    />
  );
});
```

### 2. Task Management

**Task Creation Flow:**
```
1. User taps FAB button
2. AddTaskModal opens
3. User enters description (required)
4. User enters time (optional)
5. Task added to preview list
6. User confirms or adds more tasks
7. Tasks saved to database
8. Context updated
9. UI refreshes
```

**Task Operations:**
```typescript
// Add task
const newTask: Task = {
  id: uuid(),
  date: '22.02.2026',
  description: 'Complete project',
  time: '14:00',
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
await addTask(newTask);

// Toggle completion
await toggleTask(taskId);

// Delete task
await deleteTask(taskId);
```

### 3. Daily Rating System

**Rating Scale:**
- 0: 😢 Terrible
- 1-2: 😔 Bad
- 3-4: 😕 Poor
- 5: 🙁 Okay
- 6-7: 😊 Good
- 8: 😃 Great
- 9: 🤩 Amazing
- 10: 🎉 Perfect

**Implementation:**
```typescript
const handleRatingChange = async (value: number) => {
  const rating: DailyRating = {
    id: uuid(),
    date: selectedDate,
    rating: value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  await setRating(selectedDate, value);
};
```

### 4. Template System

**Pre-built Templates:**
1. 📅 Daily Routine
2. 💼 Work Day
3. 🏃 Fitness
4. 🧘 Self Care
5. 📚 Study Session
6. 🌙 Evening Wind-down

**Template Structure:**
```typescript
interface Template {
  id: string;
  name: string;
  icon: string;
  tasks: TemplateTask[];
  createdAt: string;
  updatedAt: string;
}

interface TemplateTask {
  description: string;
  time?: string;
}
```

**Apply Template:**
```typescript
const applyTemplate = async (templateId: string, date: string) => {
  const template = await getTemplate(templateId);
  
  const tasks = template.tasks.map(t => ({
    id: uuid(),
    date,
    description: t.description,
    time: t.time,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  
  await Promise.all(tasks.map(addTask));
};
```

### 5. Analytics & Insights

**Calculated Metrics:**

**Streak Tracking:**
```typescript
// Calculate current streak
const calculateCurrentStreak = (tasks: Task[]): number => {
  let streak = 0;
  let currentDate = getCurrentDate();
  
  while (hasTasksForDate(currentDate, tasks)) {
    const dayTasks = getTasksForDate(currentDate, tasks);
    const allCompleted = dayTasks.every(t => t.completed);
    
    if (!allCompleted) break;
    
    streak++;
    currentDate = getPreviousDate(currentDate);
  }
  
  return streak;
};
```

**Productivity Score:**
```typescript
// 0-100 scale based on completion rate and consistency
const calculateProductivityScore = (
  tasks: Task[],
  ratings: DailyRating[]
): number => {
  const completionRate = getCompletionRate(tasks);
  const averageRating = getAverageRating(ratings);
  const consistency = getConsistencyScore(tasks);
  
  return Math.round(
    (completionRate * 0.5) + 
    (averageRating * 10 * 0.3) + 
    (consistency * 0.2)
  );
};
```

**Achievement Badges:**
```typescript
const badges = [
  { id: 'first-task', name: 'First Task', icon: '🎯' },
  { id: 'week-streak', name: '7 Day Streak', icon: '🔥' },
  { id: 'month-streak', name: '30 Day Streak', icon: '⭐' },
  { id: 'century', name: '100 Tasks', icon: '💯' },
  { id: 'early-bird', name: 'Early Bird', icon: '🌅' },
  { id: 'night-owl', name: 'Night Owl', icon: '🦉' },
  { id: 'perfectionist', name: '100% Week', icon: '✨' },
  { id: 'consistent', name: '30 Days Active', icon: '📈' },
];
```

### 6. Chart Visualizations

**Weekly Stats Bar Chart:**
```typescript
<BarChart
  data={{
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [5, 8, 6, 10, 7, 4, 9] }],
  }}
  width={screenWidth - 40}
  height={220}
  chartConfig={{
    backgroundColor: colors.primary,
    backgroundGradientFrom: colors.primary,
    backgroundGradientTo: colors.primaryDark,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
/>
```

**Completion Rate Line Chart:**
```typescript
<LineChart
  data={{
    labels: monthLabels,
    datasets: [{ data: completionRates }],
  }}
  bezier
  width={screenWidth - 40}
  height={220}
/>
```

---

## 📚 API Reference

### Utility Functions

#### Date Helpers (`utils/dateHelpers.ts`)

```typescript
// Get current date in DD.MM.YYYY format
getCurrentDate(): string

// Get days in a month
getMonthDays(year: number, month: number): DayInfo[]

// Check if date is today
isToday(date: string): boolean

// Format date as "Month Year"
formatMonthYear(month: number, year: number): string

// Parse DD.MM.YYYY to Date object
parseDate(dateStr: string): Date

// Get date N days ago/ahead
addDays(dateStr: string, days: number): string

// Get day of week (0 = Sunday)
getDayOfWeek(dateStr: string): number

// Get week number of year
getWeekNumber(dateStr: string): number

// Check if dates are same
isSameDate(date1: string, date2: string): boolean

// Get date range
getDateRange(start: string, end: string): string[]

// Get month start/end
getMonthStart(dateStr: string): string
getMonthEnd(dateStr: string): string

// Format for display
formatDateLong(dateStr: string): string  // "Monday, February 22, 2026"
formatDateShort(dateStr: string): string // "Mon, Feb 22"
```

#### Time Helpers (`utils/timeHelpers.ts`)

```typescript
// Validate HH:MM format
isValidTime(time: string): boolean

// Format time string
formatTime(time: string): string

// Convert to minutes since midnight
timeToMinutes(time: string): number

// Convert minutes to HH:MM
minutesToTime(minutes: number): string

// Compare times (-1, 0, 1)
compareTime(time1: string, time2: string): number

// Add minutes to time
addMinutes(time: string, minutes: number): string

// Get time difference in minutes
timeDifference(start: string, end: string): number

// Check if time in range
isTimeInRange(time: string, start: string, end: string): boolean

// Get current time
getCurrentTime(): string

// Round to nearest interval
roundTimeToInterval(time: string, interval: number): string

// Parse 12h format to 24h
parse12HourTime(time: string): string

// Format to 12h format
format12HourTime(time: string): string
```

#### Formatters (`utils/formatters.ts`)

```typescript
// Format task count "5/10"
formatTaskCount(completed: number, total: number): string

// Format rating with emoji
formatRating(rating: number): string

// Get emoji for rating
getEmojiForRating(rating: number): string

// Format percentage
formatPercentage(value: number, decimals?: number): string

// Format number with commas
formatNumber(value: number): string

// Truncate text
truncateText(text: string, length: number): string

// Format duration
formatDuration(minutes: number): string

// Format streak
formatStreak(days: number): string

// Format date relative
formatRelativeDate(dateStr: string): string  // "Today", "Yesterday", "2 days ago"
```

#### Validators (`utils/validators.ts`)

```typescript
// Validate task description (1-100 chars)
isValidTaskDescription(text: string): boolean

// Validate template name
isValidTemplateName(name: string): boolean

// Validate rating (0-10)
isValidRating(rating: number): boolean

// Validate date format DD.MM.YYYY
isValidDateFormat(date: string): boolean

// Validate time format HH:MM
isValidTimeFormat(time: string): boolean

// Check if string is empty/whitespace
isEmpty(text: string): boolean

// Validate email
isValidEmail(email: string): boolean

// Validate UUID
isValidUUID(uuid: string): boolean
```

### Database API

#### Task Operations

```typescript
// Insert new task
insertTask(task: Task): Promise<void>

// Get all tasks
getAllTasks(): Promise<Task[]>

// Get tasks by date
getTasksByDate(date: string): Promise<Task[]>

// Get tasks by date range
getTasksByDateRange(start: string, end: string): Promise<Task[]>

// Update task
updateTask(task: Task): Promise<void>

// Delete task
deleteTask(id: string): Promise<void>

// Toggle task completion
toggleTaskCompletion(id: string): Promise<void>

// Get task by ID
getTaskById(id: string): Promise<Task | null>

// Delete all tasks for date
deleteTasksByDate(date: string): Promise<void>
```

#### Rating Operations

```typescript
// Insert/update rating
insertRating(rating: DailyRating): Promise<void>

// Get rating by date
getRatingByDate(date: string): Promise<DailyRating | null>

// Get all ratings
getAllRatings(): Promise<DailyRating[]>

// Get ratings by date range
getRatingsByDateRange(start: string, end: string): Promise<DailyRating[]>

// Delete rating
deleteRating(id: string): Promise<void>
```

#### Template Operations

```typescript
// Insert template
insertTemplate(template: Template): Promise<void>

// Get all templates
getAllTemplates(): Promise<Template[]>

// Get template by ID
getTemplateById(id: string): Promise<Template | null>

// Update template
updateTemplate(template: Template): Promise<void>

// Delete template
deleteTemplate(id: string): Promise<void>

// Check if template exists
templateExists(name: string): Promise<boolean>
```

---

## 🧪 Testing Strategy

### Test Structure

```
__tests__/
├── unit/
│   ├── utils/
│   │   ├── dateHelpers.test.ts
│   │   ├── timeHelpers.test.ts
│   │   ├── formatters.test.ts
│   │   └── validators.test.ts
│   ├── context/
│   │   ├── TasksContext.test.tsx
│   │   └── CalendarContext.test.tsx
│   └── services/
│       └── database.test.ts
│
├── integration/
│   ├── TaskFlow.test.tsx
│   ├── RatingFlow.test.tsx
│   └── TemplateFlow.test.tsx
│
└── e2e/
    ├── DashboardScreen.test.tsx
    ├── TasksScreen.test.tsx
    └── AddTaskModal.test.tsx
```

### Unit Test Example

```typescript
// __tests__/unit/utils/dateHelpers.test.ts
import { getCurrentDate, isToday, formatMonthYear } from '@/utils/dateHelpers';

describe('dateHelpers', () => {
  describe('getCurrentDate', () => {
    it('should return date in DD.MM.YYYY format', () => {
      const result = getCurrentDate();
      expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    });
  });

  describe('isToday', () => {
    it('should return true for today\'s date', () => {
      const today = getCurrentDate();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      expect(isToday('21.02.2026')).toBe(false);
    });
  });

  describe('formatMonthYear', () => {
    it('should format month and year', () => {
      expect(formatMonthYear(1, 2026)).toBe('February 2026');
    });
  });
});
```

### Integration Test Example

```typescript
// __tests__/integration/TaskFlow.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useTasks } from '@/context';
import { Task } from '@/types/Task';

describe('Task Flow Integration', () => {
  it('should complete full task lifecycle', async () => {
    const { result } = renderHook(() => useTasks());

    // Add task
    const newTask: Task = {
      id: 'test-1',
      date: '22.02.2026',
      description: 'Test task',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await act(async () => {
      await result.current.addTask(newTask);
    });

    expect(result.current.state.tasks).toContainEqual(newTask);

    // Toggle completion
    await act(async () => {
      await result.current.toggleTask(newTask.id);
    });

    const updatedTask = result.current.state.tasks.find(t => t.id === newTask.id);
    expect(updatedTask?.completed).toBe(true);

    // Delete task
    await act(async () => {
      await result.current.deleteTask(newTask.id);
    });

    expect(result.current.state.tasks).not.toContainEqual(
      expect.objectContaining({ id: newTask.id })
    );
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- dateHelpers.test.ts

# Run in watch mode
npm test -- --watch

# Update snapshots
npm test -- -u
```

---

## ⚡ Performance Optimization

### 1. Memoization

```typescript
// Memoize expensive computations
const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return compareTime(a.time || '', b.time || '');
  });
}, [tasks]);

// Memoize callbacks
const handleTaskToggle = useCallback((taskId: string) => {
  toggleTask(taskId);
}, [toggleTask]);
```

### 2. List Optimization

```typescript
// Use FlatList for long lists
<FlatList
  data={tasks}
  renderItem={({ item }) => <TaskItem task={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={10}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### 3. Image Optimization

```typescript
// Use FastImage for better performance
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.contain}
/>
```

### 4. Database Optimization

```typescript
// Batch operations
const batchInsertTasks = async (tasks: Task[]) => {
  await db.transaction((tx) => {
    tasks.forEach((task) => {
      tx.executeSql(
        'INSERT INTO tasks (id, date, description, ...) VALUES (?, ?, ?, ...)',
        [task.id, task.date, task.description, ...]
      );
    });
  });
};

// Use indexes
CREATE INDEX idx_tasks_date ON tasks(date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

### 5. Bundle Size Optimization

```bash
# Analyze bundle
npx react-native-bundle-visualizer

# Enable Hermes engine (already enabled)
# android/app/build.gradle
hermesEnabled: true
```

---

## 🚀 Deployment Guide

### Android Build

#### Debug Build

```bash
cd android
./gradlew assembleDebug
cd ..

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

#### Release Build

```bash
# 1. Generate signing key
keytool -genkeypair -v -storetype PKCS12 \
  -keystore habito-release-key.keystore \
  -alias habito-release \
  -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure gradle
# android/app/build.gradle
android {
  signingConfigs {
    release {
      storeFile file('habito-release-key.keystore')
      storePassword 'your-password'
      keyAlias 'habito-release'
      keyPassword 'your-password'
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release
      minifyEnabled true
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
  }
}

# 3. Build release
cd android
./gradlew assembleRelease
cd ..

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

#### Bundle for Play Store

```bash
cd android
./gradlew bundleRelease
cd ..

# AAB location:
# android/app/build/outputs/bundle/release/app-release.aab
```

### iOS Build (macOS only)

#### Debug Build

```bash
npx react-native run-ios --configuration Debug
```

#### Release Build

```bash
# 1. Open Xcode
open ios/habito.xcworkspace

# 2. Configure signing
# - Select project in navigator
# - Select target "habito"
# - Go to "Signing & Capabilities"
# - Select your team

# 3. Archive
# Product > Archive

# 4. Distribute
# Window > Organizer > Distribute App
```

### Environment Configuration

```typescript
// config/env.ts
export const ENV = {
  API_URL: __DEV__ 
    ? 'http://localhost:3000' 
    : 'https://api.habito.app',
  DB_NAME: 'habito.db',
  ENABLE_LOGGING: __DEV__,
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Not Initializing

**Symptom:** App stuck on loading screen

**Solution:**
```bash
# Clear app data
# Android: Settings > Apps > Habito > Storage > Clear Data
# iOS: Delete and reinstall app

# Check logs
npx react-native log-android
npx react-native log-ios
```

#### 2. Metro Bundler Issues

**Symptom:** Bundle fails to load

**Solution:**
```bash
# Clear cache
npx react-native start --reset-cache

# Or complete reset
watchman watch-del-all
rm -rf node_modules
rm -rf $TMPDIR/react-*
npm install
npm start -- --reset-cache
```

#### 3. Android Build Failures

**Symptom:** Gradle build errors

**Solution:**
```bash
cd android
./gradlew clean
cd ..

# Clear gradle cache
rm -rf ~/.gradle/caches/
```

#### 4. iOS Pod Install Issues

**Symptom:** CocoaPods errors

**Solution:**
```bash
cd ios
pod deintegrate
pod install --repo-update
cd ..
```

#### 5. TypeScript Errors

**Symptom:** Type checking failures

**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# Restart TypeScript server (VS Code)
# Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"
```

### Debug Tools

```typescript
// React DevTools
npm install -g react-devtools
react-devtools

// Flipper (recommended)
# Download from https://fbflipper.com/
# Automatically detects running app
```

### Logging Best Practices

```typescript
// Development logging
if (__DEV__) {
  console.log('[Component] Action:', data);
}

// Production error tracking
try {
  await riskyOperation();
} catch (error) {
  console.error('[Component] Operation failed:', error);
  // Send to error tracking service
}
```

---

## 📞 Support & Resources

### Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

### Community
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [Discord Communities](https://discord.gg/react-native)

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Phase 1: Foundation complete
- ✅ Phase 2: Core features complete
- ✅ Phase 3: Enhancements complete
- 📋 Phase 4: Optimization pending

---

## 📄 License

MIT License - See LICENSE file for details

---

**Document Version:** 1.0.0  
**Last Updated:** February 22, 2026  
**Maintained by:** Habito Development Team
