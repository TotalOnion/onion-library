export default function templateAcfPattern(newBlockName, projectName) {
	const blockTitle =
		newBlockName.charAt(0).toUpperCase() +
		newBlockName.slice(1).replaceAll('-', ' ');
	const namespace = projectName.toLowerCase().replaceAll(' ', '-');

	return `<?php
/**
 * ${blockTitle}
 */
add_action('acf/init', function () {
	if (function_exists('acf_register_block_type')) {
		acf_register_block_type([
			'name' => '${newBlockName}',
			'title' => '${blockTitle}',
			'description' => '${blockTitle}',
			'render_template' => get_template_directory() . '/views/blocks/${newBlockName}.twig',
			'category' => 'project-blocks',
			'icon' => 'editor-code',
			'supports' => [
				'align' => false,
				'anchor' => true,
			],
			'enqueue_style' => get_template_directory_uri() . '/assets/scss/blocks/${newBlockName}.css',
			'enqueue_script' => get_template_directory_uri() . '/assets/js/blocks/${newBlockName}.js',
		]);
	}
});
`;
}
