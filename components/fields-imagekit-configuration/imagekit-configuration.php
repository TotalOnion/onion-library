<?php

if (function_exists('get_fields') && defined('GLOBAL_SETTINGS')) {
	$global_settings = GLOBAL_SETTINGS;
	$image_sizes = [2560, 1920, 1650, 1440, 1280, 1024, 768, 500, 420, 400, 375, 360, 320, 300, 275, 200, 100];
	$env_url = $_ENV['PANTHEON_ENVIRONMENT'] ?? '';

	if (
		is_array($global_settings) &&
		array_key_exists('image_management', $global_settings) && $global_settings['image_management']['enable_image_service'] === true && $global_settings['image_management']['image_service'] === 'imagekit'
	) {
		// $imagekit_configuration = $global_settings['imagekit_configuration'];
		$imagekit_configuration['use_imagekit_images'] = true;
		$imagekit_configuration['srcset_sizes'] = $image_sizes;
		define('IMAGEKIT_CONFIG', $imagekit_configuration);
	} else {
		define('IMAGEKIT_CONFIG', ["use_imagekit_images" => false, "srcset_sizes" => []]);
	}
} else {
	define('IMAGEKIT_CONFIG', ["use_imagekit_images" => false, "srcset_sizes" => []]);
}
if (array_key_exists('image_management', GLOBAL_SETTINGS)) {
	define('IMAGEKIT_ENDPOINT', GLOBAL_SETTINGS['image_management']["imagekit_endpoint"] ?? null);
} else {
	define('IMAGEKIT_ENDPOINT', '');
}
if (array_key_exists('video_management', GLOBAL_SETTINGS)) {
	define('IMAGEKIT_VIDEO_ENDPOINT', GLOBAL_SETTINGS['video_management']["imagekit_video_endpoint"] ?? null);
} else {
	define('IMAGEKIT_VIDEO_ENDPOINT', '');
}

// Helper function to sanitize image paths for ImageKit
function sanitize_image_path($image_url)
{
	$parsed_url = parse_url($image_url);
	return isset($parsed_url['path']) ? '/' . ltrim($parsed_url['path'], '/') : $image_url;
}

function gt_ik_srcset($image, $options = ['aspect_ratio' => false, 'quality' => 80])
{
	if (!$image) {
		return false;
	}

	if (IMAGEKIT_CONFIG['use_imagekit_images'] === false) {
		return $image->srcset;
	}

	$defaultOptions = ['aspect_ratio' => false, 'fit' => 'cover', 'quality' => 80];
	$mergedOptions = array_merge($defaultOptions, $options);
	$ikOptions = "tr=q-" . $mergedOptions['quality'];
	$srcset = "";
	$srcsetValues = IMAGEKIT_CONFIG['srcset_sizes'];
	$sanitized_path = sanitize_image_path($image->src);
	$ratio = false;
	if ($mergedOptions['aspect_ratio']) {
		$ratio = explode("x", $mergedOptions['aspect_ratio']);
	}

	foreach ($srcsetValues as $srcsetValue) {
		if (is_array($ratio) && $ratio[0] && $ratio[1]) {
			$dimensions = ",w-" . $srcsetValue . ",h-" . round($srcsetValue * ($ratio[1] / $ratio[0])) . ",fo-" . $mergedOptions['fit'];
		} else {
			$dimensions = ",w-" . $srcsetValue;
		}
		if ($srcsetValue <= $image->width) {
			$srcset .= IMAGEKIT_ENDPOINT . $sanitized_path . "?" . $ikOptions . $dimensions . " " . $srcsetValue . "w, ";
		}
	}
	return rtrim($srcset, ", ");
}

function gt_ik_mainsrc($image, $options = ['aspect_ratio' => false, 'quality' => 80])
{
	if (!$image) {
		return false;
	}

	if (IMAGEKIT_CONFIG['use_imagekit_images'] === false) {
		return $image->src;
	}
	$defaultOptions = ['aspect_ratio' => false, 'fit' => 'cover', 'quality' => 80];
	$mergedOptions = array_merge($defaultOptions, $options);
	$ikOptions = "tr=q-" . $mergedOptions['quality'];
	$sanitized_path = sanitize_image_path($image->src);
	$ratio = false;
	if ($mergedOptions['aspect_ratio']) {
		$ratio = explode("x", $mergedOptions['aspect_ratio']);
	}

	if (is_array($ratio) && $ratio[0] && $ratio[1]) {
		$dimensions = ",w-" . $image->width . ",h-" . round($image->width * ($ratio[1] / $ratio[0])) . ",fo-" . $mergedOptions['fit'];
	} else {
		$dimensions = ",w-" . $image->width;
	}
	return IMAGEKIT_ENDPOINT . $sanitized_path . "?" . $ikOptions . $dimensions;
}

function get_image_width_by_path($image_path)
{
	/** @var \wpdb $wpdb */
	global $wpdb;

	// Search for an attachment where the `guid` ends with the given path
	$attachment_id = $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE guid LIKE %s AND post_type = 'attachment' LIMIT 1",
			'%' . $wpdb->esc_like($image_path)
		)
	);

	if (!$attachment_id) {
		// If no attachment found and "-scaled" is present, retry with "-scaled" removed
		if (preg_match('/-scaled\.\w+$/', $image_path)) {
			$image_path = preg_replace('/-scaled(\.\w+)$/', '$1', $image_path);
			return get_image_width_by_path($image_path);
		}
		return null;
	}

	$metadata = wp_get_attachment_metadata($attachment_id);

	return $metadata['width'] ?? null;
}

