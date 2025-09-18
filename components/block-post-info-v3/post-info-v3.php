<?php

acf_register_block_type(
	array(
		'name'            => 'post-info-v3',
		'title'           => __('Post info v3', 'Global-theme Admin'),
		'render_callback' => 'athena_block_render_post_object_v3',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array(
			'align'  => false,
			'anchor' => true,
		),
	)
);
