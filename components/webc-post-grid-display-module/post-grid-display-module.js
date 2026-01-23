export default function postFilterDisplayJS(options = {}) {
	try {
		if (!customElements.get('post-grid-display-module')) {
			customElements.define(
				'post-grid-display-module',
				class extends HTMLElement {
					static observedAttributes = ['data-posts'];
					constructor() {
						super();
						const gridContainer = document.createElement('div');
						gridContainer.className =
							'post-grid-display-module__grid-container';
						this.appendChild(gridContainer);
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
								const postContent = `
							<div class="post-grid-display-module__post-container">
							<h2 class="post-grid-display-module__post-title">${post.name}</h2>
							<img loading="lazy" class="post-grid-display-module__post-image" src="${post.images?.post_image_src}" alt="${post.name}"></div>
							`;
								this.gridContainer.insertAdjacentHTML(
									'beforeend',
									postContent
								);
							});
						}
					}
				}
			);
		}
	} catch (error) {
		console.error(error);
	}
}
