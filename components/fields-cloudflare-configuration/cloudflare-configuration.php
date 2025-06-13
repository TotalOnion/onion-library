<?php

if (function_exists('get_fields') && defined('GLOBAL_SETTINGS')) {
	$global_settings                          = GLOBAL_SETTINGS;
	$image_sizes =
		[2560, 1920, 1650, 1440, 1280, 1024, 768, 500, 420, 400, 375, 360, 320, 300, 275, 200, 100];
	$env_url = $_ENV['PANTHEON_ENVIRONMENT'] ?? '';

	if (is_array($global_settings) && array_key_exists('image_management', $global_settings) && $global_settings['image_management']['enable_image_service'] === true && $global_settings['image_management']['image_service'] === 'cloudflare') {


		$cloudflare_configuration['use_cloudflare_images'] = true;
		$cloudflare_configuration['srcset_sizes'] = $image_sizes;
		define('CLOUDFLARE_CONFIG', $cloudflare_configuration);
	} else {
		define('CLOUDFLARE_CONFIG', ["use_cloudflare_images" => false, "srcset_sizes" => []]);
	}
} else {
	define('CLOUDFLARE_CONFIG', ["use_cloudflare_images" => false, "srcset_sizes" => []]);
}

function gt_cf_srcset($image, $options = ['format' => 'auto', 'aspect_ratio' => false])
{
	if (!$image) {
		return false;
	}
	if (CLOUDFLARE_CONFIG['use_cloudflare_images'] === false) {
		return $image->srcset;
	}
	$defaultOptions = ['format' => 'auto', 'aspect_ratio' => false, 'fit' => 'cover'];
	$mergedOptions = array_merge($defaultOptions, $options);
	$srcPrefix = "/cdn-cgi/image/";
	$cfoptions = "format=" . $mergedOptions['format'];
	$srcset = "";
	$srcsetValues = CLOUDFLARE_CONFIG['srcset_sizes'];
	foreach ($srcsetValues as $key => $srcsetValue) {
		if ($mergedOptions['aspect_ratio'] !== false) {
			$ratio = explode("x", $mergedOptions['aspect_ratio']);
			$dimensions = "width=" . $srcsetValue . "%2C" . "height=" . round($srcsetValue * ($ratio[1] / $ratio[0])) . "%2C" . "fit=" . $mergedOptions['fit'];
		} else {
			$dimensions = "width=" . $srcsetValue;
		}
		if ($srcsetValue <= $image->width) {
			$srcset = $srcset . ($srcPrefix . $cfoptions . "%2C" . $dimensions . "/" . $image->src . " " . $srcsetValue . "w, ");
		}
	}
	return $srcset;
}

function gt_cf_mainsrc($image, $options = ['format' => 'auto', 'aspect_ratio' => false])
{
	if (!$image) {
		return false;
	}

	if (CLOUDFLARE_CONFIG['use_cloudflare_images'] === false) {
		return $image->src;
	}
	$defaultOptions = ['format' => 'auto', 'aspect_ratio' => false, 'fit' => 'cover'];
	$mergedOptions = array_merge($defaultOptions, $options);
	$srcPrefix = "/cdn-cgi/image/";
	$cfoptions = "format=" . $mergedOptions['format'];
	if ($mergedOptions['aspect_ratio'] !== false) {
		$ratio = explode("x", $mergedOptions['aspect_ratio']);
		$dimensions = "width=" .
			$image->width . "%2C" . "height=" . round($image->width * ($ratio[1] / $ratio[0])) . "%2C" . "fit=" . $mergedOptions['fit'];
	} else {
		$dimensions = "width=" . $image->width;
	}
	$mainImageSrc = $srcPrefix . $cfoptions . "%2C" . $dimensions . "/" . $image->src;
	return $mainImageSrc;
}
