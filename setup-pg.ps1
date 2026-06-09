Write-Host "Downloading PostgreSQL binaries..."
curl.exe -L -o pgsql.zip https://get.enterprisedb.com/postgresql/postgresql-16.3-1-windows-x64-binaries.zip

Write-Host "Extracting PostgreSQL binaries..."
Expand-Archive -Path pgsql.zip -DestinationPath . -Force

Write-Host "Initializing Database Cluster..."
.\pgsql\bin\initdb.exe -D .\pgsql\data -U insucare -A trust

Write-Host "Starting PostgreSQL Server..."
.\pgsql\bin\pg_ctl.exe -D .\pgsql\data -l pgsql.log start

Start-Sleep -Seconds 3

Write-Host "Creating 'insucare' database..."
.\pgsql\bin\createdb.exe -U insucare insucare

Write-Host "PostgreSQL Setup Complete!"
