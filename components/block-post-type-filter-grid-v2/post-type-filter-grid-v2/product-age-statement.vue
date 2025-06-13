<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";

const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
</script>
<template>
	<div :class="`${blockClassname}__product-age-statement ${blockClassname}__info-item`" :style="`${gridLayoutString}`"
		v-if="post.post_data.product_age_statement">
		<h4 :class="`${element.text_style?.typography_style.slice(2)}`" :style="`${textEditorStylesString}`">
			{{ post.post_data.product_age_statement }}
		</h4>
	</div>
</template>
