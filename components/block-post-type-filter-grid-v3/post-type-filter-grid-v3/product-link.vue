<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaIcons"]);
const blockClassname = "post-type-filter-grid-v3";
const gridLayoutString = gridLayoutElement(props);

</script>
<template>
	<div :class="`${blockClassname}__product-link ${blockClassname}__info-item`" :style="`${gridLayoutString}`">
		<a :href="props.post.link" :class="`${blockClassname}__cta cmpl-cta-style-${element.cta_style.slice(
			2
		)}`" :style="`${gridLayoutString}`" v-if="element.product_link_text">{{ element.product_link_text }}</a>
	</div>
</template>
