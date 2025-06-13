<?php

// if (function_exists('get_fields')) {
//     $keys = array('headings', 'sub_headings', 'paragraphs', 'paragraph_spacing_mobile', 'paragraph_spacing_portrait', 'paragraph_spacing_desktop', 'heading_spacing_mobile', 'heading_spacing_portrait', 'heading_spacing_desktop', 'list_item_line_height', 'list_item_letter_spacing', 'list_item_block_spacing_mobile', 'list_item_block_spacing_portrait', 'list_item_block_spacing_landscape', 'list_item_block_spacing_desktop');
//     $filtered_typography_options = array_filter(get_fields('option'), function ($key) use ($keys) {
//         return in_array($key, $keys);
//     }, ARRAY_FILTER_USE_KEY);
//     var_export($filtered_typography_options);
// }

if (defined('USE_HARDCODED_TYPOGRAPHY_DATA')) {
    if (USE_HARDCODED_TYPOGRAPHY_DATA == true) {
        require_once __DIR__ . '/hardcoded-data/core-typography-hardcoded.php';
        $typography_options_cache = core_typography_hardcoded();
    }
} else {
    if (ENABLE_CUSTOM_CACHES && true) {
        $cache_time = defined('CACHE_TIME') ? CACHE_TIME : 3600 * 24 * 7; // 1 week
        $cache_key = 'typography_options';
        $typography_options_cache = get_transient($cache_key);

        $on_typography_settings_save = function ($post_id, $menu_slug) use ($cache_time, $cache_key) {
            $cache_key = 'typography_options';
            if ('typography' !== $menu_slug) {
                return;
            }
            delete_transient($cache_key);
            $typography_options_cache = get_fields('option');
            set_transient($cache_key, $typography_options_cache, $cache_time);
        };
        add_action('acf/options_page/save', $on_typography_settings_save, 10, 2);

        if (false === $typography_options_cache) {
            // echo 'no cache';
            if (function_exists('get_fields')) {
                $typography_options_cache = get_fields('option');;
            } else {
                $typography_options_cache = [];
            }
            set_transient($cache_key, $typography_options_cache, $cache_time);
        } else {
            // echo 'cache';
        }
    } else {
        if (function_exists('get_fields') && !USE_HARDCODED_DATA) {
            $typography_options_cache = GLOBAL_SETTINGS;
        } else {
            $typography_options_cache = [];
        }
    }
}

define('TYPOGRAPHY_OPTIONS', $typography_options_cache);
