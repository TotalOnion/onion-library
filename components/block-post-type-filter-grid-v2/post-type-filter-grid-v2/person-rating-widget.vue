<script setup>
import { gridLayoutElement } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);

</script>
<template>
    <div :class="`${blockClassname}__person-rating ${blockClassname}__info-item`" :style="`${gridLayoutString}`">
        <div :class="`${blockClassname}__person-rating-star-container`" :key="index">
            <svg :class="`${blockClassname}__person-rating-star`" v-for="index in Number(post.post_data.star_rating)"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19.02">
                <defs></defs>
                <g id="a" />
                <g id="b">
                    <g id="c">
                        <polygon class="d"
                            points="10 15.77 3.82 19.02 5 12.14 0 7.27 6.91 6.26 10 0 13.09 6.26 20 7.27 15 12.14 16.18 19.02 10 15.77" />
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>