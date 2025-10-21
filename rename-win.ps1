$path = "public\images\products"

Get-ChildItem -Path $path -File | ForEach-Object {
    $oldName = $_.Name
    $newName = $oldName -replace [char]0x201c, '"' -replace [char]0x201d, '"' -replace [char]0x2018, "'" -replace [char]0x2019, "'" -replace [char]0x2033, '"'

    if ($oldName -ne $newName) {
        $newPath = Join-Path $path $newName

        if (Test-Path $newPath) {
            Write-Host "Destino existe: $newName" -ForegroundColor Yellow
            Remove-Item $_.FullName
        } else {
            Rename-Item $_.FullName $newName
            Write-Host "Renomeado: $oldName" -ForegroundColor Green
        }
    }
}

Write-Host "Concluido!" -ForegroundColor Green
