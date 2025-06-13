<?php
function assemble_menus(): array
{
    $nav_menus = [];
    if (Timber::get_menu() && !(Timber::get_menu())->id == null) {
        $nav_menus['primary_menu']        = Timber::get_menu('primary_menu');
        $nav_menus['secondary_menu']        =  Timber::get_menu('secondary_menu');
        $nav_menus['tertiary_menu']        =  Timber::get_menu('tertiary_menu');
        $nav_menus['legal_menu']                =  Timber::get_menu('legal_menu');
        $nav_menus['social_menu']                =  Timber::get_menu('social_menu');
        $nav_menus['footer_navigation_menu']   =  Timber::get_menu('footer_navigation_menu');
        $nav_menus['footer_navigation_menu_secondary']   =  Timber::get_menu('footer_navigation_menu_secondary');
        $nav_menus['footer_navigation_menu_tertiary']   =  Timber::get_menu('footer_navigation_menu_tertiary');
        $nav_menus['footer_navigation_menu_quaternary']   =  Timber::get_menu('footer_navigation_menu_quaternary');
    }
    return $nav_menus;
}

define('SITE_MENUS', assemble_menus());
