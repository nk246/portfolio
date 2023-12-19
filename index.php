// Get the requested URL
$requestUri = $_SERVER['REQUEST_URI'];

// Remove query parameters
$requestUri = strtok($requestUri, '?');

// Your custom routing logic
switch ($requestUri) {
    case '/':
        include 'projects.php';
        break;
    case '/about':
        include 'about.php';
        break;
    case '/projects/${projectId}':
        include '{projectId}.php';
        break;

    default:
        // Handle 404
        include '404.php';
        break;
}