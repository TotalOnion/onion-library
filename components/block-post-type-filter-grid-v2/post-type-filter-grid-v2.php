<?php

acf_register_block_type(
	array(
		'name'            => 'post-type-filter-grid-v2',
		'title'           => __('Post type filter grid v2', 'Global Theme Admin'),
		'render_callback' => 'athena_block_render_post_object',
		'category'        => 'common',
		'icon'            => get_svg_icon_content('brick.svg'),
		'keywords'        => array('content', 'text'),
		'mode'            => 'preview',
		'supports'        => array(
			'align'  => false,
			'anchor' => true,
		),
	)
);

function ptfg_next_page()
{
	$pageNum = isset($_REQUEST['pageNum']) ? stripslashes($_REQUEST['pageNum']) : null;
	$sorting = isset($_REQUEST['sorting']) ? stripslashes($_REQUEST['sorting']) : 'postorder';
	$postType = isset($_REQUEST['postType']) ? stripslashes($_REQUEST['postType']) : null;
	$currentMarket = isset($_REQUEST['currentMarket']) ? stripslashes($_REQUEST['currentMarket']) : null;
	$categoryIds = isset($_REQUEST['categoryIds']) ? stripslashes($_REQUEST['categoryIds']) : 'all';
	$limitPostsToSelectedCategories = isset($_REQUEST['limitPostsToSelectedCategories']) ? stripslashes($_REQUEST['limitPostsToSelectedCategories']) : null;
	$initialPostsPerPage = isset($_REQUEST['initialPostsPerPage']) ? stripslashes($_REQUEST['initialPostsPerPage']) : null;
	$desktopPostsPerPage = isset($_REQUEST['desktopPostsPerPage']) ? stripslashes($_REQUEST['desktopPostsPerPage']) : null;
	$includeReviews = isset($_REQUEST['includeReviews']) ? stripslashes($_REQUEST['includeReviews']) : null;
	$reviewDisplayOptions = isset($_REQUEST['reviewDisplayOptions']) ? stripslashes($_REQUEST['reviewDisplayOptions']) : null;
	$context['pageNum'] = $pageNum;
	$context['sorting'] = $sorting;
	$context['postType'] = $postType;
	$context['categoryIds'] = $categoryIds;
	$context['limitPostsToSelectedCategories'] = $limitPostsToSelectedCategories;
	$context['initialPostsPerPage'] = $initialPostsPerPage;
	$context['desktopPostsPerPage'] = $desktopPostsPerPage;
	$context['includeReviews'] = $includeReviews;
	$context['reviewDisplayOptions'] = $reviewDisplayOptions;
	do_action('wpml_switch_language', $currentMarket);

	$context['currentMarket'] = apply_filters('wpml_current_language', NULL);
	Timber::render('views/blocks/post-type-filter-grid-v2/ptfg-posts.twig', $context);
	wp_die();
}

add_action('wp_ajax_nopriv_ptfg_next_page', 'ptfg_next_page');
add_action('wp_ajax_ptfg_next_page', 'ptfg_next_page');
