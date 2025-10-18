<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";
const props = defineProps(["post", "element", "ctaIcons", "blockClassname"]);

const gridLayoutString = gridLayoutElement(props);

const blockClassname = props.blockClassname;
const ctaIcons = props.ctaIcons;
const element = props.element;
const ctaStyle = element.cta_style.replace("__", "");

const post = props.post;
</script>
<template>
	<div
		:class="`${blockClassname}__shopify shopify-add-to-cart ${blockClassname}__info-item shopify-wrapper shopify-integration has-shop shop-shopify`"
		:data-label="`${element.shopify_text}`"
		:data-shopifya2cbtnstyle="`cmpl-cta-style-${element.cta_style}`"
		:data-pim="post.post_data.shopify_pim_id"
		:style="`--post-colour: ${postColour}; --post-text-colour-style: ${postTextColourStyle}; ${gridLayoutString}`"
		v-if="element.product_type.slice(2) == 'standard'"
	></div>
	<div
		:class="`${blockClassname}__shopify shopify-add-to-cart ${blockClassname}__info-item shopify-wrapper shopify-integration has-shop shop-shopify engraved`"
		:data-label="`${element.shopify_text}`"
		:data-shopifya2cbtnstyle="`cmpl-cta-style-${element.cta_style}`"
		:data-pim="post.post_data.shopify_engraved_pim_id"
		:style="`--post-colour: ${postColour}; --post-text-colour-style: ${postTextColourStyle}; ${gridLayoutString}`"
		v-if="element.product_type.slice(2) == 'engraved'"
	></div>
</template>
