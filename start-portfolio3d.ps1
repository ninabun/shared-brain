$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 31200
$Url = "http://127.0.0.1:$Port"

Set-Location $Root

Write-Host ""
Write-Host "Wing Yee AI Lab 3D Preview" -ForegroundColor Cyan
Write-Host "This window is the local server. Keep it open while viewing the site." -ForegroundColor Yellow
Write-Host ""

Write-Host "Checking port $Port..." -ForegroundColor Gray
$listeners = netstat -ano | Select-String ":$Port" | ForEach-Object {
  ($_ -split "\s+")[-1]
} | Where-Object {
  $_ -match "^\d+$" -and $_ -ne "0"
} | Select-Object -Unique

foreach ($pidValue in $listeners) {
  try {
    Write-Host "Stopping old server process $pidValue..." -ForegroundColor Gray
    Stop-Process -Id ([int]$pidValue) -Force -ErrorAction Stop
  } catch {}
}

Write-Host ""
Write-Host "Building latest 3D portfolio..." -ForegroundColor Cyan
npm.cmd run portfolio3d:build

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Build failed. Send Codex the error above." -ForegroundColor Red
  Read-Host "Press Enter to close"
  exit 1
}

Write-Host ""
Write-Host "Opening $Url" -ForegroundColor Green
Write-Host "If the browser does not open, copy this link: $Url" -ForegroundColor Green
Write-Host ""

$env:PORT = "$Port"
$env:HOST = "127.0.0.1"
$env:AUTO_OPEN = "1"

npm.cmd run portfolio3d:serve

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Yellow
Read-Host "Press Enter to close"
