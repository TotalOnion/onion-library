<?php
// @codingStandardsIgnoreStart
function core_typography_v3($options)
{
    if (!is_array($options)) {
        return [];
    }
    $json_data = file_get_contents(get_template_directory() . '/inc/theme-data/' . $options['current_theme_name'] . '/typography-vars.json');
    $typography_vars = json_decode($json_data, true)[0];
    $output = '';
    if ($typography_vars) {
        if (is_array($typography_vars)) {
            if (array_key_exists('headings', $typography_vars)) {
                $output = '
            <style id="core-typography-v3-vars">
            body {
                --paragraph-block-spacing-desktop:' . ($typography_vars['paragraph_spacing_desktop'] ?? 0) . ';
                --paragraph-block-spacing-portrait:' . ($typography_vars['paragraph_spacing_portrait'] ?? 0) . ';
                --paragraph-block-spacing-mobile:' . ($typography_vars['paragraph_spacing_mobile'] ?? 0) . ';

                --heading-block-spacing-desktop:' . ($typography_vars['heading_spacing_desktop'] ?? 0) . ';
                --heading-block-spacing-portrait:' . ($typography_vars['heading_spacing_portrait'] ?? 0) . ';
                --heading-block-spacing-mobile:' . ($typography_vars['heading_spacing_mobile'] ?? 0) . ';

                --list-item-line-height:' . ($typography_vars['list_item_line_height'] ?? 0) . '%;
                --list-item-letter-spacing:' . ($typography_vars['list_item_letter_spacing'] ?? 0) . 'em;
                --list-item-block-spacing-desktop:' . ($typography_vars['list_item_block_spacing']['list_item_block_spacing_desktop'] ?? 0) . 'em;
                --list-item-block-spacing-landscape:' . ($typography_vars['list_item_block_spacing']['list_item_block_spacing_landscape'] ?? 0) . 'em;
                --list-item-block-spacing-portrait:' . ($typography_vars['list_item_block_spacing']['list_item_block_spacing_portrait'] ?? 0) . 'em;
                --list-item-block-spacing-mobile:' . ($typography_vars['list_item_block_spacing']['list_item_block_spacing_mobile'] ?? 0) . 'em;

                --h-xl-font-family:' . (remove_underscore($typography_vars['headings']['h_xl_font_family'] ?? 'arial')) . ';
                --h-l-font-family:' . (remove_underscore($typography_vars['headings']['h_l_font_family'] ?? 'arial')) . ';
                --h-m-font-family:' . (remove_underscore($typography_vars['headings']['h_m_font_family'] ?? 'arial')) . ';
                --h-s-font-family:' . (remove_underscore($typography_vars['headings']['h_s_font_family'] ?? 'arial')) . ';
                --h-xs-font-family:' . (remove_underscore($typography_vars['headings']['h_xs_font_family'] ?? 'arial')) . ';
                --h-xxs-font-family:' . (remove_underscore($typography_vars['headings']['h_xxs_font_family'] ?? 'arial')) . ';
                --h-xxxs-font-family:' . (remove_underscore($typography_vars['headings']['h_xxxs_font_family'] ?? 'arial')) . ';

                --sh-xxxl-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xxxl_font_family'] ?? 'arial')) . ';
                --sh-xxl-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xxl_font_family'] ?? 'arial')) . ';
                --sh-xl-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xl_font_family'] ?? 'arial')) . ';
                --sh-l-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_l_font_family'] ?? 'arial')) . ';
                --sh-m-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_m_font_family'] ?? 'arial')) . ';
                --sh-s-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_s_font_family'] ?? 'arial')) . ';
                --sh-xs-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xs_font_family'] ?? 'arial')) . ';
                --sh-xxs-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xxs_font_family'] ?? 'arial')) . ';
                --sh-xxxs-font-family:' . (remove_underscore($typography_vars['sub_headings']['sh_xxxs_font_family'] ?? 'arial')) . ';

                --h-xl-letter-spacing:' . ($typography_vars['headings']['h_xl_letter_spacing'] ?? 0) . 'em;
                --h-l-letter-spacing:' . ($typography_vars['headings']['h_l_letter_spacing'] ?? 0) . 'em;
                --h-m-letter-spacing:' . ($typography_vars['headings']['h_m_letter_spacing'] ?? 0) . 'em;
                --h-s-letter-spacing:' . ($typography_vars['headings']['h_s_letter_spacing'] ?? 0) . 'em;
                --h-xs-letter-spacing:' . ($typography_vars['headings']['h_xs_letter_spacing'] ?? 0) . 'em;
                --h-xxs-letter-spacing:' . ($typography_vars['headings']['h_xxs_letter_spacing'] ?? 0) . 'em;
                --h-xxxs-letter-spacing:' . ($typography_vars['headings']['h_xxxs_letter_spacing'] ?? 0) . 'em;

                --sh-xxxl-letter-spacing:' . ($typography_vars['sub_headings']['sh_xxxl_letter_spacing'] ?? 0) . 'em;
                --sh-xxl-letter-spacing:' . ($typography_vars['sub_headings']['sh_xxl_letter_spacing'] ?? 0) . 'em;
                --sh-xl-letter-spacing:' . ($typography_vars['sub_headings']['sh_xl_letter_spacing'] ?? 0) . 'em;
                --sh-l-letter-spacing:' . ($typography_vars['sub_headings']['sh_l_letter_spacing'] ?? 0) . 'em;
                --sh-m-letter-spacing:' . ($typography_vars['sub_headings']['sh_m_letter_spacing'] ?? 0) . 'em;
                --sh-s-letter-spacing:' . ($typography_vars['sub_headings']['sh_s_letter_spacing'] ?? 0) . 'em;
                --sh-xs-letter-spacing:' . ($typography_vars['sub_headings']['sh_xs_letter_spacing'] ?? 0) . 'em;
                --sh-xxs-letter-spacing:' . ($typography_vars['sub_headings']['sh_xxs_letter_spacing'] ?? 0) . 'em;
                --sh-xxxs-letter-spacing:' . ($typography_vars['sub_headings']['sh_xxxs_letter_spacing'] ?? 0) . 'em;

                --h-xl-line-height:' . ($typography_vars['headings']['h_xl_line_height'] ?? 100) . '%;
                --h-l-line-height:' . ($typography_vars['headings']['h_l_line_height'] ?? 100) . '%;
                --h-m-line-height:' . ($typography_vars['headings']['h_m_line_height'] ?? 100) . '%;
                --h-s-line-height:' . ($typography_vars['headings']['h_s_line_height'] ?? 100) . '%;
                --h-xs-line-height:' . ($typography_vars['headings']['h_xs_line_height'] ?? 100) . '%;
                --h-xxs-line-height:' . ($typography_vars['headings']['h_xxs_line_height'] ?? 100) . '%;
                --h-xxxs-line-height:' . ($typography_vars['headings']['h_xxxs_line_height'] ?? 100) . '%;

                --sh-xxxl-line-height:' . ($typography_vars['sub_headings']['sh_xxxl_line_height'] ?? 100) . '%;
                --sh-xxl-line-height:' . ($typography_vars['sub_headings']['sh_xxl_line_height'] ?? 100) . '%;
                --sh-xl-line-height:' . ($typography_vars['sub_headings']['sh_xl_line_height'] ?? 100) . '%;
                --sh-l-line-height:' . ($typography_vars['sub_headings']['sh_l_line_height'] ?? 100) . '%;
                --sh-m-line-height:' . ($typography_vars['sub_headings']['sh_m_line_height'] ?? 100) . '%;
                --sh-s-line-height:' . ($typography_vars['sub_headings']['sh_s_line_height'] ?? 100) . '%;
                --sh-xs-line-height:' . ($typography_vars['sub_headings']['sh_xs_line_height'] ?? 100) . '%;
                --sh-xxs-line-height:' . ($typography_vars['sub_headings']['sh_xxs_line_height'] ?? 100) . '%;

                --sh-xxxl-default-font-weight:' . ($typography_vars['sub_headings']['sh_xxxl_default_font_weight'] ?? 400) . ';
                --sh-xxl-default-font-weight:' . ($typography_vars['sub_headings']['sh_xxl_default_font_weight'] ?? 400) . ';
                --sh-xl-default-font-weight:' . ($typography_vars['sub_headings']['sh_xl_default_font_weight'] ?? 400) . ';
                --sh-l-default-font-weight:' . ($typography_vars['sub_headings']['sh_l_default_font_weight'] ?? 400) . ';
                --sh-m-default-font-weight:' . ($typography_vars['sub_headings']['sh_m_default_font_weight'] ?? 400) . ';
                --sh-s-default-font-weight:' . ($typography_vars['sub_headings']['sh_s_default_font_weight'] ?? 400) . ';
                --sh-xs-default-font-weight:' . ($typography_vars['sub_headings']['sh_xs_default_font_weight'] ?? 400) . ';
                --sh-xxs-default-font-weight:' . ($typography_vars['sub_headings']['sh_xxs_default_font_weight'] ?? 400) . ';

                --sh-xxxl-bold-font-weight:' . ($typography_vars['sub_headings']['sh_xxxl_bold_font_weight'] ?? 600) . ';
                --sh-xxl-bold-font-weight:' . ($typography_vars['sub_headings']['sh_xxl_bold_font_weight'] ?? 600) . ';
                --sh-xl-bold-font-weight:' . ($typography_vars['sub_headings']['sh_xl_bold_font_weight'] ?? 600) . ';
                --sh-l-bold-font-weight:' . ($typography_vars['sub_headings']['sh_l_bold_font_weight'] ?? 600) . ';
                --sh-m-bold-font-weight:' . ($typography_vars['sub_headings']['sh_m_bold_font_weight'] ?? 600) . ';
                --sh-s-bold-font-weight:' . ($typography_vars['sub_headings']['sh_s_bold_font_weight'] ?? 600) . ';
                --sh-xs-bold-font-weight:' . ($typography_vars['sub_headings']['sh_xs_bold_font_weight'] ?? 600) . ';
                --sh-xxs-bold-font-weight:' . ($typography_vars['sub_headings']['sh_xxs_bold_font_weight'] ?? 600) . ';

                --h-xl-default-font-weight:' . ($typography_vars['headings']['h_xl_default_font_weight'] ?? 400) . ';
                --h-l-default-font-weight:' . ($typography_vars['headings']['h_l_default_font_weight'] ?? 400) . ';
                --h-m-default-font-weight:' . ($typography_vars['headings']['h_m_default_font_weight'] ?? 400) . ';
                --h-s-default-font-weight:' . ($typography_vars['headings']['h_s_default_font_weight'] ?? 400) . ';
                --h-xs-default-font-weight:' . ($typography_vars['headings']['h_xs_default_font_weight'] ?? 400) . ';
                --h-xxs-default-font-weight:' . ($typography_vars['headings']['h_xxs_default_font_weight'] ?? 400) . ';

                --h-xl-bold-font-weight:' . ($typography_vars['headings']['h_xl_bold_font_weight'] ?? 600) . ';
                --h-l-bold-font-weight:' . ($typography_vars['headings']['h_l_bold_font_weight'] ?? 600) . ';
                --h-m-bold-font-weight:' . ($typography_vars['headings']['h_m_bold_font_weight'] ?? 600) . ';
                --h-s-bold-font-weight:' . ($typography_vars['headings']['h_s_bold_font_weight'] ?? 600) . ';
                --h-xs-bold-font-weight:' . ($typography_vars['headings']['h_xs_bold_font_weight'] ?? 600) . ';
                --h-xxs-bold-font-weight:' . ($typography_vars['headings']['h_xxs_bold_font_weight'] ?? 600) . ';

                --paragraph-large-line-height:' . ($typography_vars['paragraphs']['paragraph_large_line_height'] ?? 100) . '%;
                --paragraph-line-height:' . ($typography_vars['paragraphs']['paragraph_line_height'] ?? 100) . '%;
                --paragraph-small-line-height:' . ($typography_vars['paragraphs']['paragraph_small_line_height'] ?? 100) . '%;
                --paragraph-extra-small-line-height:' . ($typography_vars['paragraphs']['paragraph_extra_small_line_height'] ?? 100) . '%;
                --paragraph-extra-extra-small-line-height:' . ($typography_vars['paragraphs']['paragraph_extra_extra_small_line_height'] ?? 100) . '%;

                --paragraph-large-default-font-weight:' . ($typography_vars['paragraphs']['paragraph_large_default_font_weight'] ?? 400) . ';
                --paragraph-default-font-weight:' . ($typography_vars['paragraphs']['paragraph_default_font_weight'] ?? 400) . ';
                --paragraph-small-default-font-weight:' . ($typography_vars['paragraphs']['paragraph_small_default_font_weight'] ?? 400) . ';
                --paragraph-extra-small-default-font-weight:' . ($typography_vars['paragraphs']['paragraph_extra_small_default_font_weight'] ?? 400) . ';
                --paragraph-extra-extra-small-default-font-weight:' . ($typography_vars['paragraphs']['paragraph_extra_extra_small_default_font_weight'] ?? 400) . ';

                --paragraph-large-bold-font-weight:' . ($typography_vars['paragraphs']['paragraph_large_bold_font_weight'] ?? 600) . ';
                --paragraph-bold-font-weight:' . ($typography_vars['paragraphs']['paragraph_bold_font_weight'] ?? 600) . ';
                --paragraph-small-bold-font-weight:' . ($typography_vars['paragraphs']['paragraph_small_bold_font_weight'] ?? 600) . ';
                --paragraph-extra-small-bold-font-weight:' . ($typography_vars['paragraphs']['paragraph_extra_small_bold_font_weight'] ?? 600) . ';
                --paragraph-extra-extra-small-bold-font-weight:' . ($typography_vars['paragraphs']['paragraph_extra_extra_small_bold_font_weight'] ?? 600) . ';

                --paragraph-large-letter-spacing:' . ($typography_vars['paragraphs']['paragraph_large_letter_spacing'] ?? 100) . 'em;
                --paragraph-letter-spacing:' . ($typography_vars['paragraphs']['paragraph_letter_spacing'] ?? 100) . 'em;
                --paragraph-small-letter-spacing:' . ($typography_vars['paragraphs']['paragraph_small_letter_spacing'] ?? 100) . 'em;
                --paragraph-extra-small-letter-spacing:' . ($typography_vars['paragraphs']['paragraph_extra_small_letter_spacing'] ?? 100) . 'em;
                --paragraph-extra-extra-small-letter-spacing:' . ($typography_vars['paragraphs']['paragraph_extra_extra_small_letter_spacing'] ?? 100) . 'em;

                --paragraph-large-font-family:' . (remove_underscore($typography_vars['paragraphs']['paragraph_large_font_family'] ?? 'arial')) . ';
                --paragraph-font-family:' . (remove_underscore($typography_vars['paragraphs']['paragraph_font_family'] ?? 'arial')) . ';
                --paragraph-small-font-family:' . (remove_underscore($typography_vars['paragraphs']['paragraph_small_font_family'] ?? 'arial')) . ';
                --paragraph-extra-small-font-family:' . (remove_underscore($typography_vars['paragraphs']['paragraph_extra_small_font_family'] ?? 'arial')) . ';
                --paragraph-extra-extra-small-font-family:' . (remove_underscore($typography_vars['paragraphs']['paragraph_extra_extra_small_font_family'] ?? 'arial')) . ';

                --h-xl-desktop:' . ($typography_vars['headings']['h_xl_desktop'] ?? 70) . ';
                --h-xl-landscape:' . ($typography_vars['headings']['h_xl_desktop'] ?? 70) . ';
                --h-xl-portrait:' . ($typography_vars['headings']['h_xl_portrait'] ?? 44) . ';
                --h-xl-mobile:' . ($typography_vars['headings']['h_xl_mobile'] ?? 44) . ';
                --h-l-desktop:' . ($typography_vars['headings']['h_l_desktop'] ?? 44) . ';
                --h-l-landscape:' . ($typography_vars['headings']['h_l_landscape'] ?? 44) . ';
                --h-l-portrait:' . ($typography_vars['headings']['h_l_portrait'] ?? 32) . ';
                --h-l-mobile:' . ($typography_vars['headings']['h_l_mobile'] ?? 32) . ';
                --h-m-desktop:' . ($typography_vars['headings']['h_m_desktop'] ?? 24) . ';
                --h-m-landscape:' . ($typography_vars['headings']['h_m_desktop'] ?? 24) . ';
                --h-m-portrait:' . ($typography_vars['headings']['h_m_portrait'] ?? 20) . ';
                --h-m-mobile:' . ($typography_vars['headings']['h_m_mobile'] ?? 20) . ';
                --h-s-desktop:' . ($typography_vars['headings']['h_s_desktop'] ?? 20) . ';
                --h-s-landscape:' . ($typography_vars['headings']['h_s_desktop'] ?? 20) . ';
                --h-s-portrait:' . ($typography_vars['headings']['h_s_portrait'] ?? 18) . ';
                --h-s-mobile:' . ($typography_vars['headings']['h_s_mobile'] ?? 18) . ';
                --h-xs-desktop:' . ($typography_vars['headings']['h_xs_desktop'] ?? 18) . ';
                --h-xs-landscape:' . ($typography_vars['headings']['h_xs_desktop'] ?? 18) . ';
                --h-xs-portrait:' . ($typography_vars['headings']['h_xs_portrait'] ?? 16) . ';
                --h-xs-mobile:' . ($typography_vars['headings']['h_xs_mobile'] ?? 16) . ';
                --h-xxs-desktop:' . ($typography_vars['headings']['h_xxs_desktop'] ?? 16) . ';
                --h-xxs-landscape:' . ($typography_vars['headings']['h_xxs_desktop'] ?? 16) . ';
                --h-xxs-portrait:' . ($typography_vars['headings']['h_xxs_portrait'] ?? 14) . ';
                --h-xxs-mobile:' . ($typography_vars['headings']['h_xxs_mobile'] ?? 14) . ';
                --h-xxxs-desktop:' . ($typography_vars['headings']['h_xxxs_desktop'] ?? 14) . ';
                --h-xxxs-landscape:' . ($typography_vars['headings']['h_xxxs_desktop'] ?? 14) . ';
                --h-xxxs-portrait:' . ($typography_vars['headings']['h_xxxs_portrait'] ?? 14) . ';
                --h-xxxs-mobile:' . ($typography_vars['headings']['h_xxxs_mobile'] ?? 14) . ';

                --sh-xxxl-desktop:' . ($typography_vars['sub_headings']['sh_xxxl_desktop'] ?? 80) . ';
                --sh-xxxl-landscape:' . ($typography_vars['sub_headings']['sh_xxxl_desktop'] ?? 80) . ';
                --sh-xxxl-portrait:' . ($typography_vars['sub_headings']['sh_xxxl_portrait'] ?? 70) . ';
                --sh-xxxl-mobile:' . ($typography_vars['sub_headings']['sh_xxxl_mobile'] ?? 70) . ';
                --sh-xxl-desktop:' . ($typography_vars['sub_headings']['sh_xxl_desktop'] ?? 62) . ';
                --sh-xxl-landscape:' . ($typography_vars['sub_headings']['sh_xxl_desktop'] ?? 62) . ';
                --sh-xxl-portrait:' . ($typography_vars['sub_headings']['sh_xxl_portrait'] ?? 50) . ';
                --sh-xxl-mobile:' . ($typography_vars['sub_headings']['sh_xxl_mobile'] ?? 50) . ';
                --sh-xl-desktop:' . ($typography_vars['sub_headings']['sh_xl_desktop'] ?? 48) . ';
                --sh-xl-landscape:' . ($typography_vars['sub_headings']['sh_xl_desktop'] ?? 48) . ';
                --sh-xl-portrait:' . ($typography_vars['sub_headings']['sh_xl_portrait'] ?? 40) . ';
                --sh-xl-mobile:' . ($typography_vars['sub_headings']['sh_xl_mobile'] ?? 40) . ';
                --sh-l-desktop:' . ($typography_vars['sub_headings']['sh_l_desktop'] ?? 44) . ';
                --sh-l-landscape:' . ($typography_vars['sub_headings']['sh_l_desktop'] ?? 44) . ';
                --sh-l-portrait:' . ($typography_vars['sub_headings']['sh_l_portrait'] ?? 32) . ';
                --sh-l-mobile:' . ($typography_vars['sub_headings']['sh_l_mobile'] ?? 32) . ';
                --sh-m-desktop:' . ($typography_vars['sub_headings']['sh_m_desktop'] ?? 32) . ';
                --sh-m-landscape:' . ($typography_vars['sub_headings']['sh_m_desktop'] ?? 32) . ';
                --sh-m-portrait:' . ($typography_vars['sub_headings']['sh_m_portrait'] ?? 24) . ';
                --sh-m-mobile:' . ($typography_vars['sub_headings']['sh_m_mobile'] ?? 24) . ';
                --sh-s-desktop:' . ($typography_vars['sub_headings']['sh_s_desktop'] ?? 24) . ';
                --sh-s-landscape:' . ($typography_vars['sub_headings']['sh_s_desktop'] ?? 24) . ';
                --sh-s-portrait:' . ($typography_vars['sub_headings']['sh_s_portrait'] ?? 20) . ';
                --sh-s-mobile:' . ($typography_vars['sub_headings']['sh_s_mobile'] ?? 20) . ';
                --sh-xs-desktop:' . ($typography_vars['sub_headings']['sh_xs_desktop'] ?? 20) . ';
                --sh-xs-landscape:' . ($typography_vars['sub_headings']['sh_xs_desktop'] ?? 20) . ';
                --sh-xs-portrait:' . ($typography_vars['sub_headings']['sh_xs_portrait'] ?? 18) . ';
                --sh-xs-mobile:' . ($typography_vars['sub_headings']['sh_xs_mobile'] ?? 18) . ';
                --sh-xxs-desktop:' . ($typography_vars['sub_headings']['sh_xxs_desktop'] ?? 18) . ';
                --sh-xxs-landscape:' . ($typography_vars['sub_headings']['sh_xxs_desktop'] ?? 18) . ';
                --sh-xxs-portrait:' . ($typography_vars['sub_headings']['sh_xxs_portrait'] ?? 18) . ';
                --sh-xxs-mobile:' . ($typography_vars['sub_headings']['sh_xxs_mobile'] ?? 18) . ';

                --p-l-desktop:' . ($typography_vars['paragraphs']['p_l_desktop'] ?? 18) . ';
                --p-l-landscape:' . ($typography_vars['paragraphs']['p_l_desktop'] ?? 18) . ';
                --p-l-portrait:' . ($typography_vars['paragraphs']['p_l_portrait'] ?? 18) . ';
                --p-l-mobile:' . ($typography_vars['paragraphs']['p_l_mobile'] ?? 18) . ';
                --p-desktop:' . ($typography_vars['paragraphs']['p_desktop'] ?? 16) . ';
                --p-landscape:' . ($typography_vars['paragraphs']['p_desktop'] ?? 16) . ';
                --p-portrait:' . ($typography_vars['paragraphs']['p_portrait'] ?? 16) . ';
                --p-mobile:' . ($typography_vars['paragraphs']['p_mobile'] ?? 16) . ';
                --p-s-desktop:' . ($typography_vars['paragraphs']['p_s_desktop'] ?? 14) . ';
                --p-s-landscape:' . ($typography_vars['paragraphs']['p_s_desktop'] ?? 14) . ';
                --p-s-portrait:' . ($typography_vars['paragraphs']['p_s_portrait'] ?? 14) . ';
                --p-s-mobile:' . ($typography_vars['paragraphs']['p_s_mobile'] ?? 14) . ';
                --p-xs-desktop:' . ($typography_vars['paragraphs']['p_xs_desktop'] ?? 12) . ';
                --p-xs-landscape:' . ($typography_vars['paragraphs']['p_xs_desktop'] ?? 12) . ';
                --p-xs-portrait:' . ($typography_vars['paragraphs']['p_xs_portrait'] ?? 12) . ';
                --p-xs-mobile:' . ($typography_vars['paragraphs']['p_xs_mobile'] ?? 12) . ';
                --p-xxs-desktop:' . ($typography_vars['paragraphs']['p_xxs_desktop'] ?? 10) . ';
                --p-xxs-landscape:' . ($typography_vars['paragraphs']['p_xxs_desktop'] ?? 10) . ';
                --p-xxs-portrait:' . ($typography_vars['paragraphs']['p_xxs_portrait'] ?? 10) . ';
                --p-xxs-mobile:' . ($typography_vars['paragraphs']['p_xxs_mobile'] ?? 10) . ';
                --p-xxxs-desktop:' . ($typography_vars['paragraphs']['p_xxxs_desktop'] ?? 8) . ';
                --p-xxxs-landscape:' . ($typography_vars['paragraphs']['p_xxxs_desktop'] ?? 8) . ';
                --p-xxxs-portrait:' . ($typography_vars['paragraphs']['p_xxxs_portrait'] ?? 8) . ';
                --p-xxxs-mobile:' . ($typography_vars['paragraphs']['p_xxxs_mobile'] ?? 8) . ';';
            }
            $output .= '</style>';
        }
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd