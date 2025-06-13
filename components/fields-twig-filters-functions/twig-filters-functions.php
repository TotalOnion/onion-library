<?php

/**
 * Adding functions to Twig
 *
 * @doc https://timber.github.io/docs/guides/extending-timber/
 * @package Global Theme
 */

add_filter('timber/twig', 'global_theme_add_functions_to_twig');

/**
 * Adds functionality to Twig.
 *
 * @param \Twig\Environment $twig The Twig environment.
 * @return \Twig\Environment
 */
function global_theme_add_functions_to_twig($twig)
{
    $twig->addFunction(new Twig\TwigFunction('get_languages_dropdown', 'get_languages_dropdown'));
    $twig->addFunction(new Twig\TwigFunction('gtp_language_code', 'gtp_get_current_locale'));
    $twig->addFunction(new Twig\TwigFunction('asset', 'gtp_get_asset_uri'));
    $twig->addFunction(new Twig\TwigFunction('filter_post_data', 'gt_filter_post_data'));
    $twig->addFunction(new Twig\TwigFunction('gt_cf_srcset', 'gt_cf_srcset'));
    $twig->addFunction(new Twig\TwigFunction('gt_ik_srcset', 'gt_ik_srcset'));
    $twig->addFunction(new Twig\TwigFunction('get_raw_svg', 'get_raw_svg'));
    $twig->addFunction(new Twig\TwigFunction('check_file_type', 'check_file_type'));
    $twig->addFunction(new Twig\TwigFunction('gt_cf_mainsrc', 'gt_cf_mainsrc'));
    $twig->addFunction(new Twig\TwigFunction('gt_ik_mainsrc', 'gt_ik_mainsrc'));
    $twig->addFunction(new Twig\TwigFunction('gt_image_mainsrc', 'gt_image_mainsrc'));
    $twig->addFunction(new Twig\TwigFunction('gt_image_srcset', 'gt_image_srcset'));
    $twig->addFunction(new Twig\TwigFunction('gt_video_mainsrc', 'gt_video_mainsrc'));
    $twig->addFunction(new Twig\TwigFunction('gt_lottie_filepath', 'gt_lottie_filepath'));
    $twig->addFunction(new Twig\TwigFunction('ptfg_filter_post_data', 'ptfg_filter_post_data'));
    $twig->addFunction(new Twig\TwigFunction('filtered_post_sorting', 'gt_filtered_post_sorting'));
    $twig->addFunction(new Twig\TwigFunction('post_json_decode', 'post_json_decode'));
    $twig->addFilter(new Twig\TwigFilter('remove_underscore', 'remove_underscore'));
    $twig->addFilter(new Twig\TwigFilter('ru', 'remove_underscore'));
    $twig->addFilter(new Twig\TwigFilter('json_decode', 'decode_json'));
    $twig->addFilter(new Twig\TwigFilter('json_encode_2', 'gt_json_encode'));
    $twig->addFilter(new Twig\TwigFilter('dump', 'filter_dump'));
    $twig->addFunction(new \Twig\TwigFunction('gt_unserialize_data', 'gt_unserialize_data'));
    $twig->addExtension(new HelloNico\Twig\DumpExtension());
    return $twig;
}

/**
 * Returns the asset URI for Lottie file
 *
 */
function gt_lottie_filepath($lottieFilePath)
{
    if ($lottieFilePath === null) {
        return;
    }

    if (defined('GLOBAL_SETTINGS') && isset(GLOBAL_SETTINGS['image_management'])) {
        $enable_image_service = GLOBAL_SETTINGS['image_management']['enable_image_service'];
        if ($enable_image_service) {
            $service_provider = remove_underscore(GLOBAL_SETTINGS['image_management']['image_service']);
            switch ($service_provider) {
                case 'cloudflare':
                case 'imagekit':
                    $sanitized_path = sanitize_image_path($lottieFilePath);
                    return IMAGEKIT_ENDPOINT . $sanitized_path;
                    break;

                default:
                    # code...
                    break;
            }
        } else {
            return $lottieFilePath;
        }
    } else {
        return $lottieFilePath;
    }
}

/**
 * Returns the asset URI
 *
 */
function gt_video_mainsrc($videoSrc, $options = ['aspect_ratio' => false, 'quality' => 80])
{
    if ($videoSrc === null) {
        return;
    }
    if (defined('GLOBAL_SETTINGS') && isset(GLOBAL_SETTINGS['video_management'])) {
        $enable_video_service = GLOBAL_SETTINGS['video_management']['enable_video_service'];
        if ($enable_video_service) {
            $service_provider = remove_underscore(GLOBAL_SETTINGS['video_management']['video_service']);
            switch ($service_provider) {
                case 'cloudflare':
                    // return gt_cf_videosrc($videoSrc, $options);
                    break;
                case 'imagekit':
                    return gt_ik_videosrc($videoSrc, $options);
                    break;

                default:
                    # code...
                    break;
            }
        } else {
            return $videoSrc;
        }
    } else {
        return $videoSrc;
    }
}

/**
 * Returns the asset URI
 *
 */
