<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
</script>
<template>
	<div :class="`${blockClassname}__product-nose ${blockClassname}__info-item ${element.text_style?.typography_style.slice(
		2
	)}`" :style="`${gridLayoutString} ${textEditorStylesString}`">
		<h4 v-if="element.headline_text">{{ element.headline_text }}</h4>
		{{ props.post.post_data.product_nose }}
	</div>
</template>
