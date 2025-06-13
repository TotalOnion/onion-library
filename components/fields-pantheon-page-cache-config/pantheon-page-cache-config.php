<?php
include_once(ABSPATH . 'wp-admin/includes/plugin.php');


function removeKeys($array, $value)
{
    $filtered = array_filter($array, function ($item) use ($value) {
        return !in_array($item, $value);
    });
    return $filtered;
}

add_filter('pantheon_wp_main_query_surrogate_keys', function ($keys) {
    if ($GLOBALS['post']) {
        $keys = array('post-' . $GLOBALS['post']->ID);
    } else {
        $keys = removeKeys($keys, array('single', 'front', 'archive', 'product-archive', 'product-single', 'product-category', 'product-tag', 'product'));
    }
    return $keys;
});

/**
 * Add all post types to the ignored post types.
 *
 * @param array $post_types The array of ignored post types.
 * @return array
 */
function ignore_all_post_types_for_pantheon_cache_purge($post_types)
{
    $all_post_types = get_post_types([], 'names');
    $post_types = array_merge($post_types, $all_post_types);
    return $post_types;
}

add_filter('pantheon_purge_post_type_ignored', 'ignore_all_post_types_for_pantheon_cache_purge');

function purge_pantheon_cache_for_single_post($post_id)
{
    if (wp_is_post_revision($post_id)) {
        return;
    }

    $cache_key = 'post-' . $post_id;

    if (function_exists('pantheon_wp_clear_edge_keys')) {
        pantheon_wp_clear_edge_keys(array($cache_key));
    }
}

if (is_plugin_active('pantheon-advanced-page-cache/pantheon-advanced-page-cache.php')) {

    add_action('save_post', 'purge_pantheon_cache_for_single_post');
    add_action('delete_post', 'purge_pantheon_cache_for_single_post');
    add_action('trash_post', 'purge_pantheon_cache_for_single_post');
    add_action('wp_insert_post', 'purge_pantheon_cache_for_single_post');

    add_filter('pantheon_cache_default_max_age', function () {
        return 90 * DAY_IN_SECONDS;
    });
} else {
}
