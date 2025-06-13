<?php
define('CACHE_TIME', 3600 * 24 * 7 * 4); // 4 weeks
define('ENABLE_CUSTOM_CACHES', true);
require_once __DIR__ . '/cache-global-settings.php';
require_once __DIR__ . '/cache-typography.php';
require_once __DIR__ . '/cache-market-settings.php';
require_once __DIR__ . '/cache-themes.php';
require_once __DIR__ . '/cache-cta-styles.php';
