<?php

acf_register_block_type(
	array(
		'name'            => 'bambuser-display',
		'title'           => __( 'Bambuser display', 'Global-theme Admin' ),
		'render_callback' => 'athena_block_render_post_object',
		'category'        => 'common',
		'icon'            => 'text',
		'keywords'        => array('content', 'text' ),
		'mode'            => 'preview',
		'supports'        => array( 'align' => false, 'anchor' => true ),
	)
);