<template>
	<div id="app" :class="`${blockClassName}__main-container ${blockClassName}__main-container ${!showFilters && 'post-type-filter-grid-v3__main-container--hide-filters'
		}`" :data-layout="filterLayout">
		<TextSearch v-if="enableTextSearch" v-model="textSearchInput" ref="textSearchInput"
			:placeholder="textSearchInputPlaceholder" />
		<div ref="filterBlock" v-if="showFilters" :class="`${blockClassName}__filter`" :data-layout="filterLayout">
			<button :class="`${blockClassName}__open-filter-toggle cmpl-cta-style-${toggleFilterButtonStyle}`">
				{{ modalOpen ? closeFilterText : openFilterText }}
			</button>
			<div :class="`${blockClassName}__filter-container ${modalOpen ? 'post-type-filter-grid-v3__filter-container--open' : ''
				}`" :data-layout="filterLayout">
				<button v-if="fields.enable_show_all_button"
					:class="`${blockClassName}__show-all cmpl-cta-style-${showAllButtonStyle}`"
					v-on:click.prevent="clearAllFilters()" :data-layout="filterLayout">
					{{ showAllText }}
				</button>
				<div :class="`${blockClassName}__filter-categories`" :data-layout="filterLayout">
					<div v-if="filterLayout == 4" :class="`${blockClassName}__filter-categories-label`">
						{{ categoriesTitleText }}
						<button @click="modalOpen = !modalOpen"></button>
					</div>
					<div v-for="(topCategory, index) in computedCategories.topLevelCategories" :class="`${blockClassName}__filter-category ${blockClassName}__cta cmpl-cta-style-${showTopLevelFilters ? topLevelCategoryButtonStyle : 'none'
						}`" v-bind:key="index" :data-layout="filterLayout">
						<h6 v-if="showTopLevelFilters" :class="`${blockClassName}__filter-top-level-category-name`"
							:data-layout="filterLayout">
							{{ topCategory.name }}
						</h6>
						<ul :class="`${blockClassName}__filter-subcategory-list`" :data-layout="filterLayout"
							:style="`${subFilterOverflowStyles}`">
							<li v-for="(subCategory, index) in computedCategories.subCategories[
								topCategory.term_id
							]" :key="index" :data-categoryid="subCategory.term_id"
								:class="`${blockClassName}__filter-subcategory-list-item`" :data-layout="filterLayout">
								<button :class="`${blockClassName}__filter-subcategory-button ${updateCategoryButtonActiveStatus(
									subCategory.term_id
								)} ${blockClassName}__cta cmpl-cta-style-${categoryButtonStyle} cmpl-cta-style-${categoryButtonStyle}--${updateActiveCategoryButtonStyle(subCategory.term_id) ? 'selected' : ''
									}`" :data-categoryid="subCategory.term_id" @click="addOrRemoveIdFromActiveFilters(subCategory.term_id)"
									:disabled="updateDisabledStatus(subCategory.term_id)">
									<span v-html="subCategory.name"></span>
									<img v-if="enableFilterIcon" :src="ctaIcons.cta_filter_icon"
										:class="`${blockClassName}__filter-subcategory-button-icon`" />
								</button>
							</li>
						</ul>
					</div>
					<div :class="`${blockClassName}__filter-update-button`" v-if="filterLayout == 4">
						<button @click="modalOpen = false">{{ updateFilterText }}</button>
					</div>
				</div>
				<div v-if="filterLayout == 3" :class="`${blockClassName}__filter-categories`"
					:data-layout="filterLayout">
					<div :class="`${blockClassName}__filter-categories-container`">
						<ul v-if="showTopLevelFilters" @click="toggleTopLevelContainerStatus" :class="`${blockClassName}__filter-top-level-categories ${blockClassName}__filter-top-level-category-container ${topLevelContainerStatus ? 'open' : ''
							}`" :data-layout="filterLayout">
							<li :class="`${blockClassName}__filter-top-level-category ${placeholderFilterStatus ? 'currently-selected' : ''
								}`" @click="toggleActiveTopLevelCategory('placeholder')" v-if="enablePlaceholderFilter"
								data-categoryid="placeholder">
								<button :class="`${blockClassName}__cta  cmpl-cta-style-${showTopLevelFilters ? topLevelCategoryButtonStyle : 'none'
									} `">
									<span>{{ placeholderFilterText }}</span><img v-if="enableTopLevelFilterIcon"
										:src="ctaIcons.cta_filter_icon"
										:class="`${blockClassName}__filter-top-level-category-button-icon style-svg`" />
								</button>
							</li>
							<li v-for="(topCategory, index) in computedCategories?.topLevelCategories"
								v-bind:key="index" :class="`${blockClassName}__filter-top-level-category ${topLevelCategoryActiveStatus(topCategory.term_id)
									? 'currently-selected'
									: ''
									}`" :data-categoryid="topCategory.term_id" :data-layout="filterLayout"
								@click="toggleActiveTopLevelCategory(topCategory.term_id)">
								<button :class="`${blockClassName}__cta ${topLevelCategoryActiveStatus(topCategory.term_id)
									? blockClassName +
									'__cta-style-' +
									topLevelCategoryButtonStyle +
									'--selected'
									: ''
									}  cmpl-cta-style-${showTopLevelFilters ? topLevelCategoryButtonStyle : 'none'
									} `">
									<span v-html="topCategory?.name"></span><img v-if="enableTopLevelFilterIcon"
										:src="ctaIcons.cta_filter_icon"
										:class="`${blockClassName}__filter-top-level-category-button-icon style-svg`" />
								</button>
							</li>
						</ul>
					</div>
					<div :class="`${blockClassName}__filter-subcategories-container`">
						<ul v-for="(topCategory, index) in computedCategories?.topLevelCategories" v-bind:key="index"
							@click="toggleSubcategoryListContainer(topCategory?.term_id)" :class="`${blockClassName}__filter-subcategory-list ${topLevelCategoryActiveStatus(topCategory?.term_id)
								? blockClassName + '__filter-subcategory-list--active'
								: ''
								} ${subCategoryListOpenStatus(topCategory?.term_id) ? 'open' : ''}`" :data-layout="filterLayout"
							:data-topcategoryid="topCategory?.term_id" :style="`${subFilterOverflowStyles}`">
							<li v-for="(subCategory, index) in computedCategories.subCategories[
								topCategory?.term_id
							]" :key="index" :data-categoryid="subCategory.term_id" :class="`${blockClassName}__filter-subcategory-list-item ${updateCategoryButtonActiveStatus(
								subCategory.term_id
							)}`" :data-layout="filterLayout">
								<button :class="`${blockClassName}__filter-subcategory-button ${updateCategoryButtonActiveStatus(
									subCategory.term_id
								)} ${blockClassName}__cta cmpl-cta-style-${categoryButtonStyle} cmpl-cta-style-${categoryButtonStyle}--${updateActiveCategoryButtonStyle(subCategory.term_id) ? 'selected' : ''
									}`" :data-categoryid="subCategory.term_id" @click="addOrRemoveIdFromActiveFilters(subCategory.term_id)"
									:disabled="updateDisabledStatus(subCategory.term_id)">
									<span v-html="subCategory.name"></span>
									<img v-if="enableFilterIcon" :src="ctaIcons.cta_filter_icon"
										:class="`${blockClassName}__filter-subcategory-button-icon style-svg`" />
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div :class="`${blockClassName}__grid`">
			<TransitionGroup :name="fields.filter_results_transition">
				<div :class="`${blockClassName}__post-container`" :style="`
					--post-container-background-colour: ${postContainerBackgroundColour(
					post
				)}; --post-container-grid-gap-mobile: ${fields.post_container_grid_gap_mobile
					}; --post-container-grid-gap-portrait: ${fields.post_container_grid_gap_portrait
					}; --post-container-grid-gap-desktop: ${fields.post_container_grid_gap_desktop
					}; --post-container-grid-auto-rows: ${fields.post_container_grid_auto_rows?.slice(
						2
					)}; --post-container-grid-auto-columns: ${fields.post_container_grid_auto_columns?.slice(
						2
					)}; --post-container-grid-template-rows: ${fields.post_container_grid_template_rows
					}; --post-container-grid-template-columns: ${fields.post_container_grid_template_columns
					};`" v-for="post in pagedPosts" :key="post.slug">
					<PostComponent :postDataConfig="postDataConfig" :post="post" :fields="fields" :options="options"
						:mappedIcons="mappedIcons" :ctaStyles="ctaStyles" :globalImages="globalImages"
						:imageSizesAttribute="imageSizesAttribute"
						:gradientOverlayColour="postContainerGradientOverlayColour(post)">
					</PostComponent>
				</div>
			</TransitionGroup>
		</div>

		<div :class="`${blockClassName}__load-more-container`" ref="loadMore" role="button" tab-index="0"
			:aria-label="loadMoreText" :title="loadMoreText" v-if="computedLoadMore && enableLoadMoreButton">
			<a :href="`${nextPage}`" ref="loadButton" @click.prevent="
				page = page + 1;
			incrementLoadMoreStatus(); loadMorePosts();
			" :class="`${blockClassName}__load-more-button ${blockClassName}__cta cmpl-cta-style-${loadMoreButtonStyle} cmpl-cta-animation-style-${loadMoreAnimationStyle}`">
				<span :class="`cmpl-cta-span  ${isLoading ? 'hide-text' : ''}`">{{ loadMoreText }}</span> <span
					:class="`loader ${isLoading ? 'show-spinner' : ''}`"></span>
				<span :class="`${blockClassName}__cta-icon cmpl-cta-icon`" v-if="enableLoadMoreIcon"
					v-html="loadmoreIconImage"></span>
			</a>
		</div>

	</div>
</template>

<script setup>
import { ref, reactive, onMounted, useAttrs, computed, watch } from "vue";
import PostComponent from "./post-type-filter-grid-v3/post-component.vue";
import TextSearch from "./post-type-filter-grid-v3/text-search.vue";

// get content data from window
const attrs = useAttrs();
const ptfgData = window["ptfgData" + attrs.blockid];
// if (!ptfgData) {
// 	console.log('No ptfgData found');
// 	return;
// }

// defining refs
let page = ref(0);
let loadMoreStatus = ref(1);
let topLevelContainerStatus = ref(false);
let activeTopLevelCategories = ref([]);
let placeholderFilterStatus = ref(true);

let activeFilterCategories = ref([]);
let openSubCategoryListContainers = ref([]);
let enableCategoryDisabledStatus = ref(false);

// ref dom elements
const textSearchInput = ref(null);
const filterBlock = ref(null);

// defining constant variables
const blockClassName = "post-type-filter-grid-v3";
const fields = ptfgData.fields;
let modalOpen = ref(false);

const sortText = "Sort";
const sortByText = fields.sort_by_text;

const openFilterText = fields.mobile_filter_label
	? fields.mobile_filter_label
	: "Open Filter";
const closeFilterText = "Close Filter";
const updateFilterText = fields.mobile_filter_update_label
	? fields.mobile_filter_update_label
	: "Update Filter";

const ajaxUrl = ptfgData.ajaxUrl;
const isLoading = ref(false);
const options = ptfgData.options;
const allPosts = reactive({ items: ptfgData.posts });
const allProducts = ptfgData.allProducts;
const postDataConfig = ptfgData.postDataConfig;
const allCategories = ptfgData.taxonomies;
const mappedIcons = ptfgData.mappedIcons;
const ctaStyles = ptfgData.ctaStyles;
const totalPosts = ptfgData.total;

const ctaIcons = ptfgData.theme_cta_icons;
const globalImages = ptfgData.global_images;
const gridColumnsDesktop = fields.columns_desktop;
const gridColumnsPortrait = fields.columns_tablet_portrait;
const gridColumnsMobile = fields.columns_mobile;
const containerWidth = 100;
const defaultImageSizes = `(min-width: 1440px) ${containerWidth / gridColumnsDesktop}vw, (min-width: 1024px) ${containerWidth / gridColumnsDesktop}vw, (min-width: 768px) ${containerWidth / gridColumnsPortrait}vw, (min-width: 500px) ${containerWidth / gridColumnsMobile}vw, ${containerWidth / gridColumnsMobile}vw`;
const customSizesAttribute = fields.custom_image_sizes;
const imageSizesAttribute = customSizesAttribute ? customSizesAttribute : defaultImageSizes;
const postType = fields.post_type?.replace("__", "");
const sorting = fields.sorting?.replace("__", "");
const filterLayout = fields.filter_layout?.toString().replace("__", "");
const topLevelCategoryButtonStyle = fields.top_level_category_button_style
	?.toString()
	.replace("__", "");
const categoryButtonStyle = fields.category_button_style?.toString().replace("__", "");
const loadMoreButtonStyle = fields.load_more_button_style?.toString().replace("__", "");
const loadMoreAnimationStyle =
	ctaStyles[parseInt(loadMoreButtonStyle) - 1]?.cta_settings
		?.cta_animation_style;
const toggleFilterButtonStyle = fields.toggle_filter_button_style
	?.toString()
	.replace("__", "");
const showAllButtonStyle = fields.show_all_button_style?.toString().replace("__", "");
const enableLoadMoreButton = fields.enable_load_more_button;
const showFilters = fields.show_filters;
const showTopLevelFilters = fields.show_top_level_filters;
const topLevelFiltersActiveOnLoad = fields.top_level_filters_active_on_load;
const singleActiveTopLevelCategory = fields.single_active_top_level_category;
const singleActiveFilter = ref(fields.single_active_filter);
const limitPostsToCategories = fields.limit_posts_to_selected_categories;
const categoriesTitleText = fields.categories_title_text;
const loadMoreText = fields.load_more_button_text;
const showAllText = fields.show_all_button_text;
const showAllPosts = fields.show_all_posts;
const postContainerBackgroundColourStyle = fields.post_container_background_style?.replace(
	"__",
	""
);
let loadmoreIconImage = '';
if (mappedIcons['cta_link_icon']) {
	loadmoreIconImage = mappedIcons['cta_link_icon']['type'] == 'image/svg+xml' ? mappedIcons['cta_link_icon']['image'] : '<img src="' + mappedIcons['cta_link_icon']['image'] + '">';
}
const enableLoadMoreIcon = ctaStyles[parseInt(loadMoreButtonStyle) - 1]?.cta_settings?.include_cta_icon;
const enableTextSearch = fields.enable_text_search;
const textSearchInputPlaceholder = fields.text_filter_placeholder;
const enableFilterIcon = fields.enable_filter_icon;
const enableTopLevelFilterIcon = fields.enable_top_level_filter_icon;
const enableStartingFilter = fields.enable_starting_filter;
const enablePlaceholderFilter = fields.enable_placeholder_filter;
const placeholderFilterText = fields.placeholder_filter_text;
const initialPostsPerPageDesktop = fields.initial_posts_per_page_desktop;
const initialPostsPerPageTablet = fields.initial_posts_per_page_portrait;
const initialPostsPerPageMobile = fields.initial_posts_per_page_mobile;
const postsPerPageDesktop = showAllPosts ? 999999 : Number(fields.posts_per_page_desktop);
const postsPerPageTablet = showAllPosts ? 999999 : Number(fields.posts_per_page_tablet);
const postsPerPageMobile = showAllPosts ? 999999 : Number(fields.posts_per_page_mobile);
const loadedCategories = [];

let devicePostsPerPage = postsPerPageDesktop;
let deviceInitialPostsPerPage = initialPostsPerPageDesktop;
if (window.innerWidth < 1024) {
	devicePostsPerPage = postsPerPageTablet;
	deviceInitialPostsPerPage = initialPostsPerPageTablet;
}
if (window.innerWidth < 768) {
	devicePostsPerPage = postsPerPageMobile;
	deviceInitialPostsPerPage = initialPostsPerPageMobile;
}
watch(
	() => modalOpen.value,
	() => {
		if (modalOpen.value) {
			document.body.classList.add("mobile-menu-active");
		} else {
			document.body.classList.remove("mobile-menu-active");
		}
	}
);


// computed variables
const computedAllPosts = computed(() => {
	if (limitPostsToCategories) {
		const allSubcategories = [];
		const allParentIds = Object.keys(computedCategories.value.subCategories);
		allParentIds.forEach((id) => {
			computedCategories.value.subCategories[id].forEach((category) => {
				allSubcategories.push(category.term_id);
			});
		});
		return filterPosts(allPosts.items, allSubcategories);
	} else {
		return allPosts.items;
	}
});
const computedFilteredPosts = computed(() => {
	let computedPosts = computedAllPosts.value;
	const posts = filterPosts(computedPosts, activeFilterCategories.value);
	return sortPosts(posts);
});

const computedLoadMore = computed(() => {
	if (showAllPosts) {
		return false;
	}
	let postsPerPage = devicePostsPerPage;
	if (page.value == 1) {
		postsPerPage = deviceInitialPostsPerPage;
	}
	if (activeFilterCategories.value.length) {
		if (computedFilteredPosts.value.length <= (page.value * postsPerPage)) {
			return false;
		}
	}
	if (
		page.value * postsPerPage < totalPosts
	) {
		return true;
	}
	return false;
});

const nextPage = computed(() => {
	const path = `https://${window.location.host}${window.location.pathname}`;
	return `${path}?pages=${page.value + 1}`;
});

