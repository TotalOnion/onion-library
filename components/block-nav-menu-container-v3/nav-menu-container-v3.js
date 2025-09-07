// import extraJs from 'Assets/js/blocks/nav-menu-container-v3/nav-menu-container-v3-extra';

export default function navmenucontainerv3Js(options = {}) {
	try {
		const {block} = options;
		if (block.dataset.navtype == 'slide_in_nav_panel') {
			// import(
			// 	'Assets/js/modules/library-modules/nav-menu-slide-in-panel/nav-menu-slide-in-panel.js'
			// ).then((module) => {
			// 	module.default({block});
			// });
		}
		// extraJs(block);
	} catch (error) {
		console.error(error);
	}
}
