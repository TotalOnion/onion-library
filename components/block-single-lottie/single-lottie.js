import lottieAnimationsJs from 'Assets/js/modules/library-modules/lottie-animations/lottie-animations.js';

export default function singlelottieJs(options = {}) {
	try {
		const {block} = options;
		lottieAnimationsJs(block);
	} catch (error) {
		console.error(error);
	}
}
