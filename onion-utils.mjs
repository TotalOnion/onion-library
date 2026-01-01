/* eslint-disable consistent-return */
/* eslint-disable no-console */
/**
 * Function for check whether the code is running within the Wordpress admin page. Checks for wp-admin class.
 * @returns {Boolean}
 */
export function isWpAdmin() {
	return document.body.classList.contains("wp-admin") ? true : false;
}

export function ttfb() {
	new PerformanceObserver((entryList) => {
		const [pageNav] = entryList.getEntriesByType("navigation");
		const time = pageNav.responseStart;
		console.log(`TTFB: ${time} new`);
		pushTTFBData(time);
	}).observe({ type: "navigation", buffered: true });
}

function pushTTFBData(time) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ ttfb: time });
}

/**
 * This function accepts an html element and returns the position of that element on the page.
 *
 * @param {htmlElement} element The element whose position you want to get.
 * @returns {object} An object with the x and y pixel values.
 */
export function getPosition(element) {
	const scrollElementTag = document.scrollingElement.tagName;
	let xPosition = 0;
	let yPosition = 0;
	while (element) {
		xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
		yPosition += element.offsetTop - element.scrollTop + element.clientTop;
		element = element.offsetParent;
	}
	// Quirks mode safety - in case of missing DOCTYPE
	if (scrollElementTag === "BODY") {
		yPosition += document.querySelector("body").scrollTop;
	}
	return { x: xPosition, y: yPosition };
}

/**
 * Adds or removes a 'valid' class to an input and button element depending on whether the value of the input is valid.
 * @param {htmlElement} input The input element to check.
 * @param {htmlElement} button A corresponding button to disable if invalid.
 */
export function toggleClassByValidity(input, button) {
	try {
		input.addEventListener("input", () => {
			if (input.validity.valid && input.value) {
				if (!button.classList.contains("valid")) {
					button.classList.add("valid");
				}
				if (!input.classList.contains("valid")) {
					input.classList.add("valid");
				}
			} else {
				button.classList.remove("valid");
				input.classList.remove("valid");
			}
		});
	} catch (error) {
		console.error("jsutils.js ~ toggleClassByValidity ~ error", error);
	}
}

/**
 * Checks to see if the css for the block has already been included in the 'criticalconfig' window object.
 * Will return true if it is.
 * @param {string} assetKey The assetkey string of the block.
 * @returns {boolean}
 */
export function inCriticalCssConfig(assetKey) {
	if (!globalThis.criticalConfig) {
		return false;
	}
	if (
		globalThis.criticalConfig &&
		globalThis.criticalConfig.indexOf(assetKey) === -1
	) {
		return false;
	}
	return true;
}

/**
 * Dynamically loads the css for the block if it has not already been included in critical css or the css property is set to false.
 * @param {string} assetKey The assetkey string of the block.
 * @param {object} options The options object which will at the very least contain the css property set to true.
 * @returns {promise}
 */
export function loadCss(assetKey, options = { css: true }) {
	const promise = new Promise((resolve) => {
		if (options.css === true && !inCriticalCssConfig(assetKey)) {
			import(
				/* webpackChunkName: "[request]" */ `Assets/scss/blocks/${assetKey}.scss`
			).then(() => resolve(true));
		} else {
			return resolve(true);
		}
	});
	return promise;
}

/**
 * Checks for browser, device and OS and then adds the relevant classes to the html tag.
 */