/**
 * Updates schema image URLs to match on-page rendered images using ImageKit. This ensures consistency between the
 * schema and the page’s HTML source, meeting Google’s requirements for indexing and displaying images in search results.
 */
add_action('template_redirect', function () {
	if (
		!defined("IMAGEKIT_CONFIG") ||
		!(IMAGEKIT_CONFIG["use_imagekit_images"] ?? false) ||
		!defined("IMAGEKIT_ENDPOINT") ||
		!filter_var(IMAGEKIT_ENDPOINT, FILTER_VALIDATE_URL)
	) {
		return;
	}

	ob_start(function ($html_content) {
		if (!is_singular(['cocktail', 'product', 'treat'])) {
			return $html_content;
		}

		return preg_replace_callback(
			'/(<script\b[^>]*\btype=[\'"]application\/ld\+json[\'"][^>]*>)([\s\S]*?)(<\/script>)/i',
			function ($matches) {
				$jsonld = json_decode(trim($matches[2]), true);

				if ($jsonld === null || $jsonld === ["@type" => null]) {
					return '';
				}

				if (($jsonld["@type"] ?? null) === "Product" || ($jsonld["@type"] ?? null) === "Recipe") {

					if ($jsonld["image"] ?? false) {
						if (!filter_var($jsonld["image"], FILTER_VALIDATE_URL)) {
							return $matches[0];
						}

						$currentImageSrc = @parse_url($jsonld["image"]);
						$newUrl = str_replace("{$currentImageSrc["scheme"]}://{$currentImageSrc["host"]}", IMAGEKIT_ENDPOINT, $jsonld["image"]);

						$parsedNewUrl = parse_url($newUrl);

						$origImagePath = @parse_url($jsonld["image"])['path'] ?? null;
						$imageWidth = get_image_width_by_path($origImagePath);

						// Bail if we don't find the image width, this is required.
						if (!$imageWidth) {
							return $matches[0];
						}

						$newUrl = "{$parsedNewUrl["scheme"]}://{$parsedNewUrl["host"]}{$parsedNewUrl["path"]}?tr=q-80,w-$imageWidth";

						$jsonld["image"] = $newUrl;
					}

					return $matches[1] . json_encode($jsonld) . $matches[3];
				}

				return $matches[0];
			},
			$html_content
		);
	});
}, PHP_INT_MAX);

add_filter('seopress_sitemaps_single_img', function ($sitemapData, $post) {
	if (!defined('IMAGEKIT_ENDPOINT') || !IMAGEKIT_ENDPOINT || !defined('IMAGEKIT_CONFIG') || !(IMAGEKIT_CONFIG['use_imagekit_images'] ?? false)) {
		return $sitemapData;
	}
	// Get cocktail details metadata
	$cocktailDetails = get_post_meta($post->ID, 'cocktail_details', true);

	// Guard clause: If the image is not set, return early
	if (!isset($cocktailDetails['image'])) {
		return $sitemapData;
	}

	// Parse the image URL to extract the path and change the hostname
	$parsedUrl = parse_url($cocktailDetails['image']);
	$imagePath = $parsedUrl['path'] ?? '';
	$imageWidth = get_image_width_by_path($imagePath);
	if (!$imageWidth) {
		return $sitemapData;
	}
	$imgKitUrl = IMAGEKIT_ENDPOINT . $imagePath . "?tr=q-80,w-" . $imageWidth;

	// Fix the broken CDATA image locations in the sitemap
	$pattern = '/<image:loc><!\[CDATA\[(.*?)]]><\/image:loc>/';
	if (preg_match($pattern, $sitemapData)) {
		$siteUrl = get_site_url();
		$sitemapData = preg_replace($pattern, "<image:loc>{$siteUrl}$1</image:loc>", $sitemapData);
	}

	if ($post->post_type === 'cocktail') {
		$sitemapData .= sprintf(
			"\n<image:image>\n<image:loc>%s</image:loc>\n</image:image>",
			esc_url($imgKitUrl)
		);
	}

	return $sitemapData;
}, 10, 2);

function gt_ik_videosrc($video, $options = ['aspect_ratio' => false, 'quality' => 80])
{
	if (!$video) {
		return false;
	}

	// $defaultOptions = ['aspect_ratio' => false, 'fit' => 'cover', 'quality' => 80];
	// $mergedOptions = array_merge($defaultOptions, $options);
	// $ikOptions = "tr=q-" . $mergedOptions['quality'];
	$sanitized_path = sanitize_image_path($video);
	// $ratio = false;
	// if ($mergedOptions['aspect_ratio']) {
	// 	$ratio = explode("x", $mergedOptions['aspect_ratio']);
	// }

	// if (is_array($ratio) && $ratio[0] && $ratio[1]) {
	// 	$dimensions = ",w-" . $video->width . ",h-" . round($video->width * ($ratio[1] / $ratio[0])) . ",fo-" . $mergedOptions['fit'];
	// } else {
	// 	$dimensions = ",w-" . $video->width;
	// }
	// return IMAGEKIT_ENDPOINT . $sanitized_path . "?" . $ikOptions . $dimensions;
	return IMAGEKIT_VIDEO_ENDPOINT . $sanitized_path;
}
