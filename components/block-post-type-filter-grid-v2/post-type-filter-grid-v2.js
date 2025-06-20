// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
import {createApp} from 'vue';
import posttypefiltergridv2 from 'Assets/vue/blocks/post-type-filter-grid-v2.vue';

export default function posttypefiltergridv2Js(options = {}) {
	try {
		const {block} = options;
		const mountElement = block.children[0];
		createApp(posttypefiltergridv2, {...mountElement.dataset}).mount(
			mountElement
		);
	} catch (error) {
		console.error(error);
	}
}
