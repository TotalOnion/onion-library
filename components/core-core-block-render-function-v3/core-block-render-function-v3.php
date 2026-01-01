<?php

use Timber\Timber;

/**
 * Rendering of core blocks with Post entity
 *
 * @param array<string, mixed> $block block.
 * @param string $content content.
 * @param bool $is_preview If it's a preview.
 */
function core_block_render_post_object_v3(array $block, string $content = '', bool $is_preview = false, $post_id = 0, $wp_block = false, $context = false, array $extra_context = array()): void
{
    $context = \Timber\Timber::context();
    $slug = substr($block['name'], 4); // Removes 'acf/' from the name.
    $fields = get_fields();
    $context['block'] = $block;
    $context['fields'] = $fields;
    $context['is_preview'] = $is_preview;
    $context['environment'] = $_ENV['PANTHEON_ENVIRONMENT'] ?? 'local';

    if (defined('OPTIONS') && is_array(OPTIONS)) {
        $context['options']          = OPTIONS;
        $context['nav_menus']        = Defined('NAV_MENUS') ? NAV_MENUS : [];
    }

    if ($extra_context) {
        foreach ($extra_context as $key => $value) {
            $context[$key] = $value;
        }
    }


    if (file_exists(__DIR__ . '/../../../views/blocks/' . $slug . '.twig')) {
        \Timber\Timber::render("blocks/{$slug}.twig", $context);
    } else {
        echo 'could not find Twig template for ' . $slug . '. This block may no longer be in use.';
    }
}
