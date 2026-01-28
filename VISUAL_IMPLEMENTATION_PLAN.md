# 📱 Habito - Visual Implementation Plan

**Created**: January 28, 2026  
**Based on**: User mockup requirements  
**Status**: Design specification for implementation

---

## 🎯 Application Flow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    🏠 DASHBOARD SCREEN                          │
│                  (Calendar View - Screen 1)                     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Status Bar: 9:41        📶 📡 🔋                         │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │           ◀  January 2026  ▶                             │  │
│  │                                                           │  │
│  │   Sun  Mon  Tue  Wed  Thu  Fri  Sat                      │  │
│  │  ┌───┬───┬───┬───┬───┬───┬───┐                          │  │
│  │  │   │   │   │   │ 1 │ 2 │ 3 │                          │  │
│  │  │   │   │   │   │0/0│0/0│0/0│                          │  │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                          │  │
│  │  │ 4 │ 5 │...│...│...│...│ 10│                          │  │
│  │  │0/0│0/0│   │   │   │   │0/0│                          │  │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                          │  │
│  │  │...│...│...│...│...│...│...│                          │  │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                          │  │
│  │  │...│...│...│...│...│...│...│                          │  │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                          │  │
│  │  │21 │22 │23 │24 │25 │26 │🟨27│ ← Current Day          │  │
│  │  │0/0│0/0│0/0│0/0│0/0│0/0│5/8│                          │  │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                          │  │
│  │  │28 │29 │30 │31 │   │   │   │                          │  │
│  │  │0/0│0/0│0/0│0/0│   │   │   │                          │  │
│  │  └───┴───┴───┴───┴───┴───┴───┘                          │  │
│  │                                                           │  │
│  │  👆 TAP ANY DATE → Navigate to Tasks Screen             │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    [USER TAPS A DATE]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    📋 TASKS SCREEN                              │
│                  (Task List - Screen 2)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Status Bar: 9:41        📶 📡 🔋                         │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  ◀  Date: Tuesday, 24 January 2026                       │  │
│  │  ─────────────────────────────────────────────            │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │ PENDING TASKS                    ▲               │     │  │
│  │  │                                  │               │     │  │
│  │  │ ☐ Morning workout routine    06:30              │     │  │
│  │  │ ☐ Do this                    08:15              │     │  │
│  │  │ ☐ Do that                    09:20              │     │  │
│  │  │ ☐ Team meeting preparation   10:00   Scrollable│     │  │
│  │  │ ☐ Review project docs        14:30   Area      │     │  │
│  │  │                                  │               │     │  │
│  │  │ ────────────────────────────────                │     │  │
│  │  │                                  ▼               │     │  │
│  │  │ COMPLETED TASKS                                 │     │  │
│  │  │                                                  │     │  │
│  │  │ ☑ Do this & that             23:10              │     │  │
│  │  │   (strikethrough, grayed)                       │     │  │
│  │  │                                                  │     │  │
│  │  │                                                  │     │  │
│  │  │                          ┌────┐                 │     │  │
│  │  │                          │ +  │ ← FAB Button    │     │  │
│  │  │                          └────┘                 │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │                                                           │  │
│  │  👆 TAP + BUTTON → Navigate to Add Task Modal           │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │          5                                                 │  │
│  │    YOUR DAY RATING                                        │  │
│  │  ────○─────────────────────                              │  │
│  │  0 1 2 3 4 5 6 7 8 9 10                                  │  │
│  │  (Purple gradient background)                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    [USER TAPS + BUTTON]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                 ➕ ADD NEW TASK MODAL                           │
│                    (Modal - Screen 3)                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Add New Task                              ✕        │  │  │
│  │  ├─────────────────────────────────────────────────────┤  │  │
│  │  │                                                     │  │  │
│  │  │  ┌─────────────────────────────────────────┐       │  │  │
│  │  │  │  Adding task for: 24.01.2026             │       │  │  │
│  │  │  │  (Purple gradient badge)                 │       │  │  │
│  │  │  └─────────────────────────────────────────┘       │  │  │
│  │  │                                                     │  │  │
│  │  │  Manual Task Entry                                 │  │  │
│  │  │  ┌────────────────────────────────────────┐        │  │  │
│  │  │  │ What do you need to do?                │        │  │  │
│  │  │  └────────────────────────────────────────┘        │  │  │
│  │  │  0/100                                             │  │  │
│  │  │                                                     │  │  │
│  │  │  Task Time                                         │  │  │
│  │  │  🕐 [08:00] [+ Add]                               │  │  │
│  │  │                                                     │  │  │
│  │  │  Or Choose from Templates (Optional)               │  │  │
│  │  │                         [+ Create Template]        │  │  │
│  │  │                                                     │  │  │
│  │  │  ┌─────────┬─────────┐                            │  │  │
│  │  │  │ ☀️      │ 💼      │                            │  │  │
│  │  │  │ Daily   │ Work    │                            │  │  │
│  │  │  │ Routine │ Day     │                            │  │  │
│  │  │  │ 3 tasks │ 4 tasks │                            │  │  │
│  │  │  ├─────────┼─────────┤                            │  │  │
│  │  │  │ 🏃      │ 🧘      │                            │  │  │
│  │  │  │ Fitness │ Self    │                            │  │  │
│  │  │  │         │ Care    │                            │  │  │
│  │  │  │ 3 tasks │ 3 tasks │                            │  │  │
│  │  │  ├─────────┼─────────┤                            │  │  │
│  │  │  │ 📚      │ 🌙      │                            │  │  │
│  │  │  │ Study   │ Evening │                            │  │  │
│  │  │  │ Session │ Wind    │                            │  │  │
│  │  │  │ 4 tasks │ 3 tasks │                            │  │  │
│  │  │  └─────────┴─────────┘                            │  │  │
│  │  │                                                     │  │  │
│  │  │  👆 CLICK TEMPLATES TO SELECT                     │  │  │
│  │  │                                                     │  │  │
│  │  │  ┌──────────────┬──────────────┐                  │  │  │
│  │  │  │   Cancel     │  Add 0 Tasks │                  │  │  │
│  │  │  └──────────────┴──────────────┘                  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Specifications

