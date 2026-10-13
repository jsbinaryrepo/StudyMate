@echo off
title StudyMate AI - Java Launcher
echo ==================================================================
echo   StudyMate AI - Study Smarter. Practice Better. Know When You're Ready.
echo   100%% Java Backend + Modern Academic Web Application
echo ==================================================================
echo.

where java >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Java detected! Starting StudyMate Pure Java Server...
    start http://localhost:8080
    java src\main\java\com\studymate\StudyMateServer.java
) else (
    echo [NOTE] 'java' command not found in current PATH.
    echo Opening StudyMate AI web application directly in your browser...
    start src\main\resources\static\index.html
    echo.
    echo To run the Java backend server:
    echo 1. Install Java 17 or higher (e.g. from https://adoptium.net)
    echo 2. Run: java src\main\java\com\studymate\StudyMateServer.java
    echo.
)
pause
