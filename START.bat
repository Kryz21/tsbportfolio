@echo off
setlocal
cd /d "%~dp0"
echo Installing project packages...
call npm install
if errorlevel 1 (
  echo.
  echo Installation failed. Check your internet connection and Node.js installation.
  pause
  exit /b 1
)
echo.
echo Starting Tanish's portfolio...
call npm run dev
