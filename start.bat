@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel% equ 0 (
    py -3 serve.py
) else (
    where python >nul 2>nul
    if errorlevel 1 (
        echo Python 3 is required for the local mobile server.
        echo You can still open index.html directly on this PC.
    ) else (
        python serve.py
    )
)
pause
