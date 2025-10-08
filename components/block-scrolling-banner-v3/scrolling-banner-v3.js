import scrollingbannerJs from 'Assets/js/modules/library-modules/scrolling-banner/scrolling-banner';
export default function scrollingbannerv3Js(options = {}) {
	try {
		const {block} = options;
		scrollingbannerJs(block);
	} catch (error) {
		console.error(error);
	}
}
