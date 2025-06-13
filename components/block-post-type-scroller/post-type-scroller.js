export default function posttypescrollerJs(options = {}) {
	try {
		const {block} = options;
		const dataset = block.dataset;
		if (dataset.enablescrollingposts) {
			import(
				'Assets/js/modules/library-modules/scrolling-posts/scrolling-posts.js'
			).then((module) => {
				module.default(options);
			});
		}
	} catch (error) {
		console.error(error);
	}
}
