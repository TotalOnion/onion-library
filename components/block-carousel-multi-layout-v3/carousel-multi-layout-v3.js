import {getSwiperAssetsV2} from '@total_onion/onion-utils/onion-utils.mjs';

export default function carouselmultilayoutv3Js(options = {}) {
	try {
		const {block} = options;
		const totalSlides = block.querySelectorAll('.swiper-slide').length || 1;
		Promise.all([getSwiperAssetsV2()]).then((values) => {
			const {
				Swiper,
				Navigation,
				Pagination,
				Lazy,
				Autoplay,
				EffectFade,
				EffectCoverflow,
				EffectCreative,
				FreeMode,
				Mousewheel
			} = values[0][0];

			const dataAttributes = block.dataset;
			const slidesDesktop = Number(dataAttributes.desktopslides);
			const slidesTablet = Number(dataAttributes.tabletslides);
			const slidesMobile = Number(dataAttributes.mobileslides);
			const slidesOffsetDesktopBefore = Number(
				dataAttributes.desktopslidesoffsetbefore
			);
			const slidesOffsetTabletBefore = Number(
				dataAttributes.tabletslidesoffsetbefore
			);
			const slidesOffsetMobileBefore = Number(
				dataAttributes.mobileslidesoffsetbefore
			);
			const slidesOffsetDesktopAfter = Number(
				dataAttributes.desktopslidesoffsetafter
			);
			const slidesOffsetTabletAfter = Number(
				dataAttributes.tabletslidesoffsetafter
			);
			const slidesOffsetMobileAfter = Number(
				dataAttributes.mobileslidesoffsetafter
			);
			const loopSlides = Number(dataAttributes.loopslides) === 1;
			const loopSlidesPortrait =
				Number(dataAttributes.loopslidesportrait) === 1;
			const loopSlidesMobile =
				Number(dataAttributes.loopslidesmobile) === 1;

			console.log(totalSlides > 1 ? loopSlides : false);

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
			const centerActiveSlide =
				Number(dataAttributes.centeractiveslide) === 1;
			const centerActiveSlidePortrait =
				Number(dataAttributes.centeractiveslideportrait) === 1;
			const centerActiveSlideMobile =
				Number(dataAttributes.centeractiveslidemobile) === 1;
			const centerInsufficientSlidesDesktop =
				Number(dataAttributes.centerinsufficientslidesdesktop) === 1;
			const centerInsufficientSlidesPortrait =
				Number(dataAttributes.centerinsufficientslidesportrait) === 1;
			const centerInsufficientSlidesMobile =
				Number(dataAttributes.centerinsufficientslidesmobile) === 1;
			const carouselEnableFreeMode =
				Number(dataAttributes.enablefreemode) === 1;
			const carouselEnableMousewheel =
				Number(dataAttributes.enablemousewheel) === 1;
			const delay = Number(dataAttributes.transitiondelay);
			const speed = Number(dataAttributes.transitionspeed);
			const transitionStyle =
				dataAttributes.transitionstyle === 'default'
					? ''
					: dataAttributes.transitionstyle;
			const paginationStyle =
				dataAttributes.paginationstyle === 'customnumber'
					? 'bullets'
					: dataAttributes.paginationstyle;
			const fractionStyle = dataAttributes.fractionstyle;
			const fractionString = dataAttributes.fractionstring;
			const fractionSetting =
				fractionStyle === 'text'
					? function (currentClass, totalClass) {
							return (
								'<span class="' +
								currentClass +
								'"></span> ' +
								fractionString +
								' <span class="' +
								totalClass +
								'"></span>'
							);
					  }
					: false;
			const customNumber =
				dataAttributes.paginationstyle === 'customnumber'
					? function (index, className) {
							return (
								'<div class="' +
								className +
								'"><span class="pagination-number">' +
								'0' +
								(index + 1) +
								'</span></div>'
							);
					  }
					: false;
			const carouselmultilayoutv3Swiper = new Swiper(
				block.querySelector('.swiper'),
				{
					modules: [
						Navigation,
						Pagination,
						Lazy,
						Autoplay,
						EffectFade,
						EffectCoverflow,
						EffectCreative,
						FreeMode,
						Mousewheel
					],
					slidesPerView: slidesMobile,
					spaceBetween: spaceBetweenSlidesMobile,
					loop: totalSlides > 1 ? loopSlidesMobile : false,
					preloadImages: true,
					watchSlidesVisibility: true,
					effect: transitionStyle,
					creativeEffect: {
						prev: {
							shadow: true,
							translate: [0, 0, -400]
						},
						next: {
							translate: ['100%', 0, 0]
						}
					},
					coverflowEffect: {
						rotate: 20,
						depth: 50,
						scale: 0.9,
						modifier: 1,
						slideShadows: true
					},
					fadeEffect: {
						crossFade: true
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
					centeredSlides: centerActiveSlideMobile,
					centerInsufficientSlides: centerInsufficientSlidesMobile,
					freeMode: {
						enabled: carouselEnableFreeMode,
						sticky: carouselEnableFreeMode
					},
					mousewheel: carouselEnableMousewheel,
					slidesOffsetBefore: slidesOffsetMobileBefore,
					slidesOffsetAfter: slidesOffsetMobileAfter,
					breakpoints: {
						744: {
							spaceBetween: spaceBetweenSlidesTablet,
							slidesPerView: slidesTablet,
							centeredSlides: centerActiveSlidePortrait,
							centerInsufficientSlides:
								centerInsufficientSlidesPortrait,

							slidesOffsetBefore: slidesOffsetTabletBefore,
							slidesOffsetAfter: slidesOffsetTabletAfter,
							loop: totalSlides > 1 ? loopSlidesPortrait : false
						},
						1024: {
							slidesPerView: slidesDesktop,
							spaceBetween: spaceBetweenSlidesDesktop,
							centeredSlides: centerActiveSlide,
							centerInsufficientSlides:
								centerInsufficientSlidesDesktop,
							slidesOffsetBefore: slidesOffsetDesktopBefore,
							slidesOffsetAfter: slidesOffsetDesktopAfter,
							loop: totalSlides > 1 ? loopSlides : false
						}
					},
					navigation: {
						nextEl: block.querySelector('.swiper-button-next'),
						prevEl: block.querySelector('.swiper-button-prev')
					},
					pagination: {
						el: block.querySelector('.swiper-pagination'),
						type: paginationStyle,
						renderFraction: fractionSetting,
						clickable: true,
						renderBullet: customNumber
					}
				}
			);
		});
	} catch (error) {
		console.error(error);
	}
}
