<?php

/**
 * CORS Configuration
 * Auto-detects production vs development based on APP_ENV
 */

$isProduction = env('APP_ENV') === 'production';

// Production origins
$productionOrigins = [
    'https://www.m1n.me',
    'https://m1n.me',
];

// Development origins
$developmentOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
];

// Merge origins based on environment (dev includes all for flexibility)
$allowedOrigins = $isProduction
    ? $productionOrigins
    : array_merge($developmentOrigins, $productionOrigins);

return [
    'paths' => ['api/*', 'storage/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $allowedOrigins,
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // No cookies — using Bearer tokens
];