### Screen 1: Dashboard (Calendar View)

#### Layout Structure
```
┌──────────────────────────────────────┐
│ Status Bar                           │ 44px
├──────────────────────────────────────┤
│ ◀  January 2026  ▶                  │ 60px (Header)
├──────────────────────────────────────┤
│ Calendar Grid                        │
│ - 7 columns (weekday labels)         │
│ - 6 rows (dates)                     │
│ - Cell: 50x80px each                 │
│ - Gap: 4px between cells             │
│                                      │
│ Each Cell Contains:                  │
│ ┌──────────┐                        │
│ │    27    │ ← Date number (top)    │
│ │ 5/8    - │ ← Tasks (left bottom)  │
│ └──────────┘   Rating (right bottom)│
│                                      │
│ Color Coding:                        │
│ - Green: 100% tasks completed        │
│ - Gray: Partial completion           │
│ - Red: 0% completed                  │
│ - Yellow Border: Current day         │
└──────────────────────────────────────┘
```

#### Key Features
- ❌ **REMOVED**: "Quick Add from Template" button at top
- ✅ **Month Navigation**: Arrow buttons (previous/next month)
- ✅ **Current Day Highlighting**: Yellow border
- ✅ **Task Stats**: "X/Y" format in each cell
- ✅ **Date Selection**: Tap any date → Navigate to Tasks Screen
- ✅ **Visual Feedback**: Current day has distinct styling

#### Navigation Flow
```
User taps any date cell
        ↓
Navigate to Tasks Screen
        ↓
Pass selected date as parameter (DD.MM.YYYY format)
```

---

### Screen 2: Tasks Screen

