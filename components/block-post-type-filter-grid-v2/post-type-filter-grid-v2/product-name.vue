<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);

</script>
<template>
	<div :class="`${blockClassname}__product-link ${blockClassname}__info-item ${props.element.text_style?.typography_style.slice(
		2
	)}`" :style="`${gridLayoutString}`">
		<h4 :class="`${element.text_style?.typography_style.slice(2)}`"
			:style="`--text-align: ${props.element.text_style?.text_align.slice(2)}; --text-transform: ${props.element.text_style?.text_transform.slice(2)}; --font-weight: ${props.element.text_style.text_font_weight.slice(2)}; --text-colour: ${textColour}`">
			{{ props.post.post_data?.product_name }}</h4>
	</div>
</template>
