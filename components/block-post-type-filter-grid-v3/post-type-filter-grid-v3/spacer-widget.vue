<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element", "blockClassname"]);
const gridLayoutString = gridLayoutElement(props);

const blockClassname = "post-type-filter-grid-v3";
</script>
<template>
    <div :class="`${blockClassname}__spacer ${blockClassname}__info-item`"
        :style="`${gridLayoutString}; --spacer-size-mult:${element.size_desktop}; --spacer-size-mult-portrait:${element.size_portrait}; --spacer-size-mult-mobile:${element.size_mobile}; --spacer-bg-colour:${element.spacer_background}`">
    </div>
</template>