#### Layout Structure
```
┌──────────────────────────────────────┐
│ Status Bar                           │ 44px
├──────────────────────────────────────┤
│ ◀  Date: Tuesday, 24 January 2026   │ 60px (Header)
├──────────────────────────────────────┤
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ Task List Container              │ │
│ │ (Bordered with 2px black)        │ │
│ │                                  │ │
│ │ PENDING TASKS                    │ │
│ │ ☐ Morning workout     06:30      │ │
│ │ ☐ Do this             08:15      │ │
│ │ ☐ Do that             09:20      │ │
│ │ ☐ Team meeting        10:00      │ │
│ │ ☐ Review docs         14:30      │ │
│ │                                  │ │
│ │ ──────────────────────           │ │
│ │                                  │ │
│ │ COMPLETED TASKS                  │ │
│ │ ☑ Do this & that      23:10      │ │
│ │   (strikethrough, grayed)        │ │
│ │                                  │ │
│ │                     ┌────┐       │ │
│ │                     │ +  │       │ │ FAB Button
│ │                     └────┘       │ │ (bottom-right)
│ └──────────────────────────────────┘ │
│                                      │
├──────────────────────────────────────┤
│ Rating Slider Section                │ 180px
│ ┌──────────────────────────────────┐ │
│ │         5                        │ │
│ │   YOUR DAY RATING                │ │
│ │ ────●─────────────────────       │ │
│ │ 0 1 2 3 4 5 6 7 8 9 10          │ │
│ │ (Purple gradient background)     │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

#### Key Features
- ✅ **Back Button**: Navigate back to Dashboard
- ✅ **Date Header**: Full date display with underline border
- ✅ **Task List**:
  - Bordered container (2px black)
  - Scrollable area
  - Section labels (PENDING / COMPLETED)
  - Checkboxes (unchecked → checked with yellow bg)
  - Task description + time
  - Strikethrough for completed tasks
  
- ✅ **FAB (Floating Action Button)**:
  - Position: Bottom-right inside task container
  - Size: 56x56px
  - Style: Black rounded square (8px border radius)
  - Icon: White "+"
  - Action: Navigate to Add Task Modal

- ✅ **Rating Slider**:
  - Position: Fixed at bottom
  - Background: Purple gradient
  - Range: 0-10 scale
  - Large value display
  - Gradient slider track (gold → orange → pink)
  - Labels: 0 through 10
  - Rounded corners (16px)

#### Task Item Design
```
┌────────────────────────────────┐
│ ☐ Morning workout     06:30   │  Pending
├────────────────────────────────┤
│ ☑ Do this & that      23:10   │  Completed
│   (strikethrough, gray color)  │
└────────────────────────────────┘
```

#### Navigation Flow
```
User taps + (FAB button)
        ↓
Navigate to Add Task Modal
        ↓
Pass current date as parameter
```

---

### Screen 3: Add Task Modal

#### Layout Structure
```
┌──────────────────────────────────────┐
│ Modal Overlay (Semi-transparent)      │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ Add New Task             ✕       │ │ Header
│ ├──────────────────────────────────┤ │
│ │                                  │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ │ Adding task for: 24.01.2026  │ │ │ Date Badge
│ │ │ (Purple gradient)            │ │ │
│ │ └──────────────────────────────┘ │ │
│ │                                  │ │
│ │ Manual Task Entry                │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ │ What do you need to do?      │ │ │ Input Field
│ │ └──────────────────────────────┘ │ │
│ │ 0/100                            │ │ Char Counter
│ │                                  │ │
│ │ Task Time                        │ │
│ │ 🕐 [08:00] [+ Add]              │ │ Time Picker
│ │                                  │ │
│ │ Or Choose from Templates         │ │
│ │           [+ Create Template]    │ │
│ │                                  │ │
│ │ ┌─────────┬─────────┐           │ │
│ │ │ ☀️      │ 💼      │           │ │ Template Grid
│ │ │ Daily   │ Work    │           │ │ (2 columns)
│ │ │ Routine │ Day     │           │ │
│ │ │ 3 tasks │ 4 tasks │           │ │
│ │ ├─────────┼─────────┤           │ │
│ │ │ 🏃      │ 🧘      │           │ │
│ │ │ Fitness │ Self    │           │ │
│ │ │         │ Care    │           │ │
│ │ │ 3 tasks │ 3 tasks │           │ │
│ │ ├─────────┼─────────┤           │ │
│ │ │ 📚      │ 🌙      │           │ │
│ │ │ Study   │ Evening │           │ │
│ │ │ Session │ Wind    │           │ │
│ │ │ 4 tasks │ 3 tasks │           │ │
│ │ └─────────┴─────────┘           │ │
│ │                                  │ │
│ │ [Template Preview Section]       │ │ Shown when
│ │ - Displays selected template     │ │ templates
│ │ - Checkbox for each task         │ │ selected
│ │ - Can deselect individual tasks  │ │
│ │                                  │ │
│ │ ┌──────────┬──────────────────┐  │ │
│ │ │  Cancel  │  Add 0 Tasks     │  │ │ Action Buttons
│ │ └──────────┴──────────────────┘  │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

