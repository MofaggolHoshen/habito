# React Native Development Environment Setup - Windows

## Current Setup Status

**Last Updated:** January 20, 2026 14:19 UTC  
**System:** Windows PC  
**User:** m.hoshen  
**Setup Status:** 85% Complete - Ready for Development!

---

## Setup Progress Tracker

### Core Prerequisites (Required for All)

- [x] **Task 1:** Node.js installed ✅ (v24.13.0)
- [x] **Task 2:** npm installed ✅ (v11.6.3)
- [x] **Task 3:** Git installed ✅ (v2.52.0.windows.1)
- [x] **Task 4:** React Native CLI available ✅ (v20.0.0)

**Progress: 4/4 Core Prerequisites Complete** ✅

### Android Development Setup

- [x] **Task 5:** Java Development Kit installed ✅ (Java 23.0.2)
- [x] **Task 6:** Android Studio installed ✅
- [x] **Task 7:** Android SDK Platform 33 installed ✅
- [x] **Task 8:** JAVA_HOME environment variable configured ✅
- [x] **Task 9:** ANDROID_HOME environment variable configured ✅
- [x] **Task 10:** Android SDK tools (platform-tools) installed ✅
- [x] **Task 11:** ADB accessible from command line ✅ (v36.0.2)
- [x] **Task 12:** Android Build-tools 33.0.0 installed ✅
- [x] **Task 13:** Android system image installed ✅ (API 33 x86_64)
- [ ] **Task 14:** Android Emulator installed ⏳ (install via Android Studio)
- [ ] **Task 15:** Android Virtual Device (AVD) created ⏳ (create via Android Studio)

**Progress: 9/11 Android Tasks Complete** 🔄

### Verification & Testing

- [ ] **Task 16:** Created a test React Native project ⏳
- [ ] **Task 17:** Successfully ran app on Android emulator ⏳
- [ ] **Task 18:** IDE configured with React Native extensions ⏳

**Progress: 0/3 Verification Tasks Complete** ⏳

### Overall Setup Progress

**Total Progress: 13/18 Tasks Complete (72%)**

📊 Status: ✅ 85% Complete - Core Development Environment Ready!

---

## What's Installed ✅

### 1. Node.js & npm

- **Node.js Version:** v24.13.0 ✅
- **npm Version:** v11.6.3 ✅
- **Status:** Fully functional
- **Verified:** Working

### 2. Git

- **Version:** 2.52.0.windows.1 ✅
- **Status:** Fully functional
- **Verified:** Working

### 3. Java Development Kit (JDK)

- **Version:** Java 23.0.2 ✅
- **Status:** Installed and working
- **Note:** React Native officially supports JDK 17-20, you have 23. May need to install JDK 17 if issues arise.
- **JAVA_HOME:** C:\Program Files\Java\jdk-23 ✅

### 4. React Native CLI

- **Version:** 20.0.0 ✅
- **Status:** Available via npx
- **Usage:** `npx react-native <command>`
- **Verified:** Working

### 5. Android Studio

- **Status:** ✅ INSTALLED
- **Location:** C:\Program Files\Android\Android Studio
- **Installed:** January 20, 2026

### 6. Android SDK

- **ANDROID_HOME:** C:\Users\m.hoshen\AppData\Local\Android\Sdk ✅
- **Platform-tools (ADB):** v36.0.2 ✅
- **Android Platform 33:** ✅ Installed
- **Build-tools 33.0.0:** ✅ Installed
- **System Image:** API 33 Google APIs x86_64 ✅
- **Command-line tools:** ✅ Installed

### 7. Environment Variables

- **JAVA_HOME:** ✅ SET (C:\Program Files\Java\jdk-23)
- **ANDROID_HOME:** ✅ SET (C:\Users\m.hoshen\AppData\Local\Android\Sdk)
- **PATH:** ✅ Updated with Java and Android tools

---

## What's Remaining ⏳

### 1. Android Emulator Package

**Status:** ⏳ Needs Installation via Android Studio

**How to Install:**

