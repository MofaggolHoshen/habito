# Figma Design Specifications - Habito App

## Design Overview

Based on the interactive HTML mockups (Screen-1-Dashboard, Screen-2-Tasks, Add-Task-Modal), this document provides complete specifications for creating the Figma design.

**App Name**: Habito - Daily Habit & Task Tracker  
**Brand Tagline**: Build Better Days  
**Device Frame**: iPhone 14 Pro (393 × 852px)  
**Design Style**: Modern, Clean, Material-inspired  
**Platform**: iOS & Android Compatible

---

## Design System

### Colors

#### Primary Palette

```
Primary Purple: #667eea
Primary Dark: #764ba2
Background White: #FFFFFF
Background Gray: #F5F5F5
Background Light: #F0F0F0
```

#### Semantic Colors

```
Success Green: #4CAF50
Success Dark: #45a049
Warning Yellow: #FFC107
Warning Orange: #FFA500
Error Red: #F44336
Error Dark: #D32F2F
Info Blue: #2196F3
```

#### Neutral Grays

```
Black: #212121
Dark Gray: #757575
Gray: #9E9E9E
Light Gray: #BDBDBD
Border Gray: #E0E0E0
Light Border: #F0F0F0
White: #FFFFFF
```

#### Accent Colors (Progress Slider)

```
Gradient Start (Purple): #667eea
Gradient End (Purple): #764ba2
Slider Gold: #FFD700
Slider Orange: #FFA500
Slider Pink: #FF4081
```

#### Checkbox Colors

```
Completed Background: #FFC107 (Yellow/Gold)
Completed Border: #FFC107
Checkmark Color: #212121
Uncompleted Border: #757575
```

### Typography

#### Font Family

```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
Fallback: sans-serif
```

#### Type Scale

```
H1 (Modal Title): 24px, Bold (700), Line Height: 32px
H2 (Screen Title): 24px, Bold (700), Line Height: 32px
H3 (Month Header): 18px, Bold (700), Line Height: 24px
H4 (Section Label): 16px, Semi-Bold (600), Line Height: 22px

Body Large: 16px, Regular (400), Line Height: 24px
Body Regular: 14px, Regular (400), Line Height: 20px
Body Small: 13px, Regular (400), Line Height: 18px

Caption: 12px, Regular (400), Line Height: 16px
Micro: 11px, Medium (500), Line Height: 14px
Tiny: 9px, Semi-Bold (600), Line Height: 12px

Status Bar: 14px, Semi-Bold (600)
```

#### Text Colors

```
Primary Text: #212121
Secondary Text: #757575
Disabled Text: #BDBDBD
On Dark: #FFFFFF
On Dark (80%): rgba(255, 255, 255, 0.8)
```

### Spacing System

```
Base Unit: 4px

Micro: 4px
Small: 8px
Medium: 12px
Default: 16px
Large: 20px
XLarge: 24px
XXLarge: 32px
Huge: 40px
```

### Border Radius

```
Small: 4px (Checkboxes, Day Cells)
Medium: 8px (Buttons, Cards, FAB)
Large: 12px (Template Cards, Date Display)
XLarge: 16px (Slider Section)
XXLarge: 24px (Modal Top)
Phone: 40px (Device Frame)
Circle: 50% (Avatar, Round Buttons)
```

### Shadows

#### Elevation Levels

```
Level 1 (Cards):
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

Level 2 (FAB Default):
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

Level 3 (FAB Hover):
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

Level 4 (Slider Section):
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

Level 5 (Phone Frame):
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

Slider Thumb:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3),
              0 0 0 4px rgba(255, 255, 255, 0.2);
```

---

## Screen 1: Dashboard/Home Screen

### Canvas Setup

- **Frame Name**: "Screen-1-Dashboard"
- **Device**: iPhone 14 Pro (393 × 852px)
- **Background**: #FFFFFF

### Layout Structure

#### 1. Status Bar (Top Fixed)

**Position**: Absolute, top  
**Size**: 393px × 44px  
**Background**: #FFFFFF  
**Z-Index**: 100

**Elements**:

- Time: "9:41" (14px, Semi-Bold #212121, Left aligned at 20px)
- Icons: Signal, WiFi, Battery (Right aligned at 20px, 4px gap between icons)

#### 2. Calendar Section

**Container**:

- Padding: 60px 16px 16px (top accounts for status bar)
- Margin Bottom: 24px

##### Calendar Header

**Layout**: Horizontal Flexbox  
**Height**: 40px  
**Margin Bottom**: 16px  
**Padding**: 0 8px

**Elements**:

1. Left Arrow

   - Size: 32×32px circle
   - Icon: "‹" (chevron)
   - Color: #212121
   - Hover: Background #F5F5F5
   - Border Radius: 50%

2. Month/Year Label

   - Text: "February 2026"
   - Font: 18px Bold #212121
   - Alignment: Center

3. Right Arrow
   - Same as left arrow
   - Icon: "›"

##### Calendar Grid

**Display**: CSS Grid  
**Grid Template**: repeat(7, 1fr)  
**Gap**: 4px  
**Total Width**: 361px (393 - 32px padding)

**Day Name Headers**:

- Text: "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
- Font: 12px Semi-Bold #757575
- Alignment: Center
- Padding: 8px 0

##### Calendar Day Cell

**Size**: Auto (responsive to grid)  
**Aspect Ratio**: 1:1 (square)  
**Border**: 1px solid #E0E0E0  
**Border Radius**: 4px  
**Background**: #FFFFFF  
**Padding**: 4px  
**Position**: Relative  
**Cursor**: Pointer

**States**:

1. Default

   - Border: 1px solid #E0E0E0
   - Background: #FFFFFF

2. Hover

   - Border: 1px solid #2196F3
   - Transform: scale(0.95)
   - Transition: all 0.2s

3. Current Day
   - Background: rgba(255, 193, 7, 0.2)
   - Border: 2px solid #FFC107

##### Day Cell Content

**Day Number**:

- Font: 14px Regular #212121
- Position: Top-left
- Padding: 2px 4px

**Statistics Container**:

- Position: Absolute bottom-left
- Display: Flex, Space-between
- Padding: 2px
- Font: 9px Semi-Bold
- Width: 100%

**Task Statistics** (Left):

- Format: "X/Y" (e.g., "5/5", "3/8")
- Colors:
  - All Complete (.complete): #4CAF50
  - Partial (.partial): #757575
  - None (.none): #F44336

**Progress Rating** (Right):

- Format: Single digit (0-10)
- Color: #FF4081
- Font: 9px

#### 3. Pie Chart Section

**Position**: Below calendar  
**Margin Top**: 24px  
**Margin Bottom**: 32px

##### Section Title

- Text: "Task Completion"
- Font: 16px Semi-Bold #212121
- Alignment: Center
- Margin Bottom: 16px

##### Pie Chart Component

- Type: Donut Chart
- Size: 160×160px
- Center alignment

**Chart Segments**:

1. Completed (Green)
   - Color: #4CAF50
   - Represents completed tasks
2. Incomplete (Gray)
   - Color: #E0E0E0
   - Represents pending tasks

**Center Label**:

- Background: White circle (100×100px)
- Value: "5/5" (24px Bold #212121)
- Label: "tasks" (12px Regular #757575)
- Alignment: Center

#### 4. Progress Line Chart

**Position**: Below pie chart  
**Background**: #FFFFFF  
**Border**: 1px solid #E0E0E0  
**Border Radius**: 8px  
**Padding**: 16px  
**Margin Bottom**: 16px

##### Section Title

- Text: "Progress Myself"
- Font: 16px Semi-Bold #212121
- Margin Bottom: 12px

##### Chart Canvas

- Size: 329×160px (full width minus padding)
- Type: Line chart with area fill

**Chart Configuration**:

- X-Axis (Dates): "0", "1", "2", ..., "10"

  - Font: 11px Regular #757575
  - Position: Bottom
  - Labels show last 10 days

- Y-Axis (Rating Scale): "0", "2", "4", "6", "8", "10"
  - Font: 11px Regular #F44336 (Red as shown in mockup)
  - Position: Left
  - Padding: 30px from left edge

**Chart Elements**:

- Grid Lines: 1px dashed #E0E0E0
- Line: 2px solid #2196F3
- Area Fill: #2196F3 with 20% opacity (gradient)
- Data Points: 4px radius circles #2196F3

##### Chart Annotation

- Text: "Mark up to 10"
- Font: 12px Italic #F44336
- Position: Below chart
- Alignment: Center
- Margin Top: 8px

---

## Screen 2: Daily Tasks Screen

### Canvas Setup

- **Frame Name**: "Screen-2-Tasks"
- **Device**: iPhone 14 Pro (393 × 852px)
- **Background**: #FFFFFF

### Layout Structure

#### 1. Status Bar

Same as Screen 1

#### 2. Header Section

**Container**:

- Padding: 60px 16px 24px
- Position: Relative

##### Back Button

- Position: Absolute left 0, top 0
- Size: 32×32px
- Icon: "‹" (chevron left)
- Font Size: 24px
- Color: #212121
- Hover: Background #F5F5F5, Border Radius 50%, Scale 1.1
- Transition: all 0.2s

##### Date Header

- Text: "Date: 01.02.2026"
- Font: 24px Bold #212121
- Padding Left: 40px (to clear back button)
- Padding Bottom: 8px
- Border Bottom: 2px solid #212121

#### 3. Task List Container

**Box**:

- Background: #FFFFFF
- Border: 2px solid #212121
- Border Radius: 8px
- Padding: 16px
- Margin: 0 16px 16px
- Position: Relative
- Padding Bottom: 80px (for FAB)

##### Section Labels

- Font: 12px Semi-Bold #757575
- Text Transform: Uppercase
- Margin Bottom: 8px

**Sections**:

1. "Pending Tasks" - Top section
2. "Completed Tasks" - Bottom section (after separator)

##### Section Separator

- Height: 1px
- Background: #E0E0E0
- Margin: 16px 0

##### Task List (Scrollable)

- Max Height: 400px
- Overflow Y: Auto
- Margin Bottom: 16px

#### 4. Task Item Component

**Layout**: Horizontal Flexbox  
**Padding**: 12px 0  
**Gap**: 12px  
**Cursor**: Pointer  
**Border Bottom**: 1px solid #F0F0F0 (except last)

**Hover State**:

- Background: #F5F5F5
- Border Radius: 4px
- Padding Horizontal: 8px
- Transition: background 0.2s

##### Checkbox

**Size**: 24×24px  
**Border**: 2px solid #757575  
**Border Radius**: 4px  
**Display**: Flex (center aligned)  
**Flex Shrink**: 0  
**Transition**: all 0.2s

**States**:

1. Unchecked

   - Background: Transparent
   - Border: 2px solid #757575

2. Checked
   - Background: #FFC107 (Yellow/Gold)
   - Border: 2px solid #FFC107
   - Checkmark: "✓" (16px #212121)

##### Task Content

**Display**: Flex, Space-between  
**Flex**: 1  
**Align Items**: Center

**Task Description**:

- Font: 16px Regular #212121
- Flex: 1
- Transition: all 0.3s

**Completed State**:

- Text Decoration: line-through
- Color: #9E9E9E
- Transition: all 0.3s

**Task Time**:

- Font: 14px Regular #757575
- Margin Left: 16px
- White Space: nowrap
- Display: Only if time is set (conditional rendering)
- Show placeholder or empty space if no time

**Completed State**:

- Color: #BDBDBD

#### 5. FAB (Floating Action Button)

**Position**: Absolute  
**Bottom**: 16px (inside task list container)  
**Right**: 16px  
**Z-Index**: 10

**Button Style**:

- Size: 56×56px
- Background: #212121
- Border Radius: 8px (rounded square, not circle)
- Box Shadow: 0 4px 8px rgba(0,0,0,0.2)
- Cursor: Pointer
- Transition: all 0.2s

**Icon**:

- Character: "+"
- Font Size: 24px
- Color: #FFFFFF
- Font Weight: 300
- Center aligned

**States**:

1. Hover

   - Transform: scale(1.05)
   - Box Shadow: 0 6px 12px rgba(0,0,0,0.3)

2. Active
   - Transform: scale(0.95)

#### 6. Progress Slider Section

**Position**: Absolute (Fixed to bottom)  
**Bottom**: 16px  
**Left**: 16px  
**Right**: 16px  
**Z-Index**: 5

**Container**:

- Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- Padding: 20px
- Border Radius: 16px
- Box Shadow: 0 8px 24px rgba(102, 126, 234, 0.3)

##### Slider Value Display

- Font: 32px Bold #FFFFFF
- Text Align: Center
- Margin Bottom: 8px
- Text Shadow: 0 2px 4px rgba(0,0,0,0.2)
- Letter Spacing: 1px

##### Slider Label

- Text: "Your Day Rating"
- Font: 12px Semi-Bold #FFFFFF (90% opacity)
- Text Transform: Uppercase
- Letter Spacing: 1.5px
- Text Align: Center
- Margin Bottom: 16px

##### Slider Track Container

- Position: Relative
- Width: 100%
- Height: 50px
- Margin Bottom: 4px

##### Slider Input

- -webkit-appearance: none
- Width: 100%
- Height: 8px
- Border Radius: 4px
- Background: rgba(255, 255, 255, 0.2)
- Outline: None
- Position: Absolute
- Top: 21px
- Backdrop Filter: blur(10px)

##### Slider Active Track (Visual)

- Position: Absolute
- Top: 21px
- Left: 0
- Height: 8px
- Background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FF4081 100%)
- Border Radius: 4px 0 0 4px
- Box Shadow: 0 2px 8px rgba(255, 193, 7, 0.4)
- Pointer Events: None
- Width: Calculated based on value (0-100%)

##### Slider Thumb

**Default**:

- Size: 28×28px
- Border Radius: 50%
- Background: linear-gradient(135deg, #FFF 0%, #F0F0F0 100%)
- Cursor: Pointer
- Border: 3px solid #FFFFFF
- Box Shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px rgba(255,255,255,0.2)
- Transition: all 0.2s ease

**Hover**:

- Transform: scale(1.1)
- Box Shadow: 0 6px 16px rgba(0,0,0,0.4), 0 0 0 6px rgba(255,255,255,0.3)

##### Slider Labels

- Display: Flex, Space-between
- Margin Top: 8px
- Padding: 0 4px
- Font: 11px Medium rgba(255, 255, 255, 0.8)

**Labels**: "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"

---

## Screen 3: Add Task Modal

### Canvas Setup

- **Frame Name**: "Add-Task-Modal"
- **Device**: iPhone 14 Pro (393 × 852px)
- **Background**: Semi-transparent overlay

### Layout Structure

#### 1. Modal Overlay

**Full Screen**:

- Position: Absolute (covers entire screen)
- Top: 0, Left: 0, Right: 0, Bottom: 0
- Background: rgba(0, 0, 0, 0.5)
- Display: Flex
- Align Items: flex-end
- Z-Index: 200
- Animation: fadeIn 0.3s ease

#### 2. Modal Content

**Bottom Sheet Style**:

- Width: 100%
- Background: #FFFFFF
- Border Radius: 24px 24px 0 0 (top corners only)
- Padding: 24px
- Max Height: 90%
- Overflow Y: Auto
- Animation: slideUp 0.3s ease

**Animation Keyframes**:

```css
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

#### 3. Modal Header

**Layout**: Flex, Space-between  
**Padding Bottom**: 16px  
**Border Bottom**: 2px solid #E0E0E0  
**Margin Bottom**: 24px

##### Title

- Text: "Add New Task"
- Font: 24px Bold #212121

##### Close Button

- Size: 32×32px
- Icon: "×" (24px)
- Color: #757575
- Border Radius: 50%
- Cursor: Pointer
- Transition: all 0.2s

**Hover**:

- Background: #F5F5F5
- Color: #212121

#### 4. Date Display Section

**Container**:

- Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- Padding: 16px
- Border Radius: 12px
- Margin Bottom: 24px
- Text Align: Center
- Box Shadow: 0 4px 12px rgba(102, 126, 234, 0.2)

**Date Label**:

- Text: "Adding task for"
- Font: 12px Regular rgba(255, 255, 255, 0.8)
- Text Transform: Uppercase
- Letter Spacing: 1px
- Margin Bottom: 4px

**Date Value**:

- Text: "01.02.2026"
- Font: 20px Bold #FFFFFF

#### 5. Manual Task Entry Section

**Label**:

- Text: "Manual Task Entry"
- Font: 14px Semi-Bold #212121
- Margin Bottom: 8px

##### Task Description Input

- Width: 100%
- Padding: 14px 16px
- Font: 16px Regular
- Border: 2px solid #E0E0E0
- Border Radius: 8px
- Outline: None
- Transition: all 0.2s
- Placeholder: "What do you need to do?"
- Placeholder Color: #BDBDBD
- Max Length: 100 characters

**Focus State**:

- Border Color: #667eea
- Box Shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)

**Character Counter**:

- Font: 12px Regular #757575
- Text Align: Right
- Margin Top: 4px
- Format: "X/100"

##### Time Picker Row

**Layout**: Flex, Gap 12px  
**Align Items**: Center

**Time Icon**:

- Character: "🕐"
- Font Size: 24px

**Time Input**:

- Flex: 1
- Padding: 14px 16px
- Font: 16px Regular
- Border: 2px solid #E0E0E0
- Border Radius: 8px
- Type: time
- Transition: all 0.2s
- **Optional**: User can leave empty

**Focus State**:

- Border Color: #667eea
- Box Shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)

**Add Button**:

- Padding: 12px 20px
- Background: #667eea
- Color: #FFFFFF
- Border: None
- Border Radius: 8px
- Font: 14px Semi-Bold
- Cursor: Pointer
- White Space: nowrap
- Transition: all 0.2s

**Hover**:

- Background: #5568d3
- Transform: translateY(-1px)

**Active**:

- Transform: translateY(0)

**Disabled** (if description empty):

- Background: #E0E0E0
- Color: #BDBDBD
- Cursor: not-allowed

**Helper Text**:

- Font: 12px Regular #757575
- Margin Top: 4px
- Text: "Add individual tasks one at a time. Time is optional."

#### 6. Template Selection Section

**Margin Top**: 24px

##### Templates Header

**Layout**: Flex, Space-between  
**Margin Bottom**: 12px

**Label**:

- Text: "Or Choose from Templates (Optional)"
- Font: 14px Semi-Bold #212121

**Create Template Button**:

- Padding: 8px 16px
- Background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%)
- Color: #FFFFFF
- Border: None
- Border Radius: 8px
- Font: 13px Semi-Bold
- Cursor: Pointer
- Display: Flex, Align Items Center
- Box Shadow: 0 2px 6px rgba(76, 175, 80, 0.3)
- Transition: all 0.2s

**Icon**: "+" (16px, margin-right 4px)

**Hover**:

- Background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%)
- Transform: translateY(-1px)
- Box Shadow: 0 4px 8px rgba(76, 175, 80, 0.4)

**Active**:

- Transform: translateY(0)

##### Templates Grid

**Display**: CSS Grid  
**Grid Template**: repeat(2, 1fr)  
**Gap**: 12px  
**Margin Bottom**: 24px

##### Template Card

**Size**: Auto (responsive)  
**Padding**: 16px  
**Border**: 2px solid #E0E0E0  
**Border Radius**: 12px  
**Background**: #FFFFFF  
**Text Align**: Center  
**Cursor**: Pointer  
**Transition**: all 0.2s

**States**:

1. Default

   - Border: 2px solid #E0E0E0
   - Background: #FFFFFF

2. Hover

   - Border Color: #667eea
   - Background: #F5F7FF
   - Transform: translateY(-2px)
   - Box Shadow: 0 4px 12px rgba(102, 126, 234, 0.15)

3. Selected

   - Border Color: #667eea
   - Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
   - Color: #FFFFFF

4. Custom Template

   - Border Color: #4CAF50
   - Background: #F1F8F4

5. Custom Hover

   - Border Color: #4CAF50
   - Background: #E8F5E9

6. Custom Selected
   - Background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%)

**Content**:

- Icon: 28px emoji (☀️, 💼, 🏃, 🧘, 📚, 🌙)
  - Margin Bottom: 8px
- Name: 13px Semi-Bold #212121 (white when selected)
  - Margin Bottom: 4px
- Task Count: 11px Regular #212121, 70% opacity (white when selected)
  - Format: "X tasks"

**Edit Button** (All Templates):

- Position: Absolute top-right (28px from right, 4px from top)
- Size: 20×20px circle
- Background: #667eea (Purple)
- Color: #FFFFFF
- Border: None
- Font Size: 12px
- Character: "✎" (pencil/edit icon)
- Display: none (visible on hover)
- Transition: all 0.2s

**Edit Button Hover**:

- Background: #5568d3
- Transform: scale(1.1)

**Delete Button** (All Templates):

- Position: Absolute top-right (4px, 4px)
- Size: 20×20px circle
- Background: #F44336 (Red)
- Color: #FFFFFF
- Border: None
- Font Size: 12px
- Character: "×"
- Display: none (visible on hover)
- Transition: all 0.2s
- Note: For default templates, shows alert message "Default templates cannot be deleted. You can only edit them."

**Delete Button Hover**:

- Background: #D32F2F
- Transform: scale(1.1)

**Template Card Hover Behavior**:

- When hovering over any template card (default or custom):
  - Both edit (✎) and delete (×) buttons become visible
  - Edit button appears to the left of delete button

**Default Templates**:

1. Daily Routine (☀️) - 3 tasks (editable, not deletable)
2. Work Day (💼) - 4 tasks (editable, not deletable)
3. Fitness (🏃) - 3 tasks (editable, not deletable)
4. Self Care (🧘) - 3 tasks (editable, not deletable)
5. Study Session (📚) - 4 tasks (editable, not deletable)
6. Evening Wind-down (🌙) - 3 tasks (editable, not deletable)

#### 7. Template Preview Section

**Display**: Conditional (when template selected)  
**Margin Top**: 24px

##### Preview Header

**Layout**: Flex, Space-between  
**Margin Bottom**: 8px

**Label**:

- Text: "Tasks to add:"
- Font: 14px Semi-Bold #212121

**Action Buttons**:

- Select All: Button (small)

  - Font: 12px Semi-Bold #667eea
  - Background: None
  - Padding: 4px 8px
  - Border Radius: 4px
  - Hover: Background #F5F7FF

- Clear All: Button (small)
  - Font: 13px Semi-Bold #667eea
  - Background: None
  - Padding: 4px 8px
  - Border Radius: 4px
  - Hover: Background #F5F7FF

##### Helper Text

- Text: "Click on template tasks to select/deselect individual items"
- Font: 12px Regular #757575
- Margin Bottom: 12px

##### Preview List

**Container**:

- Background: #F5F7FF
- Border: 2px solid #667eea
- Border Radius: 8px
- Padding: 12px

##### Preview Task Item

**Layout**: Flex, Align Items Center  
**Padding**: 8px  
**Margin Bottom**: 6px  
**Background**: #FFFFFF  
**Border Radius**: 6px  
**Font**: 14px  
**Cursor**: Pointer  
**Transition**: all 0.2s

**Hover**:

- Background: #F9F9F9

**Selected State**:

- Background: #E8EBFF

**Content**:

1. Checkbox (20×20px)

   - Border: 2px solid #BDBDBD
   - Border Radius: 4px
   - Margin Right: 8px
   - Selected: Background #667eea, Border #667eea, Checkmark white

2. Icon (16px emoji)

   - Margin Right: 8px

3. Task Name

   - Flex: 1
   - Color: #212121
   - Font Weight: 500

4. Time

   - Color: #757575
   - Font: 13px

5. Remove Button
   - Character: "×"
   - Font Size: 18px
   - Color: #F44336
   - Opacity: 0.6
   - Margin Left: 8px
   - Cursor: Pointer
   - Hover: Opacity 1, Scale 1.2

#### 8. Action Buttons

**Layout**: Flex, Gap 12px  
**Margin Top**: 32px

##### Cancel Button

- Flex: 1
- Padding: 16px
- Font: 16px Semi-Bold
- Background: #F5F5F5
- Color: #757575
- Border: None
- Border Radius: 12px
- Cursor: Pointer
- Transition: all 0.2s

**Hover**:

- Background: #E0E0E0
- Color: #212121

##### Save/Add Button

- Flex: 1
- Padding: 16px
- Font: 16px Semi-Bold #FFFFFF
- Background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- Border: None
- Border Radius: 12px
- Box Shadow: 0 4px 12px rgba(102, 126, 234, 0.3)
- Cursor: Pointer
- Transition: all 0.2s

**Hover**:

- Transform: translateY(-2px)
- Box Shadow: 0 6px 16px rgba(102, 126, 234, 0.4)

**Active**:

- Transform: translateY(0)

**Disabled**:

- Background: #E0E0E0
- Color: #BDBDBD
- Cursor: not-allowed
- Box Shadow: none

**Button Text**:

- "Add Task" (no tasks)
- "Add 1 Task" (single task)
- "Add X Tasks" (multiple tasks)

---

## Component Library

### 1. Calendar Day Cell Component

**Base**: 48×48px (auto in grid)  
**Variants**:

- Default
- Current Day
- Has Tasks
- Selected
- Empty (for padding)

**Props**:

- dayNumber: Number (1-31)
- totalTasks: Number
- completedTasks: Number
- progressRating: Number (0-10) optional
- isCurrentDay: Boolean
- isSelected: Boolean

### 2. Task Item Component

**Height**: 48px (auto-layout)  
**Variants**:

- Incomplete
- Completed

**Props**:

- description: Text
- time: Time (HH:MM) | null (optional)
- isCompleted: Boolean
- onToggle: Function

### 3. Checkbox Component

**Size**: 24×24px  
**Variants**:

- Unchecked
- Checked

**Props**:

- isChecked: Boolean
- onChange: Function

**States**: Default, Hover, Active, Disabled

### 4. Template Card Component

**Size**: Auto (responsive in grid)  
**Variants**:

- Default
- Selected
- Custom (green accent)
- Hover (with edit/delete buttons visible)

**Props**:

- icon: Emoji/Text
- name: Text
- taskCount: Number
- isCustom: Boolean
- isDefault: Boolean
- isSelected: Boolean
- onEdit: Function (all templates)
- onDelete: Function (all templates, but shows alert for defaults)

**Child Components**:

- Edit Button (✎): 20×20px circle, purple (#667eea), appears on hover
- Delete Button (×): 20×20px circle, red (#F44336), appears on hover

**Behavior**:

- Hover: Shows edit and delete buttons
- Edit: Opens template modal in edit mode
- Delete: Shows confirmation (or alert for default templates)

### 5. FAB Button Component

**Size**: 56×56px  
**Shape**: Rounded square (8px radius)

**Variants**:

- Default
- Hover
- Active

**Props**:

- icon: Icon/Text
- onClick: Function

### 6. Progress Slider Component

**Height**: Auto (~180px)  
**Background**: Gradient

**Props**:

- value: Number (0-10)
- onChange: Function
- label: Text (optional)

---

## Interactive Specifications

### Animations

#### Page Transitions

**Duration**: 300ms  
**Easing**: ease-out (forward), ease-in (back)

**Home → Tasks**:

- Type: Push from right (iOS) / Material motion (Android)
- Animation: translateX(100%) → translateX(0)

**Tasks → Home**:

- Type: Pop to left
- Animation: translateX(0) → translateX(-100%)

#### Modal Animations

**Overlay Fade In**:

- Duration: 300ms
- From: opacity 0
- To: opacity 1

**Modal Slide Up**:

- Duration: 300ms
- Easing: ease
- From: translateY(100%)
- To: translateY(0)

#### Checkbox Toggle

**Duration**: 200ms  
**Easing**: ease

**Check Animation**:

- Checkbox: scale(0.8) → scale(1)
- Checkmark: opacity 0 → opacity 1
- Background: transparent → #FFC107

**Strikethrough**:

- Duration: 300ms
- Width: 0% → 100%
- Delay: 100ms

#### Hover Effects

**Duration**: 200ms  
**Easing**: ease

**Scale Effects**:

- Calendar day: scale(1) → scale(0.95)
- FAB: scale(1) → scale(1.05)
- Template card: translateY(0) → translateY(-2px)

### Touch Targets

**Minimum Size**: 44×44px (iOS) / 48×48px (Android)

**Components**:

- Calendar day cell: Auto (meets minimum)
- Checkbox: 24×24px with 10px padding = 44×44px
- FAB: 56×56px ✓
- Back button: 32×32px with 6px padding = 44×44px
- Close button: 32×32px with 6px padding = 44×44px

### Haptic Feedback

**Triggers**:

- Checkbox toggle: Light impact
- Slider step change: Light impact
- FAB press: Medium impact
- Task delete: Heavy impact
- Template edit button: Light impact
- Template delete button: Medium impact

### Template Edit/Delete Interactions

**Edit Template Flow**:

1. User hovers over any template card (default or custom)
2. Edit (✎) and Delete (×) buttons fade in (200ms)
3. Click edit button → Opens "Edit Template" modal
4. Modal title changes to "Edit Template"
5. Save button text changes to "Update Template"
6. Pre-filled with existing template data
7. User modifies name, icon, tasks, or times
8. Click "Update Template" → Saves changes
9. Template card updates immediately in grid
10. If template was selected, preview updates automatically

**Delete Template Flow**:

1. User hovers over template card
2. Click delete (×) button
3. For default templates: Alert "Default templates cannot be deleted. You can only edit them."
4. For custom templates: Confirmation dialog appears
5. If confirmed: Template removed from grid with fade-out animation
6. If template was selected: Preview clears automatically

**Hover States**:

- Template card hover: Edit and delete buttons appear (transition 200ms)
- Edit button hover: Background darkens (#5568d3), scale(1.1)
- Delete button hover: Background darkens (#D32F2F), scale(1.1)
- Buttons disappear when mouse leaves card area

---

## Accessibility Specifications

### Color Contrast Ratios

**WCAG AA Compliance**:

- Text Primary (#212121) on White: 16.1:1 ✓✓✓ (AAA)
- Text Secondary (#757575) on White: 4.7:1 ✓✓ (AA)
- Success (#4CAF50) on White: 3.4:1 ⚠ (Use for icons, not small text)
- Button White Text on Primary (#667eea): 4.6:1 ✓✓ (AA)

### Screen Reader Support

**ARIA Labels**:

- Calendar day: "Day [number], [completed] of [total] tasks, rating [value]"
- Task checkbox: "[description] at [time], [completed/incomplete]"
- Slider: "Rate your day, current value [number] out of 10"
- FAB: "Add new task"
- Template card: "[name] template, [count] tasks, editable"
- Template edit button: "Edit [template name] template"
- Template delete button: "Delete [template name] template" (custom only) or "Cannot delete default template" (default templates)

### Keyboard Navigation

**Tab Order**:

1. Back button (if present)
2. Calendar navigation arrows
3. Calendar day cells (row by row)
4. Chart elements (focusable)
5. Task checkboxes
6. FAB button
7. Slider
8. Modal elements (when open)

**Keyboard Shortcuts**:

- ESC: Close modal
- Enter: Select/toggle focused element
- Space: Toggle checkbox
- Arrow Keys: Navigate calendar, adjust slider

---

## Responsive Behavior

### Breakpoints

**Mobile Devices**:

- Small: 360px (Budget Android)
- Medium: 375px (iPhone SE)
- Default: 393px (iPhone 14 Pro) ← Design baseline
- Large: 428px (iPhone 14 Pro Max)

### Scaling Rules

- Maintain 16px horizontal margins on all screens
- Calendar cells scale proportionally to viewport width
- Charts maintain aspect ratio but scale to fit
- FAB always 16px from bottom-right corner
- Slider section maintains fixed height, scales width

---

## Export Settings

### For Developers

**Formats**: PNG, SVG  
**Scales**: @1x, @2x, @3x (iOS) / mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi (Android)

**Assets to Export**:

- Icons (24×24px base size)
- Template emoji icons
- Chart components (as SVG if possible)
- Slider thumb (as SVG for scaling)

**Design Tokens**: Export as JSON

```json
{
  "colors": { ... },
  "typography": { ... },
  "spacing": { ... },
  "borderRadius": { ... },
  "shadows": { ... }
}
```

### For Presentation

**Formats**: PDF, PNG  
**Scale**: @2x  
**Include**: Screens with spacing annotations

---

## Development Handoff Notes

### CSS Gradients

**Primary Gradient** (Purple):

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Success Gradient** (Green):

```css
background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
```

**Slider Track Gradient**:

```css
background: linear-gradient(90deg, #ffd700 0%, #ffa500 50%, #ff4081 100%);
```

**Slider Thumb Gradient**:

```css
background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
```

### Special Effects

**Backdrop Blur** (Slider background):

```css
backdrop-filter: blur(10px);
```

**Text Shadow** (Slider value):

```css
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
```

**Multi-layer Shadow** (Slider thumb):

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.2);
```

### Platform-Specific Notes

**iOS**:

- Use San Francisco (system font)
- Safe area insets: top 44px, bottom 34px (iPhone with notch)
- Haptic feedback on interactions
- Swipe-back gesture from left edge

**Android**:

- Use Roboto (system font)
- Status bar height: 24dp
- Navigation bar height: 48dp
- Material ripple effects on touch
- Hardware back button handling

---

## Quality Checklist

### Design Completeness

- [x] All 3 screens designed (Home, Tasks, Add Task Modal)
- [x] All components have variants (default, hover, active, selected)
- [x] Color styles applied consistently
- [x] Text styles applied consistently
- [x] Auto-layout configured for responsive behavior
- [x] Spacing system followed (4px base)
- [x] Border radius system consistent

### Interactions

- [x] Navigation flows defined
- [x] Button states specified
- [x] Animations documented
- [x] Transitions smooth (300ms standard)
- [x] Hover effects defined
- [x] Active/pressed states included

### Accessibility

- [x] Color contrast meets WCAG AA
- [x] Touch targets minimum 44×44px
- [x] ARIA labels documented
- [x] Keyboard navigation supported
- [x] Screen reader compatible

### Documentation

- [x] Component specifications complete
- [x] Interaction states documented
- [x] Design tokens ready for export
- [x] Developer handoff notes included
- [x] Platform-specific notes provided

---

## Appendix: Mockup Screenshots

### Screen 1: Dashboard

- Calendar with monthly view
- Task statistics on each day (e.g., "5/5", "3/8")
- Progress rating displayed (e.g., "8", "5")
- Current day highlighted with yellow background
- Pie chart showing task completion
- Line chart showing 10-day progress history

### Screen 2: Tasks

- Date header with underline
- Back button (left arrow)
- Task list in bordered container
- Tasks grouped: Pending (top), Completed (bottom)
- Yellow checkboxes for completed tasks
- Black square FAB button (not circular)
- Purple gradient slider at bottom
- Large value display above slider
- Numbered scale labels (0-10)

### Screen 3: Add Task Modal

- Bottom sheet style modal
- Purple gradient date display section
- Manual task entry with time picker
- Template grid (2 columns)
- 6 default templates with emoji icons
- Green "Create Template" button
- Template preview with selectable tasks
- Purple gradient save button
- Responsive to template selection

---

## File Organization

```
ToDo-App-Design.fig
├── 📱 Screens
│   ├── Screen-1-Dashboard
│   ├── Screen-2-Tasks
│   └── Screen-3-Add-Task-Modal
├── 🎨 Components
│   ├── Calendar
│   │   ├── Calendar Day Cell (variants)
│   │   └── Calendar Header
│   ├── Tasks
│   │   ├── Task Item (variants)
│   │   ├── Checkbox (variants)
│   │   └── Task List Container
│   ├── Templates
│   │   ├── Template Card (variants)
│   │   └── Template Grid
│   ├── Charts
│   │   ├── Pie Chart
│   │   └── Line Chart
│   ├── Inputs
│   │   ├── Text Input (variants)
│   │   ├── Time Input
│   │   └── Slider Component
│   └── Buttons
│       ├── FAB Button
│       ├── Primary Button
│       ├── Secondary Button
│       └── Icon Button
├── 🎭 Modals
│   ├── Add Task Modal
│   └── Create Template Modal
├── 📐 Design System
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Border Radius
│   └── Shadows
└── 📋 Documentation
    ├── Component Specs
    ├── Interaction States
    └── Developer Notes
```

---

## Version History

| Version | Date       | Changes                                |
| ------- | ---------- | -------------------------------------- |
| 2.0     | 2026-01-16 | Complete rewrite based on HTML mockups |
| 1.0     | 2026-01-15 | Initial version from sketches          |

---

**Document Status**: ✅ Complete and Ready for Implementation  
**Last Updated**: January 16, 2026  
**Design Tool**: Figma  
**Platform**: React Native (iOS & Android)

For questions or clarifications about this design specification, please refer to the interactive HTML mockups in the `Mockups` folder.
