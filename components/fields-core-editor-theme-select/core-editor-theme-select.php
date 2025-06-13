<?php

add_filter('acf/load_field/name=page_theme', 'get_theme_name_data');

function get_theme_name_data($field)
{
	$field['choices'] = array();
	$count = 1;
	$choices = THEMES_OPTIONS['themes'];

	if (is_array($choices)) {
		foreach ($choices as $choice) {
			$field['choices'][$count] = $choice[array_key_first($choice)];
			$count++;
		}
	}

	return $field;
}
