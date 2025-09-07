import extraJs from 'Assets/js/blocks/group-container-v3/group-container-v3-extra.js';
export default function groupcontainerv3Js(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
