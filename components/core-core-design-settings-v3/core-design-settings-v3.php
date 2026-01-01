<?php
// @codingStandardsIgnoreStart
function core_design_settings_v3($options)
{
    if (!is_array($options)) {
        return [];
    }
    $json_data = file_get_contents(get_template_directory() . '/inc/theme-data/' . $options['current_theme_name'] . '/design-settings-vars.json');
    $design_settings_data = json_decode($json_data, true);
    $output = '';
    if ($design_settings_data) {
        $settings = $design_settings_data;
        if ($settings) {
            $output = '
            <style id="core-design-settings-v3">
            body { 
                --mobile-inline:' . ($settings['mobile_inline'] ?? 0) . '; 
                --portrait-inline:' . ($settings['portrait_inline'] ?? 0) . '; 
                --landscape-inline:' . ($settings['landscape_inline'] ?? 0) . '; 
                --desktop-inline:' . ($settings['desktop_inline'] ?? 0) . '; 
                --screen-width-fullhd:' . ($settings['screen_width_full_hd'] ?? 1920) . ';
                --font-reference-fullhd:' . ($settings['font_reference_full_hd'] ?? 1920) . ';
                --screen-width-desktop:' . ($settings['screen_width_desktop'] ?? 1440) . ';
                --font-reference-desktop:' . ($settings['font_reference_desktop'] ?? 1440) . ';
                --screen-width-landscape:' . ($settings['screen_width_landscape'] ?? 1024) . ';
                --font-reference-landscape:' . ($settings['font_reference_landscape'] ?? 1024) . ';
                --screen-width-portrait:' . ($settings['screen_width_portrait'] ?? 768) . ';
                --font-reference-portrait:' . ($settings['font_reference_portrait'] ?? 768) . ';
                --font-reference-mobile:' . ($settings['font_reference_mobile'] ?? 375) . ';
                --screen-width-mobile:' . ($settings['screen_width_mobile'] ?? 375) . ';
                --screen-width-static:' . ($settings['desktop_design_reference'] ?? 1920) . 'px;
                --fullhd-design-reference:' . ($settings['full_hd_design_reference'] ?? 1920) . ';
                --desktop-design-reference:' . ($settings['desktop_design_reference'] ?? 1440) . ';
                --landscape-design-reference:' . ($settings['landscape_design_reference'] ?? 1024) . ';
                --portrait-design-reference:' . ($settings['portrait_design_reference'] ?? 1024) . ';
                --mobile-design-reference:' . ($settings['mobile_design_reference'] ?? 1024) . ';
                --global-content-max-width-setting:' . ($settings['global_max_width'] ?? 1024) . ';
                }</style>';
        }
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd