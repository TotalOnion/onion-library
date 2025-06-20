<?php

use Timber\Timber;

/**
 * Rendering of core blocks with Post entity
 *
 * @param array<string, mixed> $block block.
 * @param string $content content.
 * @param bool $is_preview If it's a preview.
 */
function athena_block_render_post_object(array $block, string $content = '', bool $is_preview = false, $post_id = 0, $wp_block = false, $context = false, array $extraContext = null): void
{
    $context = \Timber\Timber::context();
    $slug = substr($block['name'], 4); // Removes 'acf/' from the name.
    $fields = get_fields();
    $current_post =
        $is_preview ? Timber::get_post(get_post()->ID) : Timber::get_post();
    $context['current_post'] = $current_post;
    $context['block'] = $block;
    $context['fields'] = $fields;
    $context['is_preview'] = $is_preview;
    $context['environment'] = $_ENV['PANTHEON_ENVIRONMENT'] ?? 'local';
    $context['cloudflare_config'] = defined('CLOUDFLARE_CONFIG') ? CLOUDFLARE_CONFIG : false;
    $context['options']                = defined('GLOBAL_SETTINGS') ? GLOBAL_SETTINGS : [];
    $context['cta_styles']                = defined('CTA_STYLES_OPTIONS') ? CTA_STYLES_OPTIONS : [];
    // $context['nav_menus']               = defined('SITE_MENUS') ? SITE_MENUS : [];
    $context['market_settings']        = defined('MARKET_SETTINGS_OPTIONS') ? MARKET_SETTINGS_OPTIONS : [];
    if (file_exists(__DIR__ . '/site-menus.php')) {
        include_once __DIR__ . '/site-menus.php';
        $context['nav_menus'] = assemble_menus();
    }

    if ($extraContext) {
        foreach ($extraContext as $key => $value) {
            $context[$key] = $value;
        }
    }

    if (defined('ICL_LANGUAGE_CODE')) {
        $context['market_slug'] = ICL_LANGUAGE_CODE; // @phpstan-ignore-line
        $languages = apply_filters('wpml_active_languages', null);
        $context['languages'] = $languages;
    }
    if (file_exists(__DIR__ . '/../../views/blocks/' . $slug . '.twig')) {
        \Timber\Timber::render("blocks/{$slug}.twig", $context);
    } else {
        echo 'could not find Twig template for ' . $slug . '. This block may no longer be in use.';
    }
}
