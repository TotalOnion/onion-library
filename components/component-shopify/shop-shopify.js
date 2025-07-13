/* eslint-disable */
/**
 * Shopify Integration Code
 *
 * @see https://shopify.github.io/js-buy-sdk/
 * @see https://shopify.github.io/buy-button-js/
 * @see https://github.com/Shopify/buy-button-js/tree/master/src
 */
const scriptURL =
	'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

const moneyFormat = '£{{amount}}';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadShopify = (options) => {
	console.log('Requested to load Shopify...');
	if (window.ShopifyBuy) {
		console.log('Shopify already loaded, skipping.');
		return false; // Shopify already initialized
	}
	import(
		/* webpackChunkName: "shopify" */ 'Assets/scss/modules/library-modules/shopify/shopify.scss'
	);
	if (window.ShopifyBuy && window.ShopifyBuy.UI) {
		return ShopifyBuyInit(options);
	}
	return loadScript(options);
};

const loadScript = (options) => {
	const script = document.createElement('script');
	script.async = true;
	script.src = scriptURL;
	(
		document.getElementsByTagName('head')[0] ||
		document.getElementsByTagName('body')[0]
	).appendChild(script);
	script.onload = () => ShopifyBuyInit(options);
};

const addToCart = (product) => {
	if (typeof dataLayer !== 'undefined' && product.typeKey === 'product') {
		window.dataLayer.push({
			event: 'sendEvent',
			eventCategory: 'Product Sales',
			eventAction: 'Buy Now',
			eventLabel: product.model.title
		});
	}
	sessionStorage.setItem('shopify-items', true);
};

