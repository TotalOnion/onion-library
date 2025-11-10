<script setup>
import PostAuthor from "./post-author-widget.vue";
import PostImage from "./post-image-widget.vue";
import GlobalImage from "./global-image-widget.vue";
import PostCategories from "./post-category-widget.vue";
import PostTags from "./post-tags-widget.vue";
import Divider from "./divider-widget.vue";
import PostHeadline from "./post-headline-widget.vue";
import PostLink from "./post-link-widget.vue";
import PostPublishDate from "./post-publish-widget.vue";
import PostTitle from "./post-title-widget.vue";
import Spacer from "./spacer-widget.vue";
import PostInfoDescription from "./post-info-description.vue";
import PostInfoSubtitle from "./post-info-subtitle.vue";
import PostTextAlternativeStyle from "./post-text-alternative-style.vue";
import MediaImage from "./media-widget.vue";
import BetterReviews from "./better-reviews-widget.vue";
import BuyNow from "./buy-now-widget.vue";
import ShopifyAddToCart from "./shopify-add-to-cart.vue";
const widgetComponents = {
	PostAuthor,
	PostImage,
	PostCategories,
	PostTags,
	Divider,
	PostHeadline,
	PostLink,
	PostPublishDate,
	PostTitle,
	Spacer,
	PostInfoDescription,
	PostTextAlternativeStyle,
	MediaImage,
	GlobalImage,
	BetterReviews,
	BuyNow,
	PostInfoSubtitle,
	ShopifyAddToCart,
};
const widgetNames = [];
const props = defineProps([
	"postDataConfig",
	"post",
	"ctaIcons",
	"mappedIcons",
	"ctaStyles",
	"globalImages",
	"gradientOverlayColour",
	"fields",
	"options",
	"imageSizesAttribute"
]);
props.postDataConfig?.forEach((widget) => {
	let nameArr = widget.acf_fc_layout.split("_");
	let name = "";
	nameArr.forEach((part) => {
		const caps = part.charAt(0).toUpperCase() + part.slice(1);
		name += caps;
	});
	widgetNames.push(name);
});

const blockClassname = "post-type-filter-grid-v3";
</script>

<template>
	<template v-for="(widget, index) in widgetNames" :key="index">
		<component :is="widgetComponents[widget]" :post="props.post" :fields="fields" :options="options"
			:element="props.postDataConfig[index]" :blockClassname="blockClassname" :ctaIcons="ctaIcons"
			:ctaStyles="ctaStyles" :mappedIcons="mappedIcons" :globalImages="globalImages"
			:imageSizesAttribute="props.imageSizesAttribute" />
	</template>
</template>