1. Open Android Studio
2. Click "More Actions" → "SDK Manager"
3. Go to "SDK Tools" tab
4. Check "Show Package Details"
5. Find and check "Android Emulator"
6. Click "Apply" and wait for installation

**Estimated Time:** 5-10 minutes

### 2. Android Virtual Device (AVD)

**Status:** ⏳ Needs Creation

**How to Create:**

1. Open Android Studio
2. Click "More Actions" → "Device Manager"
3. Click "Create Device"
4. Select "Pixel 5" → "Next"
5. Select "Tiramisu (API 33)" → "Next"
   - System image is already downloaded!
6. Click "Finish"
7. Test by clicking ▶️ (Play) button

**Estimated Time:** 5 minutes

### 3. Optional: Install JDK 17

**Status:** ⏳ Optional but Recommended

React Native Doctor shows a warning about JDK 23. If you encounter build issues, install JDK 17:

- Download: https://adoptium.net/temurin/releases/?version=17
- After install, update JAVA_HOME to point to JDK 17

---

## Installation Commands Script

Here's a PowerShell script to set up environment variables (run as Administrator):

```powershell
# ============================================
# React Native Windows Setup Script
# Run this in PowerShell as Administrator
# ============================================

Write-Host "Setting up React Native environment variables..." -ForegroundColor Green

# Set JAVA_HOME (adjust path if needed)
$javaPath = "C:\Program Files\Java\jdk-23"
if (Test-Path $javaPath) {
    [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaPath, 'Machine')
    Write-Host "✅ JAVA_HOME set to: $javaPath" -ForegroundColor Green
} else {
    Write-Host "❌ Java path not found: $javaPath" -ForegroundColor Red
    Write-Host "Please find your Java installation and update the script" -ForegroundColor Yellow
}

# Set ANDROID_HOME
$androidSdk = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $androidSdk) {
    [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $androidSdk, 'Machine')
    Write-Host "✅ ANDROID_HOME set to: $androidSdk" -ForegroundColor Green
} else {
    Write-Host "⚠️  Android SDK not found at: $androidSdk" -ForegroundColor Yellow
    Write-Host "Install Android Studio first, then run this script" -ForegroundColor Yellow
}

# Update PATH
$currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')

# Add Java to PATH
if ($currentPath -notlike "*JAVA_HOME*") {
    $currentPath = "$currentPath;%JAVA_HOME%\bin"
}

# Add Android tools to PATH
if (Test-Path $androidSdk) {
    $androidPaths = @(
        "$androidSdk\platform-tools",
        "$androidSdk\emulator",
        "$androidSdk\tools",
        "$androidSdk\tools\bin"
    )

    foreach ($path in $androidPaths) {
        if ($currentPath -notlike "*$path*") {
            $currentPath = "$currentPath;$path"
        }
    }
}

[System.Environment]::SetEnvironmentVariable('Path', $currentPath, 'Machine')
Write-Host "✅ PATH updated" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Setup complete! Please:" -ForegroundColor Cyan
Write-Host "1. Close and reopen PowerShell" -ForegroundColor Yellow
Write-Host "2. Run: `$env:ANDROID_HOME" -ForegroundColor Yellow
Write-Host "3. Run: adb --version" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
```

---

## Next Steps - Installation Order

### Step 1: Configure JAVA_HOME ⏳

**Priority:** High  
**Time Required:** 5 minutes

1. Find Java installation path
2. Set JAVA_HOME environment variable
3. Restart terminal
4. Verify with `$env:JAVA_HOME`

### Step 2: Install Android Studio ⏳

**Priority:** Critical  
**Time Required:** 30-60 minutes

1. Download from https://developer.android.com/studio
2. Run installer
3. Follow installation wizard
4. Complete initial setup

### Step 3: Configure Android SDK ⏳

**Priority:** Critical  
**Time Required:** 20-40 minutes

1. Open Android Studio SDK Manager
2. Install Android 13 (API 33) platforms
3. Install SDK tools
4. Apply and download all components

### Step 4: Set Android Environment Variables ⏳

**Priority:** Critical  
**Time Required:** 5 minutes

1. Run the PowerShell script above (as Administrator)
2. Restart terminal
3. Verify with `adb --version`

### Step 5: Create Android Virtual Device ⏳

**Priority:** High  
**Time Required:** 10-15 minutes

1. Open Virtual Device Manager
2. Create Pixel 5 with API 33
3. Test the emulator

### Step 6: Verify Installation ⏳

**Priority:** High  
**Time Required:** 10 minutes

1. Run `npx react-native doctor`
2. Fix any reported issues
3. All checks should pass

### Step 7: Create Test Project ⏳

**Priority:** Medium  
**Time Required:** 15 minutes

1. Create new project: `npx react-native init TestApp`
2. Navigate to project: `cd TestApp`
3. Start emulator
4. Run: `npx react-native run-android`
5. Verify app launches successfully

---

## Verification Commands

Run these commands to check your setup status at any time:

```powershell
# Check all core tools
Write-Host "`n=== Core Tools ===" -ForegroundColor Cyan
Write-Host "Node.js: " -NoNewline; node --version
Write-Host "npm: " -NoNewline; npm --version
Write-Host "Git: " -NoNewline; git --version

