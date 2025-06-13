export default function marketSelector(block) {
	try {
		// Market Selector Toggle
		const marketContainer = block.querySelectorAll('.markets-menu-toggle');
		const marketsList = block.querySelector(
			'.market-selector__markets-list'
		);
		marketContainer.forEach((market) => {
			market.addEventListener('click', () => {
				marketsList.classList.toggle('open');
			});
		});

		// Modal Toggle
		const htmlRoot = document.getElementsByTagName('html')[0];
		const modalToggle = document.querySelectorAll('.markets-menu-toggle');
		const marketOverlay = document.querySelector(
			'.market-selector-block--overlay'
		);
		const marketAccordion = document.querySelectorAll(
			'.accordion-market-selector'
		);
		// 	marketAccordion.forEach((continent) => {
		// 		const marketsContainer = continent.querySelector(
		// 			'.accordion-market-selector__wrapper'
		// 		);

		// 		if (continent.classList.contains('active')) {
		// 			continent.setAttribute('data-collapsed', 'true');
		// 			continent.classList.remove('active');
		// 			marketsContainer.style.height = 0 + 'px';
		// 			marketsContainer.classList.remove('active');
		// 		}
		// 	});
		// }

		// modalToggle.forEach((toggle) => {
		// 	toggle.addEventListener('click', () => {
		// 		marketContainer.classList.toggle('active');
		// 		marketOverlay.classList.toggle('active');
		// 		htmlRoot.classList.toggle('markets-active');
		// 	});
		// });

		// marketAccordion.forEach((continent) => {
		// 	continent.addEventListener('click', () => {
		// 		const marketsContainer = continent.querySelector(
		// 			'.accordion-market-selector__wrapper'
		// 		);
		// 		const isCollapsed =
		// 			continent.getAttribute('data-collapsed') === 'true';
		// 		closeMarkets();

		// 		if (isCollapsed) {
		// 			const sectionHeight = marketsContainer.scrollHeight;
		// 			marketsContainer.style.height = sectionHeight + 'px';
		// 			continent.setAttribute('data-collapsed', 'false');
		// 			continent.classList.add('active');
		// 			marketsContainer.classList.add('active');
		// 		} else {
		// 			marketsContainer.style.height = 0 + 'px';
		// 			continent.setAttribute('data-collapsed', 'true');
		// 			continent.classList.remove('active');
		// 			marketsContainer.classList.remove('active');
		// 		}
		// 	});
		// });
	} catch (error) {
		console.error(error);
	}
}
