@echo off
setlocal enabledelayedexpansion

set "file=C:\Users\admin\.accio\accounts\1749946553\agents\DID-F456DA-2B0D4C\project\gogoodpackaging\index.html"
set "tempfile=%file%.tmp"

echo ^<!-- PRODUCT SCROLL MARQUEE --^> > "%tempfile%"
echo ^<section class="marquee-section"^> >> "%tempfile%"
echo   ^<div class="marquee-label"^>Our Products^</div^> >> "%tempfile%"
echo   ^<div class="marquee-track-wrap"^> >> "%tempfile%"
echo     ^<div class="marquee-track"^> >> "%tempfile%"

for /L %%i in (1,1,70) do (
    echo       ^<div class="marquee-item"^>^<img src="images/products/prod-scroll-%%i.png" alt="Product %%i" /^>^<span^>Packaging Sample^</span^>^</div^> >> "%tempfile%"
)
echo       ^<div class="marquee-item"^>^<img src="images/products/prod-scroll-cigarette.png" alt="Cigarette Box" /^>^<span^>Cigarette Box^</span^>^</div^> >> "%tempfile%"

rem Repeat first 15 for loop
for /L %%i in (1,1,15) do (
    echo       ^<div class="marquee-item"^>^<img src="images/products/prod-scroll-%%i.png" alt="Product %%i" /^>^<span^>Packaging Sample^</span^>^</div^> >> "%tempfile%"
)

echo     ^</div^> >> "%tempfile%"
echo   ^</div^> >> "%tempfile%"
echo ^</section^> >> "%tempfile%"

type "%tempfile%"
del "%tempfile%"
