import lottie from 'lottie-web';
export default function lottieAnimationsJs(block) {
	const lottieElement = block.querySelector('.lottie-animations');
	if (!lottieElement) {
		return;
	}
	const lottieData = lottieElement.dataset;
	const filePath = lottieData.lottiefile;
	if (!filePath) {
		return;
	}
	const loop = lottieData.loop ? true : false;
	const autoplay = lottieData.autoplay ? true : false;
	lottie.loadAnimation({
		container: lottieElement,
		renderer: 'svg',
		loop: loop,
		autoplay: autoplay,
		path: filePath,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
			progressiveLoad: true,
		}
	});
}
