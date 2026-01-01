<?php
// @codingStandardsIgnoreStart
function core_post_overrides_v3($options)
{
    $output = '';
    $current_post = [];
    if (isset($GLOBALS['post'])) {
        $current_post = Timber::get_post($GLOBALS['post']->ID);
    }
    if (is_array($options)) {

        $output = '
            <style id="core-site-global-v3">
            body { 
                --post-colour:' . ($current_post && (property_exists($current_post, 'meta') && isset($current_post->meta['post_colour'])) ? $current_post->meta['post_colour'] : '') . ';
                --post-text-colour-style:' .  ($current_post && (property_exists($current_post, 'meta') && isset($current_post->meta['post_text_colour_style'])) ? remove_underscore($current_post->meta['post_text_colour_style']) : '') . ';
                }</style>';
    }
    return [$output];
} // END function core_design_vars
// @codingStandardsIgnoreEnd
