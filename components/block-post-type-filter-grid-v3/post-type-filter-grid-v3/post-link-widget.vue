<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";
const blockClassname = "post-type-filter-grid-v3";
const props = defineProps(["post", "element", "mappedIcons", "ctaStyles", "blockClassname", "options"]);
const postColour = props.post.post_data.post_colour;
const postTextColourStyle = props.post.post_data?.post_text_colour_style?.replace('__', '');
let ctaStyle = '';
if (typeof props.element.cta_style == 'string') {
    ctaStyle = props.element?.cta_style?.replace("__", '');
} else {
    ctaStyle = props.element?.cta_style;
}
let postCtaStyle = ctaStyle;
let postCtaStyleValue = '';
let ctaAnimationStyle = '';
if (props.element?.cta_style_select) {
    if (props.element?.cta_style_select?.replace('__', '') == 'post-colour') {
        postCtaStyle = 'post-colour';
        postCtaStyleValue = `color: ${postColour};--post-text-colour-style: ${postColour};`;
    }
    if (props.element?.cta_style_select?.replace('__', '') == 'post-text-colour-style') {
        postCtaStyle = 'post-text-colour-style';
        postCtaStyleValue = `color: ${postTextColourStyle};--post-text-colour-style: ${postTextColourStyle};`;
    }
    if (props.ctaStyles) {
        ctaAnimationStyle = props.ctaStyles[ctaStyle - 1]?.cta_settings?.cta_animation_style;
    }
}
const iconImage = props.mappedIcons['cta_link_icon']['type'] == 'image/svg+xml' ? props.mappedIcons['cta_link_icon']['image'] : '<img src="' + props.mappedIcons['cta_link_icon']['image'] + '">';
const enableCtaIcon = props.ctaStyles[ctaStyle - 1]?.cta_settings?.include_cta_icon;
const gridLayoutString = gridLayoutElement(props);
</script>
<template>
    <div :class="`${blockClassname}__post-link ${blockClassname}__info-item`" :style="`${gridLayoutString}`">
        <a :href="post?.link" :style="`${postCtaStyleValue}`"
            :class="`${blockClassname}__cta ${blockClassname}__cta-style-${postCtaStyle} cmpl-cta-style-${postCtaStyle}  cmpl-cta-animation-style-${ctaAnimationStyle}`"
            v-if="element.post_link_text">
            <span :class="`${blockClassname}__cta-span`">{{ element.post_link_text }}</span>
            <span :class="`${blockClassname}__cta-icon cmpl-cta-icon ${blockClassname}__icon-image`"
                v-if="enableCtaIcon" v-html="iconImage">
            </span>
        </a>
    </div>
</template>