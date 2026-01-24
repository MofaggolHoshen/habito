# Windows React Native Setup - Quick Start Guide

**User:** m.hoshen  
**Date:** January 20, 2026  
**System:** Windows PC

---

## 🎯 Current Status Summary

### ✅ COMPLETED (4/15 tasks - 27%)

- Node.js v24.13.0
- npm v11.6.3
- Git v2.52.0.windows.1
- Java JDK 23.0.2

### ⏳ PENDING (11/15 tasks - 73%)

- JAVA_HOME environment variable
- Android Studio installation
- Android SDK configuration
- ANDROID_HOME environment variable
- Android emulator setup
- Environment verification
- Test project creation

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Configure Java Environment (5 minutes)

**Run the automated setup script:**

```powershell
# Open PowerShell as Administrator, then run:
cd C:\Users\m.hoshen\source\repos\Experiments\habito\docs
.\setup-windows-env.ps1
```

This will:

- Set JAVA_HOME to `C:\Program Files\Java\jdk-23`
- Add Java to your PATH
- Configure Android paths (when Android Studio is installed)

**After running, close and reopen PowerShell!**

---

### Step 2: Install Android Studio (30-60 minutes)

**Download:**
https://developer.android.com/studio

**Installation:**

1. Run the installer
2. Choose "Standard" installation
3. Accept licenses
4. Wait for download (~5-10 GB)

**First Launch Setup:**

1. Open Android Studio
2. Click "More Actions" → "SDK Manager"
3. In **SDK Platforms** tab:

   - Check "Show Package Details" (bottom right)
   - Expand **Android 13.0 (Tiramisu)**
   - Select:
     - ✅ Android SDK Platform 33
     - ✅ Intel x86 Atom_64 System Image
     - ✅ Google APIs Intel x86 Atom System Image

4. In **SDK Tools** tab:

   - Check "Show Package Details"
   - Select:
     - ✅ Android SDK Build-Tools 33.0.0
     - ✅ Android Emulator
     - ✅ Android SDK Platform-Tools
     - ✅ Google Play services
     - ✅ Intel x86 Emulator Accelerator (HAXM)

5. Click "Apply" → "OK"
6. Wait for installation to complete

**After installation:**

```powershell
# Run the setup script again as Administrator:
cd C:\Users\m.hoshen\source\repos\Experiments\habito\docs
.\setup-windows-env.ps1

# Close and reopen PowerShell, then verify:
$env:ANDROID_HOME
adb --version
```

---

### Step 3: Create Virtual Device (10 minutes)

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select **Pixel 5** → "Next"
5. Select **Tiramisu (API 33)** system image
   - Click "Download" if needed
6. Click "Next" → "Finish"
7. Click ▶️ to test the emulator

---

## 📋 Detailed Task Checklist

### Core Prerequisites ✅

- [x] Task 1: Node.js v24.13.0 installed
- [x] Task 2: npm v11.6.3 installed
- [x] Task 3: Git v2.52.0 installed
- [x] Task 4: React Native CLI available
- [x] Task 5: Java JDK 23.0.2 installed

**Progress: 5/5 Complete** ✅

### Environment Configuration ⏳

- [ ] Task 6: JAVA_HOME configured
- [ ] Task 7: Java in PATH
- [ ] Task 8: ANDROID_HOME configured
- [ ] Task 9: Android tools in PATH

**Progress: 0/4 Complete** (Run setup-windows-env.ps1)

### Android Development ⏳

- [ ] Task 10: Android Studio installed
- [ ] Task 11: Android SDK Platform 33 installed
- [ ] Task 12: Android SDK Build-Tools installed
- [ ] Task 13: Android Virtual Device created

**Progress: 0/4 Complete**

### Verification ⏳

- [ ] Task 14: `npx react-native doctor` passes
- [ ] Task 15: Test app runs on emulator

**Progress: 0/2 Complete**

---

## 🔧 One-Command Verification

```powershell
# Copy and paste this entire block to check your setup:

Write-Host "`n=== React Native Setup Status ===" -ForegroundColor Cyan

# Node & npm
Write-Host "`n✅ Node.js: " -NoNewline -ForegroundColor Green; node --version
Write-Host "✅ npm: " -NoNewline -ForegroundColor Green; npm --version

