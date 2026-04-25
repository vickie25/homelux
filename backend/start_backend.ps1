# Homelux Backend Startup Script
# Ensure we are in the script's directory
Set-Location $PSScriptRoot

Write-Host "Activating virtual environment..." -ForegroundColor Cyan
# Use Activate.ps1 for PowerShell and dot-source it to maintain environment
. .\venv\Scripts\Activate.ps1

Write-Host "Starting Admin Engine on port 6000..." -ForegroundColor Green
python manage.py runserver 8000
