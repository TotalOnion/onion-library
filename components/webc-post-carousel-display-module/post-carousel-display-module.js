export default function postFilterDisplayJS(options = {}) {
	try {
		if (!customElements.get('post-carousel-display-module')) {
			customElements.define(
				'post-carousel-display-module',
				class extends HTMLElement {
					static observedAttributes = ['data-posts'];
					constructor() {
						super();
						const gridContainer = document.createElement('div');
						gridContainer.className =
							'post-carousel-display-module__grid-container';
						this.appendChild(gridContainer);
						this.gridContainer = this.querySelector(
							'.post-carousel-display-module__grid-container'
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
							<div class="post-carousel-display-module__post-container">
							<h2 class="post-carousel-display-module__post-title">${post.name}</h2>
							<img loading="lazy" class="post-carousel-display-module__post-image" src="${post.image?.src}" srcset="${post.image?.srcset}" alt="${post.image?.alt}"></div>
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
