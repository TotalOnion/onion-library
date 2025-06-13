<?php
// @codingStandardsIgnoreStart
function core_design_system()
{
    $output = '';
    $current_post = [];
    if (isset($GLOBALS['post'])) {
        $current_post = Timber::get_post($GLOBALS['post']->ID);
    }
    if (defined('GLOBAL_SETTINGS') && is_array(GLOBAL_SETTINGS)) {
        $options = GLOBAL_SETTINGS;
        if ($options) {
            $output = '
            <style id="core-design-system">
            :root { 
                --mobile-inline:' . ($options['mobile_inline'] ?? 0) . '; 
                --portrait-inline:' . ($options['portrait_inline'] ?? 0) . '; 
                --landscape-inline:' . ($options['landscape_inline'] ?? 0) . '; 
                --desktop-inline:' . ($options['desktop_inline'] ?? 0) . '; 
                --screen-width-fullhd:' . ($options['screen_width_full_hd'] ?? 1920) . ';
                --font-reference-fullhd:' . ($options['font_reference_full_hd'] ?? 1920) . ';
                --screen-width-desktop:' . ($options['screen_width_desktop'] ?? 1440) . ';
                --font-reference-desktop:' . ($options['font_reference_desktop'] ?? 1440) . ';
                --screen-width-landscape:' . ($options['screen_width_landscape'] ?? 1024) . ';
                --font-reference-landscape:' . ($options['font_reference_landscape'] ?? 1024) . ';
                --screen-width-portrait:' . ($options['screen_width_portrait'] ?? 768) . ';
                --font-reference-portrait:' . ($options['font_reference_portrait'] ?? 768) . ';
                --font-reference-mobile:' . ($options['font_reference_mobile'] ?? 375) . ';
                --screen-width-mobile:' . ($options['screen_width_mobile'] ?? 375) . ';
                --screen-width-static:' . ($options['desktop_design_reference'] ?? 1920) . 'px;
                --fullhd-design-reference:' . ($options['full_hd_design_reference'] ?? 1920) . ';
                --desktop-design-reference:' . ($options['desktop_design_reference'] ?? 1440) . ';
                --landscape-design-reference:' . ($options['landscape_design_reference'] ?? 1024) . ';
                --portrait-design-reference:' . ($options['portrait_design_reference'] ?? 1024) . ';
                --mobile-design-reference:' . ($options['mobile_design_reference'] ?? 1024) . ';
                --global-content-max-width-setting:' . ($options['global_content_max_width_setting'] ?? 1024) . ';
                --post-colour:' . ($current_post && (property_exists($current_post, 'meta') && isset($current_post->meta['post_colour'])) ? $current_post->meta['post_colour'] : '') . ';
                --post-text-colour-style:' .  ($current_post && (property_exists($current_post, 'meta') && isset($current_post->meta['post_text_colour_style'])) ? remove_underscore($current_post->meta['post_text_colour_style']) : '') . ';
                }</style>';
        }
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd