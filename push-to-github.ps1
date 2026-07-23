<#
  push-to-github.ps1
  --------------------------------------------------------------------------
  Feltolti a repot a GitHubra, DE elobb ellenorzi, hogy a helyes GitHub-fiokkal
  vagy-e bejelentkezve. Ha veletlenul a rossz fiok (pl. smartcreatorteam) tokene
  van eltarolva a Windows Credential Managerben, a script eszreveszi, torli azt,
  es szol, hogy jelentkezz be ujra a jo fiokkal - igy elkerulod a 403-as hibat.

  Hasznalat (a repo mappajaban):
      .\push-to-github.ps1 "commit uzenet"
      .\push-to-github.ps1                     # automatikus uzenet idobelyeggel
#>

param(
    [string]$Message
)

# --- Beallitasok: ha valtozik a repo/fiok, csak itt kell atirni ---
$ExpectedAccount = 'lukacspeter89'
$ExpectedRepo    = 'https://github.com/lukacspeter89/bimline.git'
$Branch          = 'main'
# -----------------------------------------------------------------

function Fail($msg) {
    Write-Host ""
    Write-Host "HIBA: $msg" -ForegroundColor Red
    exit 1
}

# 0) Git repoban vagyunk-e?
git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) { Fail "Ez a mappa nem git repo. Nyisd meg a repo gyokeret." }

# 0/b) Beragadt lock-fajlok takaritasa (ha nincs valoban futo git folyamat)
$gitDir = (git rev-parse --git-dir 2>$null)
if ($gitDir) {
    $running = Get-Process git -ErrorAction SilentlyContinue
    $lockFiles = @(
        (Join-Path $gitDir 'index.lock'),
        (Join-Path $gitDir 'HEAD.lock'),
        (Join-Path $gitDir 'objects\maintenance.lock')
    ) | Where-Object { Test-Path $_ }

    if ($lockFiles) {
        if ($running) {
            Fail "Fut egy masik git folyamat (lock-fajl talalhato). Varj, amig befejezodik, vagy zard be a git-et hasznalo programot, majd probald ujra."
        }
        Write-Host "Beragadt lock-fajl(ok) takaritasa..." -ForegroundColor Yellow
        $lockFiles | ForEach-Object { Remove-Item $_ -Force -ErrorAction SilentlyContinue }
    }
}

# 1) A remote a vart repora mutat-e?
$remote = (git remote get-url origin 2>$null)
if (-not $remote) { Fail "Nincs 'origin' remote beallitva." }
if ($remote.TrimEnd('/') -ne $ExpectedRepo.TrimEnd('/')) {
    Write-Host "FIGYELEM: az origin remote nem a vart repo:" -ForegroundColor Yellow
    Write-Host "    origin : $remote"
    Write-Host "    vart   : $ExpectedRepo"
    if ((Read-Host "Folytatod ezzel a remote-tal? (i/n)") -ne 'i') { Fail "Megszakitva." }
}

# 2) Melyik GitHub-fiok tokene van eltarolva?
Write-Host "GitHub-fiok ellenorzese..." -ForegroundColor Cyan
$credOut = ("protocol=https`nhost=github.com`n`n" | git credential fill 2>$null)
$pwLine  = $credOut | Where-Object { $_ -like 'password=*' } | Select-Object -First 1
$token   = if ($pwLine) { $pwLine.Substring('password='.Length) } else { $null }

if (-not $token) {
    Write-Host "Nincs meg eltarolt hitelesito adat - a push soran a bongeszoben jelentkezz be a(z) '$ExpectedAccount' fiokkal." -ForegroundColor Yellow
}
else {
    try {
        $user = Invoke-RestMethod -Uri 'https://api.github.com/user' -Headers @{
            Authorization = "Bearer $token"
            'User-Agent'  = 'push-script'
            Accept        = 'application/vnd.github+json'
        }
    } catch {
        Fail "Nem sikerult lekerdezni a fiokot a tarolt tokennel (lehet, hogy lejart). Futtasd: cmdkey /delete:git:https://github.com  majd probald ujra."
    }

    if ($user.login -ieq $ExpectedAccount) {
        Write-Host "OK: helyes fiok van bejelentkezve -> $($user.login)" -ForegroundColor Green
    }
    else {
        Write-Host "ROSSZ FIOK van bejelentkezve: '$($user.login)' (kellene: '$ExpectedAccount')" -ForegroundColor Red
        Write-Host "A rossz hitelesito adat torlese..." -ForegroundColor Yellow
        cmd /c "cmdkey /delete:git:https://github.com" | Out-Null
        "protocol=https`nhost=github.com`n`n" | git credential reject 2>$null
        Fail "A rossz fiok tokenjet toroltem. Futtasd ujra a scriptet - es a bongeszos bejelentkezesnel valaszd a(z) '$ExpectedAccount' fiokot."
    }
}

# 3) Git identitas biztositasa (ha meg nincs beallitva ebben a repoban / globalisan)
if (-not (git config user.email)) { git config user.email 'peter.lukacs@bimline.hu' }
if (-not (git config user.name))  { git config user.name  'Lukacs Peter' }

# 4) Valtozasok hozzaadasa es commit
git add -A
if (git status --porcelain) {
    if (-not $Message) { $Message = "Frissites $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { Fail "A commit nem sikerult." }
}
else {
    Write-Host "Nincs commitolando valtozas - csak push kovetkezik (ha van elore nem tolt commit)." -ForegroundColor Yellow
}

# 5) Push
Write-Host "Push a GitHubra ($Branch)..." -ForegroundColor Cyan
git push -u origin $Branch
if ($LASTEXITCODE -ne 0) {
    Fail "A push nem sikerult. Ha 403-at kaptal, rossz fiok van bejelentkezve: cmdkey /delete:git:https://github.com  majd futtasd ujra."
}

Write-Host ""
Write-Host "KESZ: minden feltoltve a GitHubra ($ExpectedAccount / $Branch)." -ForegroundColor Green
