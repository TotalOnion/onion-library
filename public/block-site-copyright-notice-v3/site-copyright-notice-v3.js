export default function sitecopyrightnoticev3Js(options = {}) {
  try {
    customElements.define(
      "site-copyright-notice-v3",
      class extends HTMLElement {
        static observedAttributes = ["data-copyright-text"];
        constructor() {
          super();
          let template = document.querySelector(
            "#site-copyright-notice-v3"
          );
          let templateContent = template.content;
          this.appendChild(
            document.importNode(templateContent, true)
          );
          this.classList.add("loaded");
        }
        connectedCallback() {
          console.log("Custom element added to page.");
          this.querySelector(
            ".site-copyright-notice-v3__title"
          ).innerText = this.dataset.copyrightText;
        }
        // disconnectedCallback() {
        // 	console.log('Custom element removed from page.');
        // }
        // connectedMoveCallback() {
        // 	console.log('Custom element moved with moveBefore()');
        // }
        // adoptedCallback() {
        // 	console.log('Custom element moved to new page.');
        // }
        attributeChangedCallback(name, oldValue, newValue) {
          console.log(`Attribute ${name} has changed.`);
          this.querySelector(
            ".site-copyright-notice-v3__title"
          ).innerText = this.dataset.copyrightText;
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}
