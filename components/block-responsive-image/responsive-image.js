import parallaxAnimationsJs from 'Assets/js/modules/library-modules/parallax-animations/parallax-animations.js';

export default function responsiveimageJs(options = {}) {
	try {
		const {block} = options;
		const imageElement = block.querySelector('img');
		const enableParallax = block.dataset.enableparallax;
		if (enableParallax) {
			parallaxAnimationsJs(imageElement);
		}
	} catch (error) {
		console.error(error);
	}
}
