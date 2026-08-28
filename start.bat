@echo off
title The Mosaic Nails Server
cd /d "%~dp0"
echo Starting The Mosaic Nails Server...
node server/index.js
pause
