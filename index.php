<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script defer src="script.js"></script>
    <title>Your Portfolio</title>
</head>
<body>
    <div id="menu">
        <div id="logo">Your Logo</div>
        <div id="menu-items">
            <div class="menu-item">About Me</div>
            <div class="menu-item">Projects</div>
            <div id="filters">
                <label>Filter by:</label>
                <!-- Add filter options dynamically using JavaScript -->
            </div>
        </div>
    </div>
    <div id="projects-container">
        <!-- Display projects dynamically using JavaScript -->
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch projects from projects.json
    async function fetchProjects() {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            return data.projects; // Assuming your JSON structure has a 'projects' key
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }

    // Function to populate filters
    function populateFilters(tags) {
        const filterContainer = document.getElementById('filters');

        // Create filter options dynamically
        tags.forEach(tag => {
            const filterOption = document.createElement('div');
            filterOption.className = 'filter-option';
            filterOption.textContent = tag;
            filterOption.addEventListener('click', () => filterProjects(tag));
            filterContainer.appendChild(filterOption);
        });
    }

    // Function to filter projects based on selected tag
    function filterProjects(tag) {
        const filteredProjects = allProjects.filter(project => project.tags.includes(tag));
        displayProjects(filteredProjects);
    }

    // Function to display projects dynamically
    function displayProjects(projectList) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear existing projects

        // Create project elements dynamically
        projectList.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <img src="images/project${project.id}.jpg" alt="${project.title}" class="project-image">
                <div class="project-details">
                    <div class="project-title">${project.title}</div>
                    <div class="project-description">${project.description}</div>
                    <div class="project-tags">${project.tags.join(', ')}</div>
                </div>
            `;

            // Add click event to navigate to individual project page
            projectElement.addEventListener('click', () => openProjectPage(project.id));

            projectsContainer.appendChild(projectElement);
        });
    }

    // Function to open individual project page
    function openProjectPage(projectId) {
        // Logic to open the project page based on projectId
        // You can use AJAX or fetch to load the project content dynamically
        // and update the project page accordingly
    }

    // Fetch projects, populate filters, and display projects
    let allProjects = [];
    fetchProjects().then(projects => {
        allProjects = projects;
        const allTags = projects.flatMap(project => project.tags);
        const uniqueTags = Array.from(new Set(allTags));
        populateFilters(uniqueTags);
        displayProjects(allProjects);
    });
});

    </script>
</body>
</html>
