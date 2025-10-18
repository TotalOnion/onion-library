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
import SpacerV2 from "./spacer-widget.vue";
import PostInfoDescription from "./post-info-description.vue";
import PostInfoSubtitle from "./post-info-subtitle.vue";
import PostTextAlternativeStyle from "./post-text-alternative-style.vue";
import MediaImage from "./media-widget.vue";
import BetterReviews from "./better-reviews-widget.vue";
import ProductDetailsDescription from "./product-description.vue";
import ProductDetailsName from "./product-details-name.vue";
import ProductDetailsBrand from "./product-brand.vue";
import ProductAbv from "./product-abv.vue";
import ProductAgeStatement from "./product-age-statement.vue";
import ProductBazaarvoice from "./product-bazaarvoice.vue";
import ProductCaskType from "./product-cask-type.vue";
import ProductCountry from "./product-country.vue";
import ProductFinish from "./product-finish.vue";
import ProductHistory from "./product-history.vue";
import ProductLink from "./product-link.vue";
import ProductDetailsPrice from "./product-details-price.vue";
import ProductPrice from "./product-price.vue";
import ProductNose from "./product-nose.vue";
import ProductName from "./product-name.vue";
import ProductSlug from "./product-slug.vue";
import ProductTaste from "./product-taste.vue";
import ProductWhiskyType from "./product-whisky-type.vue";
import PersonName from "./person-name-widget.vue";
import PersonEmail from "./person-email-widget.vue";
import PersonRating from "./person-rating-widget.vue";
import SocialMediaItem from "./social-media-item.vue";
import BuyNow from "./buy-now-widget.vue";
import DrinkTastes from "./drink-tastes.vue";
import CocktailTastingNotes from "./cocktail-tasting-notes.vue";
import CocktailCategories from "./cocktail-category.vue";
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
	SpacerV2,
	PostInfoDescription,
	PostTextAlternativeStyle,
	MediaImage,
	GlobalImage,
	BetterReviews,
	ProductDetailsDescription,
	ProductDetailsBrand,
	ProductDetailsName,
	ProductDetailsPrice,
	ProductPrice,
	ProductAbv,
	ProductAgeStatement,
	ProductBazaarvoice,
	ProductCaskType,
	ProductCountry,
	ProductFinish,
	ProductHistory,
	ProductLink,
	ProductNose,
	ProductName,
	ProductSlug,
	ProductTaste,
	ProductWhiskyType,
	PersonEmail,
	PersonName,
	PersonRating,
	SocialMediaItem,
	BuyNow,
	CocktailTastingNotes,
	CocktailCategories,
	DrinkTastes,
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
	<div :class="`${blockClassname}__overlay ${blockClassname}__overlay--gradient-overlay-top`"
		v-if="fields.enable_gradient_overlay"
		:style="`--gradient-colour: ${props.gradientOverlayColour}; --gradient-origin: 180deg; --gradient-amount: ${fields.gradient_overlay_amount}%; --gradient-zindex: 5; --gradient-spread: ${fields.gradient_overlay_spread}%; --gradient-opacity: ${fields.gradient_overlay_opacity};--gradient-overlay-row-end: ${fields.gradient_overlay_row_end}; --gradient-overlay-row-start: ${fields.gradient_overlay_row_start};`">
	</div>
	<a v-if="fields.enable_post_cover_link" :href="post.link" target="_self"
		:class="`${blockClassname}__post-cover-link`, fields.enable_post_cover_link_hover_effect ? 'post-cover-link-hover-effect' : ''"
		:aria-label="post.title"></a>
	<template v-for="(widget, index) in widgetNames" :key="index">
		<component :is="widgetComponents[widget]" :post="props.post" :fields="fields" :options="options"
			:element="props.postDataConfig[index]" :blockClassname="blockClassname" :ctaIcons="ctaIcons"
			:ctaStyles="ctaStyles" :mappedIcons="mappedIcons" :globalImages="globalImages"
			:imageSizesAttribute="props.imageSizesAttribute" />
	</template>
</template>
