export default function toggletriggerJs(options = {}) {
	try {
		if (!customElements.get('toggle-trigger')) {
			customElements.define(
				'toggle-trigger',
				class extends HTMLElement {
					constructor() {
						super();
						this.enableLogs = this.dataset.enablelogs;
						this.toggleButton = document.createElement('button');
						this.toggleButton.className = 'toggle-trigger__button';
						this.appendChild(this.toggleButton);
						this.toggleButton.innerText = this.dataset.toggletext;
						this.toggleClass = this.dataset.toggleclass;
						this.toggleTarget = document.querySelector(
							this.dataset.toggletarget
						);
						this.toggleButton.addEventListener('click', () => {
							this.toggleTarget.classList.toggle(
								this.toggleClass
							);
						});

						document.body.addEventListener('click', (e) => {
							if (
								(this.toggleTarget.classList.contains(
									this.toggleClass
								) &&
									!this.toggleTarget.contains(e.target)) ||
								e.target.classList.contains(
									'toggle-trigger__button'
								)
							) {
								this.toggleTarget.classList.toggle(
									this.toggleClass
								);
							}
						});
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
		}
	} catch (error) {
		console.error(error);
	}
}
