<?php

/**
 * Use specific template for password protected posts.
 *
 * By default, this will use the **password-protected.php** template file. If you want password
 * templates specific to a post type, use **password-protected-$posttype.php**.
 * 
 * More information: https://timber.github.io/docs/v2/guides/posts/#password-protected-posts
 */
add_filter('template_include', 'get_password_protected_template', 99);

function get_password_protected_template($template)
{
    global $post;

    if (!empty($post) && post_password_required($post->ID)) {
        $template = locate_template([
            'controller/password-protected.php',
            "controller/password-protected-{$post->post_type}.php",
        ]) ?: $template;
    }

    return $template;
};