// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import extraJs from 'Assets/js/blocks/post-info-v3/post-info-v3-extra';
export default function postinfov3Js(options = {}) {
	const {block} = options;
	try {
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
