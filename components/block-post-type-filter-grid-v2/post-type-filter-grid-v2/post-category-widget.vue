<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";

const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
    <div :class="`${blockClassname}__post-category ${blockClassname}__info-item`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        <template v-for="(category, index) in props.post.categories" :key="index">
            <p v-if="category.taxonomy != 'translation_priority'" v-html="category.name"
                :class="`${blockClassname}__post-category--item ${element.text_style?.typography_style.slice(2)}`">
            </p>
        </template>
    </div>
</template>