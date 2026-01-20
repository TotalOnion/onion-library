export default function postFilterDisplayJS(options = {}) {
	try {
		customElements.define(
			'post-grid-display-module',
			class extends HTMLElement {
				static observedAttributes = ['data-posts'];
				constructor() {
					super();
					this.gridContainer = this.querySelector(
						'.post-grid-display-module__grid-container'
					);
				}
				connectedCallback() {
					console.log('Display module added to page.');
					this.classList.add('loaded');
				}

				attributeChangedCallback(name, oldValue, newValue) {
					// console.log(`Attribute ${name} has changed.`);
					this.gridContainer.innerHTML = '';
					if (newValue) {
						const posts = JSON.parse(newValue);
						posts.forEach((post) => {
							const postContent = `<div class="post-grid-display-module__post-container"><h2>${post.postname}</h2><img class="post-grid-display-module__post-image" src="${post['image-src']}" alt="${post.postname}"></div>`;
							this.gridContainer.insertAdjacentHTML(
								'beforeend',
								postContent
							);
						});
					}
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
