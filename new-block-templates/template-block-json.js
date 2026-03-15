module.exports = function (newBlockName, projectName) {
	const blockTitle =
		newBlockName.charAt(0).toUpperCase() +
		newBlockName.slice(1).replaceAll('-', ' ');
	const namespace = projectName.toLowerCase().replaceAll(' ', '-');

	return `{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "${namespace}/${newBlockName}",
	"title": "${blockTitle}",
	"category": "common",
	"icon": "smiley",
	"description": "${blockTitle} block",
	"keywords": ["content", "text"],
	"version": "1.0.0",
	"textdomain": "${namespace}",
	"supports": {
		"anchor": true,
		"align": false
	},
	"example": {
		"attributes": {
			"mode": "preview",
			"data": {
				"is_example": true
			}
		}
	},
	"acf": {
		"mode": "preview",
		"renderCallback": "core_block_render_post_object_v3"
	}
}`;
};