export function checkDevice() {
	try {
		const deviceAgent = navigator.userAgent.toLowerCase();
		const htmlElement = document.querySelector("html");
		if (
			"ontouchstart" in globalThis &&
			window.screen.width * window.devicePixelRatio >= 2048 &&
			window.screen.width < window.screen.height
		) {
			htmlElement.classList.add("highResTabletPortrait");
		}
		if ("ontouchstart" in globalThis) {
			htmlElement.classList.add("touch");
		}
		if (navigator.connection) {
			htmlElement.classList.add(navigator.connection.effectiveType);
		}
		if (navigator.platform) {
			let platform = navigator.platform.toLowerCase();
			let platformArray = [platform];
			if (platform.search("-")) {
				platformArray = platform.split("-");
			}
			if (platform.search(" ")) {
				platformArray = platform.split(" ");
			}
			htmlElement.classList.add(...platformArray);
		}
		if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
			htmlElement.classList.add("ios");
			htmlElement.classList.add("mobile");
		}
		if (deviceAgent.match(/(windows)/)) {
			htmlElement.classList.add("windows");
		}
		if (deviceAgent.match(/(macintosh)/)) {
			htmlElement.classList.add("mac");
		}
		if (deviceAgent.match(/(android)/)) {
			htmlElement.classList.add("android");
		}
		if (navigator.userAgent.search("MSIE") >= 0) {
			htmlElement.classList.add("ie");
		} else if (navigator.userAgent.search("Edge") >= 0) {
			htmlElement.classList.add("edge-legacy");
		} else if (navigator.userAgent.search("Chrome") >= 0) {
			htmlElement.classList.add("chrome");
		} else if (navigator.userAgent.search("Firefox") >= 0) {
			htmlElement.classList.add("firefox");
		} else if (
			navigator.userAgent.search("Safari") >= 0 &&
			navigator.userAgent.search("Chrome") < 0
		) {
			htmlElement.classList.add("safari");
		} else if (navigator.userAgent.search("Opera") >= 0) {
			htmlElement.classList.add("opera");
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * Check and possibly wait for an image to have downloaded before running an optional function.
 * Returns a resolved promise when the load event has fired.
 * @param {htmlElement} img The image element you want to wait for.
 * @param {function} delayedFunction The optional function you want to run when/if the image has downloaded.
 * @returns {promise}
 */
export async function waitForLoad(img, delayedFunction) {
	const loaded = new Promise((resolve) => {
		if (img.complete) {
			if (typeof delayedFunction === "function") {
				delayedFunction();
			}
			return resolve(true);
		}
		img.addEventListener(
			"load",
			() => {
				if (typeof delayedFunction === "function") {
					delayedFunction();
				}
				return resolve(true);
			},
			{ once: true }
		);
	}).catch((error) => console.log(error, "could not load the image", img));
	return loaded;
}

/**
 * Check whether the current environment supports the webp image format.
 * Returns true if it does.
 * @returns {boolean}
 */
export async function supportsWebp() {
	// eslint-disable-next-line no-restricted-globals
	if (!self.createImageBitmap) return false;
	const webpData =
		"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
	const blob = await fetch(webpData).then((r) => r.blob());
	return createImageBitmap(blob).then(
		() => true,
		() => false
	);
}
// ( async () => {
// 	if ( await supportsWebp() ) {
// 		return true;
// 	}
// 	return false;
// } )();

/**
 * DEPRECATED!! footerIntersection will be removed in a future version.
 */
export function footerIntersection(entries, element) {
	entries.forEach((entry) => {
		if (element) {
			if (entry.isIntersecting) {
				const { height } = entry.boundingClientRect;
				element.style.bottom = `${height}px`;
			} else {
				element.style.bottom = "0px";
			}
		}
	});
}

/**
 * Dynamically retrieves the swiper css and js and returns a resolved promise when they have both been successfully fetched.
 * @returns {promise}
 */
export function getSwiperAssetsV2(options = { css: "bundle" }) {
	const getSwiperJs = () => import(/* webpackChunkName: 'swiper' */ "swiper");

	const promisedJs = Promise.all([getSwiperJs()]).then((values) => {
		return values;
	});
	return promisedJs;
}

/**
 * Dynamically retrieves the jQuery and returns a resolved promise when it has been successfully fetched.
 * @returns {promise}
 */
export function getJquery() {
	if (!window.jQuery) {
		const importCode = () =>
			import(/* webpackChunkName: 'jquery' */ "jquery/dist/jquery.min.js");
		return importCode();
	}
	return Promise.resolve();
}

/**
 * Dynamically retrieves GSAP and the scrolltrigger plugin and returns a resolved promise when they have both been successfully fetched.
 * @returns {promise}
 */
export function getGsap() {
	const gsapCore = () =>
		import("gsap/dist/gsap.min.js").then((gsapObj) => {
			const { gsap } = gsapObj;
			return gsap;
		});

	const gsapPlugin = () =>
		import("gsap/dist/ScrollTrigger.min.js").then((scrollObj) => {
			const ScrollTrigger = scrollObj;
			return ScrollTrigger;
		});

	const prom = Promise.all([gsapCore(), gsapPlugin()]).then((values) => {
		return values;
	});
	return prom;
}

/**
 * Returns true if the device is a tablet device.
 * @param {*} userAgent Pass the value of navigator.userAgent.
 * @returns {boolean}
 */
export function isTablet(userAgent) {
	return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
		userAgent.toLowerCase()
	);
}

/**
 * Returns true if the device is a mobile device. Checks navigator.userAgent||navigator.vendor||window.opera.
 * @returns {boolean}
 */
export function mobileCheck() {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

/**
 * Run a function after a window resize event, but only after the alloted time has ended.
 * If another resize event occurs it resets the time window.
 * @param {function} debouncedFunction The function you want to run after a window resize event.
 * @param {number} time The time in ms.
 * @param {boolean} ignoreVertical Set to true if you only want to listen for horizontal resizing events.
 */
export function resizeDebouncer(
	debouncedFunction,
	time = 250,
	ignoreVertical = false
) {
	let resizeTimer;
	let screenWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			if (ignoreVertical) {
				let currentWidth = window.innerWidth;
				if (currentWidth - screenWidth !== 0) {
					debouncedFunction();
				}
				screenWidth = currentWidth;
			} else {
				debouncedFunction();
			}
		}, time);
	});
}

