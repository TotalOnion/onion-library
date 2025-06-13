<?php
function add_svg_to_upload_mimes($upload_mimes)
{
    $upload_mimes['svg'] = 'image/svg+xml';
    return $upload_mimes;
}
add_filter('upload_mimes', 'add_svg_to_upload_mimes');

// use enshrined\svgSanitize\Sanitizer;

// function sanitize_svg_on_upload($file)
// {
//     if ($file['type'] === 'image/svg+xml') {
//         $sanitizer = new Sanitizer();
//         $dirty_svg = file_get_contents($file['tmp_name']);
//         $clean_svg = $sanitizer->sanitize($dirty_svg);

//         if ($clean_svg) {
//             file_put_contents($file['tmp_name'], $clean_svg);
//         } else {
//             // Handle the error
//             $file['error'] = 'Sorry, this SVG file could not be sanitized.';
//         }
//     }
//     return $file;
// }
// add_filter('wp_handle_upload_prefilter', 'sanitize_svg_on_upload');

function fix_svg_display()
{
    echo '
    <style type="text/css">
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
    </style>
    ';
}
add_action('admin_head', 'fix_svg_display');

// function restrict_svg_upload_for_users($upload_mimes)
// {
//     // Only allow SVG upload for administrators
//     if (!current_user_can('administrator')) {
//         unset($upload_mimes['svg']);
//     }
//     return $upload_mimes;
// }
// add_filter('upload_mimes', 'restrict_svg_upload_for_users');
