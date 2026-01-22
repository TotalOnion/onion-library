export default function toggletriggerJs(options = {}) {
	try {
		customElements.define(
			'toggle-trigger',
			class extends HTMLElement {
				constructor() {
					super();
					this.enableLogs = this.dataset.enablelogs;
				}
				async connectedCallback() {
					console.log('Toggle trigger element added to page.');

					this.classList.add('loaded');
				}

				attributeChangedCallback(name, oldValue, newValue) {
					// console.log(`Attribute ${name} has changed.`);
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
