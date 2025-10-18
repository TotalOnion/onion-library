<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";
const props = defineProps(["post", "element"]);
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
const blockClassname = "post-type-filter-grid-v3";
const textColourType = props.element?.text_style?.text_colour.slice(2);
let textColour = textColourType;

if (textColourType == "post_text_colour_style") {
	textColour = props.post.post_data?.post_text_colour_style?.slice(2);
}
if (textColourType == "post_colour") {
	textColour = props.post.post_data?.post_colour;
}
</script>
<template>
	<div :class="`${blockClassname}__drink-tastes ${blockClassname}__info-item`"
		:style="`${gridLayoutString} ${textEditorStylesString}`">
		<template v-for="(category, index) in props.post.categories" :key="index">
			<div v-if="category.taxonomy === 'taste'" v-html="category.name" :class="`${blockClassname}__drink-taste--item ${element.text_style?.typography_style.slice(
				2
			)}`"></div>
		</template>
	</div>
</template>
