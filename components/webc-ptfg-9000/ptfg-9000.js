export default function ptfg9000js(options = {}) {
	try {
		customElements.define(
			'ptfg-9000',
			class extends HTMLElement {
				constructor() {
					super();
					this.data = this.dataset;
					this.filterModule = this.querySelector('#filter-module');
					this.displayModule = this.querySelector('#display-module');
				}
				connectedCallback() {
					console.log('PTFG element added to page.');
					if (this.filterModule) {
						this.filterModule.addEventListener(
							'filteredposts-updated',
							() => {
								console.log('Filters updated!');

								this.displayModule.dataset.posts =
									JSON.stringify(
										this.filterModule.filterState
											.filteredposts
									);
							}
						);
					}
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