const cartOptions = {
	// @link https://github.com/Shopify/buy-button-js/blob/master/src/defaults/components.js#L195
	iframe: false,
	width: 375,
	text: {
		// @see footer.twig for these
		trans: document.getElementById('cart-strings').dataset
	},
	contents: {
		note: true
	},
	templates: {
		// Override the original Shopify templates for the Cart
		// @link https://github.com/Shopify/buy-button-js/blob/master/src/templates/cart.js
		title: `<div class="{{data.classes.cart.header}}" data-element="cart.header">
			<img class="shopify-buy__shopping-bag-icon" src="{{data.text.trans.shoppingBagVector}}">
            {{^data.isEmpty}}<h2 class="{{data.classes.cart.title}}" data-element="cart.title">{{data.text.trans.cartTitle}}</h2>{{/data.isEmpty}}
						{{#data.isEmpty}}<h2 class="{{data.classes.cart.title}}" data-element="cart.title">{{data.text.trans.emptyTitle}}</h2>{{/data.isEmpty}}
						{{#data.isEmpty}}<p class="shopify-buy__cart__subtitle">{{data.text.trans.body}}</p>{{/data.isEmpty}}
            <button class="{{data.classes.cart.close}}" data-element="cart.close">
							<img aria-hidden="true" alt="close" role="presentation" src="{{data.text.trans.closeVector}}" width="24" height="26">
              <span class="visuallyhidden">{{data.text.closeAccessibilityLabel}}</span>
            </button>
						{{#data.isEmpty}}<div class="shopify-buy__cart__eligibility"><div class="shopify-buy__cart__eligibility__progress"></div></div>{{/data.isEmpty}}
          </div>`,
		lineItems: `{{^data.isEmpty}}<div class="{{data.classes.cart.cartScroll}}{{#data.contents.note}} {{data.classes.cart.cartScrollWithCartNote}}{{/data.contents.note}}{{#data.discounts}} {{data.classes.cart.cartScrollWithDiscounts}}{{/data.discounts}}" data-element="cart.cartScroll">{{/data.isEmpty}}
                {{#data.isEmpty}}
									<div class="{{data.classes.cart.empty}} {{data.classes.cart.emptyCart}} cart-empty" data-element="cart.empty">
										<div class="cart-empty__section">
											<div class="cart-empty__section__title">{{data.text.trans.section1Title}}</div>
											<div class="cart-empty__section__figure"><img class="cart-empty__section__image" src="{{data.text.trans.section1ImageUrl}}" height="{{data.text.trans.section1ImageHeight}}" width="{{data.text.trans.section1ImageWidth}}" alt="{{data.text.trans.section1ImageAlt}}" /></div>
											<div class="cart-empty__section__body">{{data.text.trans.section1Body}}</div>
											<div class="cart-empty__section__cta"><a href="{{data.text.trans.section1CtaUrl}}" class="cart-empty__section__button" target="{{data.text.trans.section1CtaTarget}}"><span class="text-modifier">{{data.text.trans.section1CtaTitle}}</span></a></div>
										</div>
										<div class="cart-empty__section">
											<div class="cart-empty__section__title">{{data.text.trans.section2Title}}</div>
											<div class="cart-empty__section__figure"><img class="cart-empty__section__image" src="{{data.text.trans.section2ImageUrl}}" height="{{data.text.trans.section2ImageHeight}}" width="{{data.text.trans.section2ImageWidth}}" alt="{{data.text.trans.section2ImageAlt}}" /></div>
											<div class="cart-empty__section__body">{{data.text.trans.section2Body}}</div>
											<div class="cart-empty__section__cta"><a href="{{data.text.trans.section2CtaUrl}}" class="cart-empty__section__button" target="{{data.text.trans.section2CtaTarget}}"><span class="text-modifier">{{data.text.trans.section2CtaTitle}}</span></a></div>
										</div>
									</div>
								{{/data.isEmpty}}
                {{^data.isEmpty}}
									<ul role="list" class="{{data.classes.cart.lineItems}}" data-element="cart.lineItems">{{{data.lineItemsHtml}}}</ul>
								{{/data.isEmpty}}
              </div>`,
		footer: `{{^data.isEmpty}}
            <div class="{{data.classes.cart.footer}}" data-element="cart.footer">
              {{#data.discounts}}
                <div class="{{data.classes.cart.discount}}" data-element="cart.discount">
                  <span class="{{data.classes.cart.discountText}}" data-element="cart.discountText">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="{{data.classes.cart.discountIcon}}" data-element="cart.discountIcon" aria-hidden="true">
                      <path d="M10.001 2.99856C9.80327 2.99856 9.61002 2.93994 9.44565 2.83011C9.28128 2.72029 9.15317 2.56418 9.07752 2.38155C9.00187 2.19891 8.98207 1.99794 9.02064 1.80405C9.05921 1.61016 9.1544 1.43207 9.29419 1.29228C9.43397 1.1525 9.61207 1.0573 9.80596 1.01874C9.99984 0.980171 10.2008 0.999965 10.3834 1.07562C10.5661 1.15127 10.7222 1.27938 10.832 1.44375C10.9418 1.60812 11.0005 1.80136 11.0005 1.99905C11.0005 2.26414 10.8952 2.51837 10.7077 2.70581C10.5203 2.89326 10.266 2.99856 10.001 2.99856ZM10.001 1.67062e-05H7.0024C6.87086 -0.000743818 6.74046 0.024469 6.61868 0.0742095C6.49691 0.12395 6.38614 0.19724 6.29275 0.289876L0.295655 6.28697C0.201972 6.37989 0.127614 6.49044 0.0768697 6.61224C0.0261256 6.73404 0 6.86468 0 6.99663C0 7.12857 0.0261256 7.25922 0.0768697 7.38102C0.127614 7.50282 0.201972 7.61336 0.295655 7.70628L4.29372 11.7043C4.38664 11.798 4.49718 11.8724 4.61898 11.9231C4.74078 11.9739 4.87143 12 5.00337 12C5.13532 12 5.26596 11.9739 5.38776 11.9231C5.50956 11.8724 5.62011 11.798 5.71303 11.7043C5.90294 11.5044 11.5102 5.89716 11.7101 5.70725C11.8028 5.61386 11.876 5.50309 11.9258 5.38132C11.9755 5.25954 12.0007 5.12914 12 4.99759V1.99905C12 1.46887 11.7894 0.96041 11.4145 0.585519C11.0396 0.210628 10.5311 1.67062e-05 10.001 1.67062e-05Z" />
                    </svg>
                    <span class="visuallyhidden">Discount:</span>
                    {{text}}
                  </span>
                  <span class="{{data.classes.cart.discountAmount}}" data-element="cart.discountAmount">{{amount}}</span>
                </div>
              {{/data.discounts}}
              {{#data.contents.note}}
                <div class="{{data.classes.cart.note}}" data-element="cart.note">
                  <label for="{{data.cartNoteId}}" class="{{data.classes.cart.noteDescription}}" data-element="cart.noteDescription">{{data.text.trans.engravingHeading}}</label>
                  <textarea id="{{data.cartNoteId}}" class="{{data.classes.cart.noteTextArea}}" data-element="cart.noteTextArea" rows="3" placeholder="{{data.text.trans.engravingInstructions}}"/>{{data.cartNote}}</textarea>
                </div>
              {{/data.contents.note}}
			  <div class="shopify-buy__cart__subtotal">
			  <p class="{{data.classes.cart.subtotalText}}" data-element="cart.total">{{data.text.trans.total}}</p>
			  <p class="{{data.classes.cart.subtotal}}" data-element="cart.subtotal">{{data.formattedTotal}}</p>
			  </div>
			  <p class="{{data.classes.cart.notice}}" data-element="cart.notice">{{data.text.trans.notice}}</p>
              <button class="{{data.classes.cart.button}} cmpl-cta-style-4" type="button" data-element="cart.button"><span class="text-modifier">{{data.text.trans.checkout}}</span></button>
            </div>
           {{/data.isEmpty}}`
	},
	events: {
		openCheckout(cart) {
			if (
				cart?.model?.attrs?.webUrl?.value &&
				typeof ga !== 'undefined' && // extra check, in case browsers are blocking tracking
				typeof ga.getAll === 'function' &&
				typeof ga.getAll()[0] !== 'undefined'
			) {
				// Adds google analytics tracking code to cart URL for tracking of session
				const clientId = ga.getAll()[0].get('linkerParam');
				if (clientId.length > 0) {
					cart.model.attrs.webUrl.value += `&${clientId}`;
				}
			}
		},
		beforeInit() {
			this.moneyFormat = moneyFormat; // @see TGL-972
		},
		afterRender(component) {
			for (let i = 0; i < component.lineItemCache.length; i++) {
				if (6 < component.lineItemCache[i].quantity) {
					component.updateItem(component.lineItemCache[i].id, 6);
				}
			}
			let hasEngraved = false;
			document
				.querySelectorAll('.shopify-buy__cart-item__title')
				.forEach((item) => {
					if (item.innerHTML.toLowerCase().includes('engraved')) {
						hasEngraved = true;
					}
				});
			const notes = document.querySelector('.shopify-buy__cart__note');
			const scroll = document.querySelector('.shopify-buy__cart-scroll');
			if (notes) {
				if (!hasEngraved) {
					notes.style.display = 'none';
					scroll.classList.remove(
						'shopify-buy__cart-scroll--cart-note'
					);
				}
			}
			if (window.innerWidth < 768) {
				const quantities = document.querySelectorAll(
					'.shopify-buy__cart-item__quantity-input'
				);
				if (quantities.length) {
					quantities.forEach((item) => {
						item.setAttribute('readonly', 'readonly');
					});
				}
			}
		}
	}
};
const toggleOptions = {
	// @link https://shopify.github.io/buy-button-js/customization/#toggle-component
	// @link https://github.com/Shopify/buy-button-js/blob/master/src/defaults/components.js#L288
	iframe: false,
	classes: {
		toggle: 'hide'
	},
	events: {
		afterRender(component) {
			const items = parseInt(
				document.querySelector('.shopify-buy__cart-toggle__count')
					.innerHTML,
				10
			);
			const cartCount = document.querySelector('.shopify__cart-count');
			if (cartCount) {
				cartCount.innerHTML = '';
			}
			if (items) {
				if (cartCount) {
					cartCount.innerHTML = `&nbsp;${items}`;
				}
				sessionStorage.setItem('shopify-items', true);
			}
		}
	}
};

