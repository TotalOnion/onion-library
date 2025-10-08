export default function scrollingbannerv3Js(options = {}) {
	try {
		const {block} = options;
		scrollingbannerJs(block);
	} catch (error) {
		console.error(error);
	}
}
//import {resizeDebouncer} from '@pernod-ricard-global-cms/jsutils';
const initializedBanners = new WeakMap(); // key = element, value = { animations } //cleaner way
function scrollingbannerJs(block) {
	if (!block) {
		return;
	}

	const bannerElement = block.querySelector('.scrolling-banner');
	if (!bannerElement) {
		return;
	}

	try {
		// only if it is not already done
		if (!initializedBanners.has(bannerElement)) {
			bannerInit(bannerElement);
		}

		// resize observer instead of resizeDebouncer because the later
		// caused the issue mentionned in MLDB-7
		const wrapper = bannerElement.querySelector(
			'.scrolling-banner__wrapper'
		);
		if (wrapper) {
			if (window.ResizeObserver) {
				const resizeObserver = new ResizeObserver(() => {
					resetBanner(bannerElement);
					bannerInit(bannerElement);
				});
				resizeObserver.observe(wrapper);
			} else {
				// Fallback simple
				window.addEventListener('resize', () => {
					resetBanner(bannerElement);
					bannerInit(bannerElement);
				});
			}
		}
	} catch (error) {
		console.error(error);
	}

	function bannerInit(bannerElement) {
		if (initializedBanners.has(bannerElement)) {
			return;
		}
		// console.log('bannerInit');

		const container = bannerElement.querySelector(
			'.scrolling-banner__container'
		);
		const wrapper = bannerElement.querySelector(
			'.scrolling-banner__wrapper'
		);
		const inner = bannerElement.querySelector('.scrolling-banner__inner');
		const speed = bannerElement.dataset.speed ?? 5;

		const wrapperWidth = wrapper.clientWidth;
		const innerContentWidth = inner.clientWidth;
		const multiplier = Number(Math.round(wrapperWidth / innerContentWidth));

		for (let index = 0; index < multiplier; index++) {
			const newInner = inner.cloneNode(true);
			newInner.classList.add('clone');
			container.appendChild(newInner);
		}

		const containerHeight = inner.clientHeight;
		wrapper.setAttribute('style', `min-height: ${containerHeight}px`);

		const newTickerContainer = container.cloneNode(true);
		newTickerContainer.classList.add('clone');
		wrapper.appendChild(newTickerContainer);

		const animation = [
			{transform: `translateX(0%)`},
			{transform: `translateX(-200%)`}
		];

		const time = 100000 / speed;

		let timing = {
			duration: time,
			iterations: Infinity
		};
		let timing2 = {
			duration: time,
			delay: time / 2,
			iterations: Infinity
		};
		const containers = bannerElement.querySelectorAll(
			'.scrolling-banner__container'
		);

		const anim1 = containers[0].animate(animation, timing);
		const anim2 = containers[1].animate(animation, timing2);

		// set as initialized and store animation for a possible cleanup
		initializedBanners.set(bannerElement, {anim1, anim2});
	}

	function resetBanner(bannerElement) {
		// if already initialized, anims get reset
		const data = initializedBanners.get(bannerElement);
		if (data) {
			data.anim1?.cancel();
			data.anim2?.cancel();
			initializedBanners.delete(bannerElement);
		}

		bannerElement
			.querySelectorAll(
				'.scrolling-banner__container.clone, .scrolling-banner__inner.clone'
			)
			.forEach((el) => el.remove());

		bannerElement
			.querySelector('.scrolling-banner__wrapper')
			.removeAttribute('style');
	}
}
