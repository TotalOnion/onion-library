<?php

function get_svg_icon_content($filename) {
    $path = get_template_directory() . '/assets/images/library-images/' . $filename;
    if (file_exists($path)) {
        return file_get_contents($path);
    }
    return 'book';

}