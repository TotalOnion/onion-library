<script setup>
const props = defineProps(["featuredpost", "fields", "mappedIcons", "ctaStyles"]);

const blockClassname = "post-type-filter-grid-v2";
let sizes = "(min-width: 1440px) 50vw, (min-width: 1024px) 50vw, (min-width: 768px) 768px') 100vw";
const post = props.featuredpost.post;

const iconImage = props.mappedIcons['cta_link_icon']['type'] == 'image/svg+xml' ? props.mappedIcons['cta_link_icon']['image'] : '<img src="' + props.mappedIcons['cta_link_icon']['image'] + '">';
// const enableCtaIcon = props.ctaStyles[ctaStyle - 1]?.cta_settings?.include_cta_icon;
let ctaAnimationStyle = '1';
if (props.element?.cta_style_select) {
    if (props.element?.cta_style_select?.slice(2) == 'post-colour') {
        postCtaStyle = 'post-colour';
        postCtaStyleValue = `color: ${postColour};--post-text-colour-style: ${postColour};`;
    }
    if (props.element?.cta_style_select?.slice(2) == 'post-text-colour-style') {
        postCtaStyle = 'post-text-colour-style';
        postCtaStyleValue = `color: ${postTextColourStyle};--post-text-colour-style: ${postTextColourStyle};`;
    }
    if (props.ctaStyles) {
        ctaAnimationStyle = props.ctaStyles[ctaStyle - 1]?.cta_settings?.cta_animation_style;
    }
}

</script>
<template>
	<a :class="`${blockClassname}__featured-post-container-link`" :href="featuredpost.post_link" :aria-label="post.post_title">
		<div :class="`${blockClassname}__featured-post-image-container`">
			<picture>
				<source media="(min-width: 1024px)" :srcset="props.featuredpost.post_image_src" width="1" height="1" />
				<source :srcset="props.featuredpost.post_image_src_mobile" width="16" height="9"/>
				<img v-if="props.featuredpost.post_image_src" :class="`${blockClassname}__featured-post-image`"
					loading="lazy" :src="props.featuredpost.post_image_src" :width="props.featuredpost.post_image_width"
					:height="props.featuredpost.post_image_height" :srcset="props.post_image_srcset" :sizes="sizes"
					:alt="props.post_image_alt" />
			</picture>
			<div v-if="featuredpost.post_category" :class="`${blockClassname}__featured-post-category`">
				<template v-for="(category, index) in featuredpost.post_category" :key="index">
					<p v-if="featuredpost.post_category != 'translation_priority'" v-html="category.name"
						:class="`${blockClassname}__featured-post-category--item`">
					</p>
				</template>
			</div>
		</div>
		<div :class="`${blockClassname}__featured-post-content-container`">
			<h2 v-if="post.post_title" :class="`${blockClassname}__featured-post-title`">{{ post.post_title }}</h2>
			<p v-if="featuredpost.post_info_subtitle" :class="`${blockClassname}__featured-post-subtitle`">{{
		featuredpost.post_info_subtitle }}</p>
			<p v-if="featuredpost.post_info_description" :class="`${blockClassname}__featured-post-description`">{{
		featuredpost.post_info_description }}</p>
			<a v-if="featuredpost.post_link"
				:class="`${blockClassname}__featured-post-link ${blockClassname}__cta cmpl-cta-style-${fields.featured_post_button_style} cmpl-cta-animation-style-${ctaAnimationStyle}`"
				:href="featuredpost.post_link">
					<span :class="`${blockClassname}__cta-span`">Read more</span>
					<span :class="`${blockClassname}__cta-icon cmpl-cta-icon ${blockClassname}__icon-image`"
                v-html="iconImage">
            </span>
			</a>
		</div>
	</a>
</template>