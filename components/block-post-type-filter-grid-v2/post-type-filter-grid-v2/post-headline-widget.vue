<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";

const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
    <h3 :class="`${blockClassname}__post-headline ${blockClassname}__info-item ${element.text_style?.typography_style.slice(2)}`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        {{ element.headline_text }}
    </h3>
</template>