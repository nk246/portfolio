document.addEventListener('DOMContentLoaded', function () {
    let allProjects = []; // Store all projects globally

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

        // Clear existing filters
        filterContainer.innerHTML = '';

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
        projectList.forEach((project, index) => {
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

            // Set project height to full screen
            projectElement.style.height = '100vh';

            // Add click event to navigate to next project
            projectElement.addEventListener('click', () => scrollToNextProject(projectElement));

            projectsContainer.appendChild(projectElement);
        });

        // Add project indicators on the right side
        addProjectIndicators(projectList.length);
    }

    // Function to add project indicators on the right side
    function addProjectIndicators(projectCount) {
        const indicatorsContainer = document.getElementById('project-indicators');
        indicatorsContainer.innerHTML = ''; // Clear existing indicators

        for (let i = 0; i < projectCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'project-indicator';
            indicator.addEventListener('click', () => jumpToProject(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Function to scroll to the next project
    function scrollToNextProject(currentProject) {
        const nextProject = currentProject.nextElementSibling;
        if (nextProject) {
            nextProject.scrollIntoView({ behavior: 'auto', block: 'start' });
            updateActiveIndicator(nextProject);
        }
    }

    // Function to update the active project indicator
    function updateActiveIndicator(currentProject) {
        const projectIndicators = document.querySelectorAll('.project-indicator');
        const index = Array.from(projectsContainer.children).indexOf(currentProject);
        projectIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    // Function to jump to a specific project by clicking on the indicator
    function jumpToProject(index) {
        const projects = Array.from(projectsContainer.children);
        const targetProject = projects[index];
        if (targetProject) {
            targetProject.scrollIntoView({ behavior: 'auto', block: 'start' });
            updateActiveIndicator(targetProject);
        }
    }

    // Fetch projects, populate filters, and display projects
    fetchProjects().then(projects => {
        allProjects = projects;
        const allTags = projects.flatMap(project => project.tags);
        const uniqueTags = Array.from(new Set(allTags));
        populateFilters(uniqueTags);
        displayProjects(allProjects);
    });

    // Reset filters and display all projects when "Projects" is clicked
    document.getElementById('projects').addEventListener('click', () => {
        displayProjects(allProjects);
    });
});
