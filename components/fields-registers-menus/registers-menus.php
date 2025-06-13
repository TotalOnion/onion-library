<?php

/**
 * Adds menus
 */
function global_theme_register_menus(): void
{
	register_nav_menu('primary_menu', __('Primary Menu', 'Global Theme'));
	register_nav_menu('secondary_menu', __('Secondary Menu', 'The Global Theme'));
	register_nav_menu('tertiary_menu', __('Tertiary Menu', 'Global Theme'));
	register_nav_menu('legal_menu', __('Legal Menu', 'Global Theme'));
	register_nav_menu('social_menu', __('Social Menu', 'Global Theme'));
	register_nav_menu('footer_navigation_menu', __('Footer Navigation Menu', 'Global Theme'));
	register_nav_menu('footer_navigation_menu_secondary', __('Footer Navigation Menu Secondary', 'Global Theme'));
	register_nav_menu('footer_navigation_menu_tertiary', __('Footer Navigation Menu Tertiary', 'Global Theme'));
	register_nav_menu('footer_navigation_menu_quaternary', __('Footer Navigation Menu Quaternary', 'Global Theme'));
}
add_action('after_setup_theme', 'global_theme_register_menus');
