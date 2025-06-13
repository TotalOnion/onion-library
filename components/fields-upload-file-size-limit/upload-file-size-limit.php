<?php

$options = defined('GLOBAL_SETTINGS') ? GLOBAL_SETTINGS : [];
$upload_limit = 5;
if (is_array($options) && array_key_exists('upload_limit', $options)) {
    $upload_limit = $options['upload_limit'];
}
function set_upload_size_limit($size, $unit = 'MB')
{
    // Check for realistic size limits
    if ($size <= 0) {
        error_log("Error: File size limit must be a positive number.");
        return;
    }

    $base = 1024 * 1024; // Base value for MB
    if (strtoupper($unit) == 'GB') {
        // Check for excessive size in GB
        if ($size > 5) { // Arbitrary limit for example
            error_log("Warning: File size limit exceeds recommended maximum.");
        }
        $base *= 1024; // Convert base to GB
    } else if (strtoupper($unit) != 'MB') {
        error_log("Error: Invalid unit for file size limit. Use 'MB' or 'GB'.");
        return;
    }

    return $base * $size;
}

// Apply the filter to set upload size limit only within the admin area
if (is_admin()) {
    add_filter('upload_size_limit', function () use ($upload_limit) {
        return set_upload_size_limit($upload_limit, 'MB');
    });
}
