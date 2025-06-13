/**
 * Initialize Shopify
 *
 * @param {Object} options Custom options such as CTA class
 */
const shopShopify = (options) =>
	import('Assets/js/modules/library-modules/shopify/shop-shopify').then(
		(api) => api.default.load(options)
	);
/**
 * Determine which shop-related engines are required
 * on the page and initialize them.
 *
 * @param {Object} options Custom options such as CTA class
 */
const loadShops = (options) => {
	const shops = document.getElementsByClassName('has-shop');

	if (!shops) {
		// console.log('No shopping elements found, skipping.');
		return false; // no shops on this page
	}

	const promises = [];

	[].forEach.call(shops, (element) => {
		if (element.classList.contains('shop-shopify')) {
			promises.push(shopShopify(options));
		}
	});

	const prom = Promise.all(promises).then((values) => {
		return values;
	});
	return prom;
};

const forceLoadShops = (options) => {
	const promises = [];

	if (options && options.shops) {
		if (options.shops.includes('__shopify')) {
			promises.push(shopShopify(options));
		}
	}
	const prom = Promise.all(promises).then((values) => {
		return values;
	});
	return prom;
};

/**
 * Check if we have any previously added items
 * in the Shopify card and immediately initialize
 * Shopify if we do, and add handlers to immediately
 * load Shopify and open the cart if the user clicks
 * the Cart icon.
 *
 * @return {Promise} The Shopify initialization promise
 */
const checkCart = () => {
	if (sessionStorage.getItem('shopify-items')) {
		if (document.querySelector('.shop-shopify')) {
			// product-hero Shopify options (get them from product-here.js)
			return shopShopify({
				// buttonClasses: [ 'product-hero__cta-button' ], // optional classes
			});
		}
		// generically load Shopify
		return shopShopify({skipWait: true});
	}
	// Hook on the cart icon
	const cartButton = document.querySelector('.shopify__cart');

	if (!cartButton) {
		console.log('No Cart Button found.');
		return;
	}

	const loadOpenCart = (event) => {
		event.preventDefault();
		event.stopPropagation();
		cartButton.removeEventListener('click', loadOpenCart);
		cartButton.removeEventListener('touchend', loadOpenCart);
		return shopShopify({skipWait: true, openCart: true});
	};
	// console.log('Hooking up on the Cart link');
	cartButton.addEventListener('click', loadOpenCart);
	cartButton.addEventListener('touchend', loadOpenCart);

	const prealoadShopify = () => {
		cartButton.removeEventListener('mouseover', prealoadShopify);
		return shopShopify({skipWait: true});
	};
	cartButton.addEventListener('mouseover', prealoadShopify);
};

const api = {
	loadShops,
	forceLoadShops,
	checkCart
};

export default api;
