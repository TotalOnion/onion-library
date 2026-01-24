export default function loadmoreTriggerJs(options = {}) {
	try {
		if (!customElements.get('loadmore-trigger')) {
			customElements.define(
				'loadmore-trigger',
				class extends HTMLElement {
					// static observedAttributes = ['data-posts'];
					constructor() {
						super();
						this.enableLogs = this.dataset.enablelogs;
						this.toggleButton = document.createElement('button');
						this.toggleButton.className =
							'loadmore-trigger__button';
						this.appendChild(this.toggleButton);
						this.toggleButton.innerText = this.dataset.buttontext;
						this.toggleButton.addEventListener('click', () => {
							this.dispatchEvent(new CustomEvent('loadmore'));
						});
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
		}
	} catch (error) {
		console.error(error);
	}
}
