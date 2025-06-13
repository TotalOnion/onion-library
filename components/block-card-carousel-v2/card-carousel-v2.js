import {
	getElementStyles,
	eventListenerDebouncer
} from '@pernod-ricard-global-cms/jsutils';

export default function cardcarouselv2(options = {}) {
	try {
		const {block} = options;

		fadeIn(block);
		const carouselContainer = block.querySelector(
			'.card-carousel-v2__container'
		);
		const arrowPrev = block.querySelector('.card-carousel-v2__arrow--prev');
		const arrowNext = block.querySelector('.card-carousel-v2__arrow--next');
		const lastSlide =
			carouselContainer.children[carouselContainer.children.length - 2];
		const sampleSlide = carouselContainer.querySelector(
			'.card-carousel-v2__slide:not(.card-carousel-v2__slide--spacer, .card-carousel-v2__slide--intro)'
		);
		if (sampleSlide) {
			arrowPrev.addEventListener('click', () => {
				carouselContainer.classList.add('snap');
				setTimeout(() => {
					carouselContainer.classList.remove('snap');
				}, 500);
				const slideMargin = getElementStyles(
					sampleSlide,
					'margin-right'
				);
				const totalSlideWidth =
					parseInt(sampleSlide.offsetWidth, 10) +
					parseInt(slideMargin, 10);
				carouselContainer.scrollBy({
					left: -totalSlideWidth,
					behavior: 'smooth'
				});
			});
			arrowNext.addEventListener('click', () => {
				carouselContainer.classList.add('snap');
				setTimeout(() => {
					carouselContainer.classList.remove('snap');
				}, 500);
				const slideMargin = getElementStyles(
					sampleSlide,
					'margin-right'
				);
				const totalSlideWidth =
					parseInt(sampleSlide.offsetWidth, 10) +
					parseInt(slideMargin, 10);
				carouselContainer.scrollBy({
					left: totalSlideWidth,
					behavior: 'smooth'
				});
			});
		}
		const cardElements =
			carouselContainer.getElementsByTagName('a').length +
			carouselContainer.getElementsByClassName(
				'card-carousel__slide--subscribe-card'
			).length;
		if (cardElements <= 3) {
			arrowPrev.classList.add('hidden-desktop');
			arrowNext.classList.add('hidden-desktop');
		}
		function addRemoveArrows(event) {
			if (event.target.scrollLeft === 0) {
				arrowPrev.classList.add('hidden');
			} else {
				arrowPrev.classList.remove('hidden');
			}
			if (
				lastSlide.getBoundingClientRect().x +
					lastSlide.getBoundingClientRect().width <=
				carouselContainer.offsetWidth
			) {
				arrowNext.classList.add('hidden');
			} else {
				arrowNext.classList.remove('hidden');
			}
		}
		eventListenerDebouncer(carouselContainer, 'scroll', addRemoveArrows);

		// Newsletter stuff

		const subscribeModal = document.querySelector('.modal--subscribe');
		if (subscribeModal) {
			const subscribeGroups =
				subscribeModal.querySelectorAll('.pr-cdb-form-group');

			Array.from(subscribeGroups).forEach((group) => {
				const inputs = group.querySelectorAll('.pr-cdb-form-control');
				const label = group.querySelector('label');

				if (inputs.length) {
					Array.from(inputs).forEach((input) => {
						input.name = `${input.name}-subscribe`;
					});
				}
			});
		}

		// Drag and drop functionality
		let pos = {top: 0, left: 0, x: 0, y: 0};

		const mouseMoveHandler = (e) => {
			carouselContainer.classList.add('grabbing');
			const dx = e.clientX - pos.x;
			carouselContainer.scrollLeft = pos.left - dx;
		};

		const mouseUpHandler = () => {
			carouselContainer.removeEventListener(
				'mousemove',
				mouseMoveHandler
			);
			carouselContainer.classList.remove('grabbing');
		};
		const mouseDownHandler = (event) => {
			event.preventDefault();
			carouselContainer.addEventListener('mouseup', mouseUpHandler, {
				once: true
			});
			pos = {
				// The current scroll
				left: carouselContainer.scrollLeft,
				top: carouselContainer.scrollTop,
				// Get the current mouse position
				x: event.clientX,
				y: event.clientY
			};
			carouselContainer.addEventListener('mousemove', mouseMoveHandler);
		};
		carouselContainer.addEventListener('mousedown', mouseDownHandler);
	} catch (error) {
		console.error(error);
	}
}
