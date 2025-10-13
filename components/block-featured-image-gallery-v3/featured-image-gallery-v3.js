import {fadeIn} from '@pernod-ricard-global-cms/jsanimations';
import {loadCss} from '@pernod-ricard-global-cms/jsutils';

export default function featuredImagegalleryJs(options = {}) {
	try {
		const {block} = options;
		loadCss(block.dataset.assetkey, options).then(() => {
			fadeIn(block);
			const featuredImage = block.querySelector(
				`.featured-image-gallery-v3__featured-image`
			);
			const otherImages = block.querySelectorAll(
				`.featured-image-gallery-v3__image`
			);
			otherImages.forEach((image) => {
				image.addEventListener('click', function updateSrc() {
					featuredImage.setAttribute(
						'srcset',
						this.getAttribute('srcset')
					);
					featuredImage.setAttribute('src', this.getAttribute('src'));
					featuredImage.setAttribute('alt', this.getAttribute('alt'));
				});
			});
		});
	} catch (error) {
		console.error(error);
	}
}
