export default function postfiltermoduleJs(options = {}) {
	try {
		customElements.define(
			'post-filter-module',
			class extends HTMLElement {
				constructor() {
					super();
					this.enableLogs = this.dataset.enablelogs;
					this.filterState = {
						allposts: new Set(),
						filteredposts: new Set(),
						activefilters: new Set(),
						setActiveFilters: function (newState) {
							Object.assign(this.filterState, newState);
							this.dispatchEvent(
								new CustomEvent('activefilters-updated')
							);
						},
						setFilteredPosts: function (newState) {
							Object.assign(this.filterState, newState);
							this.dispatchEvent(
								new CustomEvent('filteredposts-updated')
							);
						}
					};
					this.filterCategoriesDisplay = this.querySelector(
						'.post-filter-module__filter-categories-display'
					);

					if (this.dataset.enableclear) {
						this.filterCategoriesDisplay.insertAdjacentHTML(
							'beforeend',
							`<button class="post-filter-module__clear-filters-button">Clear Filters</button>`
						);
						this.clearFiltersButton = this.querySelector(
							'.post-filter-module__clear-filters-button'
						);
						this.clearFiltersButton.addEventListener(
							'click',
							this.clearFilters.bind(this)
						);
					}
					this.setStateButton = this.querySelector(
						'.post-filter-module__set-state-button'
					);

					this.addEventListener(
						'activefilters-updated',
						this.filterPosts.bind(this)
					);
					this.devMode = this.dataset.dev;
					this.devModeContent = this.dataset.devcontent;
				}
				async connectedCallback() {
					console.log('Filter Module element added to page.');
					let data;
					if (this.devMode) {
						data = await import('./dev-content/dev-content.js');
					}
					this.filterState.allposts =
						data[`devContent${this.devModeContent}`];
					this.filterState.categories = data[`devContentCategories`];
					this.filterState.categories.forEach((category) => {
						if (category.parentid) {
							this.filterCategoriesDisplay.insertAdjacentHTML(
								'beforeend',
								`<button class="post-filter-module__category-button" data-categoryid="${category.id}">${category.name}</button>`
							);
						}
					});

					this.categorybuttons = this.querySelectorAll(
						'.post-filter-module__category-button'
					);

					this.categorybuttons.forEach((button) => {
						button.addEventListener('click', () => {
							if (
								this.filterState.activefilters.has(
									Number(button.dataset.categoryid)
								)
							) {
								const newActiveFilters = new Set(
									this.filterState.activefilters
								);
								newActiveFilters.delete(
									Number(button.dataset.categoryid)
								);
								this.filterState.setActiveFilters.bind(this)({
									activefilters: newActiveFilters
								});
							} else {
								const newActiveFilters = new Set(
									this.filterState.activefilters
								);
								newActiveFilters.add(
									Number(button.dataset.categoryid)
								);
								this.filterState.setActiveFilters.bind(this)({
									activefilters: newActiveFilters
								});
							}
						});
					});
					this.filterState.setFilteredPosts.bind(this)({
						filteredposts: this.filterState.allposts
					});

					this.classList.add('loaded');
				}

				attributeChangedCallback(name, oldValue, newValue) {
					// console.log(`Attribute ${name} has changed.`);
				}
				filterPosts(event) {
					if (this.filterState.activefilters.size === 0) {
						this.filterState.setFilteredPosts.bind(this)({
							filteredposts: this.filterState.allposts
						});
						return;
					}

					const newFilteredPosts = this.filterState.allposts.filter(
						(post) => {
							return (
								this.filterState.activefilters.intersection(
									post.categories
								).size > 0
							);
						}
					);

					this.filterState.setFilteredPosts.bind(this)({
						filteredposts: newFilteredPosts
					});
				}
				clearFilters(event) {
					this.filterState.setActiveFilters.bind(this)({
						activefilters: new Set()
					});
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
