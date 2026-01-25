# Developer Quick Reference - Phase 1

**Last Updated**: January 24, 2026  
**Phase**: Foundation (50% Complete)

---

## Quick Start

### Using the Theme System

```typescript
import { Theme } from '@/styles/theme';
import { Colors } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { TextStyles } from '@/styles/typography';

// Use colors
<View style={{ backgroundColor: Theme.colors.primaryStart }}>
  <Text style={{ color: Theme.colors.text }}>Hello</Text>
</View>

// Use spacing
<View style={{ padding: Theme.spacing.md, gap: Theme.spacing.sm }}>
  ...
</View>

// Use text styles
<Text style={Theme.textStyles.h1}>Large Title</Text>
<Text style={Theme.textStyles.bodyRegular}>Body text</Text>

// Use shadows
<View style={[Theme.shadows.elevation2]}>Content</View>

// Use gradients
const { colors } = Theme.gradients.primary; // [start, end]
```

### Using Utilities

```typescript
import {
  formatDate,
  getCurrentDate,
  formatTaskCount,
  isValidTaskDescription,
  DEFAULT_TEMPLATES,
} from '@/utils';

// Date utilities
const today = getCurrentDate(); // "24.01.2026"
const formatted = formatDate(new Date()); // "24.01.2026"
const isCurrentDay = isToday("24.01.2026"); // boolean

// Time utilities
import { formatTime, sortByTime } from '@/utils';
const now = formatTime(new Date()); // "23:51"

// Formatters
const count = formatTaskCount(5, 8); // "5/8"
const emoji = getEmojiForRating(8); // "😄"

// Validators
if (isValidTaskDescription("Buy groceries")) {
  // Add task
}

// Constants
const templates = DEFAULT_TEMPLATES; // All 6 templates
```

### Type Definitions

```typescript
import { Task, Template, DailyRating } from '@/types';

const task: Task = {
  id: 'task-1',
  date: '24.01.2026',
  description: 'Morning workout',
  time: '06:00',
  isCompleted: false,
  createdAt: new Date().toISOString(),
};

const template: Template = {
  id: 'custom-morning',
  name: 'My Morning Routine',
  icon: '☀️',
  isDefault: false,
  tasks: [
    { description: 'Meditate', time: '06:00' },
    { description: 'Workout', time: '06:30' },
  ],
  createdAt: new Date().toISOString(),
};

const rating: DailyRating = {
  id: 'rating-1',
  date: '24.01.2026',
  rating: 8,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
```

---

## File Locations

### Theme & Styling
```
src/styles/
  ├── colors.ts          # Color palette
  ├── typography.ts      # Font configuration
  ├── spacing.ts         # 8px grid system
  ├── shadows.ts         # Elevation system
  └── theme.ts           # Unified export
```

### Types
```
src/types/
  ├── Task.ts            # Task interface
  ├── Template.ts        # Template interface
  ├── DailyRating.ts     # Rating interface
  └── AppState.ts        # App state types
```

### Utilities
```
src/utils/
  ├── dateHelpers.ts     # Date functions (16)
  ├── timeHelpers.ts     # Time functions (15)
  ├── formatters.ts      # Format functions (20)
  ├── validators.ts      # Validation functions (15)
  ├── constants.ts       # Constants & defaults
  └── index.ts           # Export index
```

---

## Key Constants

### Colors
```typescript
Colors.primaryStart       // #667eea
Colors.primaryEnd         // #764ba2
Colors.success           // #4CAF50
Colors.error             // #F44336
Colors.black             // #212121
Colors.white             // #FFFFFF
```

### Spacing (8px grid)
```typescript
Spacing.xs    // 4px
Spacing.sm    // 8px (1 unit)
Spacing.md    // 16px (2 units)
Spacing.lg    // 24px (3 units)
Spacing.xl    // 32px (4 units)
Spacing.xxl   // 48px (6 units)
Spacing.xxxl  // 64px (8 units)
```

