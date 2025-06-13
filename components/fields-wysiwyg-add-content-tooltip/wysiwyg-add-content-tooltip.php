<?php

/**
 * Add tooltip functionality to the content
 */

function content_tooltip_button( $buttons ) {
    array_push( $buttons, 'content_tooltip_button' );
    return $buttons;
}

function content_tooltip_plugin( $plugin_array ) {
    $plugin_array['tooltip_plugin'] = gtp_get_asset_uri('wysiwygeditortooltip.js');
    return $plugin_array;
}

function custom_tooltip_mce_register_buttons() {
    add_filter( 'mce_external_plugins', 'content_tooltip_plugin' );
    add_filter( 'mce_buttons', 'content_tooltip_button' );
}

add_action( 'admin_init', 'custom_tooltip_mce_register_buttons' );

// Update toolbar option for ACF Wysiwyg(Global theme custom one).
add_filter('acf/fields/wysiwyg/toolbars', 'core_acf_wysiwyg_toolbars_update');
function core_acf_wysiwyg_toolbars_update($toolbars)
{
    $toolbars['Colour + Bold + Italic + Underline + Link + Tooltip']    = array();
    $toolbars['Colour + Bold + Italic + Underline + Link + Tooltip'][1] = array('forecolor', 'bold', 'italic', 'underline', 'link', 'removeformat', 'content_tooltip_button');

    return $toolbars;
}

function disable_acf_wpautop($value, $post_id, $field) {
    $value = str_replace(['<p>', '</p>'], '', $value);
    $value = str_replace("\n", "<br>", $value);
    return $value;
}
add_filter('acf/update_value/name=post_author_info', 'disable_acf_wpautop', 10, 3);

function load_acf_wpautop($value, $post_id, $field) {
    $value = str_replace(['<p>', '</p>'], '', $value);
    return $value;
}
add_filter('acf/format_value/name=post_author_info', 'load_acf_wpautop', 10, 3);
