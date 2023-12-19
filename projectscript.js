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
            filterOption.textContent = humanReadableTag(tag); // Convert tag to human-readable format
            filterOption.addEventListener('click', () => filterProjects(tag));
            filterContainer.appendChild(filterOption);
        });
    }

    // Function to convert tag to human-readable format
    function humanReadableTag(tag) {
        // Implement your logic to convert tag to human-readable format
        // e.g., "ux-design" to "UX Design"
        return tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
                <img src="${project.image}" alt="${project.title}" class="project-image">
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
