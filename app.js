// Your portfolio data
const siteData = {
    name: "Chris Law",
    email: "claw2547@gmail.com",
    phone: "604-704-6831",
    socials: {
        github: "https://github.com/ChrisLaw123",
        linkedin: "https://www.linkedin.com/in/chris-law-6b78a03a5/"
    },
    hero: {
        headline: "Computer Engineering Student & Developer",
        description: "Building automated systems and web applications. Currently studying at University of Waterloo with a focus on embedded systems and full-stack development."
    },
    currently: "Studying Computer Engineering at University of Waterloo - Working on a Pytorch ML project",
    
    allProjects: [
        {
            title: "Curve Fitter WebApp",
            description: "Interactive polynomial curve fitter with real-time visualization and regression analysis.",
            fullDescription: "Built a browser-based polynomial curve fitter implementing least squares regression from scratch. Dynamically visualizes fitted curves with Chart.js and provides R² fitness scoring for data analysis.",
            tags: ["HTML", "CSS", "JavaScript", "Chart.js", "Linear Algebra"],
            image: null,
            features: [
                "Least squares regression implementation",
                "Real-time curve visualization",
                "R² fitness scoring",
                "Interactive data point plotting"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "Chart.js"],
            github: "https://github.com/ChrisLaw123/curve-fitter-webapp",
            demo: "https://chrislaw123.github.io/curve-fitter-webapp/"
        },
        {
            title: "Terraria Mod",
            description: "Steam Workshop mod with ~700 unique subscribers featuring custom items and procedural generation.",
            fullDescription: "Created a comprehensive Terraria mod published on Steam Workshop that has attracted nearly 700 unique subscribers. Features custom items, ores, and a procedurally generated biome system that adds new exploration dimensions to the game.",
            tags: ["C#", "Game Dev", "Procedural Gen"],
            image: null,
            features: [
                "Custom items and crafting recipes",
                "Procedural biome generation system",
                "New ores and resources",
                "~700 unique Steam Workshop subscribers"
            ],
            technologies: ["C#", "Terraria API", "Procedural Generation"],
            steam: "https://steamcommunity.com/sharedfiles/filedetails/?id=2898549980"
        },
        {
            title: "Automated CAM Assessment",
            description: "Arduino-based cognitive screening system with audio capture and automated analysis.",
            fullDescription: "Developed an Arduino system to automate Confusion Assessment Method (CAM) testing for cognitive screening. Captures patient audio using microphone modules, stores data on SD cards, and implements automated scoring algorithms.",
            tags: ["Arduino", "C++", "Analog Transcription"],
            image: null,
            features: [
                "Real-time audio capture and storage",
                "SD card data logging",
                "Automated cognitive scoring",
                "Clinical assessment support"
            ],
            technologies: ["Arduino", "C++", "Analog Transcription"],
            github: "#"
        },
        {
            title: "NEAT Flappy Bird AI",
            description: "Neural network learns to play Flappy Bird using NEAT genetic algorithm.",
            fullDescription: "Implemented a Flappy Bird AI using NeuroEvolution of Augmenting Topologies (NEAT). The neural network learns optimal gameplay through fitness-based evolution, demonstrating genetic algorithms in action.",
            tags: ["Python", "AI", "NEAT"],
            image: null,
            features: [
                "NEAT neural network implementation",
                "Fitness-based evolution",
                "Real-time learning visualization",
                "Population-based training"
            ],
            technologies: ["Python", "NEAT-Python", "Pygame"],
            github: "#"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio website with dark theme, modal interactions, and responsive design.",
            fullDescription: "Built a modern portfolio website with smooth animations and interactive project modals. Features a custom dark theme with geometric background patterns, responsive layout, and optimized for GitHub Pages deployment.",
            tags: ["HTML", "CSS", "JavaScript"],
            image: null,
            features: [
                "Vanilla JavaScript (no frameworks)",
                "Modal project viewer with smooth animations",
                "Custom geometric background patterns",
                "Fully responsive design"
            ],
            technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
            github: "https://github.com/ChrisLaw123/chrislaw123.github.io"
        }
    ],
    
    interests: [
    {
        title: "Self-Learning",
        icon: "📚",
        description: "I like picking up new tools and concepts on my own, usually but not limited to coursework. I find self learning content is easier than learning from someone else.",
        examples: "Learning through side projects, coursework"
    },
    {
    title: "Creating",
    icon: "🛠️",
    description: "I enjoy building projects from scratch as a way to get comfortable with new languages and tools.",
    examples: "Side projects, small web tools, electronics builds"
    },
    {
        title: "Problem Solving",
        icon: "🧩",
        description: "I like working through challenging problems and struggling until things finally click. Can't learn unless you're under pressure.",
        examples: "Debugging code, coding problems, design iteration"
    },
    {
    title: "Animals",
    icon: "🐾",
    description: "I love animals and have two Labrador retrievers. Spending time with them is a great way for me to reset and get outside after long days of coursework.",
    examples: ""
    }
    ],
    
    about: {
        bio: "I'm a Computer Engineering student at University of Waterloo with a passion for self learning and creating. My experience spans embedded systems, web development, and algorithm implementation. I enjoy combining hardware and software to create .",
        
        skills: [
            "C++", "Java", "Python", "JavaScript",
            "HTML", "CSS", "Verilog",
            "Arduino", "Git", "Figma", "Quartus", "Altium"
        ],
        
        timeline: [
            {
                date: "Sept 2025 - Present",
                title: "University of Waterloo",
                description: "BASc Computer Engineering • GPA: 3.84/4.0 • President's Scholarship of Distinction"
            },
            {
                date: "November 2024",
                title: "After-School Coding Program",
                description: "Co-facilitated weekly Scratch sessions for 30 students introducing programming fundamentals"
            },
            {
                date: "April 2024",
                title: "Payment Source (FinTech)",
                description: "High School Co-op • Supported web development projects using Figma and HTML/CSS"
            },
            {
                date: "Aug 2022 - Aug 2025",
                title: "Real Canadian Superstore",
                description: "Part-Time Produce Clerk • Team coordination and customer service"
            }
        ]
    }
};

