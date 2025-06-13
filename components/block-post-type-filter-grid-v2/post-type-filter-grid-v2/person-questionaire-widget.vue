<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaIcons"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
    <div v-for="questions in props.post_data.person_questionaire"
        :class="`${blockClassname}__person-email ${blockClassname}__info-item ${element.text_style?.typography_style.slice(2)}`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        <img :class="`${blockClassname}__person-email-icon`" :src="props.ctaIcons.cta_email_icon">
        {{ post.post_data.person_email }}
    </div>
</template>