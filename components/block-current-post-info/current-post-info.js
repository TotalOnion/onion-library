// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import extraJs from 'Assets/js/blocks/current-post-info/current-post-info-extra';

export default function currentpostinfoJs(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
