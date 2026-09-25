Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\.user_uploaded\media_1789882220108.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$size = 1080

# 1. Version 1: Clean Storefront 1:1 Square (Soft Blush #FFF9FA background)
$bmpClean = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gClean = [System.Drawing.Graphics]::FromImage($bmpClean)
$gClean.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gClean.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gClean.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gClean.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 249, 250)) # #FFF9FA
$gClean.FillRectangle($bgBrush, 0, 0, $size, $size)

# Calculate target width & height so it sits cleanly within circular safe zone
# In a 1080 circle, safe width for a wide logo is 860px
$targetWidth = 860
$targetHeight = [int](($src.Height / $src.Width) * $targetWidth)
$posX = [int](($size - $targetWidth) / 2)
$posY = [int](($size - $targetHeight) / 2)

$destRect = New-Object System.Drawing.Rectangle($posX, $posY, $targetWidth, $targetHeight)
$gClean.DrawImage($src, $destRect)

# Save Version 1
$outDir1 = "C:\Users\Harsh\Antigravity IDE\prachi_logo_profile_1x1.png"
$bmpClean.Save($outDir1, [System.Drawing.Imaging.ImageFormat]::Png)

$outPublic1 = "C:\Users\Harsh\Antigravity IDE\public\prachi_logo_profile_1x1.png"
$bmpClean.Save($outPublic1, [System.Drawing.Imaging.ImageFormat]::Png)

$outArtifact1 = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\prachi_logo_profile_1x1.png"
$bmpClean.Save($outArtifact1, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Clean 1:1 profile saved to $outDir1"

# 2. Version 2: Luxury Emblem with Rose-Gold / Mauve Circular Ring Border
$bmpRing = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gRing = [System.Drawing.Graphics]::FromImage($bmpRing)
$gRing.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gRing.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gRing.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gRing.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$gRing.FillRectangle($bgBrush, 0, 0, $size, $size)

# Draw elegant outer ring (diameter 1000px)
$penRing = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(186, 74, 110), 3.0) # #BA4A6E
$penRingSoft = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(244, 211, 218), 2.0) # #F4D3DA
$gRing.DrawEllipse($penRingSoft, 30, 30, 1020, 1020)
$gRing.DrawEllipse($penRing, 46, 46, 988, 988)

# Logo inside ring
$targetWidthRing = 800
$targetHeightRing = [int](($src.Height / $src.Width) * $targetWidthRing)
$posXRing = [int](($size - $targetWidthRing) / 2)
$posYRing = [int](($size - $targetHeightRing) / 2)

$destRectRing = New-Object System.Drawing.Rectangle($posXRing, $posYRing, $targetWidthRing, $targetHeightRing)
$gRing.DrawImage($src, $destRectRing)

$outDir2 = "C:\Users\Harsh\Antigravity IDE\prachi_logo_luxury_ring_1x1.png"
$bmpRing.Save($outDir2, [System.Drawing.Imaging.ImageFormat]::Png)

$outPublic2 = "C:\Users\Harsh\Antigravity IDE\public\prachi_logo_luxury_ring_1x1.png"
$bmpRing.Save($outPublic2, [System.Drawing.Imaging.ImageFormat]::Png)

$outArtifact2 = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\prachi_logo_luxury_ring_1x1.png"
$bmpRing.Save($outArtifact2, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Luxury Ring 1:1 profile saved to $outDir2"

# 3. Clean up
$gClean.Dispose()
$bmpClean.Dispose()
$gRing.Dispose()
$bmpRing.Dispose()
$bgBrush.Dispose()
$penRing.Dispose()
$penRingSoft.Dispose()
$src.Dispose()