/**
 * General purpose utility for running a function after a particular event fires on a specified element. The function only fires after the alloted time has ended.
 * If another resize event occurs it resets the time window.
 * @param {htmlElement} element The element that emits the event.
 * @param {string} eventType The type of event to listen for.
 * @param {function} debouncedFunction The function to run after the event.
 * @param {number} time The time in ms.
 */
export function eventListenerDebouncer(
	element,
	eventType,
	debouncedFunction,
	time = 250
) {
	let timer;
	element.addEventListener(eventType, (event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debouncedFunction(event);
		}, time);
	});
}

/**
 * Injects the youtube iframe api script and waits for the YT object to be instantiated before resolving the promise
 * @returns {promise} Resolves once the YT object is available.
 */
export function injectYouTubeIframeScript() {
	const prom = new Promise((resolve) => {
		if (globalThis.YT) {
			return resolve();
		}
		const tag = document.createElement("script");
		tag.id = "iframe-api";
		tag.src = "https://www.youtube.com/iframe_api";

		const firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		tag.addEventListener("load", () => {
			if (!YT.loaded) {
				const loadingCheck = setInterval(() => {
					if (YT.loaded) {
						clearInterval(loadingCheck);
						return resolve(true);
					}
				}, 50);
			} else {
				return resolve(true);
			}
		});
	});

	return prom;
}

export function fallbackCopyToClipboard(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand("copy");
		const msg = successful ? "successful" : "unsuccessful";
		console.log(`Fallback: Copying text command was ${msg}`);
	} catch (err) {
		console.error("Fallback: Oops, unable to copy", err);
	}

	document.body.removeChild(textArea);
}

export function copyToClipboard() {
	const copyLinks = document.querySelectorAll(".copy-to-clipboard");
	let timeout;
	copyLinks.forEach((link) => {
		link.addEventListener("click", function () {
			const copyToClipboardDone = link.nextElementSibling;
			if (!navigator.clipboard) {
				fallbackCopyToClipboard(this.dataset.url);
				return;
			}

			navigator.clipboard.writeText(this.dataset.url).then(
				function () {
					console.log("Copying to clipboard was successful!");
				},
				function (err) {
					console.error("Could not copy text: ", err);
				}
			);

			if (
				copyToClipboardDone &&
				copyToClipboardDone.classList &&
				copyToClipboardDone.classList.contains("sharing__clipboard-done")
			) {
				clearTimeout(timeout);
				copyToClipboardDone.classList.remove("hidden");

				timeout = setTimeout(() => {
					copyToClipboardDone.classList.add("hidden");
				}, 2000);
			}
		});
	});
}

/**
 * Checks whether an element is visible in the viewport.
 * @param {string} element - The dom element to look for.
 * @returns {boolean} True if visible and false if not.
 */
export function isInViewport(element) {
	const position = element.getBoundingClientRect();
	return (
		(position.top >= 0 && position.bottom <= window.innerHeight) ||
		(position.top < window.innerHeight && position.bottom >= 0)
	);
}

/* eslint-disable-next-line */
const emailRegex =
	/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

/**
 * Checks to make sure a passed string has a valid email address structure and characters.
 * @param {RegExp} email - The email address as a string.
 * @returns {boolean} True if valid and false if not.
 */
export function isEmailValid(email) {
	return emailRegex.test(email);
}

/**
 * Get the value of a css property on a specific element.
 * @param {htmlElement} el The element whose styles you want to get.
 * @param {string} property The name of the property.
 * @returns {(string|number)} The value of the property.
 */
export function getElementStyles(el, property) {
	const elementStyles = window.getComputedStyle(el);
	const cssPropertyValue = elementStyles.getPropertyValue(property);
	return cssPropertyValue;
}

/**
 * Get a rounded percentage value using two numbers.
 * @param {number} total The value you want get a percentage of.
 * @param {number} part The value that is a fraction of the total.
 * @returns {number} The rounded percentage value.
 */
export function getPercent(total, part) {
	return Math.round((part / total) * 100);
}

