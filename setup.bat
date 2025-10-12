@echo off
echo =========================================
echo      Jekyll Portfolio Setup
echo =========================================
echo.
echo This script will set up your Jekyll portfolio website.
echo Make sure you have Ruby 3.4+ installed.
echo.
pause

echo Checking Ruby version...
ruby --version
if %errorlevel% neq 0 (
    echo ❌ Ruby not found! Please install Ruby 3.4+ from https://rubyinstaller.org/
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
bundle install

if %errorlevel% neq 0 (
    echo.
    echo ❌ Bundle install failed! 
    echo.
    echo Possible solutions:
    echo 1. Make sure you have Ruby DevKit installed
    echo 2. Run this script as Administrator
    echo 3. Try: bundle config set --local path vendor/bundle
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo Starting Jekyll server...
echo Your site will be available at: http://localhost:4000
echo Press Ctrl+C to stop the server
echo.

bundle exec jekyll serve --watch --livereload

echo.
echo Server stopped. Thanks for using Jekyll Portfolio Template!
pause
