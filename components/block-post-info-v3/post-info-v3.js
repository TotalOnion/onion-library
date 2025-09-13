import extraJs from 'Assets/js/blocks/post-info-v3/post-info-v3-extra';
export default function postinfov3Js(options = {}) {
	const {block} = options;
	try {
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
