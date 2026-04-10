module.exports = function (newBlockName, projectName) {
	const blockTitle =
		newBlockName.charAt(0).toUpperCase() +
		newBlockName.slice(1).replaceAll('-', ' ');
	const namespace = projectName.toLowerCase().replaceAll(' ', '-');

	return `{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "acf/${newBlockName}",
	"title": "${blockTitle}",
	"category": "project-blocks",
	"description": "${blockTitle} block",
	"keywords": ["content"],
	"version": "1.0.0",
	"textdomain": "${namespace}",
	"acf": {
		"mode": "preview",
		"renderCallback": "core_block_render_post_object_v3",
		"blockVersion": 3
	},
	"supports": {
		"align": false,
		"anchor": true,
		"jsx": true
	},
	"example": {
		"attributes": {
			"mode": "preview",
			"data": {
				"is_example": true
			}
		}
	}
}`;
};
