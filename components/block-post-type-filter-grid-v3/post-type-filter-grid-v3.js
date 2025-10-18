import {createApp} from 'vue';
import posttypefiltergridv3 from './post-type-filter-grid-v3.vue';

export default function posttypefiltergridv3Js(options = {}) {
	try {
		const {block} = options;
		const mountElement = block.children[0];
		createApp(posttypefiltergridv3, {...mountElement.dataset}).mount(
			mountElement
		);
	} catch (error) {
		console.error(error);
	}
}
