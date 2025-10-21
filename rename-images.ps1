# PowerShell script para renomear arquivos com aspas tipográficas
$path = "public\images\products"

Get-ChildItem -Path $path -File | ForEach-Object {
    $newName = $_.Name `
        -replace '\u201c', '"' `
        -replace '\u201d', '"' `
        -replace '\u2018', "'" `
        -replace '\u2019', "'" `
        -replace '\u2033', '"'

    if ($_.Name -ne $newName) {
        $newPath = Join-Path $path $newName

        if (Test-Path $newPath) {
            Write-Host "⚠ Destino já existe: $newName" -ForegroundColor Yellow
            Remove-Item $_.FullName
            Write-Host "  Removido: $($_.Name)" -ForegroundColor Yellow
        } else {
            Rename-Item $_.FullName $newName
            Write-Host "✓ Renomeado: $($_.Name) -> $newName" -ForegroundColor Green
        }
    }
}

Write-Host "`nNormalizacao concluida!" -ForegroundColor Green
