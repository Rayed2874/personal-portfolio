// =========================
// Projects Data
// =========================

const projects = [
  {
    title: "Flappy Penguin",
    description:
      "A CSS animation project created while learning responsive web design.",
    category: "web",
    technologies: ["HTML", "CSS"],
    image: "assets/images/flappy-penguin.png",
    github: "#",
    demo: "#",
  },

  {
    title: "To-Do List",
    description:
      "A simple responsive to-do list interface built while practicing frontend development.",
    category: "web",
    technologies: ["HTML", "CSS"],
    image: "assets/images/to-do-list.png",
    github: "#",
    demo: "#",
  },
];

const blogPosts = [
  {
    title: "My Journey Into Web Development",
    date: "August 2026",
    description:
      "What I learned while building my first responsive websites and moving from HTML and CSS toward JavaScript.",
    link: "#",
  },

  {
    title: "What I'm Learning in My Second Year of CSE",
    date: "August 2026",
    description:
      "A look at what I'm currently learning, the technologies I'm exploring, and what I'm building.",
    link: "#",
  },
];
// =========================
// Mobile Navigation
// =========================

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  menuToggle.addEventListener("click", toggleMobileMenu);

  navItems.forEach(addNavItemListener);

  function toggleMobileMenu() {
    navLinks.classList.toggle("active");
  }

  function addNavItemListener(item) {
    item.addEventListener("click", closeMobileMenu);
  }

  function closeMobileMenu() {
    navLinks.classList.remove("active");
  }
}

// =========================
// Display Projects
// =========================

function displayProjects(projectList) {
  const projectsGrid = document.querySelector(".projects-grid");

  projectsGrid.innerHTML = "";

  projectList.forEach(displayProject);

  function displayProject(project) {
    const projectCard = document.createElement("article");

    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
            <div class="project-image">

                <img
                    src="${project.image}"
                    alt="${project.title}"
                >

            </div>


            <div class="project-content">

                <h3>${project.title}</h3>

                <p>
                    ${project.description}
                </p>


                <div class="project-tech">

                    ${createTechnologyTags(project.technologies)}

                </div>


                <div class="project-links">

                    <a
                        href="${project.github}"
                        class="btn btn-secondary"
                    >
                        GitHub
                    </a>


                    <a
                        href="${project.demo}"
                        class="btn btn-primary"
                    >
                        Live Demo
                    </a>

                </div>

            </div>
        `;

    projectsGrid.appendChild(projectCard);
  }

  function createTechnologyTags(technologies) {
    let technologyHTML = "";

    technologies.forEach(createTechnologyTag);

    function createTechnologyTag(technology) {
      technologyHTML += `
                <span>${technology}</span>
            `;
    }

    return technologyHTML;
  }
}

// =========================
// Project Filters
// =========================

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(addFilterListener);

  function addFilterListener(button) {
    button.addEventListener("click", handleFilterClick);
  }

  function handleFilterClick(event) {
    const selectedCategory = event.currentTarget.dataset.filter;

    updateActiveFilter(event.currentTarget);

    if (selectedCategory === "all") {
      displayProjects(projects);

      return;
    }

    const filteredProjects = projects.filter(filterProject);

    displayProjects(filteredProjects);

    function filterProject(project) {
      return project.category === selectedCategory;
    }
  }
}

// =========================
// Active Filter Button
// =========================

function updateActiveFilter(activeButton) {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(removeActiveClass);

  function removeActiveClass(button) {
    button.classList.remove("active");
  }

  activeButton.classList.add("active");
}

// =========================
// Blog rendering function
// =========================
function displayBlogPosts(postList) {
  const blogGrid = document.querySelector(".blog-grid");

  blogGrid.innerHTML = "";

  postList.forEach(displayBlogPost);

  function displayBlogPost(post) {
    const blogCard = document.createElement("article");

    blogCard.classList.add("blog-card");

    blogCard.innerHTML = `
            <div class="blog-content">

                <span class="blog-date">
                    ${post.date}
                </span>

                <h3>
                    ${post.title}
                </h3>

                <p>
                    ${post.description}
                </p>

                <a
                    href="${post.link}"
                    class="read-more"
                >
                    Read Article →
                </a>

            </div>
        `;

    blogGrid.appendChild(blogCard);
  }
}

// =========================
// Run the Website
// =========================

setupMobileMenu();

displayProjects(projects);

setupProjectFilters();

displayBlogPosts(blogPosts);