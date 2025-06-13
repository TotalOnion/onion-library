// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import extraJs from 'Assets/js/blocks/standard-content-v2/standard-content-v2-extra.js';
export default function standardcontentV2Js(options = {}) {
	try {
		const {block} = options;
		const dataset = block.dataset;
		if (dataset.enablevideoncontroller) {
			import('@pernod-ricard-global-cms/cblvideocontroller')
				.then((module) => {
					const videoController = new module.default(block);
				})
				.catch((error) => {
					console.error(
						'Failed to load video controller module',
						error
					);
				});
		}
		if (dataset.enablebuynowbutton) {
			import(
				'Assets/js/modules/library-modules/buy-now-button/buy-now-button.js'
			).then((module) => {
				module.default(block);
			});
		}
		if (dataset.enablescrollingbanner) {
			import(
				'Assets/js/modules/library-modules/scrolling-banner/scrolling-banner.js'
			).then((module) => {
				module.default(block);
			});
		}
		if (dataset.enablelottieanimations) {
			import(
				'Assets/js/modules/library-modules/lottie-animations/lottie-animations.js'
			).then((module) => {
				module.default(block);
			});
		}
		if (dataset.enablecontentcontainer) {
			import(
				'Assets/js/modules/library-modules/content-container/content-container.js'
			).then((module) => {
				module.default(block);
			});
		}
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
