@echo off
cd /d "%~dp0apps\portfolio-3d"
echo Starting stable static preview...
echo.
"C:\Program Files\nodejs\node.exe" serve-static.mjs
echo.
echo Server stopped. Keep this window open and send Codex the message above if there is an error.
pause
