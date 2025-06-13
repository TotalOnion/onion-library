<?php

add_filter( 'block_categories_all' , function( $categories ) {
	$childPatterns = array(
		'childPatterns' => array(
			'slug'  => 'child-patterns',
			'title' => 'Child Patterns'
		)
	);

	$position = 0;

	$categories = array_slice( $categories, 0, $position, true ) + $childPatterns + array_slice( $categories, $position, null, true );

	$categories = array_values( $categories );

	return $categories;
} );
