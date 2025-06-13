<?php
add_action('admin_menu', 'gt_linked_url');
function gt_linked_url()
{
	add_menu_page('linked_url', 'Manage patterns', 'read', '/edit.php?post_type=wp_block', '', 'dashicons-editor-table', 50);
}

// add_action('admin_menu', 'linkedurl_function');
// function linkedurl_function()
// {
// 	global $menu;
// 	$menu[1][2] = "/wp-admin/edit.php?post_type=wp_block";
// }
