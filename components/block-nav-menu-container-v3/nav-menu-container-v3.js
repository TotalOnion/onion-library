import extraJs from 'Assets/js/blocks/nav-menu-container-v3/nav-menu-container-v3-extra';

export default function navmenucontainerv3Js(options = {}) {
	try {
		const {block} = options;
		extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
