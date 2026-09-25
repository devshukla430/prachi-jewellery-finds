Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\.user_uploaded\media_1789882220108.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# Check pixels at (0,0), (500,0), (0,150), (1023, 330)
Write-Output "Pixel (0,0): $($src.GetPixel(0,0))"
Write-Output "Pixel (512,0): $($src.GetPixel(512,0))"
Write-Output "Pixel (512,10): $($src.GetPixel(512,10))"
Write-Output "Pixel (0,165): $($src.GetPixel(0,165))"
Write-Output "Pixel (1023,330): $($src.GetPixel(1023,330))"
$src.Dispose()
