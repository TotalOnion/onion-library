<?php

// if (function_exists('get_fields')) {
//     $keys = array('themes');
//     $filtered_themes_options = array_filter(get_fields('option'), function ($key) use ($keys) {
//         return in_array($key, $keys);
//     }, ARRAY_FILTER_USE_KEY);
//     var_export($filtered_themes_options);
// }

if (defined('USE_HARDCODED_THEMES_DATA')) {
    if (USE_HARDCODED_THEMES_DATA == true) {
        require_once __DIR__ . '/hardcoded-data/core-themes-hardcoded.php';
        $themes_options_cache = core_themes_hardcoded();
    }
} else {
    if (ENABLE_CUSTOM_CACHES && true) {
        $cache_time = defined('CACHE_TIME') ? CACHE_TIME : 3600 * 24 * 7; // 1 week
        $cache_key = 'theme_options';
        $themes_options_cache = get_transient($cache_key);

        $on_themes_settings_save = function ($post_id, $menu_slug) use ($cache_time, $cache_key) {
            $cache_key = 'theme_options';
            if ('themes' !== $menu_slug) {
                return;
            }
            delete_transient($cache_key);
            $themes_options_cache = array('themes' => get_field('themes', 'option'));
            set_transient($cache_key, $themes_options_cache, $cache_time);
        };
        add_action('acf/options_page/save', $on_themes_settings_save, 10, 2);

        if (false === $themes_options_cache) {
            // echo 'no cache';
            if (function_exists('get_fields')) {
                $themes_options_cache = array('themes' => get_field('themes', 'option'));
            } else {
                $themes_options_cache = [];
            }
            set_transient($cache_key, $themes_options_cache, $cache_time);
        } else {
            // echo 'cache';
        }
    } else {
        if (function_exists('get_fields')) {
            $themes_options_cache = array('themes' => get_field('themes', 'option'));
        } else {
            $themes_options_cache = [];
        }
    }
}

define('THEMES_OPTIONS', $themes_options_cache);
