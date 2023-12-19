document.addEventListener('DOMContentLoaded', function () {
    let allProjects = []; // Store all projects globally
    let currentIndex = 0; // Track the current project index

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

    // Function to display projects dynamically as a carousel
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
            projectElement.style.minHeight = '100vh';
            projectElement.style.height = '100vh';

            // Add click event to navigate to individual project page
            projectElement.addEventListener('click', () => openProjectPage(project.id));

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
    function scrollToNextProject() {
        currentIndex = (currentIndex + 1) % allProjects.length;
        updateActiveIndicator();
        scrollToCurrentProject();
    }

    // Function to scroll to the previous project
    function scrollToPreviousProject() {
        currentIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
        updateActiveIndicator();
        scrollToCurrentProject();
    }

    // Function to scroll to the current project
    function scrollToCurrentProject() {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.scrollTo({
            top: currentIndex * projectsContainer.clientHeight,
            behavior: 'smooth'
        });
    }

    // Function to update the active project indicator
    function updateActiveIndicator() {
        const projectIndicators = document.querySelectorAll('.project-indicator');
        projectIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    // Function to jump to a specific project by clicking on the indicator
    function jumpToProject(index) {
        currentIndex = index;
        updateActiveIndicator();
        scrollToCurrentProject();
    }

    // Function to open individual project page
    function openProjectPage(projectId) {
        // Assuming the PHP files are named like project1.php, project2.php, etc.
        const phpFileName = `${projectId}.php`;

        // Use window.location to navigate to the PHP file
        window.location.href = `/projects/${phpFileName}`;
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

    // Add event listeners for navigation buttons
    document.getElementById('prev-btn').addEventListener('click', scrollToPreviousProject);
    document.getElementById('next-btn').addEventListener('click', scrollToNextProject);

    // Add scroll event listener for updating active project indicator
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.addEventListener('scroll', updateActiveIndicator);
});
