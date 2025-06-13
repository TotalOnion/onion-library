<?php

/**
 * Functions for the native blocks
 *
 * @package Global Theme
 */

/**
 *  Restrict blocks
 *
 * @param bool   $block_editor_context Array of block type slugs, or boolean to enable/disable all. Default true (all registered block types supported).
 * @param object $editor_context The current block editor context.
 */
function wpdocs_allowed_block_types_all($block_editor_context, $editor_context)
{
	// can be customised according to the post type and etc.
	$allowed_blocks = array('core/block');

	if (!empty($editor_context->post)) {

		$files = glob(get_template_directory() . '/inc/acf-blocks/*.php');
		foreach ($files as $file) {
			$file             = 'acf/' . basename($file, '.php');
			$allowed_blocks[] = $file;
		}

		return $allowed_blocks;
	}

	return $block_editor_context;
}

add_filter('allowed_block_types_all', 'wpdocs_allowed_block_types_all', 10, 2);
