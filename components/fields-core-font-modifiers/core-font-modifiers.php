<?php
// @codingStandardsIgnoreStart
function core_font_modifiers()
{
    $output = '';
    if (defined('MARKET_SETTINGS_OPTIONS') && is_array(MARKET_SETTINGS_OPTIONS)) {
        $options = MARKET_SETTINGS_OPTIONS;
        if ($options) {
            if (array_key_exists('core_font_modifiers', $options)) {
                $output = '
            <style id="core-font-modifiers">
            :root { 
               --global-font-multiplier-primary:' . ($options['core_font_modifiers']['primary_font_ratio'] ?? 1) . '; 
                --global-font-multiplier-secondary:' . ($options['core_font_modifiers']['secondary_font_ratio'] ?? 1) . '; 
                --global-font-multiplier-tertiary:' . ($options['core_font_modifiers']['tertiary_font_ratio'] ?? 1) . '; 
                --global-font-multiplier-quaternary:' . ($options['core_font_modifiers']['quaternary_font_ratio'] ?? 1) . '; 

                --global-font-offset-primary:' . ($options['core_font_modifiers']['primary_offset_ratio'] ?? 0) . '; 
                --global-font-offset-secondary:' . ($options['core_font_modifiers']['secondary_offset_ratio'] ?? 0) . '; 
                --global-font-offset-tertiary:' . ($options['core_font_modifiers']['tertiary_offset_ratio'] ?? 0) . '; 
                --global-font-offset-quaternary:' . ($options['core_font_modifiers']['quaternary_offset_ratio'] ?? 0) . '; 
                
                --global-line-height-multiplier-tertiary:' . ($options['core_font_modifiers']['tertiary_line_height_ratio'] ?? 1) . '; ';
            }
            $output .= '}</style>';
        }
    } else {
        $output = '
        <style>
        :root { 
            --global-font-multiplier-primary:1; 
            --global-font-multiplier-secondary:1; 
            --global-font-multiplier-tertiary:1; 
            --global-font-multiplier-quaternary:1; 

            --global-font-offset-primary:0; 
            --global-font-offset-secondary:0; 
            --global-font-offset-tertiary:0; 
            --global-font-offset-quaternary:0; 

            --global-line-height-multiplier-tertiary:1; ';
        $output .= '}</style>';
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd