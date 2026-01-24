# ============================================
# React Native Windows Setup Script
# Run this in PowerShell as Administrator
# ============================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "React Native Environment Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "`nPlease:" -ForegroundColor Yellow
    Write-Host "1. Right-click PowerShell" -ForegroundColor Yellow
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "3. Run this script again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Running as Administrator`n" -ForegroundColor Green

# ============================================
# Step 1: Set JAVA_HOME
# ============================================
Write-Host "[1/3] Configuring JAVA_HOME..." -ForegroundColor Cyan

$javaPath = "C:\Program Files\Java\jdk-23"
if (Test-Path $javaPath) {
    [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaPath, 'Machine')
    Write-Host "✅ JAVA_HOME set to: $javaPath" -ForegroundColor Green
} else {
    Write-Host "❌ Java JDK not found at: $javaPath" -ForegroundColor Red
    Write-Host "Please install Java JDK first" -ForegroundColor Yellow
    exit 1
}

# ============================================
# Step 2: Set ANDROID_HOME (if Android SDK exists)
# ============================================
Write-Host "`n[2/3] Configuring ANDROID_HOME..." -ForegroundColor Cyan

$androidSdk = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $androidSdk) {
    [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $androidSdk, 'Machine')
    Write-Host "✅ ANDROID_HOME set to: $androidSdk" -ForegroundColor Green
    $androidInstalled = $true
} else {
    Write-Host "⚠️  Android SDK not found at: $androidSdk" -ForegroundColor Yellow
    Write-Host "   This is expected if Android Studio is not installed yet" -ForegroundColor Yellow
    Write-Host "   Install Android Studio, then run this script again" -ForegroundColor Yellow
    $androidInstalled = $false
}

# ============================================
# Step 3: Update PATH
# ============================================
Write-Host "`n[3/3] Updating System PATH..." -ForegroundColor Cyan

$currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')

# Add Java to PATH
if ($currentPath -notlike "*%JAVA_HOME%\bin*") {
    $currentPath = "$currentPath;%JAVA_HOME%\bin"
    Write-Host "✅ Added Java to PATH" -ForegroundColor Green
} else {
    Write-Host "✓ Java already in PATH" -ForegroundColor Gray
}

# Add Android tools to PATH (if Android SDK exists)
if ($androidInstalled) {
    $androidPaths = @(
        "%ANDROID_HOME%\platform-tools",
        "%ANDROID_HOME%\emulator",
        "%ANDROID_HOME%\tools",
        "%ANDROID_HOME%\tools\bin"
    )
    
    foreach ($path in $androidPaths) {
        if ($currentPath -notlike "*$path*") {
            $currentPath = "$currentPath;$path"
        }
    }
    Write-Host "✅ Added Android tools to PATH" -ForegroundColor Green
}

[System.Environment]::SetEnvironmentVariable('Path', $currentPath, 'Machine')

# ============================================
# Summary
# ============================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nEnvironment Variables Set:" -ForegroundColor White
Write-Host "  JAVA_HOME = $javaPath" -ForegroundColor Gray

if ($androidInstalled) {
    Write-Host "  ANDROID_HOME = $androidSdk" -ForegroundColor Gray
} else {
    Write-Host "  ANDROID_HOME = (not set - install Android Studio first)" -ForegroundColor Yellow
}

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Close this PowerShell window" -ForegroundColor White
Write-Host "2. Open a new PowerShell window (to load new environment variables)" -ForegroundColor White
Write-Host "3. Verify setup with:" -ForegroundColor White
Write-Host "   `$env:JAVA_HOME" -ForegroundColor Cyan
Write-Host "   java -version" -ForegroundColor Cyan

if ($androidInstalled) {
    Write-Host "   `$env:ANDROID_HOME" -ForegroundColor Cyan
    Write-Host "   adb --version" -ForegroundColor Cyan
} else {
    Write-Host "`n4. Install Android Studio" -ForegroundColor White
    Write-Host "5. Run this script again to configure Android environment variables" -ForegroundColor White
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
