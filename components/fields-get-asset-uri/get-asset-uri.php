<?php

/**
 * Cross checks an asset's name with the manifest.json and returns its URI.
 *
 * @param string $asset_name
 *
 * @throws \Exception When there is no manifest file.
 */
function gtp_get_asset_uri($asset_name): string
{
    global $wp_filesystem;
    global $manifest_file;
    if (!defined('STATIC_FOLDER') || !defined('REL_STATIC_FOLDER')) {
        throw new \Exception('STATIC_FOLDER or REL_STATIC_FOLDER constants not defined. Please define them in wp-config.php.');
    }
    $static_dir = get_template_directory_uri() . STATIC_FOLDER;
    // Reads manifest.json once and stores it.
    if (!$manifest_file) {
        $manifest_file_location = get_template_directory() . '/' . STATIC_FOLDER . '/manifest.json';
        $manifest_file = $wp_filesystem->get_contents($manifest_file_location);
        if (!$manifest_file) {
            throw new \Exception('Could not fetch the manifest.json file at ' . $manifest_file_location);
        }
    }

    $manifest = json_decode((string) $manifest_file);
    if (!property_exists($manifest, $asset_name)) {
        return '';
    }

    $asset_full_path = $manifest->$asset_name;
    $asset_static_path = substr($asset_full_path, strpos($asset_full_path, STATIC_FOLDER) + strlen(STATIC_FOLDER));

    return $static_dir . $asset_static_path;
}
