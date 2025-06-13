<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaIcons", "blockClassname"]);
const blockClassname = props.blockClassname;

const gridLayoutString = gridLayoutElement(props);


</script>
<template>
    <div :href="props.post.link" :class="`${blockClassname}__post-text-alternative-style ${blockClassname}__info-item`"
        :style="`${gridLayoutString}`">
        <h3 :class="`${blockClassname}__post-text-alternative-style-text`"
            v-html="post.post_data.post_text_alternative_style">
        </h3>
    </div>
</template>