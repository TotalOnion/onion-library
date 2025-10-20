<?php
acf_register_block_type(
	array(
		'name'            => 'featured-image-gallery-v3',
		'title'           => __('Featured Image gallery v3', 'Global Theme Admin'),
		'render_callback' => 'core_block_render_post_object_v3',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'layout', 'image'),
		'mode'            => 'preview',
		'supports'        => array(
			'align'  => false,
			'anchor' => true,
		),
	)
);
