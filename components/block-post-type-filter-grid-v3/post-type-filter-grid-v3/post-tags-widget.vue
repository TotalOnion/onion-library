<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaStyles"]);
const blockClassname = "post-type-filter-grid-v3";

const gridLayoutString = gridLayoutElement(props);
let ctaStyle = props.element?.cta_style?.replace("__", '');

</script>
<template>
    <div :class="`${blockClassname}__post-tags ${blockClassname}__info-item `" :style="`${gridLayoutString}`">
        <template v-for="(tag, index) in props.post.tags" :key="index">
            <div v-html="tag.name"
                :class="`${blockClassname}__post-tag ${blockClassname}__cta cmpl-cta-style-${ctaStyle}`">
            </div>
        </template>
    </div>
</template>