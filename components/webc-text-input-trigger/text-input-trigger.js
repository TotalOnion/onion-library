export default function loadmoreTriggerJs(options = {}) {
	try {
		if (!customElements.get('text-input-trigger')) {
			customElements.define(
				'text-input-trigger',
				class extends HTMLElement {
					constructor() {
						super();
						this.enableLogs = this.dataset.enablelogs;
						this.textInput = document.createElement('input');
						this.textInput.setAttribute('type', 'text');
						this.textInput.className = 'text-input-trigger__input';
						this.appendChild(this.textInput);
						this.textInput.placeholder =
							this.dataset.placeholdertext || 'Start typing...';
						this.textInput.addEventListener('input', (e) => {
							this.dispatchEvent(new CustomEvent('textinput'));
						});
					}
					connectedCallback() {
						console.log('text input module added to page.');
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
