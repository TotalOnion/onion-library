<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "fields"]);
const blockClassname = "post-type-filter-grid-v3";
const imageType = 'image';
let postType = props.post.post_data.post_type;
const gridLayoutString = gridLayoutElement(props);

</script>
<template>
    <div :class="`${blockClassname}__media-image-container ${blockClassname}__info-item`" :href="props.post.link"
        :style="`${gridLayoutString}`">
        <img :class="`${blockClassname}__post-image ${blockClassname}__media-${imageType}`" loading="lazy"
            :src="props.post.post_images['post_' + imageType + '_src']"
            :width="props.post.post_images['post_' + imageType + '_width']"
            :height="props.post.post_images['post_' + imageType + '_height']"
            :srcset="props.post.post_images['post_' + imageType + '_srcset']"
            sizes="(max-width: 414px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, (max-width: 1440px) 275px, (max-width: 1800px) 300px"
            :alt="props.post.post_images['post_' + imageType + '_alt_text']"
            :style="`--post-image-width: ${element.post_image_width}%;`" />
    </div>
</template>