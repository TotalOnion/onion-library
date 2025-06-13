import {resizeDebouncer} from '@pernod-ricard-global-cms/jsutils';

function calculateHeaderHeight(block) {
	const headerHeight = block.offsetHeight;
	document.documentElement.style.setProperty(
		'--global-site-header-height',
		`${headerHeight}px`
	);
}

export default function siteHeaderJs(options = {}) {
	try {
		const {block} = options;

		const documentBody = document.body;
		const navContainer = document.querySelector('.header-nav');
		const hamburgerWrapper = document.querySelector(
			'.header-interactions__hamburger-wrapper'
		);
		const hamburger = document.querySelector(
			'.header-interactions__hamburger'
		);
		const hamburgerBars = hamburger.querySelectorAll(
			'.header-interactions__hamburger-bar'
		);
		const itemsWithChildren = navContainer.querySelectorAll(
			'a.menu-item-has-children'
		);

		const closeSubnavs = () => {
			navContainer
				.querySelectorAll('.header-nav__item.active')
				.forEach((el) => el.classList.remove('active'));
			documentBody.classList.remove('mobile-menu-active');
		};

		hamburgerWrapper.addEventListener('click', function () {
			if (screen.width < 1024) {
				hamburger.classList.toggle('active');
				hamburgerBars.forEach((item) => {
					item.classList.toggle('active');
				});
				documentBody.classList.toggle('mobile-menu-active');
			}
		});

		itemsWithChildren.forEach((item) => {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				item.parentNode.classList.toggle('active');
			});
		});
		calculateHeaderHeight(block);
		resizeDebouncer(() => calculateHeaderHeight(block), 250, true);
	} catch (error) {
		console.error(error);
	}
}
