# Contributing to Habito

First off, thank you for considering contributing to Habito! It's people like you that make Habito such a great app.

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/React styleguides
* End all files with a newline
* Avoid platform-dependent code
* Document new code based on the Documentation Styleguide

---

## Development Setup

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 8+
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/habito.git
cd habito

# Install dependencies
npm install

# Start Metro Bundler
npm start

# In another terminal
npm run android  # or npm run ios
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Running Linter

```bash
# Check for lint errors
npm run lint

# Fix lint errors automatically
npm run lint -- --fix
```

---

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Follow the format:
  ```
  type(scope): subject

  body (optional)

  footer (optional)
  ```

Examples:
```
feat(tasks): add task filtering by date
fix(navigation): resolve navigation stack issue
docs(readme): update installation instructions
style(colors): adjust primary color shade
refactor(context): simplify state management
test(utils): add tests for date helpers
```

### TypeScript Styleguide

* Use TypeScript for all new code
* Enable strict mode
* Add type annotations for function parameters and return values
* Use interfaces for object shapes
* Avoid `any` type - use `unknown` instead if needed
* Use meaningful variable names
* Add JSDoc comments for public functions

**Example:**

```typescript
/**
 * Calculate the number of days between two dates
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The number of days between the dates
 */
export const daysBetween = (startDate: Date, endDate: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay);
};
```

### React Styleguide

* Use functional components with hooks
* Keep components focused and single-responsibility
* Use custom hooks for shared logic
* Keep component files small (< 400 lines)
* Add PropTypes or TypeScript interfaces
* Use meaningful component names

**Example:**

```typescript
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const handlePress = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  return (
    <View>
      <Text>{task.description}</Text>
    </View>
  );
};

export default TaskItem;
```

### CSS/Styling Styleguide

* Use the design system from `src/styles/`
* Follow the 8px spacing grid
* Use theme colors instead of hardcoding hex values
* Keep styles organized with comments
* Use semantic naming for style objects

---

## Documentation Styleguide

* Use Markdown
* Reference functions as `functionName()`
* Reference components as `ComponentName`
* Reference file paths in backticks: `` `src/utils/helpers.ts` ``
* Use code blocks for code examples
* Include type information in JSDoc comments

### Example Documentation

```typescript
/**
 * Formats a date to DD.MM.YYYY format
 * 
 * @example
 * formatDate(new Date(2026, 0, 25))
 * // Returns: '25.01.2026'
 * 
 * @param date - The date to format
 * @returns Formatted date string in DD.MM.YYYY format
 * @throws {Error} If date is invalid
 */
export const formatDate = (date: Date): string => {
  // Implementation
};
```

---

## Project Structure

When adding new features, follow this structure:

```
src/
├── types/           # TypeScript interfaces & types
├── styles/          # Design system
├── utils/           # Utility functions
├── context/         # State management
├── navigation/      # Navigation setup
├── screens/         # Screen components
├── components/      # Reusable components (Phase 2)
├── services/        # API & database services (Phase 2)
└── hooks/           # Custom hooks (Phase 2)
```

---

## Adding a New Feature

### 1. Create a Feature Branch

```bash
git checkout -b feature/feature-name
```

### 2. Update Type Definitions

Add types to `src/types/` if needed:

```typescript
// src/types/MyNewType.ts
export interface MyNewType {
  id: string;
  name: string;
  // ... other properties
}
```

### 3. Implement Utility Functions

Add utilities to `src/utils/` if needed:

```typescript
// src/utils/myHelpers.ts
/**
 * Description of what this function does
 */
export const myHelperFunction = (param: string): string => {
  // Implementation
};
```

### 4. Create Components/Screens

Keep components focused and testable:

```typescript
// src/screens/MyNewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@/styles/theme';

const MyNewScreen: React.FC = () => {
  return (
    <View style={{ padding: Theme.spacing.md }}>
      <Text>My New Screen</Text>
    </View>
  );
};

export default MyNewScreen;
```

### 5. Update Exports

Add exports to barrel files:

```typescript
// src/types/index.ts
export { MyNewType } from './MyNewType';

// src/utils/index.ts
export { myHelperFunction } from './myHelpers';

// src/screens/index.ts
export { default as MyNewScreen } from './MyNewScreen';
```

### 6. Test Your Changes

```bash
npm test
npm run lint
npm run android  # or npm run ios
```

### 7. Create Pull Request

```bash
git push origin feature/feature-name
```

Then open a PR with:
- Clear description
- Link to related issues
- Before/after screenshots if applicable
- Test coverage information

---

## Code Review Process

* At least one maintainer will review your PR
* Changes may be requested
* Once approved, your PR will be merged
* Your contribution will be recognized

---

## Community

* **Discussions**: Use GitHub Discussions for questions
* **Issues**: Report bugs or suggest features
* **Pull Requests**: Submit code changes
* **Email**: Contact maintainers directly if needed

---

## Recognition

Contributors will be recognized in:
- Project README
- CONTRIBUTORS.md file
- Release notes
- Social media announcements

---

## Questions?

Don't hesitate to ask! You can:
* Open an issue with the `question` label
* Comment on an existing issue
* Create a discussion thread
* Contact maintainers directly

---

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested
* `wontfix` - This will not be worked on

---

Thank you for contributing to Habito! 🎉

Made with ❤️ by the Habito Team
