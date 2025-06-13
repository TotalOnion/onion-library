import shop from 'Assets/js/modules/library-modules/shopify/shop';

export default function contentContainerJs(block) {
	if (!block) {
		return;
	}
	const blockClassName = block.dataset.assetkey;
	const formContainerElement = block.querySelector('.form-container');
	const countdownElement = block.querySelector('.countdowndate');
	const socialMediaElement = block.querySelector('.social-media-share-popup');
	const accordionV2Element = block.querySelector(
		`.${blockClassName}__accordion-v2`
	);
	const marketSelector = block.querySelector('.market-selector');
	const shopifySelector = block.querySelector('.shopify__cart');
	const contentTooltip = block.querySelector('.content-tooltip-wrapper');
	const spotifyEmbed = block.querySelector('.spotify-embed');
	const truncatedText = block.querySelector('.truncated-text');
	// const accordionV3Element = block.querySelector(
	// 	'.standard-content-v2__accordion-v3'
	// );

	if (formContainerElement) {
		import(
			'Assets/js/modules/library-modules/form-selection/form-selection.js'
		).then((module) => {
			module.default(block);
		});
	}

	if (countdownElement) {
		import('Assets/js/modules/library-modules/countdown/countdown.js').then(
			(module) => {
				module.default(block);
			}
		);
	}

	if (socialMediaElement) {
		import(
			'Assets/js/modules/library-modules/social-media-share/social-media-share.js'
		).then((module) => {
			module.default(block);
		});
	}

	if (accordionV2Element) {
		import(
			'Assets/js/modules/library-modules/accordion-v2/accordion-v2.js'
		).then((module) => {
			module.default(block);
		});
	}

	if (marketSelector) {
		import(
			'Assets/js/modules/library-modules/market-selector/market-selector.js'
		).then((module) => {
			module.default(block);
		});
	}
	if (shopifySelector) {
		shop.loadShops();
	}
	if (contentTooltip) {
		import(
			'Assets/js/modules/library-modules/content-tooltip/content-tooltip.js'
		).then((module) => {
			module.default(block);
		});
	}
	if (spotifyEmbed) {
		import(
			'Assets/js/modules/library-modules/spotify-embed/spotify-embed.js'
		).then((module) => {
			module.default(block);
		});
	}
	if (truncatedText) {
		import(
			'Assets/js/modules/library-modules/truncated-text/truncated-text.js'
		).then((module) => {
			module.default(block);
		});
	}

	// if (accordionV3Element) {
	// 	import('Assets/js/modules/library-modules/accordion-v3/accordion-v3.js').then((module) => {
	// 		module.default(block);
	// 	})
	// }
}
