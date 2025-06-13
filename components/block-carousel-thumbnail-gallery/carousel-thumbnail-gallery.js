// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import {getSwiperAssetsV2} from '@pernod-ricard-global-cms/jsutils';
import('swiper/css/bundle');

export default function carouselthumbnailgalleryJs(options = {}) {
	try {
		const {block} = options;
		Promise.all([getSwiperAssetsV2()]).then((values) => {
			const {Swiper, Navigation, Lazy, Autoplay, Thumbs} = values[0][0];

			const dataAttributes = block.dataset;
			const slidesDesktop = Number(dataAttributes.desktopslides);
			const slidesTablet = Number(dataAttributes.tabletslides);
			const slidesMobile = Number(dataAttributes.mobileslides);

			const spaceBetweenSlidesDesktop = Number(
				dataAttributes.desktopspacebetweenslides
			);
			const spaceBetweenSlidesMobile = Number(
				dataAttributes.mobilespacebetweenslides
			);
			const spaceBetweenSlidesTablet = Number(
				dataAttributes.tabletspacebetweenslides
			);
			const autoplayCarousel = Number(dataAttributes.autoplay) === 1;

			const delay = Number(dataAttributes.transitiondelay);
			const speed = Number(dataAttributes.transitionspeed);

			const thumbnailSwiper = new Swiper(
				block.querySelector(
					'.carousel-thumbnail-gallery__swiper-carousel-container--thumbs'
				),
				{
					modules: [Navigation, Lazy, Thumbs],
					slidesPerView: slidesMobile,
					spaceBetween: spaceBetweenSlidesMobile,
					lazy: {
						loadPrevNext: true
					},
					freeMode: true,
					watchSlidesProgress: true,
					breakpoints: {
						744: {
							spaceBetween: spaceBetweenSlidesTablet,
							slidesPerView: slidesTablet
						},
						1024: {
							slidesPerView: slidesDesktop,
							spaceBetween: spaceBetweenSlidesDesktop
						}
					}
				}
			);

			const carouselthumbnailgallerySwiper = new Swiper(
				block.querySelector(
					'.carousel-thumbnail-gallery__swiper-carousel-container--main'
				),
				{
					modules: [Navigation, Lazy, Autoplay, Thumbs],
					spaceBetween: spaceBetweenSlidesMobile,
					loop: false,
					preloadImages: true,
					watchSlidesVisibility: true,
					thumbs: {
						swiper: thumbnailSwiper
					},
					lazy: {
						loadPrevNext: true
					},
					speed,
					autoplay: autoplayCarousel
						? {
								delay
							}
						: '',
					watchOverflow: true,
					navigation: {
						nextEl: block.querySelector('.swiper-button-next'),
						prevEl: block.querySelector('.swiper-button-prev')
					}
				}
			);
		});
	} catch (error) {
		console.error(error);
	}
}
