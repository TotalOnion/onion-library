export default function blockinteractionsv3Js(options = {}) {
	try {
		const { block } = options;

		const blockId = block.dataset.blockid;
		const parentBlockId = block.dataset.parentblockid;

		const blockCloseButtons = block.querySelectorAll('.block-interactions-v3__block-close-button');
		if (!blockCloseButtons.length) {
			return;
		}

		blockCloseButtons.forEach(button => {
			const shouldStoreCookie = button?.dataset?.storeCookie === 'true';
			const cookieKey = `blockClosed_${parentBlockId}`;
			const wrappingSection = document.querySelector(`[data-blockid="${parentBlockId}"]`);

			if (getCookie(cookieKey) === 'true') {
				wrappingSection.style.animation = 'none';
				wrappingSection.style.display = 'none';
				return;
			}

			button.addEventListener('click', (e) => {
				console.log(e.currentTarget.dataset);
				wrappingSection.style.animation = 'none';
				wrappingSection.offsetHeight; // trigger reflow
				wrappingSection.style.animation = `${e.currentTarget.dataset.animationname} ${e.currentTarget.dataset.animationduration}s forwards reverse`;

				setTimeout(() => {
					wrappingSection.style.display = 'none';
				}, e.currentTarget.dataset.animationduration * 1000);
				if (shouldStoreCookie) {
					setCookie(cookieKey, 'true', 7);
				}
			});
		});


		function setCookie(name, value, days) {
			const expires = new Date(Date.now() + days * 864e5).toUTCString();
			document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
		}
		function getCookie(name) {
			return document.cookie.split('; ').reduce((result, cookieString) => {
				const [key, val] = cookieString.split('=');
				return key === name ? decodeURIComponent(val) : result;
			}, '');
		}
	} catch (error) {
		console.error('Error in blockinteractionsv3Js:', error);
	}
}