# Git
Write-Host "✅ Git: " -NoNewline -ForegroundColor Green; git --version

# Java
$javaInstalled = $true
try { $javaVer = java -version 2>&1 | Select-Object -First 1; Write-Host "✅ Java: $javaVer" -ForegroundColor Green }
catch { Write-Host "❌ Java: NOT INSTALLED" -ForegroundColor Red; $javaInstalled = $false }

if ($javaInstalled) {
    if ($env:JAVA_HOME) { Write-Host "✅ JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green }
    else { Write-Host "❌ JAVA_HOME: NOT SET" -ForegroundColor Red }
}

# Android
if ($env:ANDROID_HOME) {
    Write-Host "✅ ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor Green
    if (Get-Command adb -ErrorAction SilentlyContinue) {
        Write-Host "✅ ADB: " -NoNewline -ForegroundColor Green
        adb --version 2>&1 | Select-Object -First 1
    } else {
        Write-Host "❌ ADB: NOT IN PATH" -ForegroundColor Red
    }
} else {
    Write-Host "❌ ANDROID_HOME: NOT SET (Install Android Studio)" -ForegroundColor Yellow
}

# Android Studio
if (Test-Path "C:\Program Files\Android\Android Studio") {
    Write-Host "✅ Android Studio: INSTALLED" -ForegroundColor Green
} else {
    Write-Host "❌ Android Studio: NOT INSTALLED" -ForegroundColor Red
}

Write-Host "`n================================`n" -ForegroundColor Cyan
```

---

## 📝 After Everything is Installed

### Final Verification:

```powershell
# Run React Native Doctor
npx react-native doctor
```

All items should show ✓ (checkmark).

### Create Your First App:

```powershell
# Create new project
npx react-native init MyFirstApp

# Navigate to project
cd MyFirstApp

# Start the emulator from Android Studio Virtual Device Manager

# In one terminal - Start Metro bundler
npx react-native start

# In another terminal - Run the app
npx react-native run-android
```

**Expected:** App launches on emulator showing "Welcome to React Native"

---

## ⚡ Quick Commands Reference

```powershell
# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Clear cache and restart
npx react-native start --reset-cache

# Check environment
npx react-native doctor

# List Android devices
adb devices

# View Android logs
adb logcat
```

---

## 🆘 Troubleshooting

### "JAVA_HOME is not set"

```powershell
# Run setup script as Administrator:
.\setup-windows-env.ps1

# Then close and reopen PowerShell
```

### "Android Studio not installing"

- Ensure you have 20GB free disk space
- Download might take 30-60 minutes on slower connections
- Try disabling antivirus temporarily

### "Emulator won't start"

- Enable Virtualization in BIOS (Intel VT-x or AMD-V)
- Ensure Hyper-V is disabled:
  ```powershell
  # Run as Administrator:
  bcdedit /set hypervisorlaunchtype off
  # Restart computer
  ```

### "adb not found"

- Close and reopen PowerShell after running setup script
- Verify ANDROID_HOME: `$env:ANDROID_HOME`
- Manually add to PATH if needed

---

## 📊 Time Estimates

| Task                    | Time Required     |
| ----------------------- | ----------------- |
| Run setup script        | 5 minutes         |
| Download Android Studio | 15-30 minutes     |
| Install Android Studio  | 10-15 minutes     |
| Configure SDK           | 15-20 minutes     |
| Create AVD              | 10-15 minutes     |
| Verify & test           | 15-20 minutes     |
| **TOTAL**               | **1.5 - 2 hours** |

---

## 🎓 Next Steps After Setup

1. ✅ Complete this setup guide
2. 📚 Learn React Native basics
3. 🏗️ Build your first component
4. 📱 Explore native modules
5. 🚀 Deploy to Play Store

---

## 📞 Need Help?

- React Native Docs: https://reactnative.dev
- Android Studio: https://developer.android.com/studio
- Project docs: `C:\Users\m.hoshen\source\repos\Experiments\habito\docs\`

---

**Ready to start? Run the setup script now! 🚀**

```powershell
cd C:\Users\m.hoshen\source\repos\Experiments\habito\docs
.\setup-windows-env.ps1
```
