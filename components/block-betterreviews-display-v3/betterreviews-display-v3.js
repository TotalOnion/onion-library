import extraJs from 'Assets/js/blocks/carousel-multi-layout-v3/carousel-multi-layout-v3-extra.js';

export default function betterreviewsdisplay3Js(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
