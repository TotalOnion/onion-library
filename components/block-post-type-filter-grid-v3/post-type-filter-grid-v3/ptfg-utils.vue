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
	--grid-horizontal-placement-mobile: ${element.grid_layout_element?.grid_layout_mobile?.grid_horizontal_placement_mobile?.replace('__', '') != 'default' ? element.grid_layout_element?.grid_layout_mobile?.grid_horizontal_placement_mobile?.replace('__', '') : element.grid_layout_element?.grid_horizontal_placement?.replace('__', '')};
	--grid-vertical-placement-mobile: ${element.grid_layout_element?.grid_layout_mobile?.grid_vertical_placement_mobile?.replace('__', '') != 'default' ? element.grid_layout_element?.grid_layout_mobile?.grid_vertical_placement_mobile?.replace('__', '') : element.grid_layout_element?.grid_vertical_placement?.replace('__', '')};
	--grid-column-start-portrait: ${element.grid_layout_element?.grid_column_start_portrait};
	--grid-column-span-portrait: ${element.grid_layout_element?.grid_column_span_portrait};
	--grid-row-start-portrait: ${element.grid_layout_element?.grid_row_start_portrait};
	--grid-row-span-portrait: ${element.grid_layout_element?.grid_row_span_mobile};
	--grid-horizontal-placement-portrait: ${element.grid_layout_element?.grid_layout_portrait?.grid_horizontal_placement_portrait?.replace('__', '') != 'default' ? element.grid_layout_element?.grid_layout_portrait?.grid_horizontal_placement_portrait?.replace('__', '') : element.grid_layout_element?.grid_horizontal_placement?.replace('__', '')};
	--grid-vertical-placement-portrait: ${element.grid_layout_element?.grid_layout_portrait?.grid_vertical_placement_portrait?.replace('__', '') != 'default' ? element.grid_layout_element?.grid_layout_portrait?.grid_vertical_placement_portrait?.replace('__', '') : element.grid_layout_element?.grid_vertical_placement?.replace('__', '')};
	--grid-column-start: ${element.grid_layout_element?.grid_column_start};
	--grid-column-span: ${element.grid_layout_element?.grid_column_span};
	--grid-row-start: ${element.grid_layout_element?.grid_row_start};
	--grid-row-span: ${element.grid_layout_element?.grid_row_span};
	--grid-horizontal-placement-desktop: ${element.grid_layout_element?.grid_horizontal_placement?.replace('__', '')};
	--grid-vertical-placement-desktop: ${element.grid_layout_element?.grid_vertical_placement?.replace('__', '')};`;
}

export function textEditorStyles(props) {
	const element = props.element;
	const textColourType = props.element?.text_style?.text_colour?.replace('__', '');
	let textColour = textColourType;
	if (textColourType == 'post_text_colour_style') {
		textColour = props.post.post_data?.post_text_colour_style?.replace('__', '');
	}
	if (textColourType == 'post_colour') {
		textColour = props.post.post_data?.post_colour;
	}
	return `--text-align: ${element.text_style?.text_align?.replace('__', '')}; 
    --text-transform: ${element.text_style?.text_transform?.replace('__', '')}; --font-weight: ${element.text_style?.text_font_weight?.replace('__', '')}; --text-colour: ${textColour}`;
}
</script>