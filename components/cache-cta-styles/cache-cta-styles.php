<?php

// if (function_exists('get_fields')) {
//     $keys = array('theme_cta_styles');
//     $filtered_ctastyles_options = array_filter(get_fields('option'), function ($key) use ($keys) {
//         return in_array($key, $keys);
//     }, ARRAY_FILTER_USE_KEY);
//     var_export($filtered_ctastyles_options);
// }

if (defined('USE_HARDCODED_CTASTYLES_DATA')) {
    if (USE_HARDCODED_CTASTYLES_DATA == true) {
        require_once __DIR__ . '/hardcoded-data/core-ctastyles-hardcoded.php';
        $cta_styles_options_cache = core_ctastyles_hardcoded();
    }
} else {
    if (ENABLE_CUSTOM_CACHES && true) {
        $cache_key = 'cta_styles_options';
        $cta_styles_options_cache = get_transient($cache_key);
        $cache_time = defined('CACHE_TIME') ? CACHE_TIME : 3600 * 24 * 7; // 1 week

        $on_cta_styles_save = function ($post_id, $menu_slug) use ($cache_time, $cache_key) {
            if ('cta-styles' !== $menu_slug) {
                return;
            }
            delete_transient($cache_key);

            $cta_styles_options_cache = array('theme_cta_styles' => get_field('theme_cta_styles', 'option'));
            set_transient($cache_key, $cta_styles_options_cache, $cache_time);
        };
        add_action('acf/options_page/save', $on_cta_styles_save, 10, 2);

        if (false === $cta_styles_options_cache) {
            // echo 'no cache';
            if (function_exists('get_fields')) {
                $cta_styles_options_cache = array('theme_cta_styles' => get_field('theme_cta_styles', 'option'));
            } else {
                $cta_styles_options_cache = [];
            }
            set_transient($cache_key, $cta_styles_options_cache, $cache_time);
        } else {
            // echo 'cache';
        }

    } else {
        if (function_exists('get_fields')) {
            $cta_styles_options_cache = array('theme_cta_styles' => get_field('theme_cta_styles', 'option'));
        } else {
            $cta_styles_options_cache = [];
        }
    }
}

define('CTA_STYLES_OPTIONS', $cta_styles_options_cache);
