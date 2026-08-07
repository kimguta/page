param(
    [string]$TemplateRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"
$TemplateRoot = (Resolve-Path -LiteralPath $TemplateRoot).Path.TrimEnd("\")
$problems = [System.Collections.Generic.List[string]]::new()
$protectedFile = Join-Path $TemplateRoot "content\0content-ui.html"
$sourceFiles = Get-ChildItem -Path $TemplateRoot -Recurse -File |
    Where-Object {
        $_.FullName -ne $protectedFile -and
        $_.Extension -in ".html", ".css", ".js"
    }

foreach ($file in $sourceFiles) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding utf8
    $relativePath = $file.FullName.Substring($TemplateRoot.Length + 1)

    if ($file.Extension -eq ".html" -and
        $content -match '<(?:link|script)\s+[^>]*(?:href|src)="(?!/|https?://)') {
        $problems.Add("$relativePath : CSS 또는 JS 리소스에 상대경로가 있습니다.")
    }
}

$requiredFiles = @(
    "css\content-ui.css",
    "css\custom-builder.css",
    "css\swiper-bundle.min.css",
    "js\app.js",
    "js\navigation.js",
    "js\smooth-scroll.js",
    "js\components.js",
    "js\index.js",
    "js\swiper-bundle.min.js",
    "content\0content-ui.html"
)

foreach ($relativePath in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $TemplateRoot $relativePath))) {
        $problems.Add("$relativePath : 필수 파일이 없습니다.")
    }
}

$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    Get-ChildItem -Path (Join-Path $TemplateRoot "js") -Filter "*.js" |
        Where-Object { $_.Name -ne "lenis.js" } |
        ForEach-Object {
            & $node.Source --check $_.FullName
            if ($LASTEXITCODE -ne 0) {
                $problems.Add("$($_.Name) : JavaScript 문법 오류가 있습니다.")
            }
        }
}

if ($problems.Count -gt 0) {
    Write-Host "템플릿 점검 실패" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "- $_" }
    exit 1
}

Write-Host "템플릿 점검 완료: 절대 리소스 경로, 필수 파일과 JS 문법이 정상입니다." -ForegroundColor Green
