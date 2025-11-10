<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "fields", "globalImages"]);
const blockClassname = "post-type-filter-grid-v3";
const imageSelect = props.element.image_select?.replace('__', '');
let globalImage = '';
if (props.globalImages[imageSelect]) {
    globalImage = props.globalImages[imageSelect]['global_image'];
}
let globalImageWidthString = `--global-image-width-mobile: ${props.element.global_image_width}%; --global-image-width-desktop: ${props.element.global_image_width}%;`;
const globalImageStyles = `--global-image-z-index: ${props.element.global_image_zindex}; --global-image-position: ${props.element.global_image_position.replace('__', '')}; --global-image-fit-style: ${props.element.global_image_fit_style.replace('__', '')}; --global-image-max-width-desktop: ${props.element.global_image_max_width_desktop}%; --global-image-max-width-mobile: ${props.element.global_image_max_width_mobile}%;`
let sizes = "(min-width: 1440px) 50vw, (min-width: 1024px) 50vw, (min-width: 768px) 768px') 100vw";

const gridLayoutString = gridLayoutElement(props);

</script>
<template>
    <img v-if="globalImage.url"
        :class="`${blockClassname}__info-item ${blockClassname}__global-image  ${blockClassname}__global-image--1`"
        loading="lazy" :src="globalImage.url" :width="globalImage.width" :height="globalImage.height" :sizes=sizes
        :alt="globalImage.alt" :style="`${gridLayoutString} ${globalImageStyles}`" />
</template>