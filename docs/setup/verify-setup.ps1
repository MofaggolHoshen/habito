# React Native Environment Verification Script
# Run this to check your complete setup

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "React Native Environment Verification" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$totalChecks = 0
$passedChecks = 0

# Function to check and display status
function Test-Component {
    param($Name, $Test, $SuccessMsg, $FailMsg)
    
    $script:totalChecks++
    Write-Host "$Name`: " -NoNewline
    
    if ($Test) {
        Write-Host "✅ $SuccessMsg" -ForegroundColor Green
        $script:passedChecks++
        return $true
    } else {
        Write-Host "❌ $FailMsg" -ForegroundColor Red
        return $false
    }
}

# Core Tools
Write-Host "=== Core Tools ===" -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
Test-Component "Node.js" $nodeVersion "Installed ($nodeVersion)" "Not installed"

$npmVersion = npm --version 2>$null
Test-Component "npm" $npmVersion "Installed ($npmVersion)" "Not installed"

$gitVersion = git --version 2>$null
Test-Component "Git" $gitVersion "Installed ($gitVersion)" "Not installed"

# Java
Write-Host "`n=== Java Development Kit ===" -ForegroundColor Yellow

$javaVersion = java -version 2>&1 | Select-Object -First 1
Test-Component "Java" $javaVersion "Installed ($javaVersion)" "Not installed"

$javaHome = $env:JAVA_HOME
Test-Component "JAVA_HOME" $javaHome "Set to: $javaHome" "Not set"

# Android
Write-Host "`n=== Android Environment ===" -ForegroundColor Yellow

$androidHome = $env:ANDROID_HOME
Test-Component "ANDROID_HOME" $androidHome "Set to: $androidHome" "Not set"

Test-Component "Android Studio" (Test-Path "C:\Program Files\Android\Android Studio") "Installed" "Not installed"

$adbPath = "$env:ANDROID_HOME\platform-tools\adb.exe"
$adbExists = Test-Path $adbPath
Test-Component "ADB (Android Debug Bridge)" $adbExists "Installed" "Not found"

if ($adbExists) {
    $adbVersion = & $adbPath version 2>&1 | Select-Object -First 1
    Write-Host "  Version: $adbVersion" -ForegroundColor Gray
}

$platform = Test-Path "$env:ANDROID_HOME\platforms\android-33"
Test-Component "Android SDK Platform 33" $platform "Installed" "Not installed"

$buildTools = Test-Path "$env:ANDROID_HOME\build-tools\33.0.0"
Test-Component "Build-tools 33.0.0" $buildTools "Installed" "Not installed"

$sysImage = Test-Path "$env:ANDROID_HOME\system-images\android-33\google_apis\x86_64"
Test-Component "System Image (API 33)" $sysImage "Downloaded" "Not downloaded"

$emulator = Test-Path "$env:ANDROID_HOME\emulator\emulator.exe"
Test-Component "Android Emulator" $emulator "Installed" "Not installed - install via Android Studio"

# AVD Check
Write-Host "`n=== Android Virtual Devices ===" -ForegroundColor Yellow
$avdDir = "$env:USERPROFILE\.android\avd"
if (Test-Path $avdDir) {
    $avds = Get-ChildItem "$avdDir\*.avd" -Directory -ErrorAction SilentlyContinue
    if ($avds) {
        Write-Host "Found AVDs: " -NoNewline
        Write-Host "$($avds.Count)" -ForegroundColor Green
        $avds | ForEach-Object {
            Write-Host "  - $($_.BaseName)" -ForegroundColor Gray
        }
        $script:passedChecks++
    } else {
        Write-Host "❌ No AVDs created - create one via Android Studio Device Manager" -ForegroundColor Red
    }
    $script:totalChecks++
} else {
    Write-Host "❌ AVD directory not found" -ForegroundColor Red
    $script:totalChecks++
}

# React Native
Write-Host "`n=== React Native ===" -ForegroundColor Yellow
$rnVersion = npx react-native --version 2>&1 | Select-Object -First 1
Test-Component "React Native CLI" $rnVersion "Available ($rnVersion)" "Not available"

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$percentage = [math]::Round(($passedChecks / $totalChecks) * 100, 0)
Write-Host "`nPassed: $passedChecks/$totalChecks checks ($percentage%)" -ForegroundColor $(if ($percentage -ge 85) { "Green" } elseif ($percentage -ge 70) { "Yellow" } else { "Red" })

if ($percentage -eq 100) {
    Write-Host "`n🎉 Perfect! Your environment is 100% ready!" -ForegroundColor Green
    Write-Host "You can start building React Native apps now!" -ForegroundColor Green
} elseif ($percentage -ge 85) {
    Write-Host "`n✅ Excellent! Your environment is mostly ready!" -ForegroundColor Green
    Write-Host "`nRemaining steps:" -ForegroundColor Yellow
    if (-not $emulator) {
        Write-Host "  1. Install Android Emulator via Android Studio SDK Manager" -ForegroundColor White
    }
    if (-not (Test-Path "$avdDir\*.avd")) {
        Write-Host "  2. Create an AVD via Android Studio Device Manager" -ForegroundColor White
    }
} elseif ($percentage -ge 50) {
    Write-Host "`n⚠️  Your environment needs more setup" -ForegroundColor Yellow
    Write-Host "Review the errors above and follow the setup guide." -ForegroundColor White
} else {
    Write-Host "`n❌ Your environment needs significant setup" -ForegroundColor Red
    Write-Host "Please run the setup script: .\setup-windows-env.ps1" -ForegroundColor White
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "`nFor detailed setup instructions, see:" -ForegroundColor Cyan
Write-Host "  docs\SETUP-COMPLETE.md" -ForegroundColor White
Write-Host "  docs\Windows-React-Native-Setup.md" -ForegroundColor White
Write-Host "`n========================================`n" -ForegroundColor Cyan
