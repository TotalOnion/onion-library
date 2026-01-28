export default function postfiltermoduleJs(options = {}) {
	try {
		if (!customElements.get('post-filter-module')) {
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
							postsperpagedesktop: 8,
							postsperpagemobile: 6,
							pagenumber: 1,
							setActiveFilters: function (newState) {
								Object.assign(this.filterState, newState);
								this.filterPosts.bind(this)();
							},
							setFilteredPosts: function (newState) {
								Object.assign(this.filterState, newState);
								this.dispatchEvent(
									new CustomEvent('filteredposts-updated')
								);
								this.enableLogs &&
									console.log(
										'🚀 filter state: ',
										this.filterState
									);
							}
						};

						this.filterState.postsperpagedesktop =
							this.dataset.postsperpagedesktop || 8;
						this.filterState.postsperpagedesktop =
							this.dataset.postsperpagedesktop || 6;

						this.loadMoreTriggers = document.querySelectorAll(
							`.${this.dataset.loadmoretriggerclass}`
						);
						this.loadMoreTriggers.forEach((trigger) => {
							trigger.addEventListener('loadmore', () => {
								this.filterState.pagenumber =
									this.filterState.pagenumber + 1;
								this.filterPosts();
							});
						});

						const postFilterContainer =
							document.createElement('div');
						postFilterContainer.className =
							'post-filter-module__filter-container';
						this.appendChild(postFilterContainer);
						this.postFilterContainer = this.querySelector(
							'.post-filter-module__filter-container'
						);

						const postFilterCatsDisplay =
							document.createElement('div');
						postFilterCatsDisplay.className =
							'post-filter-module__filter-categories-display';
						this.postFilterContainer.appendChild(
							postFilterCatsDisplay
						);
						this.filterCategoriesDisplay = this.querySelector(
							'.post-filter-module__filter-categories-display'
						);

						const clearFilters = document.createElement('button');
						clearFilters.className =
							'post-filter-module__clear-filters-button';
						clearFilters.innerText =
							this.dataset.clearfilterstext || 'Clear Filters';
						this.postFilterContainer.appendChild(clearFilters);
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
						if (
							this.devMode == 'true' ||
							this.classList.contains('dev-petz') //Easter Egg :D
						) {
							const devdatalocation =
								this.dataset.devdatalocation;
							data = await import(
								`./dev-content/dev-content${devdatalocation}.js`
							);
							this.filterState.allposts = data[`devContentPets`];

							this.filterState.allcategories =
								data[`devContentCategories`];
						} else {
							data = globalThis[this.dataset.dataobjectid];
							this.enableLogs &&
								console.log('🚀 dataobject: ', data);
							this.filterState.allposts = data[`posts`];
							this.filterState.allcategories = data[`categories`];
						}

						if (this.filterState.allcategories.length > 0) {
							this.filterState.allcategories.forEach(
								(category) => {
									if (category.parentid != '0') {
										this.filterState.filtercategories.push(
											category
										);
									} else {
										this.filterState.groupingcategories.push(
											category
										);
									}
								}
							);
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
									this.filterState.setActiveFilters.bind(
										this
									)({
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
									this.filterState.setActiveFilters.bind(
										this
									)({
										activefilters: newActiveFilters
									});
								}
							});
						});
						const groupingButtons = this.querySelectorAll(
							'.post-filter-module__grouping-category-button'
						);
						const categoryContainers = this.querySelectorAll(
							'.post-filter-module__filter-category-container'
						);
						groupingButtons.forEach((button) => {
							button.addEventListener('click', () => {
								const container =
									button.parentElement.querySelector(
										'.post-filter-module__filter-category-container'
									);
								if (button.classList.contains('active')) {
									button.classList.remove('active');
									container.classList.remove('active');
									container.style.height = '0px';
								} else {
									groupingButtons.forEach((btn) => {
										btn.classList.remove('active');
									});
									categoryContainers.forEach(
										(categoryContainer) => {
											categoryContainer.style.height =
												'0px';
											categoryContainer.classList.remove(
												'active'
											);
										}
									);
									container.style.height =
										container.scrollHeight + 'px';
									button.classList.add('active');
									container.classList.add('active');
								}
							});
						});
						this.filterPosts();

						this.classList.add('loaded');
					}

					attributeChangedCallback(name, oldValue, newValue) {
						// console.log(`Attribute ${name} has changed.`);
					}
					filterPosts(event) {
						if (this.filterState.activefilters.size === 0) {
							const numberPosts =
								Number(this.filterState.postsperpagedesktop) *
								Number(this.filterState.pagenumber);
							this.filterState.setFilteredPosts.bind(this)({
								filteredposts: this.filterState.allposts.slice(
									0,
									numberPosts
								)
							});
							return;
						}

						const newFilteredPosts =
							this.filterState.allposts.filter((post) => {
								return (
									this.filterState.activefilters.intersection(
										new Set(post.categories)
									).size > 0
								);
							});

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
		}
	} catch (error) {
		console.error(error);
	}
}
