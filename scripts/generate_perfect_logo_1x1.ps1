Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\.user_uploaded\media_1789882220108.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# 1. Create a transparent PNG of the logo by calculating alpha from the background
$w = $src.Width
$h = $src.Height
$transparentLogo = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bgR = 255
$bgG = 249
$bgB = 250

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $src.GetPixel($x, $y)
        
        # Calculate color difference from background
        # Background is close to white (luminance ~ 252)
        # Foreground text is darker (luminance < 200)
        $diff = [Math]::Max([Math]::Max([int]$bgR - [int]$c.R, [int]$bgG - [int]$c.G), [int]$bgB - [int]$c.B)
        
        if ($diff -le 3) {
            # Completely background
            $transparentLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($diff -lt 25) {
            # Smooth anti-aliased edge transition
            $alpha = [int](($diff / 25.0) * 255)
            # Reconstruct color without background tint
            $transparentLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            # Solid text
            $transparentLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

# Crop tight to content bounds: X=51..1004, Y=78..267 (width=954, height=190)
$cropX = 48
$cropY = 75
$cropW = 960
$cropH = 196
$contentCrop = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gCrop = [System.Drawing.Graphics]::FromImage($contentCrop)
$gCrop.DrawImage($transparentLogo, 0, 0, (New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
$gCrop.Dispose()

$size = 1080

# --- Function to render 1:1 image ---
function Create-Logo-Profile([string]$filename, [System.Drawing.Color]$bgColor, [bool]$drawRing) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($bgColor.A -gt 0) {
        $brush = New-Object System.Drawing.SolidBrush($bgColor)
        $g.FillRectangle($brush, 0, 0, $size, $size)
        $brush.Dispose()
    }

    if ($drawRing) {
        # Outer soft ring
        $penSoft = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(244, 211, 218), 3.0) # #F4D3DA
        $g.DrawEllipse($penSoft, 36, 36, 1008, 1008)
        $penSoft.Dispose()

        # Inner luxury mauve ring
        $penMauve = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(186, 74, 110), 4.0) # #BA4A6E
        $g.DrawEllipse($penMauve, 52, 52, 976, 976)
        $penMauve.Dispose()
    }

    # Safe width inside circular frame: 840px (well inside the 1080px circle diameter)
    $targetW = if ($drawRing) { 780 } else { 840 }
    $targetH = [int](($cropH / $cropW) * $targetW)
    $posX = [int](($size - $targetW) / 2)
    $posY = [int](($size - $targetH) / 2)

    $destRect = New-Object System.Drawing.Rectangle($posX, $posY, $targetW, $targetH)
    $g.DrawImage($contentCrop, $destRect)

    $g.Dispose()

    # Save to Workspace, Public, and Artifacts
    $p1 = "C:\Users\Harsh\Antigravity IDE\$filename"
    $p2 = "C:\Users\Harsh\Antigravity IDE\public\$filename"
    $p3 = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\$filename"
    
    $bmp.Save($p1, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($p2, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save($p3, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Generated $filename"
}

# 1. Clean Storefront Blush Background (#FFF9FA)
Create-Logo-Profile -filename "prachi_logo_1x1.png" -bgColor ([System.Drawing.Color]::FromArgb(255, 255, 249, 250)) -drawRing $false

# 2. Pure Crisp White Background (#FFFFFF)
Create-Logo-Profile -filename "prachi_logo_white_1x1.png" -bgColor ([System.Drawing.Color]::FromArgb(255, 255, 255, 255)) -drawRing $false

# 3. Luxury Mauve & Rose Gold Ring Frame (Perfect for social avatar circles)
Create-Logo-Profile -filename "prachi_logo_ring_1x1.png" -bgColor ([System.Drawing.Color]::FromArgb(255, 255, 249, 250)) -drawRing $true

# 4. Transparent Background PNG (1:1 square with transparent backing)
Create-Logo-Profile -filename "prachi_logo_transparent_1x1.png" -bgColor ([System.Drawing.Color]::FromArgb(0, 0, 0, 0)) -drawRing $false

# Cleanup
$contentCrop.Dispose()
$transparentLogo.Dispose()
$src.Dispose()
Write-Output "All 1:1 profiles generated successfully!"
