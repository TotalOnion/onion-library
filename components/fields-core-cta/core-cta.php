<?php

function core_cta()
{
    $output = '';
    if (defined('CTA_STYLES_OPTIONS') && is_array(CTA_STYLES_OPTIONS)) {
        $options = CTA_STYLES_OPTIONS;

        if ($options && array_key_exists('theme_cta_styles', $options) && is_array($options['theme_cta_styles'])) {
            $output .= '<style id="core-cta-vars">:root {';
            foreach ($options['theme_cta_styles'] as $key => $button) {
                $button_colour = $button['cta_settings']['colour'];
                $hover_colour = $button['cta_settings']['hover_colour'];
                $background_colour = $button['cta_settings']['background_colour'];
                $hover_background_colour = $button['cta_settings']['hover_background_colour'];
                if (array_key_exists('colour_type', $button['cta_settings'])) {

                    switch (remove_underscore($button['cta_settings']['colour_type'])) {
                        case 'colour-picker':
                            $button_colour = $button['cta_settings']['colour'];
                            break;
                        case 'post-colour':
                            $button_colour = 'var(--post-colour)';
                            break;
                        case 'post-text-colour-style':
                            $button_colour = 'var(--post-text-colour-style)';
                            break;
                        case 'theme-primary-text-colour':
                            $button_colour = 'var(--theme-primary-text-colour)';
                            break;
                        case 'theme-secondary-text-colour':
                            $button_colour = 'var(--theme-secondary-text-colour)';
                            break;
                        case 'theme-tertiary-text-colour':
                            $button_colour = 'var(--theme-tertiary-text-colour)';
                            break;
                        case 'theme-primary-accent-colour':
                            $button_colour = 'var(--theme-primary-accent-colour)';
                            break;
                        case 'theme-secondary-accent-colour':
                            $button_colour = 'var(--theme-secondary-accent-colour)';
                            break;
                        case 'theme-tertiary-accent-colour':
                            $button_colour = 'var(--theme-tertiary-accent-colour)';
                            break;
                        default:
                            $button_colour = $button['cta_settings']['colour'];
                            break;
                    }
                };

                if (array_key_exists('hover_colour_type', $button['cta_settings'])) {
                    switch (remove_underscore($button['cta_settings']['hover_colour_type'])) {
                        case 'colour-picker':
                            $hover_colour = $button['cta_settings']['hover_colour'];
                            break;
                        case 'post-colour':
                            $hover_colour = 'var(--post-colour)';
                            break;
                        case 'post-text-colour-style':
                            $hover_colour = 'var(--post-text-colour-style)';
                            break;
                        case 'theme-primary-text-colour':
                            $hover_colour = 'var(--theme-primary-text-colour)';
                            break;
                        case 'theme-secondary-text-colour':
                            $hover_colour = 'var(--theme-secondary-text-colour)';
                            break;
                        case 'theme-tertiary-text-colour':
                            $hover_colour = 'var(--theme-tertiary-text-colour)';
                            break;
                        case 'theme-primary-accent-colour':
                            $hover_colour = 'var(--theme-primary-accent-colour)';
                            break;
                        case 'theme-secondary-accent-colour':
                            $hover_colour = 'var(--theme-secondary-accent-colour)';
                            break;
                        case 'theme-tertiary-accent-colour':
                            $hover_colour = 'var(--theme-tertiary-accent-colour)';
                            break;
                        default:
                            $hover_colour = $button['cta_settings']['hover_colour'];
                            break;
                    };
                };
                if (array_key_exists('background_colour_type', $button['cta_settings'])) {
                    switch (remove_underscore($button['cta_settings']['background_colour_type'])) {
                        case 'colour-picker':
                            $background_colour = $button['cta_settings']['background_colour'];
                            break;
                        case 'post-colour':
                            $background_colour = 'var(--post-colour)';
                            break;
                        case 'post-text-colour-style':
                            $background_colour = 'var(--post-text-colour-style)';
                            break;
                        case 'theme-primary-background-colour':
                            $background_colour = 'var(--theme-primary-background-colour)';
                            break;
                        case 'theme-secondary-background-colour':
                            $background_colour = 'var(--theme-secondary-background-colour)';
                            break;
                        case 'theme-tertiary-background-colour':
                            $background_colour = 'var(--theme-tertiary-background-colour)';
                            break;
                        case 'theme-primary-accent-colour':
                            $background_colour = 'var(--theme-primary-accent-colour)';
                            break;
                        case 'theme-secondary-accent-colour':
                            $background_colour = 'var(--theme-secondary-accent-colour)';
                            break;
                        case 'theme-tertiary-accent-colour':
                            $background_colour = 'var(--theme-tertiary-accent-colour)';
                            break;
                        default:
                            $background_colour = $button['cta_settings']['background_colour'];
                            break;
                    };
                };
                if (array_key_exists('hover_background_colour_type', $button['cta_settings'])) {
                    switch (remove_underscore($button['cta_settings']['hover_background_colour_type'])) {
                        case 'colour-picker':
                            $hover_background_colour = $button['cta_settings']['hover_background_colour'];
                            break;
                        case 'post-colour':
                            $hover_background_colour = 'var(--post-colour)';
                            break;
                        case 'post-text-colour-style':
                            $hover_background_colour = 'var(--post-text-colour-style)';
                            break;
                        case 'theme-primary-background-colour':
                            $hover_background_colour = 'var(--theme-primary-text-colour)';
                            break;
                        case 'theme-secondary-background-colour':
                            $hover_background_colour = 'var(--theme-secondary-background-colour)';
                            break;
                        case 'theme-secondary-background-colour':
                            $hover_background_colour = 'var(--theme-secondary-background-colour)';
                            break;
                        case 'theme-primary-accent-colour':
                            $hover_background_colour = 'var(--theme-primary-accent-colour)';
                            break;
                        case 'theme-secondary-accent-colour':
                            $hover_background_colour = 'var(--theme-secondary-accent-colour)';
                            break;
                        case 'theme-secondary-accent-colour':
                            $hover_background_colour = 'var(--theme-secondary-accent-colour)';
                            break;
                        default:
                            $hover_background_colour = $button['cta_settings']['hover_background_colour'];
                            break;
                    };
                };


                $output .=
                    '--cta-style-' . ($key + 1) . '-colour:' . $button_colour . ';
                        --cta-style-' . ($key + 1) . '-background-colour:' . $background_colour . ';
                        --cta-style-' . ($key + 1) . '-border-colour:' . $button['cta_settings']['border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-mobile-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_colour'] : $button_colour) . ';
                        --cta-style-' . ($key + 1) . '-mobile-background-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_background_colour'] : $background_colour) . ';
                        --cta-style-' . ($key + 1) . '-mobile-border-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_border_colour'] : $button['cta_settings']['border_colour']) . ';
                        --cta-style-' . ($key + 1) . '-hover-colour:' . $hover_colour . ';
                        --cta-style-' . ($key + 1) . '-hover-background-colour:' . $hover_background_colour . ';
                        --cta-style-' . ($key + 1) . '-hover-border-colour:' . $button['cta_settings']['hover_border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-mobile-hover-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_hover_colour'] : $hover_colour) . ';
                        --cta-style-' . ($key + 1) . '-mobile-hover-background-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_hover_background_colour'] : $hover_background_colour) . ';
                        --cta-style-' . ($key + 1) . '-mobile-hover-border-colour:' . ($button['cta_settings']['enable_mobile_style'] ? $button['cta_settings']['mobile_hover_border_colour'] : $button['cta_settings']['hover_border_colour']) . ';
                        --cta-style-' . ($key + 1) . '-active-colour:' . $button['cta_settings']['active_colour'] . ';
                        --cta-style-' . ($key + 1) . '-active-background-colour:' . $button['cta_settings']['active_background_colour'] . ';
                        --cta-style-' . ($key + 1) . '-active-border-colour:' . $button['cta_settings']['active_border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-focus-colour:' . $button['cta_settings']['focus_colour'] . ';
                        --cta-style-' . ($key + 1) . '-focus-background-colour:' . $button['cta_settings']['focus_background_colour'] . ';
                        --cta-style-' . ($key + 1) . '-focus-border-colour:' . $button['cta_settings']['focus_border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-inactive-colour:' . $button['cta_settings']['inactive_colour'] . ';
                        --cta-style-' . ($key + 1) . '-inactive-background-colour:' . $button['cta_settings']['inactive_background_colour'] . ';
                        --cta-style-' . ($key + 1) . '-inactive-border-colour:' . $button['cta_settings']['inactive_border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-selected-colour:' . $button['cta_settings']['selected_colour'] . ';
                        --cta-style-' . ($key + 1) . '-selected-background-colour:' . $button['cta_settings']['selected_background_colour'] . ';
                        --cta-style-' . ($key + 1) . '-selected-border-colour:' . $button['cta_settings']['selected_border_colour'] . ';
                        --cta-style-' . ($key + 1) . '-min-width-desktop:' . $button['cta_settings']['min_width_desktop'] . ';
                        --cta-style-' . ($key + 1) . '-min-width-landscape:' . $button['cta_settings']['min_width_landscape'] . ';
                        --cta-style-' . ($key + 1) . '-min-width-portrait:' . $button['cta_settings']['min_width_portrait'] . ';
                        --cta-style-' . ($key + 1) . '-min-width-mobile:' . $button['cta_settings']['min_width_mobile'] . ';
                        --cta-style-' . ($key + 1) . '-font-size-desktop:' . $button['cta_settings']['font_size_desktop'] . ';
                        --cta-style-' . ($key + 1) . '-font-size-landscape:' . $button['cta_settings']['font_size_landscape'] . ';
                        --cta-style-' . ($key + 1) . '-font-size-portrait:' . $button['cta_settings']['font_size_portrait'] . ';
                        --cta-style-' . ($key + 1) . '-font-size-mobile:' . $button['cta_settings']['font_size_mobile'] . ';
                        --cta-style-' . ($key + 1) . '-padding-inline-desktop:' . $button['cta_settings']['padding_inline_desktop'] . ';
                        --cta-style-' . ($key + 1) . '-padding-inline-landscape:' . $button['cta_settings']['padding_inline_landscape'] . ';
                        --cta-style-' . ($key + 1) . '-padding-inline-portrait:' . $button['cta_settings']['padding_inline_portrait'] . ';
                        --cta-style-' . ($key + 1) . '-padding-inline-mobile:' . $button['cta_settings']['padding_inline_mobile'] . ';
                        --cta-style-' . ($key + 1) . '-padding-block-desktop:' . $button['cta_settings']['padding_block_desktop'] . ';
                        --cta-style-' . ($key + 1) . '-padding-block-landscape:' . $button['cta_settings']['padding_block_landscape'] . ';
                        --cta-style-' . ($key + 1) . '-padding-block-portrait:' . $button['cta_settings']['padding_block_portrait'] . ';
                        --cta-style-' . ($key + 1) . '-padding-block-mobile:' . $button['cta_settings']['padding_block_mobile'] . ';
                        --cta-style-' . ($key + 1) . '-border-radius:' . $button['cta_settings']['border_radius'] . ';
                        --cta-style-' . ($key + 1) . '-border-width:' . $button['cta_settings']['border_width'] . 'px;
                        --cta-style-' . ($key + 1) . '-font-weight:' . $button['cta_settings']['font_weight'] . ';
                        --cta-style-' . ($key + 1) . '-letter-spacing:' . $button['cta_settings']['letter_spacing'] . 'em;
                        --cta-style-' . ($key + 1) . '-line-height:' . $button['cta_settings']['line_height'] . '%;
                        --cta-style-' . ($key + 1) . '-font-family:' . remove_underscore($button['cta_settings']['font_family']) . ';
                        --cta-style-' . ($key + 1) . '-text-transform:' . remove_underscore($button['cta_settings']['text_transform']) . ';
                        --cta-style-' . ($key + 1) . '-font-style:' . remove_underscore($button['cta_settings']['font_style']) . ';
                        --cta-style-' . ($key + 1) . '-text-align:' . remove_underscore($button['cta_settings']['text_alignment']) . ';
                        --cta-style-' . ($key + 1) . '-content-vertical-alignment:' . remove_underscore($button['cta_settings']['content_vertical_alignment'] ?? 'center') . ';
                        --cta-style-' . ($key + 1) . '-decoration-style:' . remove_underscore($button['cta_settings']['cta_decoration_style']) . ';
                        --cta-style-' . ($key + 1) . '-decoration-colour:' . remove_underscore($button['cta_settings']['cta_decoration_colour']) . ';
                        --cta-style-' . ($key + 1) . '-decoration-style-hover:' . remove_underscore($button['cta_settings']['cta_decoration_style_hover']) . ';
                        --cta-style-' . ($key + 1) . '-decoration-colour-hover:' . remove_underscore($button['cta_settings']['cta_decoration_style_hover']) . ';';
                if (array_key_exists('cta_enable_shadow', $button['cta_settings']) && $button['cta_settings']['cta_enable_shadow'] == true) {
                    $output .=
                        '--cta-style-' . ($key + 1) . '-shadow-offset-x:' . $button['cta_settings']['cta_shadow_offset_x'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-offset-y:' . $button['cta_settings']['cta_shadow_offset_y'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-blur:' . $button['cta_settings']['cta_shadow_blur_radius'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-colour:' . $button['cta_settings']['cta_shadow_colour'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-radius:' . $button['cta_settings']['cta_shadow_spread_radius'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-position:' . ($button['cta_settings']['box_shadow_position'] ? 'inset' : '') . ';';
                }
                if (array_key_exists('cta_enable_hover_shadow', $button['cta_settings']) && $button['cta_settings']['cta_enable_hover_shadow'] == true) {
                    $output .=
                        '--cta-style-' . ($key + 1) . '-shadow-offset-hover-x:' . $button['cta_settings']['cta_shadow_offset_hover_x'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-offset-hover-y:' . $button['cta_settings']['cta_shadow_offset_hover_y'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-hover-blur:' . $button['cta_settings']['cta_shadow_hover_blur_radius'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-hover-colour:' . $button['cta_settings']['cta_shadow_hover_colour'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-hover-radius:' . $button['cta_settings']['cta_shadow_hover_spread_radius'] . ';
                            --cta-style-' . ($key + 1) . '-shadow-hover-position:' . ($button['cta_settings']['box_shadow_hover_position'] ? 'inset' : '') . ';';
                }
                if (array_key_exists('enable_image_background', $button['cta_settings']) && $button['cta_settings']['enable_image_background'] == true) {
                    $output .=
                        '--cta-style' . ($key + 1) . '-image-background:' . 'url(' . $button['cta_settings']['image_background']['url'] . ')' . ';
                    --cta-style' . ($key + 1) . '-image-background-size:' . remove_underscore($button['cta_settings']['image_background_size']) . ';
                    --cta-style' . ($key + 1) . '-image-background-repeat:' . remove_underscore($button['cta_settings']['image_background_repeat']) . ';';
                }
            }
            $output .= '}</style>';
        }
    }
    return [$output];
}
