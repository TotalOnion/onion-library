export default function lottiecontentv3Js ( options = {} ) {
	try {
		const { block } = options;
		if (dataset.enablelottieanimations) {
			import(
				'Assets/js/modules/library-modules/lottie-animations/lottie-animations.js'
			).then((module) => {
				module.default(block);
			});
		}
	} catch ( error ) {
		console.error( error );
	}
}