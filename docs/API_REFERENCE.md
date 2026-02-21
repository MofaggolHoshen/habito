# 📘 Habito API Reference

> Complete API documentation for all modules and functions

**Version:** 1.0.0  
**Last Updated:** February 22, 2026

---

## Table of Contents

1. [Context APIs](#context-apis)
2. [Database API](#database-api)
3. [Utility Functions](#utility-functions)
4. [Navigation API](#navigation-api)
5. [Component Props](#component-props)
6. [Type Definitions](#type-definitions)

---

## 🔄 Context APIs

### TasksContext

**Import:**
```typescript
import { useTasks } from '@/context';
```

**State Interface:**
```typescript
interface TasksState {
  tasks: Task[];
  selectedDate: string;
  loading: boolean;
  error: string | null;
  viewMode: 'date' | 'month';
}
```

**Hook Return Value:**
```typescript
interface TasksContextValue {
  state: TasksState;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  setSelectedDate: (date: string) => void;
  refreshTasks: () => Promise<void>;
  getTasksForDate: (date: string) => Task[];
  getTasksForMonth: (year: number, month: number) => Task[];
}
```

**Methods:**

#### `addTask(task: Task): Promise<void>`
Creates a new task and persists it to the database.

**Parameters:**
- `task` (Task): Task object to add

**Example:**
```typescript
const { addTask } = useTasks();

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
```

#### `updateTask(task: Task): Promise<void>`
Updates an existing task.

**Parameters:**
- `task` (Task): Updated task object

**Example:**
```typescript
const { state, updateTask } = useTasks();

const taskToUpdate = state.tasks[0];
const updatedTask = {
  ...taskToUpdate,
  description: 'Updated description',
  updatedAt: new Date().toISOString(),
};

await updateTask(updatedTask);
```

#### `deleteTask(taskId: string): Promise<void>`
Deletes a task by ID.

**Parameters:**
- `taskId` (string): UUID of task to delete

**Example:**
```typescript
const { deleteTask } = useTasks();
await deleteTask('task-uuid-here');
```

#### `toggleTask(taskId: string): Promise<void>`
Toggles task completion status.

**Parameters:**
- `taskId` (string): UUID of task to toggle

**Example:**
```typescript
const { toggleTask } = useTasks();
await toggleTask('task-uuid-here');
```

#### `setSelectedDate(date: string): void`
Sets the currently selected date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Example:**
```typescript
const { setSelectedDate } = useTasks();
setSelectedDate('22.02.2026');
```

#### `refreshTasks(): Promise<void>`
Reloads all tasks from database.

**Example:**
```typescript
const { refreshTasks } = useTasks();
await refreshTasks();
```

#### `getTasksForDate(date: string): Task[]`
Gets tasks for a specific date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Returns:** Array of tasks for that date

**Example:**
```typescript
const { getTasksForDate } = useTasks();
const tasks = getTasksForDate('22.02.2026');
```

#### `getTasksForMonth(year: number, month: number): Task[]`
Gets all tasks for a specific month.

**Parameters:**
- `year` (number): Year (e.g., 2026)
- `month` (number): Month (0-11)

**Returns:** Array of tasks in that month

**Example:**
```typescript
const { getTasksForMonth } = useTasks();
const tasks = getTasksForMonth(2026, 1); // February 2026
```

---

### CalendarContext

**Import:**
```typescript
import { useCalendar } from '@/context';
```

**State Interface:**
```typescript
interface CalendarState {
  currentMonth: number;  // 0-11
  currentYear: number;
  today: string;         // DD.MM.YYYY
}
```

**Hook Return Value:**
```typescript
interface CalendarContextValue {
  state: CalendarState;
  nextMonth: () => void;
  previousMonth: () => void;
  goToToday: () => void;
  goToMonth: (month: number, year: number) => void;
}
```

**Methods:**

#### `nextMonth(): void`
Navigate to next month.

**Example:**
```typescript
const { nextMonth } = useCalendar();
nextMonth();
```

#### `previousMonth(): void`
Navigate to previous month.

**Example:**
```typescript
const { previousMonth } = useCalendar();
previousMonth();
```

#### `goToToday(): void`
Jump to current month.

**Example:**
```typescript
const { goToToday } = useCalendar();
goToToday();
```

#### `goToMonth(month: number, year: number): void`
Jump to specific month.

**Parameters:**
- `month` (number): Month (0-11)
- `year` (number): Year (e.g., 2026)

**Example:**
```typescript
const { goToMonth } = useCalendar();
goToMonth(11, 2026); // December 2026
```

---

### RatingsContext

**Import:**
```typescript
import { useRatings } from '@/context';
```

**State Interface:**
```typescript
interface RatingsState {
  ratings: Map<string, DailyRating>;
  loading: boolean;
  error: string | null;
}
```

**Hook Return Value:**
```typescript
interface RatingsContextValue {
  state: RatingsState;
  setRating: (date: string, rating: number) => Promise<void>;
  getRating: (date: string) => DailyRating | null;
  getLastNDaysRatings: (n: number) => DailyRating[];
  refreshRatings: () => Promise<void>;
  getAverageRating: (startDate?: string, endDate?: string) => number;
}
```

**Methods:**

#### `setRating(date: string, rating: number): Promise<void>`
Set or update rating for a date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format
- `rating` (number): Rating value (0-10)

**Example:**
```typescript
const { setRating } = useRatings();
await setRating('22.02.2026', 8);
```

#### `getRating(date: string): DailyRating | null`
Get rating for a specific date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Returns:** DailyRating object or null

**Example:**
```typescript
const { getRating } = useRatings();
const rating = getRating('22.02.2026');
console.log(rating?.rating); // 8
```

#### `getLastNDaysRatings(n: number): DailyRating[]`
Get ratings for last N days.

**Parameters:**
- `n` (number): Number of days

**Returns:** Array of DailyRating objects

**Example:**
```typescript
const { getLastNDaysRatings } = useRatings();
const lastWeek = getLastNDaysRatings(7);
```

#### `getAverageRating(startDate?: string, endDate?: string): number`
Calculate average rating for date range.

**Parameters:**
- `startDate` (string, optional): Start date in DD.MM.YYYY format
- `endDate` (string, optional): End date in DD.MM.YYYY format

**Returns:** Average rating (0-10)

**Example:**
```typescript
const { getAverageRating } = useRatings();
const avg = getAverageRating('01.02.2026', '22.02.2026');
```

---

### TemplatesContext

**Import:**
```typescript
import { useTemplates } from '@/context';
```

**State Interface:**
```typescript
interface TemplatesState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}
```

**Hook Return Value:**
```typescript
interface TemplatesContextValue {
  state: TemplatesState;
  addTemplate: (template: Template) => Promise<void>;
  updateTemplate: (template: Template) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplate: (id: string) => Template | null;
  applyTemplate: (templateId: string, date: string) => Promise<void>;
  refreshTemplates: () => Promise<void>;
}
```

**Methods:**

#### `addTemplate(template: Template): Promise<void>`
Create a new template.

**Parameters:**
- `template` (Template): Template object to add

**Example:**
```typescript
const { addTemplate } = useTemplates();

const newTemplate: Template = {
  id: uuid(),
  name: 'My Custom Template',
  icon: '📝',
  tasks: [
    { description: 'Task 1', time: '09:00' },
    { description: 'Task 2' },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

await addTemplate(newTemplate);
```

#### `applyTemplate(templateId: string, date: string): Promise<void>`
Apply a template to a specific date.

**Parameters:**
- `templateId` (string): UUID of template
- `date` (string): Date in DD.MM.YYYY format

**Example:**
```typescript
const { applyTemplate } = useTemplates();
await applyTemplate('template-uuid', '22.02.2026');
```

---

### AnalyticsContext

**Import:**
```typescript
import { useAnalytics } from '@/context';
```

**State Interface:**
```typescript
interface AnalyticsState {
  currentStreak: number;
  longestStreak: number;
  productivityScore: number;
  completionRate: number;
  averageMood: number;
  totalTasksCompleted: number;
  badges: Achievement[];
  insights: Insight[];
  loading: boolean;
  error: string | null;
}
```

**Hook Return Value:**
```typescript
interface AnalyticsContextValue {
  state: AnalyticsState;
  calculateAnalytics: () => Promise<void>;
  getWeeklySummary: () => WeeklySummary;
  getMonthlySummary: () => MonthlySummary;
  refreshAnalytics: () => Promise<void>;
}
```

**Methods:**

#### `calculateAnalytics(): Promise<void>`
Recalculate all analytics metrics.

**Example:**
```typescript
const { calculateAnalytics } = useAnalytics();
await calculateAnalytics();
```

#### `getWeeklySummary(): WeeklySummary`
Get analytics for current week.

**Returns:** WeeklySummary object

**Example:**
```typescript
const { getWeeklySummary } = useAnalytics();
const summary = getWeeklySummary();
console.log(summary.completionRate);
```

---

## 💾 Database API

### Import
```typescript
import * as db from '@/services/database';
```

### Task Operations

#### `initDatabase(): Promise<void>`
Initialize database and create tables.

**Example:**
```typescript
await db.initDatabase();
```

#### `insertTask(task: Task): Promise<void>`
Insert a new task.

**Parameters:**
- `task` (Task): Task object to insert

**Example:**
```typescript
await db.insertTask({
  id: uuid(),
  date: '22.02.2026',
  description: 'Task description',
  time: '14:00',
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
```

#### `getAllTasks(): Promise<Task[]>`
Get all tasks from database.

**Returns:** Promise resolving to array of tasks

**Example:**
```typescript
const allTasks = await db.getAllTasks();
```

#### `getTasksByDate(date: string): Promise<Task[]>`
Get tasks for a specific date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Returns:** Promise resolving to array of tasks

**Example:**
```typescript
const tasks = await db.getTasksByDate('22.02.2026');
```

#### `getTasksByDateRange(startDate: string, endDate: string): Promise<Task[]>`
Get tasks within a date range.

**Parameters:**
- `startDate` (string): Start date in DD.MM.YYYY format
- `endDate` (string): End date in DD.MM.YYYY format

**Returns:** Promise resolving to array of tasks

**Example:**
```typescript
const tasks = await db.getTasksByDateRange('01.02.2026', '29.02.2026');
```

#### `updateTask(task: Task): Promise<void>`
Update an existing task.

**Parameters:**
- `task` (Task): Updated task object

**Example:**
```typescript
await db.updateTask({
  ...existingTask,
  description: 'Updated description',
  updatedAt: new Date().toISOString(),
});
```

#### `deleteTask(id: string): Promise<void>`
Delete a task by ID.

**Parameters:**
- `id` (string): Task UUID

**Example:**
```typescript
await db.deleteTask('task-uuid');
```

#### `toggleTaskCompletion(id: string): Promise<void>`
Toggle task completion status.

**Parameters:**
- `id` (string): Task UUID

**Example:**
```typescript
await db.toggleTaskCompletion('task-uuid');
```

#### `deleteTasksByDate(date: string): Promise<void>`
Delete all tasks for a specific date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Example:**
```typescript
await db.deleteTasksByDate('22.02.2026');
```

### Rating Operations

#### `insertRating(rating: DailyRating): Promise<void>`
Insert or update a rating.

**Parameters:**
- `rating` (DailyRating): Rating object

**Example:**
```typescript
await db.insertRating({
  id: uuid(),
  date: '22.02.2026',
  rating: 8,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
```

#### `getRatingByDate(date: string): Promise<DailyRating | null>`
Get rating for a specific date.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Returns:** Promise resolving to DailyRating or null

**Example:**
```typescript
const rating = await db.getRatingByDate('22.02.2026');
```

#### `getAllRatings(): Promise<DailyRating[]>`
Get all ratings.

**Returns:** Promise resolving to array of ratings

**Example:**
```typescript
const allRatings = await db.getAllRatings();
```

#### `getRatingsByDateRange(startDate: string, endDate: string): Promise<DailyRating[]>`
Get ratings within a date range.

**Parameters:**
- `startDate` (string): Start date in DD.MM.YYYY format
- `endDate` (string): End date in DD.MM.YYYY format

**Returns:** Promise resolving to array of ratings

**Example:**
```typescript
const ratings = await db.getRatingsByDateRange('01.02.2026', '29.02.2026');
```

### Template Operations

#### `insertTemplate(template: Template): Promise<void>`
Insert a new template.

**Parameters:**
- `template` (Template): Template object

**Example:**
```typescript
await db.insertTemplate({
  id: uuid(),
  name: 'My Template',
  icon: '📝',
  tasks: [{ description: 'Task 1', time: '09:00' }],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
```

#### `getAllTemplates(): Promise<Template[]>`
Get all templates.

**Returns:** Promise resolving to array of templates

**Example:**
```typescript
const templates = await db.getAllTemplates();
```

#### `getTemplateById(id: string): Promise<Template | null>`
Get template by ID.

**Parameters:**
- `id` (string): Template UUID

**Returns:** Promise resolving to Template or null

**Example:**
```typescript
const template = await db.getTemplateById('template-uuid');
```

#### `updateTemplate(template: Template): Promise<void>`
Update an existing template.

**Parameters:**
- `template` (Template): Updated template object

**Example:**
```typescript
await db.updateTemplate({
  ...existingTemplate,
  name: 'Updated Name',
  updatedAt: new Date().toISOString(),
});
```

#### `deleteTemplate(id: string): Promise<void>`
Delete a template by ID.

**Parameters:**
- `id` (string): Template UUID

**Example:**
```typescript
await db.deleteTemplate('template-uuid');
```

---

## 🛠️ Utility Functions

### Date Helpers (`@/utils/dateHelpers`)

#### `getCurrentDate(): string`
Get current date in DD.MM.YYYY format.

**Returns:** Current date string

**Example:**
```typescript
import { getCurrentDate } from '@/utils';
const today = getCurrentDate(); // "22.02.2026"
```

#### `getMonthDays(year: number, month: number): DayInfo[]`
Get all days in a month with metadata.

**Parameters:**
- `year` (number): Year (e.g., 2026)
- `month` (number): Month (0-11)

**Returns:** Array of DayInfo objects

**DayInfo Interface:**
```typescript
interface DayInfo {
  date: string;        // DD.MM.YYYY
  day: number;         // 1-31
  isCurrentMonth: boolean;
  isToday: boolean;
  dayOfWeek: number;   // 0-6
}
```

**Example:**
```typescript
import { getMonthDays } from '@/utils';
const days = getMonthDays(2026, 1); // February 2026
```

#### `isToday(date: string): boolean`
Check if date is today.

**Parameters:**
- `date` (string): Date in DD.MM.YYYY format

**Returns:** Boolean

**Example:**
```typescript
import { isToday } from '@/utils';
const today = isToday('22.02.2026'); // true or false
```

#### `formatMonthYear(month: number, year: number): string`
Format month and year for display.

**Parameters:**
- `month` (number): Month (0-11)
- `year` (number): Year (e.g., 2026)

**Returns:** Formatted string

**Example:**
```typescript
import { formatMonthYear } from '@/utils';
const formatted = formatMonthYear(1, 2026); // "February 2026"
```

#### `parseDate(dateStr: string): Date`
Parse DD.MM.YYYY string to Date object.

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format

**Returns:** Date object

**Example:**
```typescript
import { parseDate } from '@/utils';
const date = parseDate('22.02.2026');
```

#### `addDays(dateStr: string, days: number): string`
Add or subtract days from a date.

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format
- `days` (number): Number of days (positive or negative)

**Returns:** New date in DD.MM.YYYY format

**Example:**
```typescript
import { addDays } from '@/utils';
const tomorrow = addDays('22.02.2026', 1);  // "23.02.2026"
const yesterday = addDays('22.02.2026', -1); // "21.02.2026"
```

#### `getDayOfWeek(dateStr: string): number`
Get day of week (0 = Sunday, 6 = Saturday).

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format

**Returns:** Number (0-6)

**Example:**
```typescript
import { getDayOfWeek } from '@/utils';
const day = getDayOfWeek('22.02.2026'); // e.g., 0 for Sunday
```

#### `getWeekNumber(dateStr: string): number`
Get ISO week number of the year.

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format

**Returns:** Week number (1-53)

**Example:**
```typescript
import { getWeekNumber } from '@/utils';
const week = getWeekNumber('22.02.2026'); // e.g., 8
```

#### `isSameDate(date1: string, date2: string): boolean`
Check if two dates are the same.

**Parameters:**
- `date1` (string): First date in DD.MM.YYYY format
- `date2` (string): Second date in DD.MM.YYYY format

**Returns:** Boolean

**Example:**
```typescript
import { isSameDate } from '@/utils';
const same = isSameDate('22.02.2026', '22.02.2026'); // true
```

#### `getDateRange(startDate: string, endDate: string): string[]`
Get array of all dates between two dates (inclusive).

**Parameters:**
- `startDate` (string): Start date in DD.MM.YYYY format
- `endDate` (string): End date in DD.MM.YYYY format

**Returns:** Array of date strings

**Example:**
```typescript
import { getDateRange } from '@/utils';
const dates = getDateRange('20.02.2026', '22.02.2026');
// ["20.02.2026", "21.02.2026", "22.02.2026"]
```

#### `formatDateLong(dateStr: string): string`
Format date as "Monday, February 22, 2026".

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format

**Returns:** Formatted string

**Example:**
```typescript
import { formatDateLong } from '@/utils';
const formatted = formatDateLong('22.02.2026');
// "Monday, February 22, 2026"
```

#### `formatDateShort(dateStr: string): string`
Format date as "Mon, Feb 22".

**Parameters:**
- `dateStr` (string): Date in DD.MM.YYYY format

**Returns:** Formatted string

**Example:**
```typescript
import { formatDateShort } from '@/utils';
const formatted = formatDateShort('22.02.2026');
// "Mon, Feb 22"
```

### Time Helpers (`@/utils/timeHelpers`)

#### `isValidTime(time: string): boolean`
Validate HH:MM format.

**Parameters:**
- `time` (string): Time string to validate

**Returns:** Boolean

**Example:**
```typescript
import { isValidTime } from '@/utils';
isValidTime('14:30'); // true
isValidTime('25:00'); // false
isValidTime('14:70'); // false
```

#### `formatTime(time: string): string`
Format time string consistently.

**Parameters:**
- `time` (string): Time in HH:MM format

**Returns:** Formatted time string

**Example:**
```typescript
import { formatTime } from '@/utils';
const formatted = formatTime('9:5'); // "09:05"
```

#### `timeToMinutes(time: string): number`
Convert HH:MM to minutes since midnight.

**Parameters:**
- `time` (string): Time in HH:MM format

**Returns:** Minutes (0-1439)

**Example:**
```typescript
import { timeToMinutes } from '@/utils';
const minutes = timeToMinutes('14:30'); // 870
```

#### `minutesToTime(minutes: number): string`
Convert minutes since midnight to HH:MM.

**Parameters:**
- `minutes` (number): Minutes (0-1439)

**Returns:** Time in HH:MM format

**Example:**
```typescript
import { minutesToTime } from '@/utils';
const time = minutesToTime(870); // "14:30"
```

#### `compareTime(time1: string, time2: string): number`
Compare two times (-1, 0, or 1).

**Parameters:**
- `time1` (string): First time in HH:MM format
- `time2` (string): Second time in HH:MM format

**Returns:** -1 if time1 < time2, 0 if equal, 1 if time1 > time2

**Example:**
```typescript
import { compareTime } from '@/utils';
compareTime('14:00', '15:00'); // -1
compareTime('14:00', '14:00'); // 0
compareTime('15:00', '14:00'); // 1
```

#### `getCurrentTime(): string`
Get current time in HH:MM format.

**Returns:** Current time

**Example:**
```typescript
import { getCurrentTime } from '@/utils';
const now = getCurrentTime(); // "14:30"
```

### Formatters (`@/utils/formatters`)

#### `formatTaskCount(completed: number, total: number): string`
Format task count as "X/Y".

**Parameters:**
- `completed` (number): Number of completed tasks
- `total` (number): Total number of tasks

**Returns:** Formatted string

**Example:**
```typescript
import { formatTaskCount } from '@/utils';
const count = formatTaskCount(5, 10); // "5/10"
```

#### `formatRating(rating: number): string`
Format rating with emoji.

**Parameters:**
- `rating` (number): Rating (0-10)

**Returns:** Emoji and rating

**Example:**
```typescript
import { formatRating } from '@/utils';
const formatted = formatRating(8); // "😃 8"
```

#### `getEmojiForRating(rating: number): string`
Get emoji for rating value.

**Parameters:**
- `rating` (number): Rating (0-10)

**Returns:** Emoji string

**Example:**
```typescript
import { getEmojiForRating } from '@/utils';
getEmojiForRating(0);  // "😢"
getEmojiForRating(5);  // "🙁"
getEmojiForRating(10); // "🎉"
```

#### `formatPercentage(value: number, decimals?: number): string`
Format number as percentage.

**Parameters:**
- `value` (number): Value (0-1 or 0-100)
- `decimals` (number, optional): Decimal places (default: 0)

**Returns:** Formatted percentage

**Example:**
```typescript
import { formatPercentage } from '@/utils';
formatPercentage(0.75);    // "75%"
formatPercentage(75.5, 1); // "75.5%"
```

#### `truncateText(text: string, length: number): string`
Truncate text with ellipsis.

**Parameters:**
- `text` (string): Text to truncate
- `length` (number): Max length

**Returns:** Truncated text

**Example:**
```typescript
import { truncateText } from '@/utils';
const short = truncateText('This is a long text', 10);
// "This is a..."
```

### Validators (`@/utils/validators`)

#### `isValidTaskDescription(text: string): boolean`
Validate task description (1-100 characters).

**Parameters:**
- `text` (string): Description to validate

**Returns:** Boolean

**Example:**
```typescript
import { isValidTaskDescription } from '@/utils';
isValidTaskDescription('Valid task');    // true
isValidTaskDescription('');              // false
isValidTaskDescription('a'.repeat(101)); // false
```

#### `isValidRating(rating: number): boolean`
Validate rating (0-10).

**Parameters:**
- `rating` (number): Rating to validate

**Returns:** Boolean

**Example:**
```typescript
import { isValidRating } from '@/utils';
isValidRating(5);  // true
isValidRating(-1); // false
isValidRating(11); // false
```

#### `isValidDateFormat(date: string): boolean`
Validate DD.MM.YYYY format.

**Parameters:**
- `date` (string): Date to validate

**Returns:** Boolean

**Example:**
```typescript
import { isValidDateFormat } from '@/utils';
isValidDateFormat('22.02.2026'); // true
isValidDateFormat('2026-02-22'); // false
isValidDateFormat('22/02/2026'); // false
```

---

## 🧭 Navigation API

### Import
```typescript
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
```

### Navigation Methods

#### `navigate(screen: string, params?: object): void`
Navigate to a screen.

**Example:**
```typescript
const navigation = useNavigation<NavigationProp>();
navigation.navigate('Tasks', { date: '22.02.2026' });
```

#### `goBack(): void`
Go back to previous screen.

**Example:**
```typescript
navigation.goBack();
```

#### `replace(screen: string, params?: object): void`
Replace current screen.

**Example:**
```typescript
navigation.replace('Dashboard');
```

#### `push(screen: string, params?: object): void`
Push new screen onto stack.

**Example:**
```typescript
navigation.push('Tasks', { date: '22.02.2026' });
```

---

## 🎨 Component Props

### DashboardScreen

**Props:** None

**Usage:**
```typescript
<DashboardScreen />
```

### TasksScreen

**Route Params:**
```typescript
{
  date: string; // DD.MM.YYYY
}
```

**Usage:**
```typescript
navigation.navigate('Tasks', { date: '22.02.2026' });
```

### AddTaskModalScreen

**Route Params:**
```typescript
{
  date: string;
  mode?: 'add' | 'template';
}
```

**Usage:**
```typescript
navigation.navigate('AddTaskModal', { 
  date: '22.02.2026',
  mode: 'add'
});
```

---

## 📦 Type Definitions

### Task
```typescript
interface Task {
  id: string;
  date: string;        // DD.MM.YYYY
  description: string;
  time?: string;       // HH:MM
  completed: boolean;
  createdAt: string;   // ISO timestamp
  updatedAt: string;   // ISO timestamp
}
```

### DailyRating
```typescript
interface DailyRating {
  id: string;
  date: string;        // DD.MM.YYYY
  rating: number;      // 0-10
  createdAt: string;   // ISO timestamp
  updatedAt: string;   // ISO timestamp
}
```

### Template
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
  time?: string;       // HH:MM
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
```

### Insight
```typescript
interface Insight {
  id: string;
  type: 'positive' | 'neutral' | 'improvement';
  title: string;
  description: string;
  icon: string;
  priority: number;
}
```

---

**Document Version:** 1.0.0  
**Last Updated:** February 22, 2026
