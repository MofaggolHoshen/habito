# Setup & Installation Guide

Complete step-by-step guide to set up Habito on your development machine.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Android Setup](#android-setup)
4. [iOS Setup](#ios-setup)
5. [Verify Installation](#verify-installation)
6. [First Run](#first-run)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | 18.0.0+ | [Download](https://nodejs.org/) |
| npm | 8.0.0+ | Comes with Node.js |
| React Native | 0.83.1+ | Installed via npm |
| Git | 2.25.0+ | [Download](https://git-scm.com/) |

### Platform-Specific Requirements

#### Android Development
- **Android Studio** 2023.2+ or **Android SDK Tools** separately
- **JDK** 11 or higher
- **Android SDK** API Level 24 (Android 7.0) or higher
- **Android Emulator** or physical Android device

#### iOS Development (macOS only)
- **Xcode** 14.0+ with Command Line Tools
- **CocoaPods** 1.13+
- **Ruby** 2.7+ (usually pre-installed on macOS)
- iPhone simulator or physical iOS device (iOS 12+)

---

## Installation Steps

### Step 1: Install Node.js

#### Windows
1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Run the installer and follow the setup wizard
4. Accept the default installation path
5. Check "Add to PATH" (should be checked by default)
6. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org and run installer
```

Verify:
```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be v8.x.x or higher
```

#### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Install Git

#### Windows
1. Download from [git-scm.com](https://git-scm.com/)
2. Run the installer
3. Use default settings
4. Verify: `git --version`

#### macOS
```bash
brew install git
# or install Xcode Command Line Tools:
xcode-select --install
```

#### Linux
```bash
sudo apt install git
```

### Step 3: Clone the Repository

```bash
# Navigate to your projects folder
cd /path/to/projects

# Clone Habito
git clone https://github.com/yourusername/habito.git

# Navigate into the project
cd habito
```

### Step 4: Install Dependencies

```bash
# Install npm packages
npm install

# This will:
# - Install all dependencies from package.json
# - Install React Native dependencies
# - Install development tools
# - Setup project structure
```

**Expected Output:**
```
added 850+ packages in 45s
```

### Step 5: Install iOS Dependencies (macOS only)

```bash
# Install CocoaPods if not already installed
sudo gem install cocoapods

# Install iOS pods
cd ios
pod install

# Return to project root
cd ..
```

---

## Android Setup

### Step 1: Install Android Studio

1. Download from [developer.android.com](https://developer.android.com/studio)
2. Install and run Android Studio
3. Go through the setup wizard:
   - Select "Standard" installation
   - Accept license agreements
   - Wait for SDK downloads (5-10 minutes)

### Step 2: Set Environment Variables (Windows only)

Add ANDROID_HOME to your system environment variables:

1. Open **Environment Variables**:
   - Search for "Environment Variables" in Windows Search
   - Click "Edit the system environment variables"
   - Click "Environment Variables..."

2. Create new User Variables:
   - **ANDROID_HOME**: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`

3. Update PATH:
   - Add: `%ANDROID_HOME%\platform-tools`
   - Add: `%ANDROID_HOME%\tools`

4. Restart your terminal/computer

### Step 3: Verify Android SDK

```bash
# Check if ANDROID_HOME is set correctly
echo %ANDROID_HOME%  # Windows
echo $ANDROID_HOME   # macOS/Linux

# Check SDK tools
ls $ANDROID_HOME/tools
```

### Step 4: Create/Connect Android Device

**Option A: Using Emulator**
```bash
# List available emulators
emulator -list-avds

# Launch an emulator
emulator -avd EmulatorName

# Or use Android Studio to create one
```

**Option B: Using Physical Device**
1. Enable "Developer Mode":
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back and find "Developer Options"
   - Enable "USB Debugging"

2. Connect via USB cable
3. Verify connection:
   ```bash
   adb devices
   ```

---

## iOS Setup

### Step 1: Install Xcode

```bash
# Option 1: From App Store (recommended)
# Search for "Xcode" in App Store and install

# Option 2: Using Command Line
xcode-select --install

# Option 3: From developer.apple.com
# Download and install manually
```

### Step 2: Install Command Line Tools

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### Step 3: Install CocoaPods

```bash
# Check if already installed
pod --version

# Install if needed
sudo gem install cocoapods

# Verify installation
pod --version  # Should be 1.13.0 or higher
```

### Step 4: Install iOS Pods

```bash
cd ios
pod install

# If you get cache issues:
pod install --repo-update

cd ..
```

### Step 5: Set Up iOS Simulator

```bash
# List available simulators
xcrun simctl list devices

# Launch specific simulator
xcrun simctl boot "iPhone 15"

# Or open Xcode and use Simulator from there
```

---

## Verify Installation

### Check Node.js and npm

```bash
node --version     # Should be v18.x.x or higher
npm --version      # Should be v8.x.x or higher
npx --version      # Should be 8.x.x or higher
```

### Check Git

```bash
git --version      # Should be 2.25.0 or higher
git config --list  # View Git configuration
```

### Check React Native

```bash
# From the habito directory
npm ls react-native
```

### Check Android (Windows/Mac/Linux)

```bash
echo $ANDROID_HOME           # Should show SDK path
ls $ANDROID_HOME/tools       # Should list tools directory
adb version                  # Should show version info
```

### Check iOS (macOS only)

```bash
xcode-select -p              # Should show Xcode path
pod --version                # Should show version
```

---

## First Run

### Running on Android

```bash
# Terminal 1: Start Metro Bundler
npm start

# Terminal 2: Run on Android (in another terminal)
npm run android

# Expected:
# - Metro Bundler starts on http://localhost:8081
# - Android app loads and displays Dashboard
# - You can interact with the calendar
```

### Running on iOS (macOS)

```bash
# Terminal 1: Start Metro Bundler
npm start

# Terminal 2: Run on iOS
npm run ios

# Expected:
# - iOS simulator opens
# - App loads and displays Dashboard
# - All features are functional
```

### Stopping the App

```bash
# In the Metro Bundler terminal
Ctrl + C   # or Cmd + C on macOS
```

---

## Verify Installation Success

When you run the app for the first time, you should see:

✅ **Dashboard Screen**
- Calendar grid for current month
- Month navigation arrows
- Chart placeholders
- Responsive layout

✅ **Interactive Elements**
- Calendar days are tappable
- Navigation works smoothly
- No console errors
- All text is visible

✅ **No Errors**
- No red error screen
- No TypeScript errors
- Metro Bundler shows success
- App responds to interactions

---

## Troubleshooting

### "command not found: npm"

**Solution:**
1. Reinstall Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your terminal/computer
3. Check: `npm --version`

### "Module not found" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start --reset-cache
```

### Android Emulator Won't Start

**Solution:**
```bash
# Check if emulator exists
emulator -list-avds

# Create new emulator via Android Studio if none exists
# Or use:
android create avd -n test -t "android-33"
```

### iOS Pod Installation Failed

**Solution:**
```bash
cd ios

# Clear pods
rm -rf Pods
rm Podfile.lock

# Reinstall
pod deintegrate
pod install

cd ..
```

### Metro Bundler Crashes

**Solution:**
```bash
# Kill process on port 8081
lsof -i :8081
kill -9 <PID>

# Or use this command
npm start -- --reset-cache
```

### JAVA_HOME Not Set (Android)

**Windows:**
1. Find your JDK installation: `C:\Program Files\Android\Android Studio\jbr`
2. Create environment variable `JAVA_HOME` with this path
3. Add to PATH: `%JAVA_HOME%\bin`
4. Restart terminal

**macOS/Linux:**
```bash
# Find JDK path
/usr/libexec/java_home

# Add to ~/.zshrc or ~/.bashrc
export JAVA_HOME=$(/usr/libexec/java_home)
```

### TypeScript Errors

**Solution:**
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Clear TypeScript cache
rm -rf node_modules/.cache

# Reinstall
npm install
```

### Port 8081 Already in Use

**Solution:**
```bash
# macOS/Linux: Find and kill process
lsof -i :8081
kill -9 <PID>

# Windows: Find and kill process
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Or use different port
npm start -- --port 8082
```

---

## Development Environment Setup

### Visual Studio Code (Recommended)

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install extensions:
   - **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
   - **TypeScript Vue Plugin** - Vue.vscode-typescript-vue-plugin
   - **Prettier - Code formatter** - esbenp.prettier-vscode
   - **ESLint** - dbaeumer.vscode-eslint

3. Open habito folder in VS Code
4. Trust the workspace when prompted

### Android Studio Setup

1. Open the habito folder with Android Studio:
   - File → Open → Select `habito/android`

2. Let Gradle sync
3. Setup emulator:
   - Tools → Device Manager → Create Virtual Device

### Xcode Setup (macOS)

1. Open iOS project:
   ```bash
   open ios/habito.xcworkspace
   ```

2. Select simulator:
   - Product → Destination → iPhone 15 (or preferred device)

3. Build & Run:
   - Cmd + R

---

## Next Steps

After successful installation:

1. Read the [README.md](../README.md)
2. Check [DEVELOPER_REFERENCE.md](../docs/DEVELOPER_REFERENCE.md)
3. Review [CONTRIBUTING.md](../CONTRIBUTING.md)
4. Start exploring the codebase!

---

## Getting Help

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/habito/habito/issues)
3. Create a new issue with:
   - System info (`node --version`, `npm --version`, etc.)
   - Error message and stack trace
   - Steps to reproduce
   - Screenshots if applicable

---

## Useful Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Android Studio Docs](https://developer.android.com/docs)
- [Xcode Help](https://help.apple.com/xcode/)

---

**Happy coding! 🚀**

Made with ❤️ by the Habito Team
