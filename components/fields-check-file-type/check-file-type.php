<?php
function check_file_type($image_id_or_path)
{
    if (!$image_id_or_path) {
        return '';
    }
    $svg_file_path = $image_id_or_path;
    if (is_numeric($image_id_or_path)) {
        $svg_file_path = get_attached_file($image_id_or_path);
    }
    $file_info = wp_check_filetype($svg_file_path);
    return $file_info['type'];
}