/**
 * Detects swipe actions on a element and runs a callback function.
 *
 * @param {htmlElement} element The element on which you want to detect swipe actions.
 * @param {function} callback The callback function to run when a swipe is detected.
 * @returns {void} Attaches or removes the functionality.
 */
export function detectSwipe(element, callback, removeHandlers = false) {
	let touchstartX = 0;
	let touchstartY = 0;
	let touchendX = 0;
	let touchendY = 0;

	function handleGesture(
		touchstartX,
		touchstartY,
		touchendX,
		touchendY,
		pixels = 50
	) {
		const delx = touchendX - touchstartX;
		const dely = touchendY - touchstartY;

		if (Math.abs(delx) > pixels || Math.abs(dely) > pixels) {
			if (Math.abs(delx) > Math.abs(dely)) {
				if (delx > 0) return "right";
				else return "left";
			} else if (Math.abs(delx) < Math.abs(dely)) {
				if (dely > 0) return "down";
				else return "up";
			}
		} else return "tap";
	}

	function touchStart(event) {
		touchstartX = event.changedTouches[0].screenX;
		touchstartY = event.changedTouches[0].screenY;
	}

	element.addEventListener("touchstart", () => touchStart(event), false);

	element.addEventListener(
		"touchend",
		function (event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
			callback(handleGesture(touchstartX, touchstartY, touchendX, touchendY));
		},
		false
	);
	if (removeHandlers === "remove") {
		element.removeEventListener("touchstart", touchStart);
		element.removeEventListener("touchend", handleGesture);
		return;
	}
}

/**
 * Function for getting the ios operating system version
 *
 * @returns {number} the ios version
 */
export function checkIosVersion() {
	const agent = window.navigator.userAgent,
		start = agent.indexOf("OS ");
	if (
		(agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) &&
		start > -1
	) {
		return window.Number(agent.substr(start + 3, 3).replace("_", "."));
	}
	return 0;
}

/**
 * Function for adding a link tag with preconnect to the head of the document. Very useful if you need to add this dynamically.
 * @param {string} domain The domain you wish to preconnect to.
 * @returns {void} The preconnect will be appended to the head tag.
 */
export function appendPreconnect(domain) {
	try {
		if (!domain) {
			console.log("The domain was missing or broken...");
			return;
		}
		const link = document.createElement("link");
		link.rel = "preconnect";
		link.href = domain;
		document.head.appendChild(link);
		return;
	} catch (error) {
		console.error(error);
	}
}

/**
 *
 * @param {string} src The URL src to load
 */
async function loadScript(src) {
	const script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	script.async = true;
	document.head.appendChild(script);
	await new Promise((resolve, reject) => {
		script.onload = resolve;
		script.onerror = () => reject(new Error(`Script load error for ${src}`));
	});
}

/**
 *
 * @param {object} event The click event object
 */
async function handleCTBClick(event) {
	event.preventDefault();

	if (!window.isCTBLoaded) {
		const domain = window.location.hostname;
		// Assuming PR-CLICKTOBUY plugin is enabled to make the script load
		await loadScript(
			`/wp-content/plugins/pr-clicktobuy/public/js/pr-clicktobuy-public.js`
		);
		window.isCTBLoaded = true;

		// This is important!! Never remove this code
		const clonedEvent = new event.constructor(event.type, event);
		setTimeout(() => {
			event.target.dispatchEvent(clonedEvent);
		}, 500);
	}
}

/**
 *
 * @param {HTMLElement} element The element which needs to set the Attributes
 */
function setAttributesToMenuItem(element) {
	const body = document.querySelector("body");
	const localLang = body.dataset.sitelanguage;
	const locale = localLang.replace(/_/g, "-");
	element.setAttribute("data-ctbuy-lang", locale);
}

/**
 *
 * @param {HTMLElement} block The element CTA which triggers
 */
export function ctbCTAClickHandler(block = document) {
	const elements = block.querySelectorAll("[data-ctbuy]");
	elements.forEach((element) => {
		setAttributesToMenuItem(element);
		element.addEventListener("click", handleCTBClick);
	});
}

const api = {
	copyToClipboard,
	checkDevice,
	detectSwipe,
	eventListenerDebouncer,
	footerIntersection,
	getPosition,
	getGsap,
	getJquery,
	inCriticalCssConfig,
	injectYouTubeIframeScript,
	isEmailValid,
	isInViewport,
	isTablet,
	loadCss,
	mobileCheck,
	resizeDebouncer,
	supportsWebp,
	toggleClassByValidity,
	waitForLoad,
	getElementStyles,
	getPercent,
	checkIosVersion,
	appendPreconnect,
};
export default api;