function gt_image_mainsrc($imageSrc, $options = ['aspect_ratio' => false, 'quality' => 80])
{
    if ($imageSrc === null) {
        return;
    }
    if (is_string($imageSrc)) {
        return $imageSrc;
    }
    if (defined('GLOBAL_SETTINGS') && isset(GLOBAL_SETTINGS['image_management'])) {
        $enable_image_service = GLOBAL_SETTINGS['image_management']['enable_image_service'];
        if ($enable_image_service) {
            $service_provider = remove_underscore(GLOBAL_SETTINGS['image_management']['image_service']);
            switch ($service_provider) {
                case 'cloudflare':
                    return gt_cf_mainsrc($imageSrc, $options);
                    break;
                case 'imagekit':
                    return gt_ik_mainsrc($imageSrc, $options);
                    break;

                default:
                    # code...
                    break;
            }
        } else {
            return $imageSrc->src;
        }
    } else {
        return $imageSrc->src;
    }
}
/**
 * Returns the srcset for an image
 *
 */
function gt_image_srcset($imageSrc, $options = ['aspect_ratio' => false, 'quality' => 80])
{
    if ($imageSrc === null) {
        return;
    }
    if (is_string($imageSrc)) {
        return $imageSrc;
    }
    if (defined('GLOBAL_SETTINGS') && isset(GLOBAL_SETTINGS['image_management'])) {
        $enable_image_service = GLOBAL_SETTINGS['image_management']['enable_image_service'];
        if ($enable_image_service) {
            $service_provider = remove_underscore(GLOBAL_SETTINGS['image_management']['image_service']);
            switch ($service_provider) {
                case 'cloudflare':
                    return gt_cf_srcset($imageSrc, $options);
                    break;
                case 'imagekit':
                    return gt_ik_srcset($imageSrc, $options);
                    break;

                default:
                    # code...
                    break;
            }
        } else {
            return $imageSrc->srcset;
        }
    } else {
        return $imageSrc->srcset;
    }
}

/**
 * Unserializes a string
 *
 * @param mixed $serialized_string a serialized string
 * @return array $result a array
 */
function gt_unserialize_data($string)
{
    if (is_string($string)) {
        return @unserialize($string);
    } else {
        return $string;
    }
}

/**
 * Removes double underscore from ACF fields
 *
 * @param string $text a string
 * @return string $text a string
 */
function remove_underscore($text)
{
    if (!is_string($text)) {
        return $text;
    }
    if (null == $text) {
        return '';
    }
    $output = '';

    if (strlen($text) > 0) {
        if (substr($text, 0, 2) === '__') {
            $output = substr($text, 2);
        } else {
            $output = $text;
        }
    }

    return $output;
}

/**
 * This would return the formatted variable for debug (dump).
 *
 * @param array $var array with value of the variable sent.
 */
function filter_dump($var)
{
    dump($var);
}

/**
 * Decodes a JSON string
 *
 * @param string $string a json string
 * @return array $output an array
 */
function decode_json($string): array|object
{
    $output = array();

    if (strlen($string) > 0) {
        $output = json_decode($string);
    }
    if ($output === null) {
        return [];
    }
    return $output;
}

/**
 * Encodes an array or object to json string with the extra filter constants
 *
 * @param array $data ideally an array
 * @return string $output a json string
 */
function gt_json_encode($data): string
{
    $output = '';
    $flags  = JSON_UNESCAPED_SLASHES | JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE;
    $output = wp_json_encode($data, $flags);
    return $output;
}

function gt_filter_post_data($post, $keys_to_keep)
{
    if (is_array($post)) {
        // Convert the Timber\Post object to an array
        $post_data = (array)$post;
        // Filter out the keys
        return array_intersect_key($post_data, array_flip($keys_to_keep));
    }
    return [];
}

function gtp_get_current_locale(): string
{
    if (defined('ICL_LANGUAGE_CODE') && '' !== ICL_LANGUAGE_CODE && null !== ICL_LANGUAGE_CODE) {
        $lang = ICL_LANGUAGE_CODE;
    } elseif (defined('GLOBAL_THEME_DEFAULT_LOCALE')) {
        $lang = GLOBAL_THEME_DEFAULT_LOCALE;
    } else {
        add_action(
            'admin_notices',
            function () {
                echo '<div class="error"><p>Please define "GLOBAL_THEME_DEFAULT_LOCALE=en-en" in wp-config.php</p></div>';
            }
        );

        $lang = 'en-en';
    }

    return $lang;
}

function ptfg_filter_post_data($post, $keys_to_keep)
{
    if (!empty($post)) {
        // Convert the Timber\Post object to an array
        $post_data = (array)$post;
        // Filter out the keys
        return array_intersect_key($post_data, array_flip($keys_to_keep));
    }
    return [];
}

function gt_filtered_post_sorting($allPostIDs, $updatedPosts)
{
    $sortedIds = [];
    foreach ((array)$allPostIDs as $value) {
        $key = array_search($value, array_column($updatedPosts, 'id'));
        if ($key !== false) {
            array_push($sortedIds, $updatedPosts[$key]);
        }
    }
    return $sortedIds;
}
