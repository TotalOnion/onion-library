<?php

/**
 * @param array <mixed> $blocks
 *
 * @return void
 */

$global_settings = defined('GLOBAL_SETTINGS') ? GLOBAL_SETTINGS : array();

if (
	function_exists('get_fields') && isset($global_settings['dynamic_critical_css'])
) {

	define('INLINE_STYLES', array_key_exists('inline_css_into_html', $global_settings['dynamic_critical_css']) ? $global_settings['dynamic_critical_css']['inline_css_into_html'] : false);
} else {
	define('INLINE_STYLES', false);
}

function dynamic_critical_block_css($blocks)
{
	$preload_specific_blocks = array();
	$specific_blocks = array();
	$blocks_to_preload = 2;
	if (function_exists('get_fields') && isset(GLOBAL_SETTINGS['dynamic_critical_css'])) {
		$blocks_to_preload = GLOBAL_SETTINGS['dynamic_critical_css']['critical_css_block_preload_amount'] ?? 2;
		$preload_specific_blocks = GLOBAL_SETTINGS['dynamic_critical_css']['preload_specific_blocks'] ?? '';
		$block_names = explode(',', $preload_specific_blocks);
		foreach ($block_names as $block_name) {
			if (empty($block_name)) {
				continue;
			};
			$specific_blocks[] = array('blockName' => 'acf/' . $block_name);
		}
	}
	$critical_styles = array();
	$filtered_blocks = array_filter(
		$blocks,
		function ($block) {
			if (!isset($block['blockName'])) {
				return false;
			}
			if (substr($block['blockName'], 0, 4) === 'core') {
				return false;
			}
			if (null === $block['blockName']) {
				return false;
			}
			return true;
		}
	);
	$reindexed_array = array_values($filtered_blocks);
	$merged_array = array_merge($specific_blocks, $reindexed_array);
	foreach ($merged_array as $block) {
		$style_name = substr($block['blockName'], 4);
		if (!in_array($style_name, $critical_styles) && count($critical_styles) < $blocks_to_preload) {
			$critical_styles[] = $style_name;
		}
		if (count($critical_styles) >= $blocks_to_preload) {
			break;
		}
	}

	$output = '';
	// @codingStandardsIgnoreStart
	foreach ($critical_styles as $filename) {
		$css_url = gtp_get_asset_uri($filename . '-scss.css');
		// dump($filename);
		// dump($css_url);
		$arrURL = explode('/static/', $css_url);
		if (!$css_url) {
			continue;
		}
		if (INLINE_STYLES && !empty($arrURL[1])) {
			$css_url_path = __DIR__ . "/../../static/" . $arrURL[1];
			$cssContent = file_get_contents($css_url_path);
			$output .= $cssContent;
		} else {
			wp_enqueue_style($filename, $css_url, array(), null);
		}
	}
	wp_localize_script('global_theme_shared', 'criticalConfig', $critical_styles);
	// @codingStandardsIgnoreEnd
	if (INLINE_STYLES) {
		$output = '<style id="dynamic-critical-css">' . $output . '</style>';
		return $output;
	}
}

/**
 * Hook to get dynamic content blocks for critical config.
 */
if (!is_admin()) {
	add_action(
		'wp_print_scripts',
		function () {
			$post = get_post();
			if (isset($post->post_content)) {
				$blocks = parse_blocks($post->post_content);
				add_action(
					'wp_head',
					function () use ($blocks) {
						if (INLINE_STYLES) {
							echo dynamic_critical_block_css($blocks);
						} else {
							dynamic_critical_block_css($blocks);
						}
					}
				);
			}
		}
	);
}