const resetPage = () => {
	const path = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
	page.value = 1;
	window.history.pushState({}, "", path);
};


const computedProducts = computed(() => {
	// const updatedProducts = [];
	// allProducts.forEach((product) => {
	// 	product.slug = product["post_name"];
	// 	product.name = product["post_title"];
	// 	product.taxonomy = "products";
	// 	updatedProducts.push(product);
	// });
	// return updatedProducts;
});

const pagedPosts = computed(() => {
	if (showAllPosts) {
		return computedFilteredPosts.value;
	} else {
		return computedFilteredPosts.value.slice(
			0,
			page.value == 1
				? Number(deviceInitialPostsPerPage)
				: Number(deviceInitialPostsPerPage) +
				Number(page.value - 1) * Number(devicePostsPerPage)
		);
	}
});

const computedCategories = computed(() => {
	let topLevelCategories = [];
	const subCategories = {};
	allCategories.forEach((taxonomy) => {
		if (taxonomy.parent === 0) {
			topLevelCategories.push(taxonomy);
		} else {
			if (subCategories[taxonomy.parent]) {
				subCategories[taxonomy.parent].push(taxonomy);
			} else {
				subCategories[taxonomy.parent] = [];
				subCategories[taxonomy.parent].push(taxonomy);
			}
		}
	});
	return {
		topLevelCategories: topLevelCategories,
		subCategories: subCategories,
	};
});

