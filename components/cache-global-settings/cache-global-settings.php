<?php
if (ENABLE_CUSTOM_CACHES && true) {
    $cache_key = 'global_settings_cache_key';
    $global_settings_cache = get_transient($cache_key);
    $cache_time = defined('CACHE_TIME') ? CACHE_TIME : 3600 * 24 * 7; // 1 week

    $on_theme_general_settings_save = function ($post_id, $menu_slug) use ($cache_time, $cache_key) {
        if ('theme-general-settings' !== $menu_slug) {
            return;
        }
        delete_transient($cache_key);
        $global_settings_cache = get_fields('option');
        set_transient($cache_key, $global_settings_cache, $cache_time);
    };
    add_action('acf/options_page/save', $on_theme_general_settings_save, 10, 2);

    if (false === $global_settings_cache) {
        // echo 'no cache';
        if (function_exists('get_fields')) {
            $global_settings_cache = get_fields('option');
        } else {
            $global_settings_cache = [];
        }
        set_transient($cache_key, $global_settings_cache, $cache_time);
    } else {
        // echo 'cache';
    }
} else {
    if (function_exists('get_fields')) {
        $global_settings_cache = get_fields('option');
    } else {
        $global_settings_cache = [];
    }
}

define('GLOBAL_SETTINGS', $global_settings_cache);
