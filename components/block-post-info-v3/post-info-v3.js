import extraJs from 'Assets/js/blocks/post-info-v3/post-info-v3-extra';
import videocontroller from '@total_onion/onion-videocontroller/onion-videocontroller.js';

export default function postinfov3Js(options = {}) {
	const {block} = options;
	try {
		const videoController = new videocontroller(block);
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
