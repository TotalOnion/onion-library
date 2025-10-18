<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";
const props = defineProps(["post", "element"]);
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

const blockClassname = "post-type-filter-grid-v3";
const element = props.element;
</script>
<template>
	<div :class="`${blockClassname}__cocktail-tasting-notes ${blockClassname}__info-item`"
		:style="`${gridLayoutString} ${textEditorStylesString}`">
		<div v-html="props.post.post_data?.cocktail_tasting_notes"></div>
	</div>
</template>
