<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);


</script>
<template>
	<div :class="`${blockClassname}__product-whisky-type ${blockClassname}__info-item ${element.text_style?.typography_style.slice(
			2
		)}`" :style="`${gridLayoutString} ${textEditorStylesString}`" v-if="post.post_data.product_whisky_type">
		<p :class="`${element.text_style?.typography_style.slice(2)}`" :style="`--text-align: ${element.text_style?.text_align.slice(
			2
		)}; --text-transform: ${element.text_style?.text_transform.slice(
			2
		)}; --font-weight: ${element.text_style.text_font_weight.slice(
			2
		)}; --text-colour: ${textColour}`">
			{{ post.post_data.product_whisky_type }}
		</p>
	</div>
</template>
