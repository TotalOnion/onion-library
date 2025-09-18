<?php

acf_register_block_type(
	array(
		'name'            => 'divider_v3 v3-v3',
		'title'           => __('divider_v3 v3', 'Global-theme Admin'),
		'render_callback' => 'athena_block_render_post_object_v3',
		'category'        => 'common',
		'icon'            => 'book',
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array('align' => false, 'anchor' => true),
	)
);
