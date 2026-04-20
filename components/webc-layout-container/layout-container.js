export default function layoutContainerJs(options = {}) {
	try {
		if (!customElements.get('layout-container')) {
			customElements.define(
				'layout-container',
				class extends HTMLElement {
					constructor() {
						super();
						this.data = this.dataset;
					}
					connectedCallback() {
						console.log('Layout container element added to page.');
						this.classList.add('loaded');
					}
					attributeChangedCallback(name, oldValue, newValue) {}
				}
			);
		}
	} catch (error) {
		console.error(error);
	}
}
