<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);
</script>
<template>
    <div :class="`${blockClassname}__post-info-description ${blockClassname}__info-item`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        <p :class="`${element.text_style?.typography_style.slice(2)}`">{{ post.post_data.post_info_description }}</p>
    </div>
</template>