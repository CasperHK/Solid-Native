param(
  [int[]]$Ports = @(1420, 1421)
)

$ErrorActionPreference = "SilentlyContinue"

foreach ($port in $Ports) {
  $connections = Get-NetTCPConnection -State Listen -LocalPort $port
  if ($null -eq $connections) {
    continue
  }

  $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($pid in $pids) {
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
  }
}

exit 0