// functions

const addOrRemoveIdFromActiveFilters = async (categoryId) => {
	if (singleActiveFilter.value) {
		activeFilterCategories.value = [];
		activeFilterCategories.value.push(categoryId);

		return;
	}
	if (!activeFilterCategories.value.find((element) => Number(element) === Number(categoryId))
	) {
		activeFilterCategories.value.push(categoryId);
	} else {
		activeFilterCategories.value = activeFilterCategories.value.filter(
			(element) => element !== categoryId
		);
	}
};

const filterPosts = (posts, filterCategoryIds = activeFilterCategories.value) => {
	let filteredPosts = [];
	if (filterCategoryIds.length === 0) {
		filteredPosts = posts;
	} else {
		filteredPosts = posts.filter((post) => {
			const postSubCategories = post.categories.filter(
				(category) => category.parent != 0
			);
			let categoryMatch = false;
			filterCategoryIds.forEach((categoryId) => {
				if (
					postSubCategories.find(
						(subCategory) => Number(subCategory.term_id) == Number(categoryId)
					)
				) {
					categoryMatch = true;
					return;
				}
			});
			return categoryMatch;
		});
	}

	//filter by text

	//Split the search term by , to get 'or' functionality then trim the spaces and filter empty search terms
	let searchTerm = textSearchInput.value ? textSearchInput.value : null;
	if (searchTerm) {
		const searchTerm = searchTerm
			.toLowerCase()
			.split(",")
			.map((term) => term.trim())
			.filter((term) => term != "");

		//Filter drinks based on the search terms
		const textFilteredPosts = filteredPosts.filter((post) => {
			return searchTerm.some((item) =>
				post.post_data.post_title.toLowerCase().includes(item)
			);
		});
	}
	filteredPosts = searchTerm == null ? filteredPosts : textFilteredPosts;

	return filteredPosts;
};

