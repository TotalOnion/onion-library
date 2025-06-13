<script setup>
import { computed } from 'vue'
import { gridLayoutElement, textEditorStyles } from "./ptfg-utils.vue";

const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const gridLayoutString = gridLayoutElement(props);
const textEditorStylesString = textEditorStyles(props);

const dateWithoutTime = computed(() => {
    if (props.post.post_date) {
        const dateArray = props.post.post_date.split(' ');
        const dateDMY = dateArray[0].split('-');
        const dateObject = new Date(Date.UTC(
            parseInt(dateDMY[0]), // year
            parseInt(dateDMY[1]) - 1, // month (0-based)
            parseInt(dateDMY[2]) // day
        ));

        const url = window.location.href;
        const parts = url.split("/");
        let formattedDate;

        parts.forEach((part) => {
            if (part === "en-us") {
                formattedDate = new Intl.DateTimeFormat("en-US").format(
                    dateObject
                );
            } else {
                formattedDate = new Intl.DateTimeFormat("en-GB").format(
                    dateObject
                );
            }
        });
        return formattedDate;
    }
});
</script>
<template>
    <p :class="`${blockClassname}__post-publish-date ${blockClassname}__info-item ${element.text_style?.typography_style.slice(2)}`"
        :style="`${gridLayoutString} ${textEditorStylesString}`">
        {{ dateWithoutTime }}
    </p>
</template>