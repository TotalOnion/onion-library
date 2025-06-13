<?php
// @codingStandardsIgnoreStart
function core_typography()
{
    $output = '';
    if (defined('TYPOGRAPHY_OPTIONS')) {
        $options = TYPOGRAPHY_OPTIONS;

        if (is_array($options)) {

            if (array_key_exists('headings', $options)) {
                $output = '
            <style id="core-typography-vars">
            :root {
                --paragraph-block-spacing-mobile:' . ($options['paragraph_spacing_mobile'] ?? 0) . 'em;
                --paragraph-block-spacing-portrait:' . ($options['paragraph_spacing_portrait'] ?? 0) . 'em;
                --paragraph-block-spacing-desktop:' . ($options['paragraph_spacing_desktop'] ?? 0) . 'em;
                --heading-block-spacing-mobile:' . ($options['heading_spacing_mobile'] ?? 0) . 'em;
                --heading-block-spacing-portrait:' . ($options['heading_spacing_portrait'] ?? 0) . 'em;
                --heading-block-spacing-desktop:' . ($options['heading_spacing_desktop'] ?? 0) . 'em;

                --list-item-line-height:' . ($options['list_item_line_height'] ?? 0) . '%;
                --list-item-letter-spacing:' . ($options['list_item_letter_spacing'] ?? 0) . 'em;
                --list-item-block-spacing-mobile:' . ($options['list_item_block_spacing_mobile'] ?? 0) . 'em;
                --list-item-block-spacing-portrait:' . ($options['list_item_block_spacing_portrait'] ?? 0) . 'em;
                --list-item-block-spacing-landscape:' . ($options['list_item_block_spacing_landscape'] ?? 0) . 'em;
                --list-item-block-spacing-desktop:' . ($options['list_item_block_spacing_desktop'] ?? 0) . 'em;

                --h1-l-font-family:' . (remove_underscore($options['headings']['h1_l_font_family'] ?? 'arial')) . ';
                --h1-font-family:' . (remove_underscore($options['headings']['h1_font_family'] ?? 'arial')) . ';
                --h2-font-family:' . (remove_underscore($options['headings']['h2_font_family'] ?? 'arial')) . ';
                --h3-font-family:' . (remove_underscore($options['headings']['h3_font_family'] ?? 'arial')) . ';
                --h4-font-family:' . (remove_underscore($options['headings']['h4_font_family'] ?? 'arial')) . ';
                --h5-font-family:' . (remove_underscore($options['headings']['h5_font_family'] ?? 'arial')) . ';
                --h6-font-family:' . (remove_underscore($options['headings']['h6_font_family'] ?? 'arial')) . ';
                
                --sh1-font-family:' . (remove_underscore($options['sub_headings']['sh1_font_family'] ?? 'arial')) . ';
                --sh2-font-family:' . (remove_underscore($options['sub_headings']['sh2_font_family'] ?? 'arial')) . ';
                --sh3-font-family:' . (remove_underscore($options['sub_headings']['sh3_font_family'] ?? 'arial')) . ';
                --sh4-font-family:' . (remove_underscore($options['sub_headings']['sh4_font_family'] ?? 'arial')) . ';
                --sh5-font-family:' . (remove_underscore($options['sub_headings']['sh5_font_family'] ?? 'arial')) . ';
                --sh6-font-family:' . (remove_underscore($options['sub_headings']['sh6_font_family'] ?? 'arial')) . ';
                
                --h1-l-letter-spacing:' . ($options['headings']['h1_l_letter_spacing'] ?? 0) . 'em;
                --h1-letter-spacing:' . ($options['headings']['h1_letter_spacing'] ?? 0) . 'em;
                --h2-letter-spacing:' . ($options['headings']['h2_letter_spacing'] ?? 0) . 'em;
                --h3-letter-spacing:' . ($options['headings']['h3_letter_spacing'] ?? 0) . 'em;
                --h4-letter-spacing:' . ($options['headings']['h4_letter_spacing'] ?? 0) . 'em;
                --h5-letter-spacing:' . ($options['headings']['h5_letter_spacing'] ?? 0) . 'em;
                --h6-letter-spacing:' . ($options['headings']['h6_letter_spacing'] ?? 0) . 'em;

                --sh1-letter-spacing:' . ($options['sub_headings']['sh1_letter_spacing'] ?? 0) . 'em;
                --sh2-letter-spacing:' . ($options['sub_headings']['sh2_letter_spacing'] ?? 0) . 'em;
                --sh3-letter-spacing:' . ($options['sub_headings']['sh3_letter_spacing'] ?? 0) . 'em;
                --sh4-letter-spacing:' . ($options['sub_headings']['sh4_letter_spacing'] ?? 0) . 'em;
                --sh5-letter-spacing:' . ($options['sub_headings']['sh5_letter_spacing'] ?? 0) . 'em;
                --sh6-letter-spacing:' . ($options['sub_headings']['sh6_letter_spacing'] ?? 0) . 'em;
                
                --h1-l-line-height:' . ($options['headings']['h1_l_line_height'] ?? 100) . '%;
                --h1-line-height:' . ($options['headings']['h1_line_height'] ?? 100) . '%;
                --h2-line-height:' . ($options['headings']['h2_line_height'] ?? 100) . '%;
                --h3-line-height:' . ($options['headings']['h3_line_height'] ?? 100) . '%;
                --h4-line-height:' . ($options['headings']['h4_line_height'] ?? 100) . '%;
                --h5-line-height:' . ($options['headings']['h5_line_height'] ?? 100) . '%;
                --h6-line-height:' . ($options['headings']['h6_line_height'] ?? 100) . '%;

                --sh1-line-height:' . ($options['sub_headings']['sh1_line_height'] ?? 100) . '%;
                --sh2-line-height:' . ($options['sub_headings']['sh2_line_height'] ?? 100) . '%;
                --sh3-line-height:' . ($options['sub_headings']['sh3_line_height'] ?? 100) . '%;
                --sh4-line-height:' . ($options['sub_headings']['sh4_line_height'] ?? 100) . '%;
                --sh5-line-height:' . ($options['sub_headings']['sh5_line_height'] ?? 100) . '%;
                --sh6-line-height:' . ($options['sub_headings']['sh6_line_height'] ?? 100) . '%;

                --sh1-default-font-weight:' . ($options['sub_headings']['sh1_default_font_weight'] ?? 400) . ';
                --sh2-default-font-weight:' . ($options['sub_headings']['sh2_default_font_weight'] ?? 400) . ';
                --sh3-default-font-weight:' . ($options['sub_headings']['sh3_default_font_weight'] ?? 400) . ';
                --sh4-default-font-weight:' . ($options['sub_headings']['sh4_default_font_weight'] ?? 400) . ';
                --sh5-default-font-weight:' . ($options['sub_headings']['sh5_default_font_weight'] ?? 400) . ';
                --sh6-default-font-weight:' . ($options['sub_headings']['sh6_default_font_weight'] ?? 400) . ';

                --sh1-bold-font-weight:' . ($options['sub_headings']['sh1_bold_font_weight'] ?? 600) . ';
                --sh2-bold-font-weight:' . ($options['sub_headings']['sh2_bold_font_weight'] ?? 600) . ';
                --sh3-bold-font-weight:' . ($options['sub_headings']['sh3_bold_font_weight'] ?? 600) . ';
                --sh4-bold-font-weight:' . ($options['sub_headings']['sh4_bold_font_weight'] ?? 600) . ';
                --sh5-bold-font-weight:' . ($options['sub_headings']['sh5_bold_font_weight'] ?? 600) . ';
                --sh6-bold-font-weight:' . ($options['sub_headings']['sh6_bold_font_weight'] ?? 600) . ';

                --h1-l-default-font-weight:' . ($options['headings']['h1_l_default_font_weight'] ?? 400) . ';
                --h1-default-font-weight:' . ($options['headings']['h1_default_font_weight'] ?? 400) . ';
                --h2-default-font-weight:' . ($options['headings']['h2_default_font_weight'] ?? 400) . ';
                --h3-default-font-weight:' . ($options['headings']['h3_default_font_weight'] ?? 400) . ';
                --h4-default-font-weight:' . ($options['headings']['h4_default_font_weight'] ?? 400) . ';
                --h5-default-font-weight:' . ($options['headings']['h5_default_font_weight'] ?? 400) . ';
                --h6-default-font-weight:' . ($options['headings']['h6_default_font_weight'] ?? 400) . ';

                --h1-l-bold-font-weight:' . ($options['headings']['h1_l_bold_font_weight'] ?? 600) . ';
                --h1-bold-font-weight:' . ($options['headings']['h1_bold_font_weight'] ?? 600) . ';
                --h2-bold-font-weight:' . ($options['headings']['h2_bold_font_weight'] ?? 600) . ';
                --h3-bold-font-weight:' . ($options['headings']['h3_bold_font_weight'] ?? 600) . ';
                --h4-bold-font-weight:' . ($options['headings']['h4_bold_font_weight'] ?? 600) . ';
                --h5-bold-font-weight:' . ($options['headings']['h5_bold_font_weight'] ?? 600) . ';
                --h6-bold-font-weight:' . ($options['headings']['h6_bold_font_weight'] ?? 600) . ';

                --paragraph-line-height:' . ($options['paragraphs']['paragraph_line_height'] ?? 100) . '%;
                --paragraph-default-font-weight:' . ($options['paragraphs']['paragraph_default_font_weight'] ?? 400) . ';
                --paragraph-bold-font-weight:' . ($options['paragraphs']['paragraph_bold_font_weight'] ?? 600) . ';
                --paragraph-letter-spacing:' . ($options['paragraphs']['paragraph_letter_spacing'] ?? 100) . 'em;
                --paragraph-font-family:' . (remove_underscore($options['paragraphs']['paragraph_font_family'] ?? 'arial')) . ';

                --h1-l-desktop:' . ($options['headings']['h1_l_desktop'] ?? 40) . ';
                --h1-l-landscape:' . ($options['headings']['h1_l_landscape'] ?? 40) . ';
                --h1-l-portrait:' . ($options['headings']['h1_l_portrait'] ?? 40) . ';
                --h1-l-mobile:' . ($options['headings']['h1_l_mobile'] ?? 40) . ';
                --h1-desktop:' . ($options['headings']['h1_desktop'] ?? 40) . ';
                --h1-landscape:' . ($options['headings']['h1_landscape'] ?? 40) . ';
                --h1-portrait:' . ($options['headings']['h1_portrait'] ?? 40) . ';
                --h1-mobile:' . ($options['headings']['h1_mobile'] ?? 40) . ';
                --h2-desktop:' . ($options['headings']['h2_desktop'] ?? 36) . ';
                --h2-landscape:' . ($options['headings']['h2_landscape'] ?? 36) . ';
                --h2-portrait:' . ($options['headings']['h2_portrait'] ?? 36) . ';
                --h2-mobile:' . ($options['headings']['h2_mobile'] ?? 36) . ';
                --h3-desktop:' . ($options['headings']['h3_desktop'] ?? 34) . ';
                --h3-landscape:' . ($options['headings']['h3_landscape'] ?? 34) . ';
                --h3-portrait:' . ($options['headings']['h3_portrait'] ?? 34) . ';
                --h3-mobile:' . ($options['headings']['h3_mobile'] ?? 34) . ';
                --h4-desktop:' . ($options['headings']['h4_desktop'] ?? 32) . ';
                --h4-landscape:' . ($options['headings']['h4_landscape'] ?? 32) . ';
                --h4-portrait:' . ($options['headings']['h4_portrait'] ?? 32) . ';
                --h4-mobile:' . ($options['headings']['h4_mobile'] ?? 32) . ';
                --h5-desktop:' . ($options['headings']['h5_desktop'] ?? 26) . ';
                --h5-landscape:' . ($options['headings']['h5_landscape'] ?? 26) . ';
                --h5-portrait:' . ($options['headings']['h5_portrait'] ?? 26) . ';
                --h5-mobile:' . ($options['headings']['h5_mobile'] ?? 26) . ';
                --h6-desktop:' . ($options['headings']['h6_desktop'] ?? 24) . ';
                --h6-landscape:' . ($options['headings']['h6_landscape'] ?? 24) . ';
                --h6-portrait:' . ($options['headings']['h6_portrait'] ?? 24) . ';
                --h6-mobile:' . ($options['headings']['h6_mobile'] ?? 24) . ';

                --sh1-desktop:' . ($options['sub_headings']['sh1_desktop'] ?? 40) . ';
                --sh1-landscape:' . ($options['sub_headings']['sh1_landscape'] ?? 40) . ';
                --sh1-portrait:' . ($options['sub_headings']['sh1_portrait'] ?? 40) . ';
                --sh1-mobile:' . ($options['sub_headings']['sh1_mobile'] ?? 40) . ';
                --sh2-desktop:' . ($options['sub_headings']['sh2_desktop'] ?? 36) . ';
                --sh2-landscape:' . ($options['sub_headings']['sh2_landscape'] ?? 36) . ';
                --sh2-portrait:' . ($options['sub_headings']['sh2_portrait'] ?? 36) . ';
                --sh2-mobile:' . ($options['sub_headings']['sh2_mobile'] ?? 36) . ';
                --sh3-desktop:' . ($options['sub_headings']['sh3_desktop'] ?? 34) . ';
                --sh3-landscape:' . ($options['sub_headings']['sh3_landscape'] ?? 34) . ';
                --sh3-portrait:' . ($options['sub_headings']['sh3_portrait'] ?? 34) . ';
                --sh3-mobile:' . ($options['sub_headings']['sh3_mobile'] ?? 34) . ';
                --sh4-desktop:' . ($options['sub_headings']['sh4_desktop'] ?? 32) . ';
                --sh4-landscape:' . ($options['sub_headings']['sh4_landscape'] ?? 32) . ';
                --sh4-portrait:' . ($options['sub_headings']['sh4_portrait'] ?? 32) . ';
                --sh4-mobile:' . ($options['sub_headings']['sh4_mobile'] ?? 32) . ';
                --sh5-desktop:' . ($options['sub_headings']['sh5_desktop'] ?? 26) . ';
                --sh5-landscape:' . ($options['sub_headings']['sh5_landscape'] ?? 26) . ';
                --sh5-portrait:' . ($options['sub_headings']['sh5_portrait'] ?? 26) . ';
                --sh5-mobile:' . ($options['sub_headings']['sh5_mobile'] ?? 26) . ';
                --sh6-desktop:' . ($options['sub_headings']['sh6_desktop'] ?? 24) . ';
                --sh6-landscape:' . ($options['sub_headings']['sh6_landscape'] ?? 24) . ';
                --sh6-portrait:' . ($options['sub_headings']['sh6_portrait'] ?? 24) . ';
                --sh6-mobile:' . ($options['sub_headings']['sh6_mobile'] ?? 24) . ';

                --p-l-desktop:' . ($options['paragraphs']['p_l_desktop'] ?? 18) . ';
                --p-l-landscape:' . ($options['paragraphs']['p_l_landscape'] ?? 18) . ';
                --p-l-portrait:' . ($options['paragraphs']['p_l_portrait'] ?? 18) . ';
                --p-l-mobile:' . ($options['paragraphs']['p_l_mobile'] ?? 18) . ';
                --p-desktop:' . ($options['paragraphs']['p_desktop'] ?? 16) . ';
                --p-landscape:' . ($options['paragraphs']['p_landscape'] ?? 16) . ';
                --p-portrait:' . ($options['paragraphs']['p_portrait'] ?? 16) . ';
                --p-mobile:' . ($options['paragraphs']['p_mobile'] ?? 16) . ';
                --p-s-desktop:' . ($options['paragraphs']['p_s_desktop'] ?? 14) . ';
                --p-s-landscape:' . ($options['paragraphs']['p_s_landscape'] ?? 14) . ';
                --p-s-portrait:' . ($options['paragraphs']['p_s_portrait'] ?? 14) . ';
                --p-s-mobile:' . ($options['paragraphs']['p_s_mobile'] ?? 14) . ';
                --p-xs-desktop:' . ($options['paragraphs']['p_xs_desktop'] ?? 12) . ';
                --p-xs-landscape:' . ($options['paragraphs']['p_xs_landscape'] ?? 12) . ';
                --p-xs-portrait:' . ($options['paragraphs']['p_xs_portrait'] ?? 12) . ';
                --p-xs-mobile:' . ($options['paragraphs']['p_xs_mobile'] ?? 12) . ';
                --p-xxs-desktop:' . ($options['paragraphs']['p_xxs_desktop'] ?? 10) . ';
                --p-xxs-landscape:' . ($options['paragraphs']['p_xxs_landscape'] ?? 10) . ';
                --p-xxs-portrait:' . ($options['paragraphs']['p_xxs_portrait'] ?? 10) . ';
                --p-xxs-mobile:' . ($options['paragraphs']['p_xxs_mobile'] ?? 10) . ';
                --p-xxxs-desktop:' . ($options['paragraphs']['p_xxxs_desktop'] ?? 8) . ';
                --p-xxxs-landscape:' . ($options['paragraphs']['p_xxxs_landscape'] ?? 8) . ';
                --p-xxxs-portrait:' . ($options['paragraphs']['p_xxxs_portrait'] ?? 8) . ';
                --p-xxxs-mobile:' . ($options['paragraphs']['p_xxxs_mobile'] ?? 8) . ';';
            }
            $output .= '</style>';
        }
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd