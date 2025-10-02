module.exports = function (newBlockName, projectName) {
	return `<?php

acf_register_block_type(
	array(
		'name'            => '${newBlockName}',
		'title'           => __( '${
			newBlockName.charAt(0).toUpperCase() +
			newBlockName.slice(1).replaceAll('-', ' ')
		}', '${projectName} Admin' ),
		'render_callback' => 'athena_block_render_post_object_v3',
		'category'        => 'child-patterns',
		'icon'            => get_svg_icon_content('green-brick.svg'),
		'keywords'        => array('content', 'text' ),
		'mode'            => 'preview',
		'supports'        => array( 'align' => false, 'anchor' => true ),
		'example' => [
			'attributes' => [
				'mode' => 'preview',
				'data' => ['is_example' => true]
			]
		]
	)
);`;
};
