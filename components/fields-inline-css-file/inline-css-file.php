<?php

function inline_css_file($filename)
{
    if (!$filename) {
        return;
    }
    $fileArray = explode('.', $filename);
    if (end($fileArray) !== 'css') {
        return;
    }
    $output = '';
    $inline_css = gtp_get_asset_uri($filename);
    if (!empty($inline_css)) {
        $fileArray = explode('/', $inline_css);
        $fileName = end($fileArray);
        $path = __DIR__ . '/../..' . STATIC_FOLDER . '/' . $fileName;
        if (file_exists($path)) {
            $cssContent = file_get_contents($path);
            $output = '<style>' . $cssContent . '</style>';
        }
    }
    return [$output];
}
