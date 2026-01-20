export default function postfiltermoduleJs(options = {}) {
	try {
		customElements.define(
			'post-filter-module',
			class extends HTMLElement {
				constructor() {
					super();
					this.enableLogs = this.dataset.enablelogs;
					this.filterState = {
						allposts: [],
						filteredposts: [],
						activefilters: new Set(),
						allcategories: [],
						groupingcategories: [],
						filtercategories: [],
						setActiveFilters: function (newState) {
							Object.assign(this.filterState, newState);
							this.filterPosts.bind(this)();
						},
						setFilteredPosts: function (newState) {
							Object.assign(this.filterState, newState);
							this.dispatchEvent(
								new CustomEvent('filteredposts-updated')
							);
							console.log('filter state: ', this.filterState);
						}
					};
					this.filterCategoriesDisplay = this.querySelector(
						'.post-filter-module__filter-categories-display'
					);

					this.clearFiltersButton = this.querySelector(
						'.post-filter-module__clear-filters-button'
					);
					this.clearFiltersButton.addEventListener(
						'click',
						this.clearFilters.bind(this)
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

					this.filterState.allcategories =
						data[`devContentCategories`];

					if (this.filterState.allcategories.length > 0) {
						this.filterState.allcategories.forEach((category) => {
							if (category.parentid != null) {
								this.filterState.filtercategories.push(
									category
								);
							} else {
								this.filterState.groupingcategories.push(
									category
								);
							}
						});
					}
					if (this.filterState.groupingcategories.length > 0) {
						this.filterState.groupingcategories.forEach(
							(category) => {
								const groupCategoryContainer =
									document.createElement('div');
								groupCategoryContainer.className =
									'post-filter-module__grouping-category-container';
								groupCategoryContainer.insertAdjacentHTML(
									'beforeend',
									`<button class="post-filter-module__grouping-category-button" data-categoryid="${category.id}">${category.name}</button>`
								);
								const filterCategoryContainer =
									document.createElement('div');
								filterCategoryContainer.className =
									'post-filter-module__filter-category-container';
								const groupedFilters =
									this.filterState.filtercategories.filter(
										(filtercat) => {
											return (
												filtercat.parentid ==
												category.id
											);
										}
									);
								groupedFilters.forEach((filter) => {
									filterCategoryContainer.insertAdjacentHTML(
										'beforeend',
										`<button class="post-filter-module__filter-category-button" data-categoryid="${filter.id}">${filter.name}</button>`
									);
								});
								groupCategoryContainer.appendChild(
									filterCategoryContainer
								);
								this.filterCategoriesDisplay.appendChild(
									groupCategoryContainer
								);
							}
						);
					} else {
						this.filterState.filtercategories.forEach(
							(category) => {
								if (category.parentid) {
									this.filterCategoriesDisplay.insertAdjacentHTML(
										'beforeend',
										`<button class="post-filter-module__filter-category-button" data-categoryid="${category.id}">${category.name}</button>`
									);
								}
							}
						);
					}

					this.categorybuttons = this.querySelectorAll(
						'.post-filter-module__filter-category-button'
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
								button.classList.remove('active-cat');
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
								button.classList.add('active-cat');
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
									new Set(post.categories)
								).size > 0
							);
						}
					);

					this.filterState.setFilteredPosts.bind(this)({
						filteredposts: newFilteredPosts
					});
				}
				clearFilters(event) {
					this.categorybuttons.forEach((button) => {
						button.classList.remove('active-cat');
					});
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
