# Habito - Phase 2: Core Features Implementation Plan

**Phase**: 2 - Core Features  
**Status**: 🚀 STARTING (January 25, 2026 - 15:07 UTC)  
**Duration**: Estimated 3-5 days  
**Goal**: Implement complete task management, calendar functionality, and state persistence

---

## 📋 Phase 2 Overview

### What is Phase 2?
Phase 2 focuses on implementing the **core business logic** of Habito:
- **Task Management**: Full CRUD operations with persistent storage
- **Calendar Integration**: Interactive calendar with task tracking
- **Daily Ratings**: Save and retrieve user mood/productivity ratings
- **Data Persistence**: SQLite database for offline storage
- **Real-time Updates**: UI reflects state changes immediately

### Phase 1 → Phase 2 Handoff
All Phase 1 deliverables are complete:
- ✅ Project structure
- ✅ UI components (screens, layouts)
- ✅ State management (Context API)
- ✅ Navigation
- ✅ Styling system

**Phase 2 will connect everything and make it functional.**

---

## 🎯 Phase 2 Goals

### Primary Goals
1. **Complete Task Management System**
   - Add/edit/delete tasks
   - Mark tasks complete/incomplete
   - Filter tasks by date
   - Store tasks persistently

2. **Interactive Calendar**
   - Display tasks count per day
   - Show daily ratings on calendar
   - Navigate between months
   - Click day to view tasks

3. **Daily Ratings System**
   - Save/update ratings (0-10 scale)
   - Retrieve ratings for any date
   - Show emoji feedback
   - Display on calendar

4. **Data Persistence**
   - SQLite database setup
   - CRUD operations for all data types
   - AsyncStorage for app preferences
   - Data migration/backup utilities

