import Lenis from 'lenis';

export default function parallaxAnimationsJs(element) {
	setupLenis(element);
}

function setupLenis(element) {
	if (!element) return;
	if (typeof Lenis === 'undefined') {
		console.error('Lenis is not loaded properly.');
		return;
	}

	const lenis = new Lenis({
		smooth: true,
		sync: true,
		duration: 0.5,
		ease: 0.1
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	lenis.on('scroll', ({scroll}) => {
		let depth = parseFloat(element.getAttribute('data-depth')) || 0;
		let yOffset = parseFloat(element.getAttribute('data-y-offset')) || 0;

		let rect = element.getBoundingClientRect();
		let elementTop = rect.top + window.scrollY; // Element's position in relation to the page
		let offset = (scroll - elementTop) * depth;

		element.style.transform = `translateY(${offset + yOffset}px)`;
	});

	window.addEventListener('beforeunload', () => {
		lenis.destroy();
	});
}
