module.exports = {
	templatejs: function () {
		return `import {loadCss, getSwiperAssetsV2} from '@total_onion/onion-utils/onion-utils';
import('swiper/css/bundle');

export default function carouselmultilayoutJs(options = {}) {
	try {
		const {block} = options;
		Promise.all([
			getSwiperAssetsV2(),
			loadCss(block.dataset.assetkey, options)
		]).then((values) => {
			const {
				Swiper,
				Navigation,
				Pagination,
				Lazy,
				Autoplay,
				EffectFade,
				EffectCoverflow,
				EffectCreative
			} = values[0][0];

			const dataAttributes = block.dataset;
			const slidesDesktop = dataAttributes.desktopslides;
			const autoplayCarousel = Number(dataAttributes.autoplay) === 1;
			const centerActiveSlide =
				Number(dataAttributes.centeractiveslide) === 1;
			const delay = dataAttributes.transitiondelay * 1000;
			const speed = Number(dataAttributes.transitionspeed);
			const style =
				dataAttributes.transitionstyle === 'default'
					? ''
					: dataAttributes.transitionstyle;
			const carouselmultilayoutSwiper = new Swiper(
				block.querySelector('.swiper'),
				{
					modules: [
						Navigation,
						Pagination,
						Lazy,
						Autoplay,
						EffectFade,
						EffectCoverflow,
						EffectCreative
					],
					slidesPerView: 1,
					loop: false,
					preloadImages: true,
					watchSlidesVisibility: true,
					effect: style,
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
					breakpoints: {
						1024: {
							slidesPerView: slidesDesktop,
							spaceBetween: 50,
							centeredSlides: centerActiveSlide
						}
					},
					navigation: {
						nextEl: block.querySelector('.swiper-button-next'),
						prevEl: block.querySelector('.swiper-button-prev')
					},
					pagination: {
						el: block.querySelector('.swiper-pagination'),
						type: 'bullets',
						clickable: true
					}
				}
			);
		});
	} catch (error) {
		console.error(error);
	}
}
`;
	},
	templatetwig: function (newBlockName) {
		return `
<div class="swiper">
	<div class="swiper-wrapper">
		<div class="swiper-slide ${newBlockName}__slide">
			{% set desktopImage = Image(fields.desktop_image) %}
			{% set mobileImage = Image(fields.mobile_image) %}
			{% set desktopSizes = '(min-width: 1440px) 100vw, (min-width: 1024px) 1024px, (min-width: 768px) 768px' %}
			{% set mobileSizes = '(min-width: 768px) 768px, (min-width: 500px) 500px, 250px' %}
			
			{{ include('components/responsive-image.twig', {fields : fields, block : block, blockClassName : blockClassName}, with_context = false) }}
		</div>
	</div>
	<div class="swiper-pagination"></div>
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
</div>
`;
	}
};
