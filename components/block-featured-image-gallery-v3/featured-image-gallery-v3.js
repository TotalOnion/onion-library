export default function featuredImagegalleryJs(options = {}) {
	try {
		const {block} = options;
		const featuredImageContainer = block.querySelector(
			`.featured-image-gallery-v3__featured-image-container`
		);
		const featuredImage = block.querySelector(
			`.featured-image-gallery-v3__featured-image`
		);
		const otherImages = block.querySelectorAll(
			`.featured-image-gallery-v3__image`
		);
		otherImages.forEach((image) => {
			image.addEventListener('click', function updateSrc() {
				featuredImageContainer.classList.add('changing-image');
				setTimeout(() => {
					featuredImage.setAttribute('src', this.getAttribute('src'));
					featuredImage.setAttribute('alt', this.getAttribute('alt'));
					featuredImage.setAttribute(
						'srcset',
						this.getAttribute('srcset')
					);
					featuredImageContainer.classList.remove('changing-image');
				}, 800);
			});
		});
	} catch (error) {
		console.error(error);
	}
}
