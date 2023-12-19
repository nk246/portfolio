<?php

// Get the requested URL
$requestUri = $_SERVER['REQUEST_URI'];

// Remove query parameters
$requestUri = strtok($requestUri, '?');

// Your custom routing logic
switch ($requestUri) {
    case '/':
        case '/index.php':
        include 'projects.php';
        break;
    case '/about':
        include 'about.php';
        break;
    default:
        // Check if the URL matches the /projects/ pattern
        if (preg_match('/\/projects\/(\d+)/', $requestUri, $matches)) {
            // Extract the project ID from the matched pattern
            $projectId = $matches[1];
            // Include the corresponding PHP file
            include "project.php";
        } else {
            // Handle 404
            include '404.php';
        }
        break;
}
?>