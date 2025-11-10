<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "fields", "imageSizesAttribute"]);
const blockClassname = "post-type-filter-grid-v3";
const imageType = props.element?.image_select?.replace('__', '');
const imageTypeSecondary = 'image_alt';
const setAsBackgroundImage = props.element?.set_as_background_image;
let positioningString = '';
let postImageWidthString = `--post-image-width-mobile: ${props.element.post_image_width_mobile || props.element.post_image_width}%; --post-image-width-portrait: ${props.element.post_image_width_portrait || props.element.post_image_width}%; --post-image-width-desktop: ${props.element.post_image_width}%;`;
if (imageType === 'image_accent') {
    const elementPositioning = props.element?.post_image_positioning.element_positioning;
    positioningString = `
--element-rotation-desktop: ${elementPositioning.desktop_positioning.element_rotation_desktop}deg;
--element-rotation-mobile: ${elementPositioning.desktop_positioning.element_rotation_desktop}deg;
--element-z-index: ${elementPositioning.element_z_index};
--element-horizontal-offset-mobile: ${elementPositioning.mobile_positioning.horizontal_offset}%;
--element-vertical-offset-mobile: ${elementPositioning.mobile_positioning.vertical_offset}%;
--element-horizontal-offset-desktop: ${elementPositioning.desktop_positioning.horizontal_offset}%;
--element-vertical-offset-desktop: ${elementPositioning.desktop_positioning.vertical_offset}%;
--mobile-horizontal-placement: ${elementPositioning.mobile_positioning.horizontal_snap?.replace('__', '')};
--mobile-vertical-placement: ${elementPositioning.mobile_positioning.vertical_snap?.replace('__', '')};
--desktop-horizontal-placement: ${elementPositioning.desktop_positioning.horizontal_snap?.replace('__', '')};
--desktop-vertical-placement: ${elementPositioning.desktop_positioning.vertical_snap?.replace('__', '')};
--element-position: ${elementPositioning.element_position};

`;
    postImageWidthString = `--post-image-width-mobile: calc( ${props.element.post_image_width_mobile_px} / var(--mobile-design-reference) * var(--screen-width-mobile)); --post-image-width-desktop: calc(${props.element.post_image_width_desktop_px} / var(--desktop-design-reference) * var(--screen-width-desktop));`;
}
console.log(props.imageSizesAttribute);


const gridLayoutString = gridLayoutElement(props);

const styleString = `--post-image-border-radius: ${props.fields.post_image_border_radius};`
let postType = props.post.post_data.post_type;
let sizes = props.imageSizesAttribute || "(min-width: 1440px) 50vw, (min-width: 1024px) 50vw, (min-width: 768px) 768px') 100vw";

</script>
<template>
    <a :class="`${blockClassname}__post-image-container-link ${blockClassname}__info-item ${blockClassname}__post-image-container--${imageType} ${blockClassname}__post-image-container-link--${props.fields.show_alt_image_on_hover ? 'show-alt-image-on-hover' : 'no-hover'} ${setAsBackgroundImage ? blockClassname + '__post-image-container-link--set-as-background-image' : ''}`"
        :href="props.post.link" :aria-label="props.post.post_title" :style="`${gridLayoutString}`">
        <img v-if="props.post.post_images['post_' + imageType + '_src']"
            :class="`${blockClassname}__post-image ${blockClassname}__post-${imageType} ${blockClassname}__post-image--${imageType}`"
            loading="lazy" :src="props.post.post_images['post_' + imageType + '_src']"
            :width="props.post.post_images['post_' + imageType + '_width']"
            :height="props.post.post_images['post_' + imageType + '_height']"
            :srcset="props.post.post_images['post_' + imageType + '_srcset']" :sizes=sizes
            :alt="props.post.post_images['post_' + imageType + '_alt_text']"
            :style="`${styleString} ${positioningString} ${postImageWidthString}`" />
        <img v-if="props.fields.show_alt_image_on_hover"
            :class="`${blockClassname}__post-image--secondary ${blockClassname}__post-${imageTypeSecondary}`"
            loading="lazy" :src="props.post.post_images['post_' + imageTypeSecondary + '_src']"
            :width="props.post.post_images['post_' + imageTypeSecondary + '_width']"
            :height="props.post.post_images['post_' + imageTypeSecondary + '_height']"
            :srcset="props.post.post_images['post_' + imageTypeSecondary + '_srcset']" :sizes=sizes
            :alt="props.post.post_images['post_' + imageTypeSecondary + '_alt_text']"
            :style="`${postImageWidthString}`" />
    </a>
</template>