const sortPosts = (posts) => {
	switch (fields.sorting?.replace("__", "")) {
		case "menu-order":
			return posts.sort((a, b) => a.menu_order - b.menu_order); // Sort by menu order (ascending)
		case "date-desc":
			return posts.sort((a, b) => new Date(b.post_data.post_date) - new Date(a.post_data.post_date)); // Newest first
		case "date-asc":
			return posts.sort((a, b) => new Date(a.post_data.post_date) - new Date(b.post_data.post_date)); // Oldest first
		case "postorder":
			return posts; // Respect post type order plugin 
		default:
			return posts;
	}
};

const incrementLoadMoreStatus = () => {
	const url = new URL(window.location);
	loadMoreStatus.value = Number(loadMoreStatus.value) + 1;
	url.searchParams.set("pages", loadMoreStatus.value);

	if (!isWpAdmin()) {
		window.history.pushState({}, "", url);
	}
};

const postContainerBackgroundColour = (post) => {
	switch (postContainerBackgroundColourStyle) {
		case "none":
			return "none";
			break;

		case "colour-palette":
			return fields.post_container_background_colour;
			break;

		case "post-colour":
			return post.post_data.post_colour;
			break;
		case "post-colour-secondary":
			return post.post_data.post_colour_secondary;
			break;

		default:
			break;
	}
};

const postContainerGradientOverlayColour = (post) => {
	switch (fields.gradient_overlay_colour_type?.slice(2)) {
		case "colour-palette":
			return fields.gradient_overlay_colour;
			break;

		case "post-colour":
			return post.post_data.post_colour;
			break;
		case "post-colour-secondary":
			return post.post_data.post_colour_secondary;
			break;

		default:
			break;
	}
};

const getLoadMoreStatusParam = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const loadMore = urlParams.get("pages");
	if (loadMore) {
		loadMoreStatus.value = Number(loadMore);
		page.value += loadMoreStatus.value;

		let demandedPosts = Number(initialPostsPerPageDesktop) + (Number(page.value - 1) * Number(postsPerPageDesktop));
		let actualMaxPages = Math.ceil(Number((Number(totalPosts.value) - Number(initialPostsPerPageDesktop)) / Number(postsPerPageDesktop)));
		let retrievedPosts = Number(initialPostsPerPageDesktop);

		for (let i = 2; i <= loadMore; i++) {
			if (retrievedPosts <= totalPosts.value) {
				retrievedPosts += Number(postsPerPageDesktop);
				page.value = i;
			}
		}

		if (demandedPosts > totalPosts.value) {
			page.value = actualMaxPages;
			window.history.pushState({}, "?pages=" + page.value);
		}
		loadMoreStatus.value = loadMore;
	} else {
		resetPage();
	}
};

const setupFilterLayout = () => {
	if (!showFilters) {
		return;
	}
	if (filterLayout == 1 || filterLayout == 2 || filterLayout == 4 || filterLayout == 5) {
		const topLevelCategories = filterBlock.value.querySelectorAll(
			".post-type-filter-grid-v3__filter-category"
		);
		const primaryCategoryNames = filterBlock.value.querySelectorAll(
			".post-type-filter-grid-v3__filter-top-level-category-name"
		);
		if (topLevelFiltersActiveOnLoad) {
			if (singleActiveTopLevelCategory) {
				topLevelCategories[0].classList.add("active");
			} else {
				topLevelCategories.forEach((topLevelCategory) =>
					topLevelCategory.classList.add("active")
				);
			}
		}
		primaryCategoryNames.forEach((name) => {
			name.addEventListener("click", () => {
				name.parentElement.classList.toggle("active");
			});
		});
		if (enableStartingFilter) {
			let categoryObject;

			switch (postType) {
				case "product":
					categoryObject = fields.starting_product_filter_category;
					break;
				case "person":
					categoryObject = fields.starting_person_filter_category;
					break;

				default:
					break;
			}
			activeTopLevelCategories.value.push(categoryObject.parent);
			activeFilterCategories.value.push(categoryObject.term_id);
		}
	}
	if (filterLayout == 3) {
		if (topLevelFiltersActiveOnLoad) {
			if (singleActiveTopLevelCategory) {
				toggleActiveTopLevelCategory(
					computedCategories.value.topLevelCategories[0].term_id
				);
			} else {
				computedCategories.value.topLevelCategories.forEach((topLevelCategory) =>
					toggleActiveTopLevelCategory(topLevelCategory.term_id)
				);
			}
		}
	}

	if (showFilters) {
		filterBlock.value
			.querySelector(".post-type-filter-grid-v3__open-filter-toggle")
			.addEventListener("click", () => {
				modalOpen.value = !modalOpen.value;
			});
	}
};