const ShopifyBuyInit = (options) => {
	const client = ShopifyBuy.buildClient({
		domain: 'aberlour.myshopify.com',
		storefrontAccessToken: '1a39f42c4a34e1c1d74f01a2f17f7804'
	});

	return ShopifyBuy.UI.onReady(client).then((ui) => {
		const shopifyButtonArray = document.querySelectorAll(
			'.shopify-add-to-cart'
		);
		for (let index = 0; index < shopifyButtonArray.length; index++) {
			const shopifyButton = shopifyButtonArray[index];
			if (shopifyButton.dataset.shopifyLoading) {
				console.log(
					`Skipping already initialized Shopify button ${index}`
				);
				continue; // Skipping already initialized button
			}
			shopifyButton.dataset.shopifyLoading = true;
			ui.createComponent('product', {
				id: shopifyButton.dataset.pim,
				node: shopifyButton,
				moneyFormat,
				options: {
					product: {
						// @link https://shopify.github.io/buy-button-js/customization/#product
						// @link https://github.com/Shopify/buy-button-js/blob/master/src/defaults/components.js#L9
						iframe: false,
						buttonDestination: 'cart',
						contents: {
							button: true,
							buttonWithQuantity: false,
							img: false,
							title: false,
							price: false,
							options: false
						},
						templates: {
							button: `<div class="{{data.classes.product.buttonWrapper}}" data-element="product.buttonWrapper">
										<button {{#data.buttonDisabled}}disabled{{/data.buttonDisabled}} class="{{data.classes.product.button}} price-button {{^data.selectedVariant.available}}shopify-cta--not-available{{/data.selectedVariant.available}} {{data.text.buttonStyle}}" data-element="product.button">
											<div class="shopify-cta__title price-button__title">
												<span class="text-modifier">{{data.text.button}} {{data.formattedPrice}}</span>
											</div>
										</button>
									</div>`
						},
						classes: {
							button:
								options && options.buttonClasses
									? options.buttonClasses.join(' ')
									: `shopify-cta${
											shopifyButton.dataset.engraved
												? ' shopify-cta--engraved'
												: ''
									  }`
						},
						text: {
							button: shopifyButton.dataset.label,
							regularPriceAccessibilityLabel:
								shopifyButton.dataset.price,
							buttonStyle:
								shopifyButton.dataset.shopifya2cbtnstyle
						},
						events: {
							addVariantToCart(product) {
								wait(100).then(() => ui.openCart());
								addToCart(product);
							},
							afterRender(component) {
								document.dispatchEvent(
									new Event('buynow-updated')
								);
							}
						}
					},
					productSet: {
						styles: {
							products: {
								'@media (min-width: 601px)': {
									'margin-left': '-20px'
								}
							}
						}
					},
					modalProduct: {
						iframe: false,
						contents: {
							img: false,
							imgWithCarousel: true,
							button: true,
							buttonWithQuantity: false
						},
						text: {
							button: 'Add to cart'
						}
					},
					cart: cartOptions,
					toggle: toggleOptions
				}
			});
			console.log('Shopify initialized on element');
		}

		if (!shopifyButtonArray.length) {
			// no shopify items on the page, let's just initialize the cart
			if (document.body.dataset.shopifyLoading) {
				console.log('Skipping already initialized Shopify cart+toggle');
				return; // already initialized
			}
			document.body.dataset.shopifyLoading = true;
			ui.createComponent('cart', {
				options: {
					cart: cartOptions,
					toggle: toggleOptions
				}
			});
			console.log('Shopify initialized cart+toggle only');
		}

		const cartIcon = document.querySelector('.shopify__cart');

		cartIcon.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			ui.openCart();
		});

		cartIcon.addEventListener('touchend', (e) => {
			e.preventDefault();
			e.stopPropagation();
			ui.openCart();
		});

		if (options && options.openCart) {
			ui.openCart();
		}
	});
};

document.addEventListener(
	'shop-refresh',
	() => {
		if (typeof ShopifyBuy !== 'undefined') {
			ShopifyBuyInit();
		}
	},
	false
);

let isLoading = false;

const load = (options) => {
	if (isLoading) {
		return false;
	}
	console.log('%c Loading Shopify...', 'background: #222; color: #bada55');
	isLoading = true;
	if (options && options.skipWait) {
		return loadShopify(options);
	}
	const shopifyCallback = (entries, observer) => {
		entries.forEach((entry) => {
			// Each entry describes an intersection change for one observed
			if (entry.isIntersecting) {
				shopifyObserver.unobserve(shopify);
				return loadShopify(options);
			}
		});
	};
	const shopifyObserver = new IntersectionObserver(shopifyCallback);
	const shopify = document.querySelector('.shopify-add-to-cart');
	if (shopify) {
		shopifyObserver.observe(shopify);
	}
	// Initializing Shopify with a delay, in case the user doesn't scroll
	// This is useful to show the floating cart toggle and to ensure the Shopify Buy Now
	// is not delayed as the user scrolls down.
	return wait(3500).then(() => loadShopify(options));
};

const api = {
	load
};

export default api;
