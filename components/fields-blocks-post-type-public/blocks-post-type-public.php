<?php
// Add wp_block post type to ACF post options
add_filter( 'acf/get_post_types', 'athena_acf_add_post_type_wp_block', 10, 1 );
function athena_acf_add_post_type_wp_block( $post_types ) {
	if( ! in_array( 'wp_block', $post_types ) ) {
	  $post_types[] = 'wp_block';
	}
	return $post_types;
};

// Enable preview for wp_block post type
add_filter( 'register_wp_block_post_type_args', 'athena_change_wp_block_args', 10, 1 );
function athena_change_wp_block_args( $args ) {
	$args['public'] = true;
	$args['publicly_queryable'] = false;
	$args['has_archive'] = false;
    return $args;
}