#### Key Features
- ✅ **Modal Overlay**: Semi-transparent backdrop
- ✅ **Bottom Sheet Animation**: Slide up from bottom
- ✅ **Close Options**:
  - X button (top-right)
  - Cancel button (bottom-left)
  - Backdrop click

- ✅ **Manual Task Entry**:
  - Description input (max 100 chars)
  - Character counter
  - Time picker (HH:MM format)
  - "+ Add" button

- ✅ **Template Selection**:
  - 2x3 grid layout (6 default templates)
  - Template cards: icon + name + task count
  - Click to select/deselect
  - Selected state: Purple gradient background
  - Custom templates: Green border
  - "+ Create Template" button

- ✅ **Template Preview** (when templates selected):
  - Shows all tasks from selected templates
  - Checkbox for each task (can deselect)
  - Shows which template each task belongs to
  - "Select All" / "Clear All" buttons

- ✅ **Action Buttons**:
  - Cancel: Gray background
  - Save: Purple gradient
  - Dynamic text: "Add X Tasks" (X = count)
  - Disabled when no tasks selected

#### Template Card Design
```
┌─────────────┐
│     ☀️      │  Icon
│   Daily     │  Name
│  Routine    │
│  3 tasks    │  Count
└─────────────┘

Selected State:
┌─────────────┐
│ Purple      │
│ Gradient    │
│ Background  │
│ White Text  │
└─────────────┘
```

---

## 🔄 Complete Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  APP LAUNCH                                                 │
│       ↓                                                     │
│  Dashboard Screen                                           │
│  (Show current month calendar)                              │
│       ↓                                                     │
│  [User taps any date cell]                                 │
│       ↓                                                     │
│  Tasks Screen                                               │
│  - Load tasks for selected date                            │
│  - Display pending/completed tasks                         │
│  - Show rating slider                                      │
│       ↓                                                     │
│  [User taps + FAB button]                                  │
│       ↓                                                     │
│  Add Task Modal                                             │
│  - Show date badge with selected date                      │
│  - Manual task entry                                        │
│  - Template selection                                       │
│       ↓                                                     │
│  [User enters task(s) and saves]                           │
│       ↓                                                     │
│  Tasks Screen                                               │
│  - New tasks appear in list                                │
│  - Sorted by time                                          │
│       ↓                                                     │
│  [User taps back button]                                   │
│       ↓                                                     │
│  Dashboard Screen                                           │
│  - Calendar updated with task count                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📐 Measurements & Spacing

### Screen Dimensions
- **Phone Frame**: 393px × 852px
- **Status Bar**: 44px height
- **Safe Area**: 16px padding on sides

### Calendar Grid
- **Cell Size**: 50px × 80px
- **Gap**: 4px between cells
- **Date Number**: 18px, bold
- **Task Stats**: 12px, regular
- **Current Day Border**: 3px, yellow

