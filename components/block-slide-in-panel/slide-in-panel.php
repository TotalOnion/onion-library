<?php

acf_register_block_type(
	array(
		'name'            => 'slide-in-panel',
		'title'           => __('Slide in panel', 'Global-theme Admin'),
		'render_callback' => 'athena_block_render_post_object',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array('align' => false, 'anchor' => true),
	)
);
