# 🐛 BUG-003: Property 'defaultTemplates' doesn't exist

**Status**: ✅ RESOLVED  
**Severity**: HIGH (Runtime error)  
**Date Found**: January 26, 2026  
**Date Resolved**: January 26, 2026  
**Components Affected**: DashboardScreen, TemplatesContext, QuickAddTemplateModal

---

## 📋 Issue Description

React throws runtime error when trying to access `templatesState.defaultTemplates` property that doesn't exist in the TemplatesContext.

### Error Message
```
Render Error
Cannot read property 'defaultTemplates' of undefined
```

### Error Location
```
File: src/screens/DashboardScreen.tsx
Line: 181
Component: QuickAddTemplateModal
```

### Error Details
```
templates={[...templatesState.defaultTemplates, ...templatesState.customTemplates]}
                     ^
Cannot read property 'defaultTemplates' of undefined
```

---

## 🔍 Root Cause Analysis

### Issue 1: Wrong Destructuring Pattern
The developer tried to destructure `state` from `useTemplates()`, but this hook returns the context object directly, not an object with a `state` property.

**Wrong Code**:
```typescript
const { state: templatesState } = useTemplates();
// templatesState is undefined ❌

// Later:
templatesState.defaultTemplates // Error!
```

### Issue 2: Property Name Mismatch
Even if destructuring was correct, the TemplatesContext has a `templates` property (not `defaultTemplates`) for the default templates.

**TemplatesContextType Interface**:
```typescript
export interface TemplatesContextType {
  templates: Template[];           // ← Default templates (not 'defaultTemplates')
  customTemplates: Template[];     // ← Custom templates
  addTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => Template | undefined;
  getAllTemplates: () => Template[];
}
```

### Why It Happened
The developer may have:
1. Confused with other context hooks that have a `state` property
2. Not checked the actual TemplatesContextType interface
3. Made assumptions about property names

---

## 🔧 Solution Applied

### Before (Incorrect)
```typescript
const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { state, nextMonth, previousMonth } = useCalendar();
  const { state: tasksState, loadTasksForMonth, getTasksByDate } = useTasks();
  const { state: templatesState } = useTemplates();  // ❌ Wrong destructuring
  // ...
  
  <QuickAddTemplateModal
    visible={showQuickAddModal}
    templates={[...templatesState.defaultTemplates, ...templatesState.customTemplates]}  // ❌ Error!
    onClose={() => setShowQuickAddModal(false)}
  />
```

### After (Correct)
```typescript
const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { state, nextMonth, previousMonth } = useCalendar();
  const { state: tasksState, loadTasksForMonth, getTasksByDate } = useTasks();
  const { templates, customTemplates } = useTemplates();  // ✅ Correct
  // ...
  
  <QuickAddTemplateModal
    visible={showQuickAddModal}
    templates={[...templates, ...customTemplates]}  // ✅ Works!
    onClose={() => setShowQuickAddModal(false)}
  />
```

### Changes Made
**File**: `src/screens/DashboardScreen.tsx`

**Change 1** (Line 32):
```diff
- const { state: templatesState } = useTemplates();
+ const { templates, customTemplates } = useTemplates();
```

**Change 2** (Line 181):
```diff
- templates={[...templatesState.defaultTemplates, ...templatesState.customTemplates]}
+ templates={[...templates, ...customTemplates]}
```

---

## 📊 Impact Assessment

### Before Fix
- ❌ Component crashes on render
- ❌ Red screen error appears
- ❌ Cannot open template modal
- ❌ Templates feature broken

### After Fix
- ✅ Component renders correctly
- ✅ Modal opens without errors
- ✅ Templates list displays
- ✅ Full functionality restored

---

## 🧪 Verification Results

### Linting Status
```
✅ 0 errors
✅ 6 warnings (style-only, acceptable)
✅ No TypeScript errors
✅ Build successful
```

### Testing
```
✅ DashboardScreen renders
✅ QuickAddTemplateModal displays
✅ Templates load correctly
✅ No console errors
```

---

## 📝 Related Files

### Files Modified
1. `src/screens/DashboardScreen.tsx` (Lines 32, 181)

### Related Context Files
1. `src/context/TemplatesContext.tsx` - No changes needed
2. `src/components/QuickAddTemplateModal.tsx` - No changes needed

---

## 🎯 Prevention Strategies

### Understanding Context Patterns
Different contexts return different structures:

**With State**:
```typescript
export const useCalendar = (): CalendarContextType => {
  return { state, nextMonth, previousMonth };
  //       ^^^^^
  //       Has 'state' property
}

// Use as:
const { state, nextMonth, previousMonth } = useCalendar();
const calendarState = state.currentMonth;
```

