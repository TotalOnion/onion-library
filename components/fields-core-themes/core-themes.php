<?php
// @codingStandardsIgnoreStart
function core_themes()
{
    if (function_exists('get_fields') && defined('THEMES_OPTIONS') && is_array(THEMES_OPTIONS)) {
        $theme_options                          = THEMES_OPTIONS;
        if (!isset($theme_options['themes'])) {
            return array();
        }
        // Set colours in root

        $output = '';
        $output = '<style id="core-themes-vars">
        :root { 
            ';

        foreach ($theme_options['themes'] as $theme => $value) {
            if (isset($value['theme_primary_background_type'])) {
                $background_value = remove_underscore($value['theme_primary_background_type']) == 'solid-colour' ? $value['theme_primary_background_colour'] : (remove_underscore($value['theme_primary_background_type']) == 'gradient' ? $value['theme_primary_background_gradient'] : null);
            } else {
                $background_value = $value['theme_primary_background_colour'];
            }
            $output .=
                '&[data-currentcolourpalette="theme-' . $theme + 1 . '"] {
                ';
            foreach ($value['theme_colours'] as $index => $content) {
                $output .= '--palette-default-' . ($index + 1) . ': ' . $content['theme_colour'] . ';
                ';
            };
            foreach ($value['text_colours'] as $index => $content) {
                $output .= '--text-colour-default-' . ($index + 1) . ': ' . $content['colour'] . ';
                ';
            };
            $output .= '--theme-primary-text-colour: ' . ($value['theme_primary_text_colour'] ?? '#ffffff') . ';
                --theme-secondary-text-colour: ' . ($value['theme_secondary_text_colour'] ?? '#ffffff') . ';
                --theme-tertiary-text-colour: ' . ($value['theme_tertiary_text_colour'] ?? '#ffffff') . ';
                --theme-primary-background-colour:' . $background_value . ';
                --theme-secondary-background-colour: ' . ($value['theme_secondary_background_colour'] ?? '#ffffff') . ';
                --theme-tertiary-background-colour: ' . ($value['theme_tertiary_background_colour'] ?? '#ffffff') . ';
                --theme-primary-accent-colour:' . ($value['theme_primary_accent_colour'] ?? '#ffffff') . ';
                --theme-secondary-accent-colour: ' . ($value['theme_secondary_accent_colour'] ?? '#ffffff') . ';
                --theme-tertiary-accent-colour: ' . ($value['theme_tertiary_accent_colour'] ?? '#ffffff') . ';
                --link-colour: ' . ($value['links']['link_colour'] ?? '#ffffff') . ';
                --link-colour-hover: ' . ($value['links']['link_colour_hover'] ?? '#ffffff') . ';
                --link-decoration-colour: ' . ($value['links']['link_decoration_colour'] ?? '#ffffff') . ';
                --link-decoration-colour-hover: ' . ($value['links']['link_decoration_colour_hover'] ?? '#ffffff') . ';
                --link-decoration-style: ' . (remove_underscore($value['links']['link_decoration_style']) ?? '#ffffff') . ';
                --link-decoration-style-hover: ' . (remove_underscore($value['links']['link_decoration_style_hover']) ?? '#ffffff') . ';

               --primary-font-family:' . (remove_underscore($value['theme_primary_font']['theme_font_select'] ?? 'arial')) . ';
                --secondary-font-family:' . (remove_underscore($value['theme_secondary_font']['theme_font_select'] ?? 'arial')) . ';
                --tertiary-font-family:' . (remove_underscore($value['theme_tertiary_font']['theme_font_select'] ?? 'arial')) . ';
                --quaternary-font-family:' . (remove_underscore($value['theme_quaternary_font']['theme_font_select'] ?? 'arial')) . ';
            }
            ';
        }
        $output .= '}
</style>';

        return [$output];
    } else {
        return array();
    }
} // END function core_design_vars
// @codingStandardsIgnoreEnd