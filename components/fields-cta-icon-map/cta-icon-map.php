<?php

function cta_icon_map($icon_array = [])
{
    if (!is_array($icon_array)) {
        return [];
    }
    return array_map(function ($icon) {
        return ['image' => (check_file_type($icon) == 'image/svg+xml') ? get_raw_svg($icon) : $icon, 'type' => check_file_type($icon)];
    }, $icon_array);
}
