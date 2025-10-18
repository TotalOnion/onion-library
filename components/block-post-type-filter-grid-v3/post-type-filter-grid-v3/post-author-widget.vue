<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v3";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
    <p :class="`${blockClassname}__post-author ${blockClassname}__info-item ${element.text_style?.typography_style.slice(2)}`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        {{ post.author_display_name }}
    </p>
</template>