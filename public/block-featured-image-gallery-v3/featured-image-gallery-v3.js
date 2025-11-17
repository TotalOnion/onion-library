export default function featuredImagegalleryJs(options = {}) {
  try {
    const { block } = options;
    const featuredImageContainer = block.querySelector(
      `.featured-image-gallery-v3__featured-image-container`
    );
    const featuredImage = block.querySelector(
      `.featured-image-gallery-v3__featured-image`
    );
    const thumbnailImages = block.querySelectorAll(
      `.featured-image-gallery-v3__image-wrapper`
    );
    thumbnailImages.forEach((image) => {
      image.addEventListener("click", function updateSrc() {
        thumbnailImages.forEach((wrapper) => {
          wrapper.classList.remove(
            "featured-image-gallery-v3__image-wrapper--active"
          );
        });
        image.classList.add(
          "featured-image-gallery-v3__image-wrapper--active"
        );
        featuredImageContainer.classList.add("changing-image");
        setTimeout(() => {
          featuredImage.setAttribute(
            "src",
            this.querySelector("img").getAttribute("src")
          );
          featuredImage.setAttribute(
            "alt",
            this.querySelector("img").getAttribute("alt")
          );
          featuredImage.setAttribute(
            "srcset",
            this.querySelector("img").getAttribute("srcset")
          );
          featuredImageContainer.classList.remove("changing-image");
        }, 800);
      });
    });
  } catch (error) {
    console.error(error);
  }
}
