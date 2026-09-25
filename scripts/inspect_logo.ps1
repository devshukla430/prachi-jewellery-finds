Add-Type -AssemblyName System.Drawing

$imgPath = "C:\Users\Harsh\.gemini\antigravity-ide\brain\c36e1276-a387-440e-9586-8a865d2f54fe\.user_uploaded\media_1789882220108.png"
$src = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Output "Width: $($src.Width), Height: $($src.Height)"

$p00 = $src.GetPixel(0, 0)
Write-Output "Corner (0,0): R=$($p00.R), G=$($p00.G), B=$($p00.B), A=$($p00.A)"

# Find non-background bounding box
$minX = $src.Width
$maxX = 0
$minY = $src.Height
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
        $c = $src.GetPixel($x, $y)
        $diff = [Math]::Abs([int]$c.R - [int]$p00.R) + [Math]::Abs([int]$c.G - [int]$p00.G) + [Math]::Abs([int]$c.B - [int]$p00.B)
        if ($diff -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Content bounding box: X=$minX..$maxX, Y=$minY..$maxY"
Write-Output "Content size: $(($maxX - $minX + 1)) x $(($maxY - $minY + 1))"

$src.Dispose()
