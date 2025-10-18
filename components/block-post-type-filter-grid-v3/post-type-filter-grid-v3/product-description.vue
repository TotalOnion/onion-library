<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v3";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
</script>
<template>
	<div :class="`${blockClassname}__product-details-description ${blockClassname}__info-item ${blockClassname}__post-details-description ${element.text_style?.typography_style.slice(
		2
	)}`" :style="`${gridLayoutString} ${textEditorStylesString}`">
		{{ post.post_data.product_details?.description }}
	</div>
</template>
