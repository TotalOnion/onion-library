export default function counterDisplayJs(options = {}) {
	try {
		if (!customElements.get('counter-display')) {
			customElements.define(
				'counter-display',
				class extends HTMLElement {
					static observedAttributes = ['data-count'];
					constructor() {
						super();
					}
					connectedCallback() {
						console.log('Display module added to page.');
						this.classList.add('loaded');
					}
					attributeChangedCallback(name, oldValue, newValue) {
						console.log(
							'🚀 ~ attributeChangedCallback ~ name:',
							name
						);
						console.log('count', this.dataset.count);

						this.innerText = `${this.dataset.countertext} ${this.dataset.count}`;
					}
				}
			);
		}
	} catch (error) {
		console.error(error);
	}
}
