<?php
function get_raw_svg($image_id_or_path, $class_names = 'style-svg', $attributes = '')
{
    $svg_file_path = $image_id_or_path;

    if (is_numeric($image_id_or_path)) {
        $svg_file_path = get_attached_file($image_id_or_path);
    }
    if (!wp_check_filetype($svg_file_path)['type'] == 'image/svg+xml') {
        return '';
    }

    $svg_code = '';
    //$svg_code = file_get_contents($svg_file_path, false, $context);
    $svg_file_path = __DIR__ . "/../../../../../../.." . $svg_file_path;
    if (file_exists($svg_file_path)) {
        $svg_code = file_get_contents($svg_file_path);
    } else {
    }
    if (!empty($svg_code) && $class_names && strpos($svg_code, '<svg') !== false) {
        $svg_code = preg_replace('/<svg/', '<svg ' . $attributes .  ' class="' . htmlspecialchars($class_names, ENT_QUOTES, 'UTF-8') . '"', $svg_code, 1);
    }
    return $svg_code;
}
