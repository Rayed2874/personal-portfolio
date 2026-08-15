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
// Active Navigation
// =========================

function setupActiveNavigation() {
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section");

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(checkSection);

    function checkSection(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop - 200 &&
        window.scrollY < sectionTop + sectionHeight - 200
      ) {
        currentSection = section.getAttribute("id");
      }
    }

    navItems.forEach(updateNavItem);

    function updateNavItem(item) {
      item.classList.remove("active");

      if (item.getAttribute("href") === "#" + currentSection) {
        item.classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", updateActiveNavigation);

  updateActiveNavigation();
}

// =========================
// Display Projects
// =========================

function displayProjects(projectList, gridSelector) {
  const projectsGrid = document.querySelector(gridSelector);

  projectsGrid.innerHTML = "";

  if (projectList.length === 0) {
    displayEmptyMessage();
    return;
  }

  projectList.forEach(displayProject);

  function displayEmptyMessage() {
    const emptyMessage = document.createElement("div");

    emptyMessage.classList.add("empty-project-message");

    emptyMessage.textContent =
      "No projects in this category yet. More projects coming soon!";

    projectsGrid.appendChild(emptyMessage);
  }

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

        <p>${project.description}</p>

        <div class="project-tech">
          ${project.technologies.map(createTechnologyTag).join("")}
        </div>

        <div class="project-links">

          <a
            href="${project.github}"
            class="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="${project.demo}"
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>

        </div>

      </div>
    `;

    projectsGrid.appendChild(projectCard);
  }

  function createTechnologyTag(technology) {
    return `<span>${technology}</span>`;
  }
}

// =========================
// Project Filtering
// =========================

let selectedCategory = "all";

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(addFilterListener);

  function addFilterListener(button) {
    button.addEventListener("click", handleFilterClick);
  }

  function handleFilterClick(event) {
    selectedCategory = event.currentTarget.dataset.filter;

    practiceProjectsVisible = 4;

    updateActiveFilter(event.currentTarget);

    displayFilteredProjects();
  }
}

// =========================
// Display Filtered Projects
// =========================

function displayFilteredProjects() {
  let filteredProjects;
  let filteredPracticeProjects;

  if (selectedCategory === "all") {
    filteredProjects = projects;
    filteredPracticeProjects = practiceProjects;
  } else {
    filteredProjects = projects.filter(filterProject);
    filteredPracticeProjects = practiceProjects.filter(filterProject);
  }

  function filterProject(project) {
    return project.category === selectedCategory;
  }

  displayProjects(filteredProjects, ".projects-grid");

  displayPracticeProjects(filteredPracticeProjects);
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
// Practice Projects
// =========================

let practiceProjectsVisible = 4;

// =========================
// Display Practice Projects
// =========================

function displayPracticeProjects(projectList) {
  const visibleProjects = projectList.slice(0, practiceProjectsVisible);

  displayProjects(visibleProjects, ".practice-projects-grid");

  updateShowMoreButton(projectList);
}

// =========================
// Show More / Show Less
// =========================

function setupPracticeProjectToggle() {
  const showMoreButton = document.querySelector("#show-more-practice");

  showMoreButton.addEventListener("click", togglePracticeProjects);

  function togglePracticeProjects() {
    const filteredPracticeProjects = getFilteredPracticeProjects();

    if (practiceProjectsVisible >= filteredPracticeProjects.length) {
      practiceProjectsVisible = 4;
    } else {
      practiceProjectsVisible += 4;
    }

    displayPracticeProjects(filteredPracticeProjects);
  }
}

function getFilteredPracticeProjects() {
  if (selectedCategory === "all") {
    return practiceProjects;
  }

  return practiceProjects.filter(filterProject);

  function filterProject(project) {
    return project.category === selectedCategory;
  }
}

function updateShowMoreButton(projectList) {
  const showMoreButton = document.querySelector("#show-more-practice");

  if (practiceProjectsVisible >= projectList.length) {
    showMoreButton.textContent = "Show Less";
  } else {
    showMoreButton.textContent = "Show More";
  }
}

// =========================
// Blog Rendering
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
          href="article.html?id=${post.id}"
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
// Copy Email
// =========================

function setupCopyEmail() {
  const copyButton = document.querySelector("#copy-email");
  const emailAddress = document.querySelector("#email-address");

  function copyEmail() {
    navigator.clipboard.writeText(emailAddress.textContent.trim());

    copyButton.textContent = "Copied!";

    setTimeout(resetButtonText, 2000);

    function resetButtonText() {
      copyButton.textContent = "Copy Email";
    }
  }

  copyButton.addEventListener("click", copyEmail);
}

// =========================
// Run the Website
// =========================

setupMobileMenu();

displayProjects(projects, ".projects-grid");

displayPracticeProjects(practiceProjects);

displayBlogPosts(blogPosts);

setupActiveNavigation();

setupCopyEmail();

setupProjectFilters();

setupPracticeProjectToggle();
