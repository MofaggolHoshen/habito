# React Native Environment Setup Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Setup Progress Tracker](#setup-progress-tracker)
3. [System Requirements](#system-requirements)
4. [Prerequisites Installation](#prerequisites-installation)
5. [Setting Up for Android Development](#setting-up-for-android-development)
6. [Setting Up for iOS Development](#setting-up-for-ios-development)
7. [Project Setup](#project-setup)
8. [Troubleshooting](#troubleshooting)
9. [Useful Commands](#useful-commands)
10. [Additional Tools](#additional-tools)

---

## Introduction

This comprehensive guide will walk you through setting up a complete React Native development environment on Windows, macOS, and Linux. Follow the steps carefully to ensure a smooth development experience.

### What You'll Need

- A computer with at least 8GB RAM (16GB recommended)
- At least 20GB of free disk space
- Administrator/sudo access
- Stable internet connection

---

## Setup Progress Tracker

Track your installation progress by checking off completed tasks:

### Core Prerequisites (Required for All Platforms)

- [ ] **Task 1:** Node.js and npm installed (v18+ recommended)
- [ ] **Task 2:** Git installed and configured
- [ ] **Task 3:** Watchman installed (macOS/Linux only)
- [ ] **Task 4:** React Native CLI tools available

**Progress: 0/4 Core Prerequisites Complete** ✓

### Android Development Setup (Required for Android)

- [ ] **Task 5:** Java Development Kit (JDK 11+) installed
- [ ] **Task 6:** Android Studio installed
- [ ] **Task 7:** Android SDK (API 33+) installed
- [ ] **Task 8:** Android environment variables configured
- [ ] **Task 9:** Android Virtual Device (AVD) created
- [ ] **Task 10:** Successfully run `adb devices` command

**Progress: 0/6 Android Tasks Complete** 🤖

### iOS Development Setup (Required for iOS - macOS Only)

- [ ] **Task 11:** Xcode installed (15+ GB)
- [ ] **Task 12:** Xcode Command Line Tools installed
- [ ] **Task 13:** CocoaPods installed
- [ ] **Task 14:** iOS Simulator configured
- [ ] **Task 15:** Successfully run `xcodebuild -version`

**Progress: 0/5 iOS Tasks Complete** 🍎

### Verification & Testing

- [ ] **Task 16:** Created a new React Native project
- [ ] **Task 17:** Successfully ran app on Android emulator/device
- [ ] **Task 18:** Successfully ran app on iOS simulator (macOS only)
- [ ] **Task 19:** `npx react-native doctor` passes all checks
- [ ] **Task 20:** IDE/Editor configured with React Native extensions

**Progress: 0/5 Verification Tasks Complete** ✅

### Overall Setup Progress

**Total Progress: 0/20 Tasks Complete (0%)**

📊 Status: Not Started | 🔄 In Progress | ✅ Complete

---

## Quick Status Check

Run these commands to verify your current setup status:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check Git
git --version

# Check Java
java -version

# Check Android tools
adb --version

# Check React Native environment (comprehensive check)
npx react-native doctor

# macOS only: Check Xcode
xcodebuild -version

# macOS only: Check CocoaPods
pod --version
```

---

## System Requirements

### Windows

- Windows 10 or later (64-bit)
- Windows Subsystem for Linux (WSL2) recommended for better performance

### macOS

- macOS 10.15 (Catalina) or later
- Required for iOS development

### Linux

- Ubuntu 18.04 or later / Debian-based distributions recommended
- Other distributions supported with package manager adjustments

---

## Prerequisites Installation

### Step 1: Install Node.js and npm

**📋 Task 1 of 20** | **Status: [ ] Not Started** | **Category: Core Prerequisites**

Node.js is the JavaScript runtime that powers React Native's build tools.

#### Windows

1. Download the LTS version from [nodejs.org](https://nodejs.org/)
2. Run the installer (node-vX.X.X-x64.msi)
3. Follow the installation wizard, accepting defaults
4. Verify installation:

```bash
node --version  # Should show v18.x.x or later
npm --version   # Should show 9.x.x or later
```

#### macOS

Using Homebrew (recommended):

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

### Step 2: Install Git

**📋 Task 2 of 20** | **Status: [ ] Not Started** | **Category: Core Prerequisites**

#### Windows

1. Download from [git-scm.com](https://git-scm.com/download/win)
2. Run installer and follow wizard
3. Configure Git Bash as your preferred terminal

#### macOS

```bash
brew install git
```

#### Linux

```bash
sudo apt-get update
sudo apt-get install git
```

Verify:

```bash
git --version
```

Configure Git:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### Step 3: Install Watchman (macOS/Linux)

**📋 Task 3 of 20** | **Status: [ ] Not Started** | **Category: Core Prerequisites**

Watchman watches files for changes and triggers actions when they change.

#### macOS

```bash
brew install watchman
```

#### Linux

```bash
# Build from source
sudo apt-get install -y autoconf automake build-essential python3-dev libssl-dev libtool pkg-config
git clone https://github.com/facebook/watchman.git
cd watchman
git checkout v2023.11.20.00
./autogen.sh
./configure
make
sudo make install
```

---

### Step 4: Install React Native CLI

**📋 Task 4 of 20** | **Status: [ ] Not Started** | **Category: Core Prerequisites**

```bash
npm install -g react-native-cli
```

Or use npx (recommended for project-specific versions):

```bash
npx react-native --version
```

---

## Setting Up for Android Development

### Step 5: Install Java Development Kit (JDK)

**📋 Task 5 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

React Native requires JDK 11 or newer.

#### Windows

1. Download JDK 11 from [Oracle](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html) or [Adoptium](https://adoptium.net/)
2. Run installer
3. Set JAVA_HOME environment variable:
   - Open System Properties → Advanced → Environment Variables
   - Add new System Variable:
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Java\jdk-11.x.x`
   - Add to Path: `%JAVA_HOME%\bin`

#### macOS

```bash
brew install openjdk@11
sudo ln -sfn $(brew --prefix)/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-11.jdk
echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Linux

```bash
sudo apt-get update
sudo apt-get install openjdk-11-jdk
echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
```

Verify:

```bash
java -version
```

---

### Step 6: Install Android Studio

**📋 Task 6 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

#### All Platforms

1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Run the installer
3. During installation, ensure these components are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
   - Performance (Intel ® HAXM) - Windows/Linux only

#### Configure Android Studio

1. Open Android Studio
2. Click "More Actions" → "SDK Manager"
3. Select "SDK Platforms" tab
4. Check "Show Package Details"
5. Install the following for Android 13 (Tiramisu):

   - Android SDK Platform 33
   - Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

6. Select "SDK Tools" tab
7. Check "Show Package Details"
8. Install:
   - Android SDK Build-Tools 33.0.0
   - Android Emulator
   - Android SDK Platform-Tools
   - Google Play services

**✅ Mark Task 7 complete when SDK is installed**

---

### Step 7: Configure Android SDK

**📋 Task 7 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

This step involves installing the Android SDK components within Android Studio.

---

### Step 8: Configure Android Environment Variables

**📋 Task 8 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

#### Windows

1. Open Environment Variables
2. Add new System Variables:
   - `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
3. Add to Path:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

#### macOS

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then:

```bash
source ~/.zshrc  # or source ~/.bash_profile
```

#### Linux

Add to `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then:

```bash
source ~/.bashrc
```

Verify:

```bash
adb --version
```

---

### Step 9: Create an Android Virtual Device (AVD)

**📋 Task 9 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select a device (e.g., Pixel 5)
5. Click "Next"
6. Select a system image (e.g., Tiramisu API Level 33)
7. Click "Next", then "Finish"
8. Launch the emulator to verify it works

---

## Setting Up for iOS Development

**Note:** iOS development requires macOS with Xcode.

### Step 10: Verify Android Setup

**📋 Task 10 of 20** | **Status: [ ] Not Started** | **Category: Android Development**

Verify that Android development environment is properly configured:

```bash
# Check ADB is accessible
adb --version

# List connected devices/emulators
adb devices

# Check Java installation
java -version

# Verify ANDROID_HOME is set
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME%  # Windows
```

---

## Setting Up for iOS Development

**Note:** iOS development requires macOS with Xcode.

### Step 11: Install Xcode

**📋 Task 11 of 20** | **Status: [ ] Not Started** | **Category: iOS Development (macOS only)**

1. Download Xcode from the Mac App Store
2. Install Xcode (15+ GB, may take a while)
3. Open Xcode and accept the license agreement

```bash
sudo gem install cocoapods
```

Or using Homebrew:

```bash
brew install cocoapods
```

Verify:

```bash
xcodebuild -version
pod --version
```

---

---

### Step 12: Install CocoaPods

**📋 Task 12 of 20** | **Status: [ ] Not Started** | **Category: iOS Development**

```bash
sudo gem install cocoapods
```

Or using Homebrew:

```bash
brew install cocoapods
```

Verify:

```bash
pod --version
```

---

### Step 13: Install Xcode Command Line Tools

**📋 Task 13 of 20** | **Status: [ ] Not Started** | **Category: iOS Development**

```bash
sudo xcode-select --install
```

Verify:

```bash
xcodebuild -version
```

---

### Step 14: Configure iOS Simulator

**📋 Task 14 of 20** | **Status: [ ] Not Started** | **Category: iOS Development (macOS only)**

1. Open Xcode
2. Go to Xcode → Preferences → Locations
3. Select the most recent version in "Command Line Tools"
4. Open Simulator: Xcode → Open Developer Tool → Simulator
5. Choose a device from Hardware → Device → iOS [version]

---

### Step 15: Verify iOS Setup

**📋 Task 15 of 20** | **Status: [ ] Not Started** | **Category: iOS Development**

Verify that iOS development environment is properly configured:

```bash
# Check Xcode installation
xcodebuild -version

# Check CocoaPods
pod --version

# List available simulators
xcrun simctl list devices
```

---

## Project Setup

### Step 16: Create a New React Native Project

**📋 Task 16 of 20** | **Status: [ ] Not Started** | **Category: Verification & Testing**

```bash
# Using React Native CLI
npx react-native init MyAwesomeApp

# Navigate to project
cd MyAwesomeApp

# Start Metro Bundler
npx react-native start
```

**✅ Mark Task 16 complete when you successfully create a project**

---

### Step 17: Run on Android

**📋 Task 17 of 20** | **Status: [ ] Not Started** | **Category: Verification & Testing**

In a new terminal:

```bash
# Ensure emulator is running or device is connected
npx react-native run-android
```

**Expected Result:** App should launch on Android emulator/device showing the default React Native welcome screen.

**✅ Mark Task 17 complete when app runs successfully on Android**

---

### Step 18: Run on iOS (macOS only)

**📋 Task 18 of 20** | **Status: [ ] Not Started** | **Category: Verification & Testing**

```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios
```

**Expected Result:** App should launch on iOS simulator showing the default React Native welcome screen.

**✅ Mark Task 18 complete when app runs successfully on iOS**

---

### Step 19: Run React Native Doctor

**📋 Task 19 of 20** | **Status: [ ] Not Started** | **Category: Verification & Testing**

Run the built-in diagnostics tool:

```bash
npx react-native doctor
```

This will check:

- ✓ Node.js version
- ✓ npm/yarn version
- ✓ Watchman (macOS/Linux)
- ✓ Android Studio and SDK
- ✓ Xcode (macOS)
- ✓ CocoaPods (macOS)

**✅ Mark Task 19 complete when all checks pass**

---

### Step 20: Configure Your IDE

**📋 Task 20 of 20** | **Status: [ ] Not Started** | **Category: Verification & Testing**

Install Visual Studio Code extensions:

1. React Native Tools
2. ES7+ React/Redux/React-Native snippets
3. Prettier - Code formatter
4. ESLint

**✅ Mark Task 20 complete when IDE is configured**

---

## 🎉 Setup Complete!

Once all 20 tasks are marked complete, you're ready to start developing React Native apps!

---

## Troubleshooting

### Common Issues

#### Android Build Failed

**Issue:** `ANDROID_HOME` not set or SDK not found

**Solution:**

1. Verify environment variables are set correctly
2. Restart terminal/IDE after setting variables
3. Run `adb devices` to check connection

#### Metro Bundler Port Conflict

**Issue:** Port 8081 already in use

**Solution:**

```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8081 | xargs kill -9
```

#### iOS Build Failed

**Issue:** CocoaPods dependencies not installed

**Solution:**

```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

#### Gradle Build Error

**Issue:** Gradle daemon issues or version conflicts

**Solution:**

```bash
cd android
./gradlew clean
cd ..
```

#### Emulator Not Starting

**Issue:** Hardware acceleration not enabled

**Solution:**

- **Windows:** Enable Intel VT-x or AMD-V in BIOS
- **Linux:** Install KVM
- **macOS:** Usually works out of the box

---

## Useful Commands

### Project Commands

```bash
# Start Metro Bundler
npx react-native start

# Clear Metro cache
npx react-native start --reset-cache

# Run on Android
npx react-native run-android

# Run on specific Android device
npx react-native run-android --deviceId=<device-id>

# Run on iOS
npx react-native run-ios

# Run on specific iOS simulator
npx react-native run-ios --simulator="iPhone 14 Pro"

# Check React Native environment
npx react-native doctor
```

### Android Commands

```bash
# List connected devices/emulators
adb devices

# Install APK
adb install path/to/app.apk

# View logs
adb logcat

# Reverse port (for debugging)
adb reverse tcp:8081 tcp:8081

# Open dev menu on device
adb shell input keyevent 82
```

### iOS Commands

```bash
# List available simulators
xcrun simctl list devices

# Boot simulator
xcrun simctl boot "iPhone 14 Pro"

# Install app on simulator
xcrun simctl install booted path/to/app.app

# View logs
tail -f ~/Library/Logs/CoreSimulator/*/system.log
```

---

## Additional Tools

### Recommended IDE/Editors

- **Visual Studio Code** with extensions:
  - React Native Tools
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - React Developer Tools

### Debugging Tools

- **Reactotron:** Desktop app for inspecting React Native apps
- **Flipper:** Platform for debugging mobile apps (built into React Native)
- **React DevTools:** Browser-based debugging

### Installation

```bash
# Reactotron
npm install --save-dev reactotron-react-native

# React DevTools
npm install -g react-devtools
```

### Performance Monitoring

- Firebase Performance Monitoring
- Sentry for error tracking
- New Relic Mobile

### State Management

- Redux Toolkit
- MobX
- Zustand
- Recoil

---

## Environment Verification Checklist

Use this checklist to verify your setup:

- [ ] Node.js and npm installed and working
- [ ] Git installed and configured
- [ ] Watchman installed (macOS/Linux)
- [ ] JDK 11+ installed
- [ ] Android Studio installed
- [ ] Android SDK installed (API 33+)
- [ ] Android environment variables configured
- [ ] Android emulator created and working
- [ ] Xcode installed (macOS only)
- [ ] CocoaPods installed (macOS only)
- [ ] iOS Simulator working (macOS only)
- [ ] `npx react-native doctor` passes all checks
- [ ] Successfully created and run a test project

---

## Next Steps

Once your environment is set up:

1. **Learn React Native Basics**

   - Components and Props
   - State and Lifecycle
   - Hooks (useState, useEffect, etc.)
   - Navigation (React Navigation)

2. **Explore Native Modules**

   - Camera access
   - Location services
   - Push notifications
   - File system access

3. **Setup CI/CD**

   - GitHub Actions
   - Bitrise
   - App Center

4. **Publishing**
   - Google Play Store (Android)
   - Apple App Store (iOS)

---

## Resources

### Official Documentation

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Android Developer Guide](https://developer.android.com/docs)
- [iOS Developer Guide](https://developer.apple.com/documentation/)

### Community

- [React Native Community Discord](https://discord.com/invite/react-native)
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)
- [Reddit - r/reactnative](https://www.reddit.com/r/reactnative/)

### Tutorials

- [React Native Express](http://www.reactnativeexpress.com/)
- [React Native School](https://www.reactnativeschool.com/)
- [Full Stack Open - React Native](https://fullstackopen.com/en/part10)

---

## Maintenance

Keep your development environment up to date:

```bash
# Update Node.js packages
npm update -g

# Update React Native CLI
npm install -g react-native-cli

# Update Android SDK
# Open Android Studio → SDK Manager → Check for updates

# Update Xcode
# Check Mac App Store for updates

# Update CocoaPods
sudo gem update cocoapods
```

---

**Last Updated:** January 2026  
**React Native Version:** 0.73+  
**Maintained by:** Habito Development Team

---

## Feedback

If you encounter issues or have suggestions for improving this guide, please create an issue in the project repository or contact the development team.

Happy coding! 🚀
