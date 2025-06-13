<?php
// Uncomment the image sizes if your project does not have 3rd party image management and comment the filter below instead.
// add_image_size('mobile', 375, 9999);
// add_image_size('small-tablet', 500, 9999);
// add_image_size('portrait', 768, 9999);
// add_image_size('desktop', 1440, 9999);
// add_image_size('full-hd', 1920, 9999);

add_filter('intermediate_image_sizes', 'remove_default_img_sizes', 10, 1);

function remove_default_img_sizes($sizes)
{
    $targets = ['thumbnail', 'medium', 'medium_large', 'large', '1536x1536', '2048x2048'];

    foreach ($sizes as $size_index => $size) {
        if (in_array($size, $targets)) {
            unset($sizes[$size_index]);
        }
    }

    return $sizes;
}

add_filter('wp_img_tag_add_auto_sizes', '__return_false');
