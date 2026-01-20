export default function loadmoreTriggerJs(options = {}) {
	try {
		customElements.define(
			'loadmore-trigger',
			class extends HTMLElement {
				// static observedAttributes = ['data-posts'];
				constructor() {
					super();
				}
				connectedCallback() {
					console.log('Display module added to page.');
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
