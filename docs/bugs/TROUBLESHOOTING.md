# 🔧 Troubleshooting Guide - Habito Project

**Date**: January 26, 2026  
**Last Updated**: January 26, 2026  
**Status**: Active

---

## 🚨 Common Issues & Solutions

### Issue 1: Bundle Error - Unable to Resolve Module

**Error Message**:
```
BUNDLE ERROR: Error: Unable to resolve module ../utils/chartHelpers
```

**Cause**: Incorrect relative import path

**Solution**:
1. Check the error line number
2. Count directory levels from import location to target file
3. Update import path:
   - `../` goes up one directory
   - `../../` goes up two directories
4. Verify file exists at resolved path
5. Run `npm start -- --reset-cache`

**Example**:
```
FROM: src/components/Charts/TaskCompletionChart.tsx
TO: src/utils/chartHelpers.ts

Path: ../../utils/chartHelpers
      └─ .. (up to src/components/)
      └─ .. (up to src/)
      └─ utils/chartHelpers (correct)
```

**Related Bug**: [BUG-001](./BUG_001_CHARTHELPERS_IMPORT_ERROR.md)

---

### Issue 2: Metro Cache Issues

**Symptoms**:
- Changes not appearing
- Old errors persist
- Build fails unexpectedly

**Solution**:
```bash
# Clear Metro cache
npm start -- --reset-cache

# Or completely reset
rm -rf node_modules
npm install
npm start
```

---

### Issue 3: TypeScript Errors

**Error Pattern**:
```
TS2307: Cannot find module 'xxx'
```

**Solutions**:
1. Check file path spelling
2. Verify file exists
3. Ensure tsconfig.json paths are correct
4. Run `npm run lint`
5. Check for circular imports

---

### Issue 4: Android Build Fails

**Common Causes**:
- Node modules not installed
- Gradle cache corrupted
- Java/Android SDK issues

**Solutions**:
```bash
# Clean everything
npm install
npm run android -- --reset-cache

# Or full reset
rm -rf node_modules android/.gradle
npm install
npm run android
```

---

### Issue 5: iOS Build Fails

**Common Causes**:
- Pod dependencies outdated
- iOS build cache corrupted
- Xcode version issues

**Solutions**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

---

## 🧹 Cleanup Commands

### Clear All Caches
```bash
# Metro bundler cache
rm -rf /tmp/metro-*

# Node modules
rm -rf node_modules
npm install

# Gradle cache (Android)
rm -rf android/.gradle

# Cocoapods cache (iOS)
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Build artifacts
rm -rf ios/build
rm -rf android/build
```

### Full Nuclear Reset
```bash
# Complete cleanup
npm run clean  # if available
rm -rf node_modules
rm -rf android/build
rm -rf ios/build
cd ios && rm -rf Pods Podfile.lock && cd ..

# Reinstall
npm install
cd ios && pod install && cd ..

# Rebuild
npm start -- --reset-cache
```

---

## 🔍 Debugging Steps

### Step 1: Check Linting
```bash
npm run lint
# Look for errors and warnings
# Fix any import path issues
```

### Step 2: Verify File Paths
```bash
# Check file exists
ls -la src/utils/chartHelpers.ts

# Verify exports
grep "export const" src/utils/chartHelpers.ts
```

### Step 3: Test Build
```bash
# Clear cache and rebuild
npm start -- --reset-cache

# In another terminal
npm run android
# or
npm run ios
```

### Step 4: Check Imports
```bash
# Find all imports of problematic file
grep -r "from.*chartHelpers" src/

# Verify paths are correct
# Count ../ levels needed from each file
```

---

## 📋 Verification Checklist

### Before Committing Code
- [ ] Run `npm run lint` - 0 errors
- [ ] Run `npm start` - builds successfully
- [ ] Test on device - works correctly
- [ ] Check imports - paths are correct
- [ ] Verify file exists at resolved path
- [ ] No new warnings introduced

