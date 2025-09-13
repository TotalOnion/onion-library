import videocontroller from '@total_onion/onion-videocontroller/onion-videocontroller.js';

export default function videocontentv3Js(options = {}) {
	try {
		const {block} = options;
		if (!document.body.classList.contains('wp-admin')) {
			const videoController = new videocontroller(block);
		}
	} catch (error) {
		console.error(error);
	}
}