**Without State**:
```typescript
export const useTemplates = (): TemplatesContextType => {
  return { templates, customTemplates, addTemplate, ... };
  //       No 'state' property, just properties directly
}

// Use as:
const { templates, customTemplates } = useTemplates();
const templateArray = templates;  // Not templates.defaultTemplates
```

### Best Practice Checklist
1. **Check Hook Return Type**
   - Is it `: StateType` or `: ContextType`?
   - Does it have a `state` property?
   - What properties are available?

2. **Read the Interface**
   ```typescript
   // Always check the interface
   export interface TemplatesContextType {
     templates: Template[];      // ← Note the property name
     customTemplates: Template[];
     // ...
   }
   ```

3. **Use IDE Hover**
   - Hover over hook to see return type
   - Check available properties
   - Use autocomplete

4. **TypeScript Will Help**
   ```typescript
   // This would show error:
   const x: typeof templatesState.defaultTemplates; // Error!
   // Because templatesState is never defined
   ```

---

## 📚 Context Patterns Reference

### All Context Hooks in Project

#### CalendarContext ✅
```typescript
const { state, nextMonth, previousMonth } = useCalendar();
// state: { currentMonth, currentYear, selectedDay }

// Access as:
state.currentMonth
state.currentYear
```

#### TasksContext ✅
```typescript
const { state: tasksState, loadTasksForMonth, ... } = useTasks();
// state: { tasks, selectedDate, loading, error }

// Access as:
tasksState.tasks
tasksState.loading
```

#### TemplatesContext ✅ (FIXED)
```typescript
const { templates, customTemplates, addTemplate, ... } = useTemplates();
// No state property, properties directly from context

// Access as:
templates         // Default templates
customTemplates   // User-created templates
```

---

## 🔗 Related Issues

### Similar Pattern Errors
- BUG-002: Missing state from useTasks() ✅ (Fixed)
- BUG-003: Wrong state structure from useTemplates() ✅ (Fixed)

### Prevention
All screens should follow these patterns consistently:
1. Check what each hook returns
2. Destructure correct properties
3. Use property names exactly as defined in interface
4. Test with TypeScript strict mode

---

## 📋 Checklist

### Development
- [x] Identify root cause (two issues: destructuring + property name)
- [x] Check TemplatesContext interface
- [x] Understand context return type
- [x] Update destructuring
- [x] Fix property references
- [x] Test component renders
- [x] Verify no console errors

### Documentation
- [x] Document the issue
- [x] Explain both root causes
- [x] Show both fixes
- [x] Provide context patterns reference
- [x] Include prevention tips

### Quality Assurance
- [x] Linting passes (0 errors)
- [x] TypeScript passes
- [x] Component renders
- [x] Modal displays
- [x] Templates load
- [x] No runtime errors

---

## 🎉 Resolution Summary

**Status**: ✅ **FULLY RESOLVED**

**Root Causes**: 
1. Wrong destructuring pattern from useTemplates()
2. Wrong property name (defaultTemplates vs templates)

**Fix**: 
1. Changed destructuring from `state: templatesState` to `templates, customTemplates`
2. Changed template reference from `templatesState.defaultTemplates` to `templates`

**Time to Resolution**: ~5 minutes

**Changes Required**: 1 file, 2 lines modified

**Testing**: ✅ Component renders successfully

**Build Status**: ✅ Builds successfully

**Deployment**: ✅ Ready

---

## 📞 Notes for Future Developers

### Quick Verification Before Using a Context Hook

1. **Find the hook definition** in `src/context/`
2. **Check the return type** - What does it return?
3. **Check the interface** - What properties are available?
4. **Copy pattern from interface** - Use exact property names
5. **Test in component** - Does it work?

### For TemplatesContext Specifically
```typescript
// WRONG - trying to access non-existent state
const { state: templatesState } = useTemplates();
// templatesState.defaultTemplates ❌

// CORRECT - accessing actual properties
const { templates, customTemplates } = useTemplates();
// templates ✅
// customTemplates ✅
```

### Common Mistakes to Avoid
1. ❌ Assuming all hooks have a `state` property
2. ❌ Making up property names
3. ❌ Not checking the interface definition
4. ❌ Copy-pasting patterns from other hooks
5. ❌ Not using IDE autocomplete

### How to Debug
If you see "Cannot read property X of undefined":
1. Check if variable is defined
2. Check if it's destructured correctly
3. Check if it's being used with correct property name
4. Hover in IDE to see what's available
5. Check the context interface for actual properties

---

**Made with ❤️ by the Habito Team**

*January 26, 2026 | Bug Resolved | Templates Working*
