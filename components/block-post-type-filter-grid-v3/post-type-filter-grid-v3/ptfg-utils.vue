<script>
export default function (props) {
	console.log('pointless default function');
}
export function gridLayoutElement(props) {
	const element = props.element;
	return `
	--grid-column-start-mobile: ${element.grid_layout_element?.grid_column_start_mobile};
	--grid-column-span-mobile: ${element.grid_layout_element?.grid_column_span_mobile};
	--grid-row-start-mobile: ${element.grid_layout_element?.grid_row_start_mobile};
	--grid-row-span-mobile: ${element.grid_layout_element?.grid_row_span_mobile};
	--grid-horizontal-placement-mobile: ${element.grid_layout_element?.grid_layout_mobile?.grid_horizontal_placement_mobile?.slice(2) != 'default' ? element.grid_layout_element?.grid_layout_mobile?.grid_horizontal_placement_mobile?.slice(2) : element.grid_layout_element?.grid_horizontal_placement?.slice(2)};
	--grid-vertical-placement-mobile: ${element.grid_layout_element?.grid_layout_mobile?.grid_vertical_placement_mobile?.slice(2) != 'default' ? element.grid_layout_element?.grid_layout_mobile?.grid_vertical_placement_mobile?.slice(2) : element.grid_layout_element?.grid_vertical_placement?.slice(2)};
	--grid-column-start-portrait: ${element.grid_layout_element?.grid_column_start_portrait};
	--grid-column-span-portrait: ${element.grid_layout_element?.grid_column_span_portrait};
	--grid-row-start-portrait: ${element.grid_layout_element?.grid_row_start_portrait};
	--grid-row-span-portrait: ${element.grid_layout_element?.grid_row_span_mobile};
	--grid-horizontal-placement-portrait: ${element.grid_layout_element?.grid_layout_portrait?.grid_horizontal_placement_portrait?.slice(2) != 'default' ? element.grid_layout_element?.grid_layout_portrait?.grid_horizontal_placement_portrait?.slice(2) : element.grid_layout_element?.grid_horizontal_placement?.slice(2)};
	--grid-vertical-placement-portrait: ${element.grid_layout_element?.grid_layout_portrait?.grid_vertical_placement_portrait?.slice(2) != 'default' ? element.grid_layout_element?.grid_layout_portrait?.grid_vertical_placement_portrait?.slice(2) : element.grid_layout_element?.grid_vertical_placement?.slice(2)};
	--grid-column-start: ${element.grid_layout_element?.grid_column_start};
	--grid-column-span: ${element.grid_layout_element?.grid_column_span};
	--grid-row-start: ${element.grid_layout_element?.grid_row_start};
	--grid-row-span: ${element.grid_layout_element?.grid_row_span};
	--grid-horizontal-placement-desktop: ${element.grid_layout_element?.grid_horizontal_placement?.slice(2)};
	--grid-vertical-placement-desktop: ${element.grid_layout_element?.grid_vertical_placement?.slice(2)};`;
}

export function textEditorStyles(props) {
	const element = props.element;
	const textColourType = props.element?.text_style?.text_colour?.slice(2);
	let textColour = textColourType;
	if (textColourType == 'post_text_colour_style') {
		textColour = props.post.post_data?.post_text_colour_style?.slice(2);
	}
	if (textColourType == 'post_colour') {
		textColour = props.post.post_data?.post_colour;
	}
	return `--text-align: ${element.text_style?.text_align?.slice(2)}; 
    --text-transform: ${element.text_style?.text_transform?.slice(2)}; --font-weight: ${element.text_style?.text_font_weight?.slice(2)}; --text-colour: ${textColour}`;
}
</script>