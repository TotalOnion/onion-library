// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
export default function slideinpanelJs(options = {}) {
	try {
		const {block} = options;

		const triggerButton = block.querySelector('.slide-in-panel__trigger');
		const panel = block.querySelector('.slide-in-panel__panel');
		const panelHideButton = panel.querySelector(
			'.slide-in-panel__close-button'
		);
		triggerButton.addEventListener('click', () => {
			console.log('clicked');
			panel.classList.toggle('slide-in-panel__panel--visible');
			triggerButton.classList.toggle('slide-in-panel__trigger--hidden');
		});
		panelHideButton.addEventListener('click', () => {
			panel.classList.toggle('slide-in-panel__panel--visible');
			triggerButton.classList.toggle('slide-in-panel__trigger--hidden');
		});
	} catch (error) {
		console.error(error);
	}
}
