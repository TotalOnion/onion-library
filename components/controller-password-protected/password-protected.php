<?php

/**
 * Password protected post controller.
 * @package Global Theme
 */

require_once dirname(__FILE__) . '/../inc/globals.php';
$context = create_context();
$context['password_form'] = get_the_password_form();

$templates = array('components/password-protected.twig');

\Timber\Timber::render($templates, $context);