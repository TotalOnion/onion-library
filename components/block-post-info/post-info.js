// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import extraJs from 'Assets/js/blocks/post-info/post-info-extra';

export default function postinfoJs(options = {}) {
	const {block} = options;
	if (!block || !(block instanceof HTMLElement)) return;

	try {
		const contentTooltip = block.querySelector('.content-tooltip-wrapper');
		const truncatedText = block.querySelector('.truncated-text');
		if (truncatedText) {
			import(
				'Assets/js/modules/library-modules/truncated-text/truncated-text.js'
			)
				.then((module) => {
					module.default(block);
				})
				.catch(console.error);
		}
		if (contentTooltip) {
			import(
				'Assets/js/modules/library-modules/content-tooltip/content-tooltip.js'
			)
				.then((module) => {
					module.default(block);
				})
				.catch(console.error);
		}
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
