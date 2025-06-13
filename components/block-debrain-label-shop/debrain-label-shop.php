<?php

acf_register_block_type(
	array(
		'name'            => 'debrain-label-shop',
		'title'           => __('Debrain label shop', 'Global-theme Admin'),
		'render_callback' => 'debrain_label_shop_block_render_post_object',
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

/**
 * Rendering of block with Post entity
 *
 * @param array<string, mixed> $block block.
 * @param string               $content content.
 * @param bool                 $is_preview If it's a preview.
 */
function debrain_label_shop_block_render_post_object(array $block, string $content = '', bool $is_preview = false): void
{
	$context                  = \Timber\Timber::context();
	$slug                     = substr($block['name'], 4); // Removes 'acf/' from the name.
	$fields =
		get_fields();
	$context['block']         = $block;
	$context['fields']        = $fields;
	$context['is_preview']    = $is_preview;
	$context['preview_image'] = gtp_preview_image($slug);
	$products                   = \Timber\Timber::get_posts(
		array(
			'post_type' => 'product',
			'numberposts' => -1,
			'post_status' => 'publish',
			'meta_query' => array(
				array(
					'key' => 'debrain_label_shop_product_enabled', // Replace with your ACF field key
					'value' => "0", // Replace with the value you want to filter by
					'compare' => '!=',          // Comparison operator, adjust if needed
				)
			)
		)
	);

	$label_shop = array();
	if (isset($products) && is_array($products)) {
		foreach ($products as $product) {
			$product->debrain_label_shop_product_thumbnail = wp_get_attachment_url($product->debrain_label_shop_product_thumbnail);
			$product->debrain_label_shop_product_thumbnail_selected = wp_get_attachment_url($product->debrain_label_shop_product_thumbnail_selected);
			$product->debrain_label_shop_product_bottle = wp_get_attachment_url($product->debrain_label_shop_product_bottle);
			$product->debrain_label_shop_product_email_bottle = wp_get_attachment_url($product->debrain_label_shop_product_email_bottle);
			$product->debrain_label_shop_product_image = wp_get_attachment_url($product->debrain_label_shop_product_image);
			$product->debrain_label_shop_product_enabled = wp_get_attachment_url($product->debrain_label_shop_product_enabled);
			$product->debrain_label_shop_product_bottle_label = wp_get_attachment_url($product->debrain_label_shop_product_bottle_label);
		}
	}

	$context['products']      = $products;
	$context['label_shop']     = $label_shop;
	$context['market_slug'] = ICL_LANGUAGE_CODE; // @phpstan-ignore-line

	gtp_warning_missing_template($slug);

	gtp_debug_template(__FUNCTION__, $slug);

	\Timber\Timber::render("blocks/{$slug}.twig", $context);
}
