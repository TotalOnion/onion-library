// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
export default function tabbedcontentv2Js(options = {}) {
	try {
		const {block} = options;
		const tabbedSections = block.querySelectorAll(
			'.tabbed-content-v2__section-container'
		);
		const tabButtons = block.querySelectorAll(
			'.tabbed-content-v2__tab-cta'
		);
		tabButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				tabButtons.forEach((button) => {
					button.classList.add('cta-style-inactive');
				});
				tabbedSections.forEach((container) =>
					container.classList.remove('active')
				);
				event.target.classList.remove('cta-style-inactive');
				const currentId = event.target.dataset.buttonid;
				const newActiveContainer = Array.from(tabbedSections).find(
					(section) => {
						return section.dataset.containerid === currentId;
					}
				);
				newActiveContainer.classList.add('active');
			});
		});
		if (tabbedSections && tabbedSections.length > 0) {
			tabbedSections[0].classList.add('active');
		}
		if (tabButtons && tabButtons.length > 0) {
			tabButtons[0].classList.remove('cta-style-inactive');
		}
	} catch (error) {
		console.error(error);
	}
}
