<?php
// @codingStandardsIgnoreStart
function core_typography_v3()
{
    $output = '';
    if (defined('TYPOGRAPHY_OPTIONS')) {
        $options = TYPOGRAPHY_OPTIONS;
        if (is_array($options)) {
            if (array_key_exists('headings', $options)) {
                $output = '
            <style id="core-typography-v3-vars">
            body {
                --paragraph-block-spacing-desktop:' . ($options['paragraph_block_spacing']['paragraph_spacing_desktop'] ?? 0) . 'em;
                --paragraph-block-spacing-portrait:' . ($options['paragraph_block_spacing']['paragraph_spacing_portrait'] ?? 0) . 'em;
                --paragraph-block-spacing-mobile:' . ($options['paragraph_block_spacing']['paragraph_spacing_mobile'] ?? 0) . 'em;

                --heading-block-spacing-desktop:' . ($options['heading_block_spacing']['heading_spacing_desktop'] ?? 0) . 'em;
                --heading-block-spacing-portrait:' . ($options['heading_block_spacing']['heading_spacing_portrait'] ?? 0) . 'em;
                --heading-block-spacing-mobile:' . ($options['heading_block_spacing']['heading_spacing_mobile'] ?? 0) . 'em;

                --list-item-line-height:' . ($options['list_item_line_height'] ?? 0) . '%;
                --list-item-letter-spacing:' . ($options['list_item_letter_spacing'] ?? 0) . 'em;
                --list-item-block-spacing-desktop:' . ($options['list_item_block_spacing']['list_item_block_spacing_desktop'] ?? 0) . 'em;
                --list-item-block-spacing-landscape:' . ($options['list_item_block_spacing']['list_item_block_spacing_landscape'] ?? 0) . 'em;
                --list-item-block-spacing-portrait:' . ($options['list_item_block_spacing']['list_item_block_spacing_portrait'] ?? 0) . 'em;
                --list-item-block-spacing-mobile:' . ($options['list_item_block_spacing']['list_item_block_spacing_mobile'] ?? 0) . 'em;

                --h-xl-font-family:' . (remove_underscore($options['headings']['h_xl_font_family'] ?? 'arial')) . ';
                --h-l-font-family:' . (remove_underscore($options['headings']['h_l_font_family'] ?? 'arial')) . ';
                --h-m-font-family:' . (remove_underscore($options['headings']['h_m_font_family'] ?? 'arial')) . ';
                --h-s-font-family:' . (remove_underscore($options['headings']['h_s_font_family'] ?? 'arial')) . ';
                --h-xs-font-family:' . (remove_underscore($options['headings']['h_xs_font_family'] ?? 'arial')) . ';
                --h-xss-font-family:' . (remove_underscore($options['headings']['h_xxs_font_family'] ?? 'arial')) . ';
                --h-xss-font-family:' . (remove_underscore($options['headings']['h_xxxs_font_family'] ?? 'arial')) . ';

                --sh-xl-font-family:' . (remove_underscore($options['sub_headings']['sh_xl_font_family'] ?? 'arial')) . ';
                --sh-l-font-family:' . (remove_underscore($options['sub_headings']['sh_l_font_family'] ?? 'arial')) . ';
                --sh-m-font-family:' . (remove_underscore($options['sub_headings']['sh_m_font_family'] ?? 'arial')) . ';
                --sh-s-font-family:' . (remove_underscore($options['sub_headings']['sh_s_font_family'] ?? 'arial')) . ';
                --sh-xs-font-family:' . (remove_underscore($options['sub_headings']['sh_xs_font_family'] ?? 'arial')) . ';
                --sh-xss-font-family:' . (remove_underscore($options['sub_headings']['sh_xxs_font_family'] ?? 'arial')) . ';
                --sh-xss-font-family:' . (remove_underscore($options['sub_headings']['sh_xxxs_font_family'] ?? 'arial')) . ';

                --h-xl-letter-spacing:' . ($options['headings']['h_xl_letter_spacing'] ?? 0) . 'em;
                --h-l-letter-spacing:' . ($options['headings']['h_l_letter_spacing'] ?? 0) . 'em;
                --h-m-letter-spacing:' . ($options['headings']['h_m_letter_spacing'] ?? 0) . 'em;
                --h-s-letter-spacing:' . ($options['headings']['h_s_letter_spacing'] ?? 0) . 'em;
                --h-xs-letter-spacing:' . ($options['headings']['h_xs_letter_spacing'] ?? 0) . 'em;
                --h-xss-letter-spacing:' . ($options['headings']['h_xxs_letter_spacing'] ?? 0) . 'em;
                --h-xss-letter-spacing:' . ($options['headings']['h_xxxs_letter_spacing'] ?? 0) . 'em;

                --sh-xl-letter-spacing:' . ($options['sub_headings']['sh_xl_letter_spacing'] ?? 0) . 'em;
                --sh-l-letter-spacing:' . ($options['sub_headings']['sh_l_letter_spacing'] ?? 0) . 'em;
                --sh-m-letter-spacing:' . ($options['sub_headings']['sh_m_letter_spacing'] ?? 0) . 'em;
                --sh-s-letter-spacing:' . ($options['sub_headings']['sh_s_letter_spacing'] ?? 0) . 'em;
                --sh-xs-letter-spacing:' . ($options['sub_headings']['sh_xs_letter_spacing'] ?? 0) . 'em;
                --sh-xss-letter-spacing:' . ($options['sub_headings']['sh_xxs_letter_spacing'] ?? 0) . 'em;
                --sh-xss-letter-spacing:' . ($options['sub_headings']['sh_xxxs_letter_spacing'] ?? 0) . 'em;

                --h-xl-line-height:' . ($options['headings']['h_xl_line_height'] ?? 100) . '%;
                --h-l-line-height:' . ($options['headings']['h_l_line_height'] ?? 100) . '%;
                --h-m-line-height:' . ($options['headings']['h_m_line_height'] ?? 100) . '%;
                --h-s-line-height:' . ($options['headings']['h_s_line_height'] ?? 100) . '%;
                --h-xs-line-height:' . ($options['headings']['h_xs_line_height'] ?? 100) . '%;
                --h-xss-line-height:' . ($options['headings']['h_xxs_line_height'] ?? 100) . '%;
                --h-xss-line-height:' . ($options['headings']['h_xxxs_line_height'] ?? 100) . '%;

                --sh-xl-line-height:' . ($options['sub_headings']['sh_xl_line_height'] ?? 100) . '%;
                --sh-l-line-height:' . ($options['sub_headings']['sh_l_line_height'] ?? 100) . '%;
                --sh-m-line-height:' . ($options['sub_headings']['sh_m_line_height'] ?? 100) . '%;
                --sh-s-line-height:' . ($options['sub_headings']['sh_s_line_height'] ?? 100) . '%;
                --sh-xs-line-height:' . ($options['sub_headings']['sh_xs_line_height'] ?? 100) . '%;
                --sh-xss-line-height:' . ($options['sub_headings']['sh_xxs_line_height'] ?? 100) . '%;

                --sh-xl-default-font-weight:' . ($options['sub_headings']['sh_xl_default_font_weight'] ?? 400) . ';
                --sh-l-default-font-weight:' . ($options['sub_headings']['sh_l_default_font_weight'] ?? 400) . ';
                --sh-m-default-font-weight:' . ($options['sub_headings']['sh_m_default_font_weight'] ?? 400) . ';
                --sh-s-default-font-weight:' . ($options['sub_headings']['sh_s_default_font_weight'] ?? 400) . ';
                --sh-xs-default-font-weight:' . ($options['sub_headings']['sh_xs_default_font_weight'] ?? 400) . ';
                --sh-xss-default-font-weight:' . ($options['sub_headings']['sh_xxs_default_font_weight'] ?? 400) . ';

                --sh-xl-bold-font-weight:' . ($options['sub_headings']['sh_xl_bold_font_weight'] ?? 600) . ';
                --sh-l-bold-font-weight:' . ($options['sub_headings']['sh_l_bold_font_weight'] ?? 600) . ';
                --sh-m-bold-font-weight:' . ($options['sub_headings']['sh_m_bold_font_weight'] ?? 600) . ';
                --sh-s-bold-font-weight:' . ($options['sub_headings']['sh_s_bold_font_weight'] ?? 600) . ';
                --sh-xs-bold-font-weight:' . ($options['sub_headings']['sh_xs_bold_font_weight'] ?? 600) . ';
                --sh-xss-bold-font-weight:' . ($options['sub_headings']['sh_xxs_bold_font_weight'] ?? 600) . ';

                --h-xl-default-font-weight:' . ($options['headings']['h_xl_default_font_weight'] ?? 400) . ';
                --h-l-default-font-weight:' . ($options['headings']['h_l_default_font_weight'] ?? 400) . ';
                --h-m-default-font-weight:' . ($options['headings']['h_m_default_font_weight'] ?? 400) . ';
                --h-s-default-font-weight:' . ($options['headings']['h_s_default_font_weight'] ?? 400) . ';
                --h-xs-default-font-weight:' . ($options['headings']['h_xs_default_font_weight'] ?? 400) . ';
                --h-xss-default-font-weight:' . ($options['headings']['h_xss_default_font_weight'] ?? 400) . ';

                --h-xl-bold-font-weight:' . ($options['headings']['h_xl_bold_font_weight'] ?? 600) . ';
                --h-l-bold-font-weight:' . ($options['headings']['h_l_bold_font_weight'] ?? 600) . ';
                --h-m-bold-font-weight:' . ($options['headings']['h_m_bold_font_weight'] ?? 600) . ';
                --h-s-bold-font-weight:' . ($options['headings']['h_s_bold_font_weight'] ?? 600) . ';
                --h-xs-bold-font-weight:' . ($options['headings']['h_xs_bold_font_weight'] ?? 600) . ';
                --h-xss-bold-font-weight:' . ($options['headings']['h_xss_bold_font_weight'] ?? 600) . ';

                --paragraph-large-line-height:' . ($options['paragraphs']['paragraph_large_line_height'] ?? 100) . '%;
                --paragraph-line-height:' . ($options['paragraphs']['paragraph_line_height'] ?? 100) . '%;
                --paragraph-small-line-height:' . ($options['paragraphs']['paragraph_small_line_height'] ?? 100) . '%;
                --paragraph-extra-small-line-height:' . ($options['paragraphs']['paragraph_extra_small_line_height'] ?? 100) . '%;
                --paragraph-extra-extra-small-line-height:' . ($options['paragraphs']['paragraph_extra_extra_small_line_height'] ?? 100) . '%;

                --paragraph-large-default-font-weight:' . ($options['paragraphs']['paragraph_large_default_font_weight'] ?? 400) . ';
                --paragraph-default-font-weight:' . ($options['paragraphs']['paragraph_default_font_weight'] ?? 400) . ';
                --paragraph-small-default-font-weight:' . ($options['paragraphs']['paragraph_small_default_font_weight'] ?? 400) . ';
                --paragraph-extra-small-default-font-weight:' . ($options['paragraphs']['paragraph_extra_small_default_font_weight'] ?? 400) . ';
                --paragraph-extra-extra-small-default-font-weight:' . ($options['paragraphs']['paragraph_extra_extra_small_default_font_weight'] ?? 400) . ';

                --paragraph-large-bold-font-weight:' . ($options['paragraphs']['paragraph_large_bold_font_weight'] ?? 600) . ';
                --paragraph-bold-font-weight:' . ($options['paragraphs']['paragraph_bold_font_weight'] ?? 600) . ';
                --paragraph-small-bold-font-weight:' . ($options['paragraphs']['paragraph_small_bold_font_weight'] ?? 600) . ';
                --paragraph-extra-small-bold-font-weight:' . ($options['paragraphs']['paragraph_extra_small_bold_font_weight'] ?? 600) . ';
                --paragraph-extra-extra-small-bold-font-weight:' . ($options['paragraphs']['paragraph_extra_extra_small_bold_font_weight'] ?? 600) . ';

                --paragraph-large-letter-spacing:' . ($options['paragraphs']['paragraph_large_letter_spacing'] ?? 100) . 'em;
                --paragraph-letter-spacing:' . ($options['paragraphs']['paragraph_letter_spacing'] ?? 100) . 'em;
                --paragraph-small-letter-spacing:' . ($options['paragraphs']['paragraph_small_letter_spacing'] ?? 100) . 'em;
                --paragraph-extra-small-letter-spacing:' . ($options['paragraphs']['paragraph_extra_small_letter_spacing'] ?? 100) . 'em;
                --paragraph-extra-extra-small-letter-spacing:' . ($options['paragraphs']['paragraph_extra_extra_small_letter_spacing'] ?? 100) . 'em;

                --paragraph-large-font-family:' . (remove_underscore($options['paragraphs']['paragraph_large_font_family'] ?? 'arial')) . ';
                --paragraph-font-family:' . (remove_underscore($options['paragraphs']['paragraph_font_family'] ?? 'arial')) . ';
                --paragraph-small-font-family:' . (remove_underscore($options['paragraphs']['paragraph_small_font_family'] ?? 'arial')) . ';
                --paragraph-extra-small-font-family:' . (remove_underscore($options['paragraphs']['paragraph_extra_small_font_family'] ?? 'arial')) . ';
                --paragraph-extra-extra-small-font-family:' . (remove_underscore($options['paragraphs']['paragraph_extra_extra_small_font_family'] ?? 'arial')) . ';

                --h-xl-desktop:' . ($options['headings']['h_xl_desktop'] ?? 70) . ';
                --h-xl-landscape:' . ($options['headings']['h_xl_desktop'] ?? 70) . ';
                --h-xl-portrait:' . ($options['headings']['h_xl_portrait'] ?? 44) . ';
                --h-xl-mobile:' . ($options['headings']['h_xl_mobile'] ?? 44) . ';
                --h-l-desktop:' . ($options['headings']['h_l_desktop'] ?? 44) . ';
                --h-l-landscape:' . ($options['headings']['h_l_landscape'] ?? 44) . ';
                --h-l-portrait:' . ($options['headings']['h_l_portrait'] ?? 32) . ';
                --h-l-mobile:' . ($options['headings']['h_l_mobile'] ?? 32) . ';
                --h-m-desktop:' . ($options['headings']['h_m_desktop'] ?? 24) . ';
                --h-m-landscape:' . ($options['headings']['h_m_desktop'] ?? 24) . ';
                --h-m-portrait:' . ($options['headings']['h_m_portrait'] ?? 20) . ';
                --h-m-mobile:' . ($options['headings']['h_m_mobile'] ?? 20) . ';
                --h-s-desktop:' . ($options['headings']['h_s_desktop'] ?? 20) . ';
                --h-s-landscape:' . ($options['headings']['h_s_desktop'] ?? 20) . ';
                --h-s-portrait:' . ($options['headings']['h_s_portrait'] ?? 18) . ';
                --h-s-mobile:' . ($options['headings']['h_s_mobile'] ?? 18) . ';
                --h-xs-desktop:' . ($options['headings']['h_xs_desktop'] ?? 18) . ';
                --h-xs-landscape:' . ($options['headings']['h_xs_desktop'] ?? 18) . ';
                --h-xs-portrait:' . ($options['headings']['h_xs_portrait'] ?? 16) . ';
                --h-xs-mobile:' . ($options['headings']['h_xs_mobile'] ?? 16) . ';
                --h-xxs-desktop:' . ($options['headings']['h_xxs_desktop'] ?? 16) . ';
                --h-xxs-landscape:' . ($options['headings']['h_xxs_desktop'] ?? 16) . ';
                --h-xxs-portrait:' . ($options['headings']['h_xxs_portrait'] ?? 14) . ';
                --h-xxs-mobile:' . ($options['headings']['h_xxs_mobile'] ?? 14) . ';
                --h-xxxs-desktop:' . ($options['headings']['h_xxxs_desktop'] ?? 14) . ';
                --h-xxxs-landscape:' . ($options['headings']['h_xxxs_desktop'] ?? 14) . ';
                --h-xxxs-portrait:' . ($options['headings']['h_xxxs_portrait'] ?? 14) . ';
                --h-xxxs-mobile:' . ($options['headings']['h_xxxs_mobile'] ?? 14) . ';

                --sh-xl-desktop:' . ($options['sub_headings']['sh_xl_desktop'] ?? 70) . ';
                --sh-xl-landscape:' . ($options['sub_headings']['sh_xl_desktop'] ?? 70) . ';
                --sh-xl-portrait:' . ($options['sub_headings']['sh_xl_portrait'] ?? 44) . ';
                --sh-xl-mobile:' . ($options['sub_headings']['sh_xl_mobile'] ?? 44) . ';
                --sh-l-desktop:' . ($options['sub_headings']['sh_l_desktop'] ?? 44) . ';
                --sh-l-landscape:' . ($options['sub_headings']['sh_l_desktop'] ?? 44) . ';
                --sh-l-portrait:' . ($options['sub_headings']['sh_l_portrait'] ?? 32) . ';
                --sh-l-mobile:' . ($options['sub_headings']['sh_l_mobile'] ?? 32) . ';
                --sh-m-desktop:' . ($options['sub_headings']['sh_m_desktop'] ?? 32) . ';
                --sh-m-landscape:' . ($options['sub_headings']['sh_m_desktop'] ?? 32) . ';
                --sh-m-portrait:' . ($options['sub_headings']['sh_m_portrait'] ?? 24) . ';
                --sh-m-mobile:' . ($options['sub_headings']['sh_m_mobile'] ?? 24) . ';
                --sh-s-desktop:' . ($options['sub_headings']['sh_s_desktop'] ?? 24) . ';
                --sh-s-landscape:' . ($options['sub_headings']['sh_s_desktop'] ?? 24) . ';
                --sh-s-portrait:' . ($options['sub_headings']['sh_s_portrait'] ?? 20) . ';
                --sh-s-mobile:' . ($options['sub_headings']['sh_s_mobile'] ?? 20) . ';
                --sh-xs-desktop:' . ($options['sub_headings']['sh_xs_desktop'] ?? 20) . ';
                --sh-xs-landscape:' . ($options['sub_headings']['sh_xs_desktop'] ?? 20) . ';
                --sh-xs-portrait:' . ($options['sub_headings']['sh_xs_portrait'] ?? 18) . ';
                --sh-xs-mobile:' . ($options['sub_headings']['sh_xs_mobile'] ?? 18) . ';
                --sh-xxs-desktop:' . ($options['sub_headings']['sh_xxs_desktop'] ?? 18) . ';
                --sh-xxs-landscape:' . ($options['sub_headings']['sh_xxs_desktop'] ?? 18) . ';
                --sh-xxs-portrait:' . ($options['sub_headings']['sh_xxs_portrait'] ?? 18) . ';
                --sh-xxs-mobile:' . ($options['sub_headings']['sh_xxs_mobile'] ?? 18) . ';

                --p-l-desktop:' . ($options['paragraphs']['p_l_desktop'] ?? 18) . ';
                --p-l-landscape:' . ($options['paragraphs']['p_l_desktop'] ?? 18) . ';
                --p-l-portrait:' . ($options['paragraphs']['p_l_portrait'] ?? 18) . ';
                --p-l-mobile:' . ($options['paragraphs']['p_l_mobile'] ?? 18) . ';
                --p-desktop:' . ($options['paragraphs']['p_desktop'] ?? 16) . ';
                --p-landscape:' . ($options['paragraphs']['p_desktop'] ?? 16) . ';
                --p-portrait:' . ($options['paragraphs']['p_portrait'] ?? 16) . ';
                --p-mobile:' . ($options['paragraphs']['p_mobile'] ?? 16) . ';
                --p-s-desktop:' . ($options['paragraphs']['p_s_desktop'] ?? 14) . ';
                --p-s-landscape:' . ($options['paragraphs']['p_s_desktop'] ?? 14) . ';
                --p-s-portrait:' . ($options['paragraphs']['p_s_portrait'] ?? 14) . ';
                --p-s-mobile:' . ($options['paragraphs']['p_s_mobile'] ?? 14) . ';
                --p-xs-desktop:' . ($options['paragraphs']['p_xs_desktop'] ?? 12) . ';
                --p-xs-landscape:' . ($options['paragraphs']['p_xs_desktop'] ?? 12) . ';
                --p-xs-portrait:' . ($options['paragraphs']['p_xs_portrait'] ?? 12) . ';
                --p-xs-mobile:' . ($options['paragraphs']['p_xs_mobile'] ?? 12) . ';
                --p-xxs-desktop:' . ($options['paragraphs']['p_xxs_desktop'] ?? 10) . ';
                --p-xxs-landscape:' . ($options['paragraphs']['p_xxs_desktop'] ?? 10) . ';
                --p-xxs-portrait:' . ($options['paragraphs']['p_xxs_portrait'] ?? 10) . ';
                --p-xxs-mobile:' . ($options['paragraphs']['p_xxs_mobile'] ?? 10) . ';
                --p-xxxs-desktop:' . ($options['paragraphs']['p_xxxs_desktop'] ?? 8) . ';
                --p-xxxs-landscape:' . ($options['paragraphs']['p_xxxs_desktop'] ?? 8) . ';
                --p-xxxs-portrait:' . ($options['paragraphs']['p_xxxs_portrait'] ?? 8) . ';
                --p-xxxs-mobile:' . ($options['paragraphs']['p_xxxs_mobile'] ?? 8) . ';';
            }
            $output .= '</style>';
        }
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd