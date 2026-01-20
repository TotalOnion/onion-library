export default function posttypefiltergridv4Js(options = {}) {
  try {
    const { block } = options;
    customElements.define(
      "post-filter-module-v4",
      class extends HTMLElement {
        constructor() {
          super();
          this.filterState = {
            allposts: /* @__PURE__ */ new Set(),
            filteredposts: /* @__PURE__ */ new Set(),
            activefilters: /* @__PURE__ */ new Set(),
            setActiveFilters: function(newState) {
              Object.assign(this.filterState, newState);
              this.dispatchEvent(
                new CustomEvent("activefilters-updated")
              );
            },
            setFilteredPosts: function(newState) {
              Object.assign(this.filterState, newState);
              this.dispatchEvent(
                new CustomEvent("filteredposts-updated")
              );
            }
          };
          this.filterCategoriesDisplay = this.querySelector(
            ".post-filter-module-v4__filter-categories-display"
          );
          this.clearFiltersButton = this.querySelector(
            ".post-filter-module-v4__clear-filters-button"
          );
          this.setStateButton = this.querySelector(
            ".post-filter-module-v4__set-state-button"
          );
          this.clearFiltersButton.addEventListener(
            "click",
            this.clearFilters.bind(this)
          );
          this.addEventListener(
            "activefilters-updated",
            this.filterPosts.bind(this)
          );
          this.devMode = this.dataset.dev;
          this.devModeContent = this.dataset.devcontent;
        }
        async connectedCallback() {
          console.log("Filter Module element added to page.");
          let data;
          if (this.devMode) {
            data = await import("./dev-content/dev-content.js");
          }
          this.filterState.allposts = data[`devContent${this.devModeContent}`];
          this.filterState.categories = data[`devContentCategories`];
          this.filterState.categories.forEach((category) => {
            if (category.parentid) {
              this.filterCategoriesDisplay.insertAdjacentHTML(
                "beforeend",
                `<button class="post-filter-module-v4__category-button" data-categoryid="${category.id}">${category.name}</button>`
              );
            }
          });
          this.categorybuttons = this.querySelectorAll(
            ".post-filter-module-v4__category-button"
          );
          this.categorybuttons.forEach((button) => {
            button.addEventListener("click", () => {
              if (this.filterState.activefilters.has(
                Number(button.dataset.categoryid)
              )) {
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
          this.classList.add("loaded");
        }
        attributeChangedCallback(name, oldValue, newValue) {
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
              return this.filterState.activefilters.intersection(
                post.categories
              ).size > 0;
            }
          );
          this.filterState.setFilteredPosts.bind(this)({
            filteredposts: newFilteredPosts
          });
        }
        clearFilters(event) {
          this.filterState.setActiveFilters.bind(this)({
            activefilters: /* @__PURE__ */ new Set()
          });
        }
      }
    );
    customElements.define(
      "post-type-filter-grid-v4",
      class extends HTMLElement {
        constructor() {
          super();
          this.data = this.dataset;
          this.filterModule = this.querySelector("#filter-module");
          this.displayModule = this.querySelector("#display-module");
        }
        connectedCallback() {
          console.log("PTFG v4 element added to page.");
          this.filterModule.addEventListener(
            "filteredposts-updated",
            () => {
              this.displayModule.dataset.posts = JSON.stringify(
                this.filterModule.filterState.filteredposts
              );
            }
          );
          this.classList.add("loaded");
        }
        attributeChangedCallback(name, oldValue, newValue) {
        }
      }
    );
    customElements.define(
      "post-grid-display-module-v4",
      class extends HTMLElement {
        static observedAttributes = ["data-posts"];
        constructor() {
          super();
          this.gridContainer = this.querySelector(
            ".post-grid-display-module-v4__grid-container"
          );
        }
        connectedCallback() {
          console.log("Display module added to page.");
          this.classList.add("loaded");
        }
        attributeChangedCallback(name, oldValue, newValue) {
          this.gridContainer.innerHTML = "";
          if (newValue) {
            const posts = JSON.parse(newValue);
            posts.forEach((post) => {
              const postContent = `<div class="post-grid-display-module-v4__post-container"><h2>${post.postname}</h2><img class="post-grid-display-module-v4__post-image" src="${post["image-src"]}" alt="${post.postname}"></div>`;
              this.gridContainer.insertAdjacentHTML(
                "beforeend",
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
