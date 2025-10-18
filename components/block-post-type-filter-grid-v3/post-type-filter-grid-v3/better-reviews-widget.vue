<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";
const blockClassname = "post-type-filter-grid-v3";

const props = defineProps(["post", "element"]);
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
	<div :class="`${blockClassname}__better-reviews ${blockClassname}__info-item`"
		:style="`${gridLayoutString} ${textEditorStylesString}`">
		<div v-html="props.post.rating"></div>
	</div>
</template>