### Tasks Screen
- **Header**: 60px height
- **Task Item**: 48px min-height
- **Checkbox**: 24px × 24px
- **FAB Button**: 56px × 56px
- **Slider Section**: 180px height

### Add Task Modal
- **Modal Border Radius**: 24px (top corners)
- **Template Card**: 160px × 120px
- **Template Icon**: 28px font-size
- **Button Height**: 48px

### Colors
```css
/* Primary Purple Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Slider Gradient */
background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FF4081 100%);

/* Success Green */
color: #4CAF50;

/* Border Gray */
border: 2px solid #212121;

/* Current Day */
border: 3px solid #FFC107;
```

---

## ✅ Implementation Checklist

### Dashboard Screen
- [ ] Remove "Quick Add from Template" button
- [ ] Implement calendar grid with 7×6 layout
- [ ] Add month navigation (previous/next buttons)
- [ ] Highlight current day with yellow border
- [ ] Display task count "X/Y" in each cell
- [ ] Color code cells based on completion %
- [ ] Make cells tappable → Navigate to Tasks Screen
- [ ] Pass selected date as parameter

### Tasks Screen
- [ ] Back button navigation to Dashboard
- [ ] Display full date in header with underline
- [ ] Task list with bordered container
- [ ] Section labels (PENDING / COMPLETED)
- [ ] Implement checkbox toggle (unchecked ↔ checked)
- [ ] Yellow background for checked items
- [ ] Strikethrough for completed tasks
- [ ] FAB button (bottom-right, inside container)
- [ ] Navigate to Add Task Modal on FAB tap
- [ ] Rating slider at bottom (0-10 scale)
- [ ] Purple gradient background for slider
- [ ] Gradient slider track (gold→orange→pink)

### Add Task Modal
- [ ] Modal overlay with semi-transparent backdrop
- [ ] Bottom sheet slide-up animation
- [ ] Date badge with purple gradient
- [ ] Manual task entry input (max 100 chars)
- [ ] Character counter (X/100)
- [ ] Time picker with default 08:00
- [ ] "+ Add" button for manual entry
- [ ] Template grid (2×3 layout, 6 templates)
- [ ] Template selection (click to toggle)
- [ ] Selected state: purple gradient
- [ ] Template preview section
- [ ] Individual task deselection
- [ ] Dynamic save button text ("Add X Tasks")
- [ ] Disable save button when no tasks
- [ ] Close modal: X button, Cancel, backdrop click
- [ ] Create custom template functionality
- [ ] Edit/delete custom templates

---

## 🎯 User Experience Goals

1. **Simple Navigation**: 3 screens, linear flow
2. **Quick Task Entry**: One tap from calendar to tasks
3. **Visual Feedback**: Clear current day, completion stats
4. **Flexible Input**: Manual entry OR templates
5. **No Clutter**: Clean design, focused on essentials

---

## 📊 State Management

```typescript
// Dashboard Screen State
interface DashboardState {
  currentMonth: number;
  currentYear: number;
  selectedDate: string; // DD.MM.YYYY
  tasksPerDay: Map<string, { completed: number; total: number }>;
}

// Tasks Screen State
interface TasksState {
  selectedDate: string;
  tasks: Task[];
  rating: number; // 0-10
  loading: boolean;
}

// Add Task Modal State
interface AddTaskModalState {
  date: string;
  manualTasks: Task[];
  selectedTemplates: Set<string>;
  selectedTasks: Map<string, Set<number>>;
}
```

---

## 🚀 Next Steps

1. **Review this visual plan** with the team
2. **Update existing screens** to match new design
3. **Remove "Quick Add" button** from Dashboard
4. **Implement exact layouts** from mockups
5. **Test navigation flow** between screens
6. **Verify visual consistency** across all screens

---

**Document Status**: ✅ Complete  
**Ready for Implementation**: Yes  
**Based on**: User-provided mockups (1.png, 2.png, HTML files)

