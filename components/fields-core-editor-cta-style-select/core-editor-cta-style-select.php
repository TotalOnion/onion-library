<?php

add_filter('acf/load_field/name=cta_style', 'get_cta_style_data');

function get_cta_style_data($field)
{
	$field['choices'] = array();
	$count = 1;
	$choices = CTA_STYLES_OPTIONS['theme_cta_styles'];
	if (is_array($choices)) {
		foreach ($choices as $choice) {
			$field['choices'][$count] = $choice[array_key_first($choice)];
			$count++;
		}
	}

	return $field;
}