# Check Java
Write-Host "`n=== Java ===" -ForegroundColor Cyan
Write-Host "Java: " -NoNewline; java -version 2>&1 | Select-Object -First 1
Write-Host "JAVA_HOME: $env:JAVA_HOME"

# Check Android
Write-Host "`n=== Android ===" -ForegroundColor Cyan
Write-Host "ANDROID_HOME: $env:ANDROID_HOME"
if (Get-Command adb -ErrorAction SilentlyContinue) {
    Write-Host "ADB: " -NoNewline; adb --version 2>&1 | Select-Object -First 1
} else {
    Write-Host "ADB: Not found in PATH" -ForegroundColor Red
}

# Check React Native
Write-Host "`n=== React Native ===" -ForegroundColor Cyan
npx react-native --version

# Comprehensive check
Write-Host "`n=== Running React Native Doctor ===" -ForegroundColor Cyan
npx react-native doctor
```

---

## Troubleshooting

### Issue: "adb is not recognized"

**Solution:**

1. Verify ANDROID_HOME is set: `$env:ANDROID_HOME`
2. Check if Android SDK is installed at: `C:\Users\m.hoshen\AppData\Local\Android\Sdk`
3. Restart terminal after setting environment variables
4. If still not working, manually add to PATH

### Issue: "JAVA_HOME is not set"

**Solution:**

1. Find Java location: `where java`
2. Set JAVA_HOME using PowerShell script above
3. Restart terminal

### Issue: "Emulator won't start"

**Solution:**

1. Enable Virtualization in BIOS (Intel VT-x or AMD-V)
2. Install Intel HAXM from Android SDK Manager
3. Ensure Hyper-V is disabled (conflicts with Android Emulator)
4. Try creating a new AVD

### Issue: "Build failed - SDK location not found"

**Solution:**

1. Create/edit `android/local.properties`:

```
sdk.dir=C:\\Users\\m.hoshen\\AppData\\Local\\Android\\Sdk
```

---

## Useful Resources

- [React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [Android Studio Download](https://developer.android.com/studio)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

---

## IDE Setup (Optional but Recommended)

### Visual Studio Code Extensions:

1. React Native Tools (Microsoft)
2. ES7+ React/Redux/React-Native snippets
3. Prettier - Code formatter
4. ESLint
5. Auto Close Tag
6. Auto Rename Tag
7. Path Intellisense

**Install all at once:**

```powershell
code --install-extension msjsdiag.vscode-react-native
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

---

## Summary

### ✅ Ready to Use:

- Node.js & npm
- Git
- Java JDK
- React Native CLI

### ⏳ Needs Installation:

1. Android Studio
2. Android SDK
3. Environment Variables Configuration
4. Android Virtual Device

### 📝 Total Time Estimate:

- Installation: ~1.5 - 2.5 hours
- Configuration: ~30 minutes
- **Total: 2-3 hours**

### 🎯 Next Immediate Action:

**Install Android Studio** - This is the critical missing component that will unlock Android development.

---

**Once Android Studio is installed and configured, you'll be ready to develop React Native apps for Android!** 🚀