const toggleTopLevelContainerStatus = () => {
	topLevelContainerStatus.value = !topLevelContainerStatus.value;
};

const topLevelCategoryActiveStatus = (id) => {
	return activeTopLevelCategories.value.find((catId) => catId == id);
};
const placeholderFilterActiveStatus = () => {
	return placeholderFilterStatus.value ? true : false;
};

const toggleSubcategoryListContainer = (id) => {
	if (id == "placeholder") {
		activeTopLevelCategories.value = [];
		activeFilterCategories.value = [];
		return;
	}
	if (openSubCategoryListContainers.value.find((categoryId) => categoryId == id)) {
		openSubCategoryListContainers.value = openSubCategoryListContainers.value.filter(
			(categoryId) => categoryId != id
		);
	} else {
		openSubCategoryListContainers.value.push(id);
	}
};

const subCategoryListOpenStatus = (id) => {
	return openSubCategoryListContainers.value.find((catId) => catId == id);
};
const updateCategoryButtonActiveStatus = (categoryId) => {
	if (
		activeFilterCategories.value.find(
			(filterCategory) => Number(filterCategory) === Number(categoryId)
		)
	) {
		return "active";
	} else {
		return "";
	}
};

const updateActiveCategoryButtonStyle = (categoryId) => {
	if (
		activeFilterCategories.value.find(
			(filterCategory) => Number(filterCategory) === Number(categoryId)
		)
	) {
		return true;
	} else {
		return false;
	}
};

const updateDisabledStatus = (categoryId) => {
	if (!enableCategoryDisabledStatus.value) {
		return false;
	}
	if (activeFilterCategories.value.length === 0) {
		return false;
	}
	if (
		activeFilterCategories.value.find(
			(filterCategory) => Number(filterCategory) === Number(categoryId)
		)
	) {
		return false;
	}
	const testCategories = [...activeFilterCategories.value];
	testCategories.push(categoryId);
	const testFilterPosts = filterPosts(allPosts.items, testCategories);
	if (testFilterPosts.length <= computedFilteredPosts.value.length) {
		return true;
	}
};
const getPostSubcategories = (post) => {
	return post.categories.filter((category) => category.parent != 0);
};
const clearAllFilters = () => {
	activeFilterCategories.value = [];
};
const getCategoryIds = () => {
	let allCategoryIds = [];
	allCategories.forEach((cat) => {
		allCategoryIds.push(cat.term_id);
	});
	// return JSON.stringify(all_cats);
	return allCategoryIds;
};