// State management
let currentPage = 'home';
let currentProject = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, .logo');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            loadPage(page);
            updateActiveNav(page);
        });
    });

    // Contact button
    document.getElementById('contactBtn').addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Modal close
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('projectModal').addEventListener('click', (e) => {
        if (e.target.id === 'projectModal') {
            closeModal();
        }
    });
}

// Update active navigation
function updateActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
}

// Load page content
function loadPage(page) {
    currentPage = page;
    const mainContent = document.getElementById('mainContent');
    
    switch(page) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'about':
            mainContent.innerHTML = renderAboutPage();
            break;
        case 'projects':
            mainContent.innerHTML = renderProjectsPage();
            break;
        case 'interests':
            mainContent.innerHTML = renderInterestsPage();
            break;
    }
    
    // Attach project card listeners after rendering
    attachProjectListeners();
}

// Render pages
function renderHomePage() {
    return `
        <div class="container">
            <section class="hero">
                <div class="accent-line"></div>
                <h1>${siteData.hero.headline}</h1>
                <p class="hero-description">${siteData.hero.description}</p>
            </section>

            <div class="currently">
                <div class="currently-label">Currently</div>
                <p class="currently-text">${siteData.currently}</p>
            </div>

            <section class="section">
                <div class="section-header">
                    <h2>Projects</h2>
                </div>
                <div class="project-grid">
                    ${siteData.allProjects.map((project, index) => renderProjectCard(project, index)).join('')}
                </div>
            </section>
        </div>
    `;
}

function renderProjectsPage() {
    return `
        <div class="container">
            <section class="hero">
                <div class="accent-line"></div>
                <h1>Projects</h1>
                <p class="section-intro">
                    A collection of things I've built. Each project represents an opportunity to learn something new or solve an interesting problem.
                </p>
            </section>

            <section class="section">
                <div class="project-grid">
                    ${siteData.allProjects.map((project, index) => renderProjectCard(project, index)).join('')}
                </div>
            </section>
        </div>
    `;
}

function renderInterestsPage() {
    return `
        <div class="container">
            <section class="hero">
                <div class="accent-line"></div>
                <h1>Interests</h1>
                <p class="section-intro">
                    The things that keep me curious. These areas shape how I think about problems and what I choose to build.
                </p>
            </section>

            <section class="section">
                <div class="interests-grid">
                    ${siteData.interests.map(interest => `
                        <div class="interest-card">
                            <div class="interest-icon">${interest.icon}</div>
                            <h3 class="interest-title">${interest.title}</h3>
                            <p class="interest-description">${interest.description}</p>
                            ${interest.examples ? `<p class="interest-examples">${interest.examples}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
}

function renderAboutPage() {
    return `
        <div class="container">
            <section class="hero">
                <div class="accent-line"></div>
                <h1>About Me</h1>
                <p class="about-intro">${siteData.about.bio}</p>
            </section>

            <section class="section">
                <div class="about-section">
                    <h3>Experience & Education</h3>
                    <div class="timeline">
                        ${siteData.about.timeline.map(item => `
                            <div class="timeline-item">
                                <div class="timeline-date">${item.date}</div>
                                <div class="timeline-title">${item.title}</div>
                                <div class="timeline-description">${item.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="about-section">
                    <h3>Skills & Technologies</h3>
                    <p>Tools and languages I work with regularly</p>
                    <div class="skill-badges">
                        ${siteData.about.skills.map(skill => `
                            <span class="skill-badge">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderProjectCard(project, index) {
    return `
        <div class="project-card" data-project-index="${index}">
            <div class="project-preview-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<span>Preview Image</span>'}
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// Attach project card listeners
function attachProjectListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = card.getAttribute('data-project-index');
            openModal(siteData.allProjects[index]);
        });
    });
}

// Modal functions
function openModal(project) {
    currentProject = project;
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div>
            <div class="project-preview-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<span>Preview Image</span>'}
            </div>
        </div>
        <div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description" style="margin-bottom: var(--spacing-md);">
                ${project.fullDescription}
            </p>
            
            ${project.features ? `
                <div class="project-detail-section">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            ${project.technologies ? `
                <div class="project-detail-section">
                    <h4>Technologies</h4>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="project-links">
                ${project.github && project.github !== '#' ? `
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        View on GitHub →
                    </a>
                ` : ''}
                ${project.demo ? `
                    <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                        Live Demo →
                    </a>
                ` : ''}
                ${project.steam ? `
                    <a href="${project.steam}" class="project-link" target="_blank" rel="noopener noreferrer">
                        View on Steam →
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('projectModal').classList.add('active');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    currentProject = null;
}