### Default Templates
```typescript
DEFAULT_TEMPLATES.daily       // ☀️ Daily Routine
DEFAULT_TEMPLATES.work        // 💼 Work Day
DEFAULT_TEMPLATES.fitness     // 🏃 Fitness
DEFAULT_TEMPLATES.selfcare    // 🧘 Self Care
DEFAULT_TEMPLATES.study       // 📚 Study Session
DEFAULT_TEMPLATES.evening     // 🌙 Evening Wind-down
```

### Configuration
```typescript
TASK_CONFIG.MAX_DESCRIPTION_LENGTH    // 100
TEMPLATE_CONFIG.MAX_NAME_LENGTH       // 30
RATING_CONFIG.MIN                     // 0
RATING_CONFIG.MAX                     // 10
CALENDAR_CONFIG.WEEKS_TO_DISPLAY      // 6
CHART_CONFIG.RATING_DAYS_TO_SHOW      // 10
```

---

## Common Patterns

### Date Operations
```typescript
// Get today
const today = getCurrentDate();

// Parse date string
const date = parseDate("24.01.2026");

// Format for display
const display = formatFullDate("24.01.2026"); // "Friday, 24 January 2026"

// Get last 10 days
const last10 = getLastNDays(10);

// Check if date is today
if (isToday("24.01.2026")) { ... }
```

### Task Sorting
```typescript
import { sortByTime } from '@/utils/timeHelpers';

const sorted = sortByTime(tasks); // Sorted by time, no-time tasks at end
```

### Validation
```typescript
// Validate task before creating
if (!isValidTaskDescription(description)) {
  showError(getValidationError('description', 'maxLength'));
}

// Validate time
if (!isValidTime(timeString)) {
  showError("Invalid time format");
}

// Validate template
if (isValidTemplate(templateData)) {
  saveTemplate(templateData);
}
```

### Rating & Emojis
```typescript
const rating = 7;
const emoji = getEmojiForRating(rating);     // 😃
const formatted = formatRating(rating, true); // "7 😃"
const description = getRatingDescription(7); // "Good"
```

---

## Import Statements

### Theme Imports
```typescript
// Option 1: Import entire theme
import { Theme } from '@/styles/theme';
const color = Theme.colors.primary;

// Option 2: Import specific
import { Colors } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { TextStyles } from '@/styles/typography';

const bgColor = Colors.background;
const padding = Spacing.md;
```

### Utility Imports
```typescript
// Import everything from utils
import { 
  formatDate, 
  getCurrentDate,
  formatTaskCount,
  isValidTime,
  DEFAULT_TEMPLATES 
} from '@/utils';

// Import specific utility module
import * as DateHelpers from '@/utils/dateHelpers';
const today = DateHelpers.getCurrentDate();
```

### Type Imports
```typescript
import { Task, Template, DailyRating } from '@/types';

// Or specific imports
import type { Task } from '@/types/Task';
import type { Template } from '@/types/Template';
```

---

## Testing Utilities

All utilities are testable and have no side effects:

```typescript
// Example test
import { formatTaskCount, isValidTaskDescription } from '@/utils';

test('formatTaskCount formats correctly', () => {
  expect(formatTaskCount(5, 8)).toBe('5/8');
});

test('isValidTaskDescription validates correctly', () => {
  expect(isValidTaskDescription('Valid task')).toBe(true);
  expect(isValidTaskDescription('')).toBe(false);
  expect(isValidTaskDescription('x'.repeat(101))).toBe(false);
});
```

---

## Phase 1 Checklist

- ✅ Theme system setup
- ✅ Type definitions
- ✅ Utility library
- ⏳ Navigation setup
- ⏳ Context API setup
- ⏳ Database setup
- ⏳ Screen implementations

---

## Useful Commands

```bash
# Check TypeScript compilation
npm run tsc -- --noEmit

# Run linter
npm run lint

# Run tests (when ready)
npm test

# Type check utils
npm run tsc -- src/utils
```

---

## Notes

- All utilities are pure functions (no side effects)
- All code is TypeScript with proper types
- Default templates are ready to use from constants
- Color system follows brand guidelines exactly
- Spacing uses consistent 8px grid
- Ready for React/React Native components

---

**Phase 1 Progress**: 50% Complete ✅  
**Next**: Navigation & Context Setup
