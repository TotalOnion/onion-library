<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaIcons", "blockClassname"]);
const blockClassname = props.blockClassname;

const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
	<a :href="props.post.link" :class="`${blockClassname}__post-title ${blockClassname}__info-item`"
		:style="`${gridLayoutString}`">
		<h3 :class="`${element.text_style?.typography_style.replace('__', '')}`" :style="`${textEditorStylesString}`"
			v-html="post.post_title">
		</h3>
		<img :class="`${blockClassname}__post-title-icon`" v-if="element.enable_icon" :src="ctaIcons.cta_load_more_icon"
			alt="title icon">
	</a>
</template>