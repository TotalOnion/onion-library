module.exports = {
	templatevuefile: function (newBlockName) {
		return `
<template>
	<div>
	</div>
</template>

<script lang="javascript">
import animations from "@pernod-ricard-global-cms/jsanimations";
export default {
	name: "${newBlockName}",
	data() {
		return {
			allDrinks: [],
		};
	},
	beforeMount() {
	},
	mounted() {

	},
	methods: {

	},
	computed: {

	},
};
</script>

`;
	},
	templatejs: function (newBlockName) {
		return `
import {loadCss} from '@total_onion/onion-utils/onion-utils';
';
import {createApp} from 'vue';
import ${newBlockName} from 'Assets/vue/blocks/${newBlockName}.vue'; 

export default function ${newBlockName.replaceAll('-', '')}Js ( options = {} ) {
	try {
		const { block } = options;
		loadCss(block.dataset.assetkey, options).then(() => {
			const mountElement = block.children[0];
			createApp(${newBlockName}, {...mountElement.dataset}).mount(mountElement);
		});
	} catch ( error ) {
		console.error( error );
	}
}`;
	},
	templatetwig: function (newBlockName) {
		return `
	<div id="${newBlockName}"></div>
`;
	}
};
