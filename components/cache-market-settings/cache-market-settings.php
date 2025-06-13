<?php

if (ENABLE_CUSTOM_CACHES && true) {
    $lang_code = defined('ICL_LANGUAGE_CODE') ? ICL_LANGUAGE_CODE : 'en';
    $cache_time = defined('CACHE_TIME') ? CACHE_TIME : 3600 * 24 * 7; // 1 week
    $cache_key = $lang_code . '_market_settings_options';
    $market_settings_options_cache = get_transient($cache_key);

    $on_market_settings_save = function ($post_id, $menu_slug) use ($cache_time, $cache_key) {
        if ('market-settings' !== $menu_slug) {
            return;
        }
        delete_transient($cache_key);
        $market_settings_options_cache = get_fields('option');
        set_transient($cache_key, $market_settings_options_cache, $cache_time);
    };
    add_action('acf/options_page/save', $on_market_settings_save, 10, 2);

    if (false === $market_settings_options_cache) {
        // echo 'no cache';
        if (function_exists('get_field_object')) {
            $market_settings_options_cache = get_fields('option');
        } else {
            $market_settings_options_cache = [];
        }
        set_transient($cache_key, $market_settings_options_cache, $cache_time);
    } else {
        // echo 'cache';
    }

} else {
    if (function_exists('get_fields')) {
        $market_settings_options_cache = get_fields('option');
    } else {
        $market_settings_options_cache = [];
    }
}

define('MARKET_SETTINGS_OPTIONS', $market_settings_options_cache);
