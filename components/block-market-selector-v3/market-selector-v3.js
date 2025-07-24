export default function marketselectorv3Js(options = {}) {
	try {
		const {block} = options;
		const marketSelectorPopupBtn = block.querySelector('.pop-up');
		const marketSelectorInlineBtn = block.querySelector('.inline');
		const marketSelectorModal = block.querySelector(
			'.market-selector-v3__modal-overlay'
		);
		const marketSelectorModalClose = block.querySelector(
			'.market-selector-v3__modal-close-button'
		);
		if (marketSelectorPopupBtn) {
			marketSelectorPopupBtn.addEventListener('click', (e) => {
				marketSelectorModal.style.display = 'flex';
				document.documentElement.classList.add('lock-position');
			});
		}
		if (marketSelectorModalClose) {
			marketSelectorModalClose.addEventListener('click', (e) => {
				marketSelectorModal.style.display = 'none';
				document.documentElement.classList.remove('lock-position');
			});
		}
	} catch (error) {
		console.error(error);
	}
}
