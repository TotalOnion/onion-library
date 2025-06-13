export default function singlecontentboxJs(options = {}) {
	try {
		const {block} = options;
		const dataset = block.dataset;
		if (dataset.enablecontentcontainer) {
			import(
				'Assets/js/modules/library-modules/content-container/content-container.js'
			).then((module) => {
				module.default(block);
			});
		}
	} catch (error) {
		console.error(error);
	}
}