5. **Real-time UI Updates**
   - Context hooks trigger re-renders
   - Optimistic updates (don't wait for DB)
   - Error handling and recovery
   - Loading states where needed

---

## 📊 Feature Breakdown

### Feature 1: Task Management System

#### 1.1 Database Layer
**File**: `src/services/database.ts` (NEW)

```typescript
// Initialize database
export async function initDatabase(): Promise<void>

// Task operations
export async function createTask(task: Task): Promise<Task>
export async function getTasksByDate(date: string): Promise<Task[]>
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task>
export async function deleteTask(id: string): Promise<void>
export async function toggleTaskComplete(id: string): Promise<Task>

// Batch operations
export async function deleteTasksByDate(date: string): Promise<void>
export async function getTasksByMonth(month: number, year: number): Promise<Task[]>
```

#### 1.2 Context Updates
**File**: `src/context/TasksContext.tsx` (UPDATE)

Current state: Context created, no DB integration
New state: Add DB operations

```typescript
// Add to context actions
interface TasksAction {
  type: 'LOAD_TASKS' | 'CREATE_TASK' | 'UPDATE_TASK' | 'DELETE_TASK' | 'TOGGLE_TASK'
  payload: Task | Task[] | string
}

// Add DB sync in reducer
const reducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_TASK':
      // 1. Add to local state
      // 2. Save to DB (async)
      // 3. Handle errors
      return { ...state, tasks: [...state.tasks, action.payload] }
    // ... other cases
  }
}
```

#### 1.3 Features
- ✅ Create task with description, optional time
- ✅ Edit task description and time
- ✅ Delete task (with confirmation)
- ✅ Toggle completion status
- ✅ Filter tasks by date
- ✅ Sort by time
- ✅ Validate task data

---

### Feature 2: Interactive Calendar

#### 2.1 Calendar Data Integration
**File**: `src/screens/DashboardScreen.tsx` (UPDATE)

Current state: Static calendar layout
New state: Display task counts and ratings

```typescript
// For each day cell, calculate:
// - Task count for that date: "X/Y" (completed/total)
// - Daily rating for that date: emoji or "-"
// - Color coding based on completion percentage

// Update dayStats display:
// Before: Always shows "0/0 -"
// After: Shows actual data from context
```

#### 2.2 Calendar Features
- ✅ Display task completion stats per day
- ✅ Display daily rating per day
- ✅ Color code based on completion %
- ✅ Highlight current day
- ✅ Navigate months (working already)
- ✅ Click day to see task details

---

### Feature 3: Daily Ratings System

#### 3.1 Database Layer
**File**: `src/services/database.ts` (UPDATE)

```typescript
// Rating operations
export async function setRating(date: string, rating: number): Promise<DailyRating>
export async function getRating(date: string): Promise<DailyRating | null>
export async function getRatingsForMonth(month: number, year: number): Promise<DailyRating[]>
export async function deleteRating(date: string): Promise<void>
```

#### 3.2 Context Updates
**File**: `src/context/RatingsContext.tsx` (UPDATE)

```typescript
// Add actions
interface RatingsAction {
  type: 'SET_RATING' | 'LOAD_RATING' | 'LOAD_RATINGS'
  payload: DailyRating | DailyRating[] | number
}

// Ensure immediate save to DB when rating changes
```

#### 3.3 Slider Integration
**File**: `src/screens/TasksScreen.tsx` (UPDATE)

```typescript
// Current: Slider exists but doesn't save
// New: Integrate with RatingsContext
// - Load rating when screen opens
// - Save rating when user interacts
// - Show loading state during save
```

---

### Feature 4: Data Persistence

#### 4.1 SQLite Setup
**File**: `src/services/database.ts` (NEW)

Install dependencies:
```bash
npm install react-native-sqlite-storage
# or
npm install @react-native-async-storage/async-storage
```

Schema:
```sql
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  time TEXT,
  isCompleted INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  completedAt TEXT
);

CREATE TABLE daily_ratings (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL UNIQUE,
  rating INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  isDefault INTEGER DEFAULT 0,
  tasks TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

#### 4.2 Initialization
```typescript
export async function initDatabase(): Promise<void> {
  // 1. Open/create database
  // 2. Run migrations
  // 3. Load default data (templates)
  // 4. Log success
}
```

#### 4.3 AsyncStorage for Preferences
```typescript
// Store user preferences
export async function setPreference(key: string, value: any): Promise<void>
export async function getPreference(key: string): Promise<any>

// Examples:
// - Theme preference
// - Default task templates
// - App settings
```

---

### Feature 5: Real-time UI Updates

#### 5.1 Update Flow
```
User Action
    ↓
Handler Function
    ↓
Update Context State (Immediate UI update)
    ↓
Save to Database (Async)
    ↓
Error? Rollback state or show toast
```

#### 5.2 Optimistic Updates
```typescript
// Example: Toggle task completion
const toggleTask = async (taskId: string) => {
  // 1. Update state immediately (UI updates instantly)
  dispatch({ type: 'TOGGLE_TASK', payload: taskId })
  
  // 2. Save to DB in background
  try {
    await database.toggleTaskComplete(taskId)
  } catch (error) {
    // 3. If error, rollback
    dispatch({ type: 'TOGGLE_TASK', payload: taskId })
    showError('Failed to update task')
  }
}
```

#### 5.3 Loading States
- Show spinner when saving
- Disable buttons during async operations
- Toast notifications for errors
- Success messages for major actions

---

## 📝 Implementation Checklist

### Phase 2.1: Database Setup (Day 1)
- [ ] Install SQLite library
- [ ] Create `src/services/database.ts`
- [ ] Define database schema
- [ ] Implement `initDatabase()`
- [ ] Add migration system
- [ ] Load default templates on first run
- [ ] Test database operations

### Phase 2.2: Task Management (Day 1-2)
- [ ] Implement task CRUD operations in database.ts
- [ ] Update TasksContext with DB sync
- [ ] Add task creation logic to AddTaskModalScreen
- [ ] Implement task editing
- [ ] Implement task deletion with confirmation
- [ ] Implement task toggle completion
- [ ] Test all task operations

### Phase 2.3: Calendar Integration (Day 2)
- [ ] Load tasks when month changes
- [ ] Calculate task stats for each day
- [ ] Display stats in calendar cells
- [ ] Load ratings when month changes
- [ ] Display ratings on calendar
- [ ] Add colors based on completion %
- [ ] Test calendar display

### Phase 2.4: Daily Ratings (Day 2-3)
- [ ] Implement rating CRUD in database.ts
- [ ] Update RatingsContext with DB sync
- [ ] Load rating when TasksScreen opens
- [ ] Save rating changes to database
- [ ] Show loading state during save
- [ ] Display rating emoji
- [ ] Test rating operations

### Phase 2.5: Data Persistence (Day 3)
- [ ] Implement AsyncStorage wrapper
- [ ] Save app preferences
- [ ] Implement data backup
- [ ] Test data survives app restart
- [ ] Handle database errors gracefully

### Phase 2.6: Polish & Testing (Day 3-4)
- [ ] Add error handling to all DB operations
- [ ] Add loading states to UI
- [ ] Add toast notifications
- [ ] Test on real device
- [ ] Verify data persistence
- [ ] Performance optimization
- [ ] Handle edge cases

---

## 🔧 Technical Details

### Database Library Options
1. **react-native-sqlite-storage** (Recommended)
   - Native SQLite
   - Good performance
   - Well maintained
   
2. **WatermeloDB**
   - Higher level abstraction
   - Better TypeScript support
   - More features built-in
   
3. **Realm**
   - Very fast
   - Large app support
   - Commercial backing

**Decision**: Use `react-native-sqlite-storage` for simplicity

### State Management Strategy
- Use Context + useReducer (already set up)
- Optimistic updates for better UX
- Async DB operations don't block UI
- Error handling with rollback
- No need for Redux (app is simple enough)

### Error Handling
```typescript
// Try-catch in all async operations
try {
  const result = await databaseOperation()
  dispatch({ type: 'SUCCESS', payload: result })
} catch (error) {
  console.error('Operation failed:', error)
  dispatch({ type: 'ERROR', payload: error })
  showErrorToast(error.message)
  // Optionally rollback previous state
}
```

### Performance Considerations
- Batch load tasks for entire month (not day by day)
- Lazy load data when screen opens
- Use React.memo for expensive components
- Debounce rapid updates (e.g., slider)
- Index date fields in database

---

## 📱 Screen-by-Screen Updates

### DashboardScreen
**Current**: Static calendar layout

**Updates Needed**:
1. Load tasks and ratings when month changes
2. Calculate task stats for each day
3. Display stats in calendar cells
4. Show completion percentage colors
5. Add error handling for data loading
6. Add loading spinner

### TasksScreen
**Current**: Skeleton screen with empty state

**Updates Needed**:
1. Load tasks for selected date on mount
2. Display task list (pending and completed)
3. Toggle task completion (with DB save)
4. Delete task with confirmation
5. Load daily rating on mount
6. Save rating changes to DB
7. Show loading states
8. Handle empty state

### AddTaskModalScreen
**Current**: Modal shell with input

**Updates Needed**:
1. Validate task input
2. Create task in database
3. Handle template selection
4. Create multiple tasks from template
5. Show success/error messages
6. Close modal on success

---

## 🧪 Testing Strategy

### Unit Tests
- Database CRUD operations
- Context reducers
- Utility functions
- Validators

### Integration Tests
- Full task lifecycle (create → complete → delete)
- Monthly calendar load and display
- Rating save and retrieve
- Navigation with data

### Manual Tests
- Add task and verify it appears in calendar
- Switch months and verify data loads
- Restart app and verify data persists
- Toggle task completion multiple times
- Set rating and verify emoji displays

---

## 📈 Success Criteria

By end of Phase 2, Habito should:
- ✅ Save and retrieve all user data
- ✅ Display data in calendar correctly
- ✅ Handle all task operations
- ✅ Save daily ratings
- ✅ Survive app restart with data intact
- ✅ Handle errors gracefully
- ✅ Perform efficiently
- ✅ Be 100% functional (not just static UI)

---

## ⏱️ Timeline

| Day | Task | Estimated Hours |
|-----|------|-----------------|
| 1 | Database setup + Task CRUD | 6-8 |
| 2 | Task management + Calendar integration | 5-6 |
| 3 | Daily ratings + Data persistence | 5-6 |
| 4 | Polish, testing, bug fixes | 4-5 |
| **Total** | | **20-25** |

---

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install react-native-sqlite-storage
npm install @react-native-async-storage/async-storage
```

### Step 2: Create Database Service
Create `src/services/database.ts` with:
- Database initialization
- Schema creation
- CRUD operations
- Error handling

### Step 3: Update Contexts
Update existing context files:
- TasksContext.tsx
- RatingsContext.tsx
- TemplatesContext.tsx

### Step 4: Update Screens
Update screen components:
- DashboardScreen.tsx
- TasksScreen.tsx
- AddTaskModalScreen.tsx

### Step 5: Test Thoroughly
- Manual testing on emulator
- Test data persistence
- Test error cases
- Verify performance

---

## 📚 Resources

### React Native SQLite
- [react-native-sqlite-storage Docs](https://github.com/andpor/react-native-sqlite-storage)
- [SQL Syntax Reference](https://www.w3schools.com/sql/)

### React Context API
- [Context API Docs](https://react.dev/reference/react/useContext)
- [useReducer Pattern](https://react.dev/reference/react/useReducer)

### React Native Best Practices
- [Performance Tips](https://reactnative.dev/docs/performance)
- [Error Handling](https://reactnative.dev/docs/error-boundaries)

---

## 🎯 Next Phase Preview

After Phase 2 completes:
- **Phase 3**: Template system and charts
- **Phase 4**: Notifications and advanced features
- **Phase 5**: Polish and app store submission

---

**Status**: 🚀 READY TO START  
**Next**: Install dependencies and begin database service implementation  
**Created**: January 25, 2026  
**Updated**: January 25, 2026 (15:07 UTC)
