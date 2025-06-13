export default function navmenucontainerJs(options = {}) {
	try {
		const {block} = options;

		if (block.dataset.navtype == 'classic_nav_items_center') {
			import('Assets/js/modules/library-modules/classic-nav-items-center/classic-nav-items-center.js').then(
				(module) => {
					module.default({block});
				}
			);
		} else if (block.dataset.navtype == 'slide_in_nav_panel') {
			import(
				'Assets/js/modules/library-modules/nav-menu-slide-in-panel/nav-menu-slide-in-panel.js'
			).then((module) => {
				module.default({block});
			});
		}
	} catch (error) {
		console.error(error);
	}
}
