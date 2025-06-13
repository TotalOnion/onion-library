<?php

acf_register_block_type(
	array(
		'name'            => 'divider',
		'title'           => __('Divider', 'Global-theme Admin'),
		'render_callback' => 'athena_block_render_post_object',
		'category'        => 'common',
		'icon'            => 'book',
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array('align' => false, 'anchor' => true),
	)
);
