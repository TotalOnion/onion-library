<script setup>
const props = defineProps(["post", "element"]);
const blockClassname = "post-type-filter-grid-v2";
const textColourType = props.element?.text_style?.text_colour.slice(2);
let textColour = textColourType;

if (textColourType == "post_text_colour_style") {
	textColour = props.post.post_data?.post_text_colour_style?.slice(2);
}
if (textColourType == "post_colour") {
	textColour = props.post.post_data?.post_colour;
}
</script>
<template>
	<div
		:class="`${blockClassname}__cocktail-category ${blockClassname}__info-item`"
		:style="`--grid-column-start-mobile: ${
			element.grid_layout_element?.grid_column_start_mobile
		}; --grid-column-span-mobile: ${
			element.grid_layout_element?.grid_column_span_mobile
		}; --grid-row-start-mobile: ${
			element.grid_layout_element?.grid_row_start_mobile
		}; --grid-row-span-mobile: ${
			element.grid_layout_element?.grid_row_span_mobile
		}; --grid-column-start: ${
			element.grid_layout_element?.grid_column_start
		}; --grid-column-span: ${
			element.grid_layout_element?.grid_column_span
		}; --grid-row-start: ${
			element.grid_layout_element?.grid_row_start
		}; --grid-row-span: ${
			element.grid_layout_element?.grid_row_span
		}; --grid-horizontal-placement: ${element.grid_layout_element?.grid_horizontal_placement.slice(
			2
		)}; --grid-vertical-placement: ${element.grid_layout_element?.grid_vertical_placement.slice(
			2
		)}; --text-align: ${element.text_style?.text_align.slice(
			2
		)}; --text-transform: ${element.text_style?.text_transform.slice(
			2
		)}; --font-weight: ${element.text_style.text_font_weight.slice(
			2
		)}; --font-style: ${element.text_style.font_style.slice(
			2
		)}; --text-colour: ${textColour}`"
	>
		<p
			v-html="post.cocktail_category"
			:class="`${blockClassname}__cocktail-category--item ${element.text_style?.typography_style.slice(
				2
			)}`"
		></p>
	</div>
</template>
