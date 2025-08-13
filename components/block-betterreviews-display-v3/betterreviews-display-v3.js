import extraJs from 'Assets/js/blocks/betterreviews-display-v3/betterreviews-display-v3-extra.js';

export default function betterreviewsdisplay3Js(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
