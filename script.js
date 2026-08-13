const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function toggleMenuOpenClose() {
  navLinks.classList.toggle("active");
}
menuToggle.addEventListener("click", toggleMenuOpenClose);
const navItems = document.querySelectorAll(".nav-links a");

function closeMenuAutomatically() {
  navLinks.classList.remove("active");
}
navItems.forEach((item) => {
  item.addEventListener("click", closeMenuAutomatically);
});

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

function displayProjects(projectList) {
  const projectsGrid = document.querySelector(".projects-grid");

  projectsGrid.innerHTML = "";

  projectList.forEach((project) => {
    const projectCard = document.createElement("article");

    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span>${tech}</span>`)
                      .join("")}
                </div>

                <div class="project-links">

                    <a href="${project.github}"
                       class="btn btn-secondary">
                        GitHub
                    </a>

                    <a href="${project.demo}"
                       class="btn btn-primary">
                        Live Demo
                    </a>

                </div>

            </div>
        `;

    projectsGrid.appendChild(projectCard);
  });
}
displayProjects(projects);
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    if (selectedCategory === "all") {
      displayProjects(projects);
    } else {
      const filteredProjects = projects.filter((project) => {
        return project.category === selectedCategory;
      });

      displayProjects(filteredProjects);
    }
  });
});
