import {createApp} from 'vue';
import posttypefiltergridv2 from './post-type-filter-grid-v3.vue';

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
