<?php
add_action('enqueue_block_assets', 'add_block_editor_assets_v3', 10, true);
function add_block_editor_assets_v3(): void
{
    if (is_admin()) {
        wp_enqueue_script('editorstyles', gtp_get_asset_uri('editor.js'), array(), null, true);
        wp_localize_script('editorstyles', 'previewvars', core_design_settings_v3());
        wp_localize_script('editorstyles', 'siteglobal', core_site_global_v3());
        wp_localize_script('editorstyles', 'coretypography', core_typography_v3());
        wp_localize_script('editorstyles', 'corefontmodifiers', core_font_modifiers_v3());
        wp_localize_script('editorstyles', 'corethemes', core_themes_v3());
        wp_localize_script('editorstyles', 'currenttheme', core_current_theme_v3());
        wp_localize_script('editorstyles', 'colourconfig', create_colour_data());
    }
}
