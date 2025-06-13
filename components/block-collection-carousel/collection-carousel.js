import {getSwiperAssetsV2} from '@pernod-ricard-global-cms/jsutils';
// import shop from 'Assets/js/modules/shop';
// import shopShopify from 'Assets/js/modules/shop-shopify';

import('swiper/css/bundle');

export default function collectioncarouselJs(options = {}) {
	try {
		const {block} = options;
		Promise.all([getSwiperAssetsV2()]).then((values) => {
			// const buildShopButtons = () => {
			// 	// some settings for shopify.
			// 	let shops = [];
			// 	shop.forceLoadShops({ shops: shops });

			// 	// Wait for ShopifyBuy to be defined before initializing it
			// 	const waitForShopifyBuy = setInterval(() => {
			// 		if (typeof ShopifyBuy !== 'undefined') {
			// 			clearInterval(waitForShopifyBuy);
			// 			shopShopify.ShopifyBuyInit();
			// 		}
			// 	}, 100);

			// 	const collectionItems = block.querySelectorAll('.collection-carousel__right-slide');
			// 	collectionItems.forEach((element) => {
			// 		if (element.dataset.shop !== 'none' && element.dataset.shop != '') {
			// 			shops.push(element.dataset.shop);
			// 		}
			// 	});

			// 	collectionItems.forEach((element) => {
			// 		// moving prices to the right place
			// 		const wrappers = element.querySelectorAll('.shopify-wrapper');
			// 		let mainPrice = 0;
			// 		wrappers.forEach((wrapper, index) => {
			// 			console.log(
			// 				'test',
			// 				wrapper,
			// 				wrapper.querySelector('.shopify-buy__product__actual-price')
			// 			);
			// 			if (
			// 				wrapper.querySelector('.shopify-buy__product__actual-price')
			// 			) {
			// 				if (index == 0) {
			// 					mainPrice = wrapper.querySelector(
			// 						'.shopify-buy__product__price .shopify-buy__product__actual-price'
			// 					).innerText;
			// 					const span = document.createElement('span');
			// 					span.innerText = ' - ' + mainPrice;
			// 					wrapper
			// 						.querySelector('.shopify-cta .text-modifier')
			// 						.appendChild(span);
			// 				} else if (index == 1) {
			// 					let engravedTotalPrice = wrapper
			// 						.querySelector('.shopify-buy__product__price .shopify-buy__product__actual-price')
			// 						.innerText.substring(1);
			// 					let engravedPrice =
			// 						engravedTotalPrice - mainPrice.substring(1);
			// 					const span = document.createElement('span');
			// 					span.innerText = '+' + mainPrice[0] + engravedPrice;
			// 					wrapper
			// 						.querySelector('.shopify-cta .text-modifier')
			// 						.appendChild(span);
			// 				}
			// 			}
			// 		});
			// 	});
			// };

			const {Swiper, Navigation, FreeMode, EffectFade, Pagination} =
				values[0][0];

			let leftSwiper = new Swiper(
				block.querySelector('.collection-carousel__left-container'),
				{
					modules: [EffectFade],
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					},
					allowTouchMove: false
				}
			);

			let rightSwiper = new Swiper(
				block.querySelector('.collection-carousel__right-container'),
				{
					modules: [Navigation, Pagination, FreeMode],
					slidesPerView: 1.2,
					centeredSlides: true,
					spaceBetween: 12,
					loop: true,
					freeMode: {
						enabled: true,
						sticky: false
					},
					navigation: {
						nextEl: block.querySelector('.swiper-button-next')
					},
					// pagination: {
					// 	el: block.querySelector('.swiper-pagination'),
					// 	type: 'bullets',
					// 	clickable: true
					// },
					breakpoints: {
						768: {
							centeredSlides: false,
							slidesPerView: 3,
							spaceBetween: 13
						},
						1024: {
							centeredSlides: false,
							slidesPerView: 3,
							spaceBetween: 56
						}
					},
					on: {
						slideChange: function () {
							let activeIndex = this.realIndex;
							leftSwiper.slideTo(activeIndex);
						}
						// afterInit: buildShopButtons
					}
				}
			);

			fadeIn(block);
		});
	} catch (error) {
		console.error(error);
	}
}
