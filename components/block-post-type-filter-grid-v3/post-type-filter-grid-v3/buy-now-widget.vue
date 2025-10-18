<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";
const props = defineProps(["post", "element", "ctaIcons", "blockClassname"]);

const gridLayoutString = gridLayoutElement(props);

const blockClassname = props.blockClassname;
const ctaIcons = props.ctaIcons;
const element = props.element;
const ctaStyle = element.cta_style.replace('__', '');

const post = props.post;

const click2buyPimId = post.post_data.click_to_buy_pim_id;
const debrainId = post.post_data.debrain_pim_id;
const productDebrainSkuId = post.post_data.debrain_sku_id;
const directLinkURL = post.product_buynow_direct_link;

const productEANs = post.post_data.mikmak_ean_ids;
const mikmakDrawerWidgetID = post.mikmak_drawer_widget_ID;
const relatedProductEANs = post.related_product_eans;

let totalProductEANs = '';
if (productEANs !== '') {
    totalProductEANs = productEANs + (relatedProductEANs !== '' ? ',' + relatedProductEANs : '');
}

</script>
<template>
    <div :class="`${blockClassname}__product-buy-now ${blockClassname}__info-item`"
        :style="`--post-colour: ${postColour}; --post-text-colour-style: ${postTextColourStyle}; ${gridLayoutString}`">
        <a href="#"
            :class="`${blockClassname}__cta cmpl-cta-style-${ctaStyle} ${blockClassname}__cta-animation-style-${ctaAnimationStyle} ctb`"
            v-if="element.buy_now_text && post.post_data.buy_now_option_select.slice(2) == 'ctb'" data-ctbuy
            :data-ctbuy-variant="click2buyPimId">
            <span :class="`${blockClassname}__cta-span`">{{ element.buy_now_text }}</span>
            <span :class="`${blockClassname}__cta-icon`" v-if="element.enable_cta_icon">
                <img :class="`${blockClassname}__icon-image style-svg`" :src="ctaIcons.cta_link_icon">
            </span>
        </a>
        <a href="#"
            :class="`dloc-link ${blockClassname}__cta cmpl-cta-style-${ctaStyle} ${blockClassname}__cta-animation-style-${ctaAnimationStyle} wtb`"
            v-if="element.buy_now_text && post.post_data.buy_now_option_select.slice(2) == 'wtb'" data-ctbuy
            :data-filter="debrainId" data-action="where-to-buy">
            <span :class="`${blockClassname}__cta-span`">{{ element.buy_now_text }}</span>
            <span :class="`${blockClassname}__cta-icon`" v-if="element.enable_cta_icon">
                <img :class="`${blockClassname}__icon-image style-svg`" :src="ctaIcons.cta_link_icon">
            </span>
        </a>
        <a :href="directLinkURL[0]"
            :class="`${blockClassname}__cta cmpl-cta-style-${ctaStyle} ${blockClassname}__cta-animation-style-${ctaAnimationStyle} link`"
            v-if="element.buy_now_text && post.post_data.buy_now_option_select.slice(2) == 'link'"
            :target="(directLinkURL[2] !== '' ? directLinkURL[2] : '_blank')">
            <span :class="`${blockClassname}__cta-span`">{{ element.buy_now_text }}</span>
            <span :class="`${blockClassname}__cta-icon`" v-if="element.enable_cta_icon">
                <img :class="`${blockClassname}__icon-image style-svg`" :src="ctaIcons.cta_link_icon">
            </span>
        </a>
        <wtb-button v-if="post.post_data.buy_now_option_select.slice(2) == 'wtb-v2' && productDebrainSkuId"
            :sku="productDebrainSkuId"></wtb-button>
        <a href="#" :data-mm-wtbid="`${mikmakDrawerWidgetID}`" :data-mm-ids="`${totalProductEANs}`"
            :data-mm-default-id="`${productEANs}`"
            :class="`${blockClassname}__cta cmpl-cta-style-${ctaStyle} ${blockClassname}__cta-animation-style-${ctaAnimationStyle} mikmak-buy-now`"
            v-if="element.buy_now_text && post.post_data.buy_now_option_select.slice(2) == 'mikmak'"
            :data-filter="debrainId">
            <span :class="`${blockClassname}__cta-span`">{{ element.buy_now_text }}</span>
            <span :class="`${blockClassname}__cta-icon`" v-if="element.enable_cta_icon">
                <img :class="`${blockClassname}__icon-image style-svg`" :src="ctaIcons.cta_link_icon">
            </span>
        </a>
    </div>
</template>