const loadMorePosts = async (currentCategoryId = null, { replace = false } = {}) => {

	if (currentCategoryId && loadedCategories.includes(currentCategoryId)) {
		console.log('category already loaded');
		return;
	}

	isLoading.value = true;
	let form_data = new FormData();
	form_data.append("action", "ptfg_next_page");
	form_data.append("pageNum", page.value);
	form_data.append("postType", postType);
	form_data.append("sorting", sorting);
	form_data.append("initialPostsPerPage", initialPostsPerPageDesktop);
	form_data.append("desktopPostsPerPage", postsPerPageDesktop);
	form_data.append("includeReviews", ptfgData.includeReviews);
	form_data.append("reviewDisplayOptions", ptfgData.reviewDisplayOptions);
	form_data.append("limitPostsToSelectedCategories", fields.limit_posts_to_selected_categories);
	form_data.append("currentMarket", ptfgData.currentMarket);

	form_data.append(
		"categoryIds",
		activeFilterCategories.value.length > 0 ? activeFilterCategories.value : getCategoryIds()
	);


	form_data.append("initialPostsPerPage", 99999);
	if (currentCategoryId && !loadedCategories.includes(currentCategoryId)) {
		console.log('category was not yet loaded... getting posts now');
		form_data.append("categoryIds", currentCategoryId);
		loadedCategories.push(currentCategoryId);
		console.log(currentCategoryId, '... added to loaded categories');
	}
	try {
		const response = await fetch(ajaxUrl, {
			method: "POST",
			body: form_data,
			credentials: "same-origin",
		});

		if (response.ok) {
			const markup = await response.text();
			const postData = JSON.parse(markup);
			if (replace) {
				allPosts.items = sortPosts(postData.posts); // Replace all posts
			} else {
				const mergedArray = [
					...allPosts.items,
					...postData.posts.filter(item2 => !allPosts.items.some(item1 => item1.id === item2.id)),
				];
				allPosts.items = sortPosts(mergedArray); // Merge as usual
			}

			isLoading.value = false;
		}
	} catch (e) {
		console.error("Get listing error:", e);
	}
};

const toggleActiveTopLevelCategory = async (id) => {
	if (id == "placeholder") {
		placeholderFilterStatus.value = true;
		activeTopLevelCategories.value = [];
		activeFilterCategories.value = [];
		return;
	}
	if (filterLayout == 3) {
		if (activeTopLevelCategories.value.find((categoryId) => categoryId == id)) {
			activeTopLevelCategories.value = activeTopLevelCategories.value.filter(
				(categoryId) => categoryId != id
			);
		} else {
			if (singleActiveTopLevelCategory == 1) {
				scrollBackToStart();
				activeTopLevelCategories.value = [];
				activeTopLevelCategories.value.push(id);
			} else {
				activeTopLevelCategories.value.push(id);
			}
		}
	}
	if (filterLayout == 4 && topLevelContainerStatus.value) {
		placeholderFilterStatus.value = false;
		activeTopLevelCategories.value = [];
		activeTopLevelCategories.value.push(id);
		activeFilterCategories.value = [];
		activeFilterCategories.value.push(computedCategories.value.subCategories[id][0].term_id);
	}
};

const scrollBackToStart = () => {
	const subCategoriesContainer = filterBlock.value.querySelector(
		".post-type-filter-grid-v3__filter-subcategories-container"
	);
	if (subCategoriesContainer) {
		subCategoriesContainer.scrollTo({ left: 0 })
	}
}

onMounted(() => {
	getLoadMoreStatusParam();
	setupFilterLayout();
	loadMorePosts();
});
</script>