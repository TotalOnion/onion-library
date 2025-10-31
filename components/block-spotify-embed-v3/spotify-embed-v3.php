<?php

acf_register_block_type(
	array(
		'name'            => 'spotify-embed-v3',
		'title'           => __('Spotify embed v3', 'Global-theme Admin'),
		'render_callback' => 'core_block_render_post_object_v3',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array('align' => false, 'anchor' => true),
	)
);
