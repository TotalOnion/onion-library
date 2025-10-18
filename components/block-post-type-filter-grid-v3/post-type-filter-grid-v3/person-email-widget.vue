<script setup>
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "ctaIcons"]);
const blockClassname = "post-type-filter-grid-v3";

const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

</script>
<template>
    <a :href="`mailto:${post.post_data.person_email}`"
        :class="`${blockClassname}__person-email ${blockClassname}__info-item ${element.text_style?.typography_style.slice(2)}`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        <img v-if="element.enable_icon" :class="`${blockClassname}__person-email-icon style-svg`"
            :src="props.ctaIcons.cta_email_icon">
        {{ element.display_email_as_person_name ? post.post_data.person_name : post.post_data.person_email.toLowerCase()
        }}
    </a>
</template>