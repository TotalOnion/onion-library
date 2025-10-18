<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v3";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
</script>
<template>
	<div :class="`${blockClassname}__product-c7-slug ${blockClassname}__info-item`"
		:style="`${gridLayoutString} ${textEditorStylesString}`">
		<div class="c7-buy-product c7-buy-variant" :data-product-slug="`${props.post.post_data.c7_slug}`"></div>
	</div>
</template>
