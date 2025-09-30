export default function navmenucontainerv3Js(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
