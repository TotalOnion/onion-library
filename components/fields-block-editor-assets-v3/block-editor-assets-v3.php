<?php
add_action('enqueue_block_assets', 'add_block_editor_assets_v3', 10, true);
function add_block_editor_assets_v3(): void
{
    if (is_admin()) {
        wp_enqueue_style('core-wordpress-block-editor-previews', gtp_get_asset_uri('corewordpressblockeditorpreviewcss.css'), array(), null);
        wp_enqueue_script('editorstyles', gtp_get_asset_uri('corewordpressblockeditorpreview.js'), array(), null, true);
        wp_localize_script('editorstyles', 'previewvars', core_design_system());
        wp_localize_script('editorstyles', 'corecta', core_cta());
        wp_localize_script('editorstyles', 'coretypography', core_typography_v3());
        wp_localize_script('editorstyles', 'corefontmodifiers', core_font_modifiers());
        wp_localize_script('editorstyles', 'ctastylenames', []);
        wp_localize_script('editorstyles', 'themenames', []);
        wp_localize_script('editorstyles', 'corethemes', core_themes());
        wp_localize_script('editorstyles', 'colourconfig', create_colour_data());
    }
}
