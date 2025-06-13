<?php

acf_register_block_type(
	array(
		'name'            => 'sticky-link',
		'title'           => __('Sticky link', 'Global-theme Admin'),
		'render_callback' => 'athena_block_render_post_object',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array('align' => false, 'anchor' => true),
	)
);