### Before Deploying
- [ ] All tests pass
- [ ] Linting passes (0 errors)
- [ ] Build succeeds
- [ ] No console errors
- [ ] Feature tested on device
- [ ] Documentation updated

---

## 🎯 Prevention Strategies

### 1. Use TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Use Path Aliases
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

Then import as:
```typescript
import { getTodayTasksData } from '@utils/chartHelpers';
```

### 3. Pre-commit Hooks
Add to `package.json`:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run lint && npm start -- --reset-cache"
    }
  }
}
```

### 4. IDE Configuration
- Use VS Code with ESLint extension
- Enable "Format on Save"
- Use "Go to Definition" to verify paths
- TypeScript language server support

---

## 🔗 Import Path Quick Reference

### Components to Utils
```
FROM: src/components/Charts/TaskCompletionChart.tsx
TO: src/utils/chartHelpers.ts

Path: ../../utils/chartHelpers
```

### Components to Types
```
FROM: src/components/Calendar/CalendarDay.tsx
TO: src/types/Task.ts

Path: ../../types/Task
```

### Screens to Utils
```
FROM: src/screens/DashboardScreen.tsx
TO: src/utils/dateHelpers.ts

Path: ../utils/dateHelpers
```

### Context to Utils
```
FROM: src/context/TasksContext.tsx
TO: src/utils/validators.ts

Path: ../utils/validators
```

---

## 📚 Resources

### Documentation Files
- [Known Issues](./README.md) - Current issues and status
- [BUG-001](./BUG_001_CHARTHELPERS_IMPORT_ERROR.md) - chartHelpers import error
- [PROJECT_STATUS.md](../PROJECT_STATUS.md) - Overall project status

### Tools
- ESLint: `npm run lint`
- TypeScript: `npm run lint` (includes TS check)
- Build: `npm start`
- Android: `npm run android`
- iOS: `npm run ios`
- Tests: `npm test`

### Commands Reference
```bash
npm run lint              # Check code quality
npm start                 # Start Metro bundler
npm run android           # Build Android
npm run ios               # Build iOS
npm test                  # Run tests
npm run clean             # Clean build (if available)
```

---

## 🆘 When All Else Fails

### Nuclear Option
```bash
# 1. Remove everything
rm -rf node_modules
rm -rf ios/Pods ios/Podfile.lock ios/build
rm -rf android/build
rm -rf /tmp/metro-*

# 2. Reinstall
npm install
cd ios && pod install && cd ..

# 3. Clear Metro cache
npm start -- --reset-cache

# 4. Test
npm run android  # or npm run ios

# 5. If still failing, check:
# - Node.js version (should be 18+)
# - Java/Android SDK installed correctly
# - Xcode/iOS SDK installed correctly
# - All environment variables set
```

---

## 📞 Getting Help

### Debug Information to Provide
1. **Error message** (full)
2. **Affected file** and line number
3. **Steps to reproduce**
4. **What you tried**
5. **Node version**: `node --version`
6. **npm version**: `npm --version`
7. **OS**: Windows/Mac/Linux
8. **Recent changes**: What changed before error

### Support Resources
- Check this troubleshooting guide
- Review bug documentation in `docs/bugs/`
- Check ESLint output
- Read error messages carefully
- Search for similar issues

---

## ✅ Quality Assurance

### Testing Before Commit
```bash
# 1. Lint check
npm run lint

# 2. Build test
npm start -- --reset-cache

# 3. Device test
npm run android

# 4. No errors?
git commit -m "Fix: description"
```

### After Each Change
- [ ] No linting errors
- [ ] Build succeeds
- [ ] Works on device
- [ ] No regressions
- [ ] Documentation updated

---

## 🎉 Success Indicators

✅ **All systems working when**:
- `npm run lint` returns 0 errors
- `npm start` builds successfully
- App runs on Android/iOS
- No TypeScript errors
- All imports resolve correctly

---

**Made with ❤️ by the Habito Team**

*January 26, 2026 | Troubleshooting Guide | Always Improving*
