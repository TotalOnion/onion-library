<?php

/**
 * Sets globals in the context
 *
 * @package Global Theme
 *s
 * @return array<string,mixed>
 */

function create_context(): array
{
	$context = \Timber\Timber::context();
	$context['environment'] = $_ENV['PANTHEON_ENVIRONMENT'] ?? 'local';
	Define('NAV_MENUS', assemble_menus());

	if (file_exists(__DIR__ . '/inc/markets.php')) {
		require_once get_template_directory() . '/inc/markets.php';
	}
	if (defined('ICL_LANGUAGE_CODE')) {
		$context['market_slug'] = ICL_LANGUAGE_CODE; // @phpstan-ignore-line
		$languages = apply_filters('wpml_active_languages', null);
		$context['languages'] = $languages;
	}

	if (defined('OPTIONS') && is_array(OPTIONS)) {
		if (array_key_exists('header_pattern', OPTIONS)) {
			$context['header_post'] = Timber::get_post(OPTIONS['header_pattern']);
		}
		if (array_key_exists('footer_pattern', OPTIONS)) {
			$context['footer_post'] = Timber::get_post(OPTIONS['footer_pattern']);
		}
		$context['options']        		 = OPTIONS;
		$context['options']['nav_menus'] = NAV_MENUS;
		$context['archive_links']   	 = OPTIONS['archive_links'];
	}

	return $context;
}
