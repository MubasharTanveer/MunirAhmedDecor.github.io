# Munir Ahmed Decorations - Local HTTP Static Server
$port = 8080
$rootDir = $PSScriptRoot
if (-not $rootDir) { $rootDir = "c:\Users\Mubashar\Desktop\WEbsite Project" }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$($port)/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "=========================================================="
    Write-Host "Munir Ahmed Luxury Celebrations & Event Decor Server Live!"
    Write-Host "Access URL: http://localhost:$($port)"
    Write-Host "Root Directory: $rootDir"
    Write-Host "=========================================================="
} catch {
    Write-Host "Failed to start on primary port $($port), switching to 8081..."
    $port = 8081
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$($port)/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    Write-Host "Server started on fallback port: http://localhost:$($port)"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        # Normalize relative path
        $decodedPath = [System.Uri]::UnescapeDataString($urlPath).TrimStart('/')
        $decodedPath = $decodedPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($rootDir, $decodedPath)

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "200 OK: $urlPath"
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File $urlPath not found.</p>")
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
            Write-Host "404 Not Found: $urlPath"
        }

        $response.OutputStream.Close()
    } catch {
        Write-Host "Request handling error: $_"
    }
}
