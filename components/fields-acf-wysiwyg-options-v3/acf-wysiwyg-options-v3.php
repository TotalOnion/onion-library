<?php

/**
 * ACF Wysiwyg custom options
 *
 * @package Global Theme
 */

// Add css to the wysiwig to allow default font family and font sizes.
add_filter(
    'tiny_mce_before_init',
    function ($mce_init) {
        $content_css = gtp_get_asset_uri('wysiwyg.css');
        if (isset($mce_init['content_css'])) {
            $mce_init['content_css'] = "{$mce_init['content_css']},{$content_css}";
        }

        $style_formats = array(
            array(
                'title'   => 'Font Secondary',
                'inline'  => 'span',
                'classes' => 'font-secondary',
                'wrapper' => false,
            ),
            array(
                'title'   => 'Font Tertiary',
                'inline'  => 'span',
                'classes' => 'font-tertiary',
                'wrapper' => false,
            ),
            array(
                'title'   => 'Font Quaternary',
                'inline'  => 'span',
                'classes' => 'font-quaternary',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H Extra Large',
                'inline'  => 'span',
                'classes' => 'h-xl-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H Large',
                'inline'  => 'span',
                'classes' => 'h-l-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H Medium',
                'inline'  => 'span',
                'classes' => 'h-m-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H Small',
                'inline'  => 'span',
                'classes' => 'h-s-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H Extra Small',
                'inline'  => 'span',
                'classes' => 'h-xs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H XX small',
                'inline'  => 'span',
                'classes' => 'h-xxs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'H XXX small',
                'inline'  => 'span',
                'classes' => 'h-xxxs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH Extra large',
                'inline'  => 'span',
                'classes' => 'sh-xl-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH large',
                'inline'  => 'span',
                'classes' => 'sh-l-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH medium',
                'inline'  => 'span',
                'classes' => 'sh-m-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH small',
                'inline'  => 'span',
                'classes' => 'sh-s-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH extra small',
                'inline'  => 'span',
                'classes' => 'sh-xs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'SH XX small',
                'inline'  => 'span',
                'classes' => 'sh-xxs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P large',
                'inline'  => 'span',
                'classes' => 'p-l-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P',
                'inline'  => 'span',
                'classes' => 'p-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P small',
                'inline'  => 'span',
                'classes' => 'p-s-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P xs',
                'inline'  => 'span',
                'classes' => 'p-xs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P xxs',
                'inline'  => 'span',
                'classes' => 'p-xxs-sizing',
                'wrapper' => false,
            ),
            array(
                'title'   => 'P xxxs',
                'inline'  => 'span',
                'classes' => 'p-xxxs-sizing',
                'wrapper' => false,
            )
        );

        // $formats = "{h1: { block: 'h1', classes: 'heading' } }";

        // Define the custom colours.
        if (!defined('THEMES_OPTIONS')) {
            return $mce_init;
        }
        $options                  = THEMES_OPTIONS;
        $custom_colours           = '';
        $custom_colours_row_count = 1;

        if (
            is_array($options)
            && array_key_exists('themes', $options)
            && is_array($options['themes'][0]['text_colours'] ?? false)
        ) {
            foreach ($options['themes'][0]['text_colours'] as $option) {
                if (!empty($option['colour'])) {
                    $custom_colours .= '"' . substr($option['colour'], 1) . '","' . $option['name'] . '",';
                }
            }
            if (!empty($custom_colours)) {
                $custom_colours           = rtrim($custom_colours, ',');
                $custom_colours_row_count = ceil((count(explode(',', $custom_colours)) + 2) / 16);
            }
        }

        // Single row of colours and include into textcolor_map.
        $mce_init['textcolor_rows'] = $custom_colours_row_count;
        $mce_init['textcolor_map']  = '[' . $custom_colours . ']';

        // Insert the array, JSON ENCODED, into 'style_formats'.
        $mce_init['style_formats'] = wp_json_encode($style_formats);

        // $mce_init['formats'] = '[' . $formats . ']';

        return $mce_init;
    }
);

/**
 * Remove the Color Picker plugin from tinyMCE. This will
 * prevent users from adding custom colors. Note, the default color
 * palette is still available (and customizable by developers) via
 * textcolor_map using the tiny_mce_before_init hook.
 *
 * @param array $plugins An array of default TinyMCE plugins.
 */
add_filter('tiny_mce_plugins', 'wpse_tiny_mce_remove_custom_colors');
function wpse_tiny_mce_remove_custom_colors($plugins)
{
    foreach ($plugins as $key => $plugin_name) {
        if ('colorpicker' === $plugin_name) {
            unset($plugins[$key]);
            return $plugins;
        }
    }

    return $plugins;
}


// Enable font family selects in the editor.
add_filter(
    'mce_buttons_2',
    function ($buttons) {
        array_unshift($buttons, 'formats', 'styleselect', 'forecolor', 'fontselect'); // Add Font Select 'fontselect', Add custom classes 'styleselect'.
        return $buttons;
    }
);
