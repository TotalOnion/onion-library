import cblvideocontroller from '@pernod-ricard-global-cms/cblvideocontroller';
import extraJs from 'Assets/js/blocks/single-video/single-video-extra.js';

export default function singlevideoJs(options = {}) {
	try {
		const {block} = options;
		const videoController = new cblvideocontroller(block);
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
