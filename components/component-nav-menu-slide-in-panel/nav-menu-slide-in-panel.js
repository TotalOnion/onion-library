// import {resizeDebouncer} from '@pernod-ricard-global-cms/jsutils';
export default function slideinpanelJs(options = {}) {
	try {
		const {block} = options;
		const documentBody = document.body;
		const navContainer = block.querySelector('.nav-menu-slide-in-panel');
		const hamburgerWrapper = navContainer.querySelector(
			'.nav-menu-slide-in-panel__hamburger-wrapper'
		);
		const hamburger = navContainer.querySelector(
			'.nav-menu-slide-in-panel__hamburger'
		);
		const hamburgerBars = hamburger.querySelectorAll(
			'.nav-menu-slide-in-panel__hamburger-bar'
		);
		const crossBars = navContainer.querySelectorAll(
			'.nav-menu-slide-in-panel__nav-interactions-cross-bar'
		);
		const itemsWithChildren = navContainer.querySelectorAll(
			'li.menu-item-has-children'
		);
		const navWrapper = navContainer.querySelector(
			'.nav-menu-slide-in-panel__nav-wrapper'
		);
		const closeMenu = document.querySelector(
			'.nav-menu-slide-in-panel__nav-interactions-cross'
		);
		if (!closeMenu) {
			return;
		}
		const closeSubnavs = () => {
			hamburger.classList.remove('active');
			navWrapper.classList.remove('active');
			hamburgerBars.forEach((item) => {
				item.classList.remove('active');
			});
			crossBars.forEach((item) => {
				item.classList.remove('active');
			});
			navContainer
				.querySelectorAll('.nav-menu-slide-in-panel__nav-item.active')
				.forEach((el) => el.classList.remove('active'));
			documentBody.classList.remove('menu-active');
		};

		const toggleMenu = () => {
			navContainer.classList.add('interacted');
			hamburger.classList.toggle('active');
			navWrapper.classList.toggle('active');
			hamburgerBars.forEach((item) => {
				item.classList.toggle('active');
			});
			crossBars.forEach((item) => {
				item.classList.toggle('active');
			});
			documentBody.classList.toggle('menu-active');
		};

		const wrapperClick = (event) => {
			if (
				event.target.classList.contains(
					'nav-menu-slide-in-panel__nav-wrapper'
				) &&
				event.target.classList.contains('active')
			) {
				toggleMenu();
			}
		};

		hamburgerWrapper.addEventListener('click', toggleMenu);
		closeMenu.addEventListener('click', toggleMenu);
		navWrapper.addEventListener('click', wrapperClick);

		const toggleAccordion = (item, isSubNavItem) => {
			const parentNavContainer = isSubNavItem ? item.parentNode : null;
			const subNavContainer = isSubNavItem
				? item.querySelector(
						'.nav-menu-slide-in-panel__sub-sub-nav-container'
					)
				: item.querySelector(
						'.nav-menu-slide-in-panel__sub-nav-container'
					);
			const isOpen = subNavContainer.offsetHeight > 0;
			const sectionHeight = subNavContainer.scrollHeight;
			if (isOpen) {
				subNavContainer.animate(
					[
						{
							height: sectionHeight + 'px'
						},
						{height: '0px'}
					],
					{
						fill: 'forwards',
						duration: 400,
						easing: 'ease-in-out'
					}
				);
				if (parentNavContainer) {
					parentNavContainer.animate(
						[
							{
								height: parentNavContainer.scrollHeight + 'px'
							},
							{
								height:
									parentNavContainer.scrollHeight -
									sectionHeight +
									'px'
							}
						],
						{
							fill: 'forwards',
							duration: 400,
							easing: 'ease-in-out'
						}
					);
				}
			} else {
				subNavContainer.animate(
					[
						{height: '0px'},
						{
							height: sectionHeight + 'px'
						}
					],
					{
						fill: 'forwards',
						duration: 400,
						easing: 'ease-in-out'
					}
				);
				if (parentNavContainer) {
					parentNavContainer.animate(
						[
							{
								height: parentNavContainer.scrollHeight + 'px'
							},
							{
								height:
									parentNavContainer.scrollHeight +
									sectionHeight +
									'px'
							}
						],
						{
							fill: 'forwards',
							duration: 400,
							easing: 'ease-in-out'
						}
					);
				}
			}
		};
		itemsWithChildren.forEach((item) => {
			const isSubNavItem = item.classList.contains(
				'nav-menu-slide-in-panel__sub-nav-item'
			);
			const dropDown = isSubNavItem
				? item.querySelector(
						'.nav-menu-slide-in-panel__nav-item-drop-down-small'
					)
				: item.querySelector(
						'.nav-menu-slide-in-panel__nav-item-drop-down'
					);
			dropDown.addEventListener('click', function (e) {
				e.preventDefault();
				toggleAccordion(item, isSubNavItem);
				item.classList.toggle('active');
				dropDown.classList.toggle('active');
			});
		});
	} catch (error) {
		console.error(error);
	}
}
