// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
// import iFrameResize from 'iframe-resizer/js/iframeResizer';
export default function iframecontainerJs(options = {}) {
	try {
		const {block} = options;
		let currentUrl = window.location;
		let params = new URLSearchParams(currentUrl.search);
		let iframe = block.querySelector('iframe');

		let queryParam = block.dataset.queryparameter;
		let queryPrefix = block.dataset.queryprefix;
		const autosizing = block.dataset.autosizing;

		if (params.get(queryParam)) {
			let newUrl = `${
				block.dataset.src
			}${queryPrefix}?${queryParam}=${params.get(queryParam)}`;
			iframe.setAttribute('src', newUrl);
		} else {
			let url = `${block.dataset.src}`;
			iframe.setAttribute('src', url);
		}
		if (autosizing) {
			import('iframe-resizer/js/iframeResizer').then(() => {
				iFrameResize({}, iframe);
			});
		}
	} catch (error) {
		console.error(error);
	}
}
