<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";
const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);

</script>
<template>
    <div :class="`${blockClassname}__post-divider ${blockClassname}__info-item`" :style="`${gridLayoutString}`">
    </div>
</template>