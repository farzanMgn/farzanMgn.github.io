document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  function loadMarkdown(sectionId) {
    fetch(`./assets/${sectionId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Markdown load failed");
        return res.text();
      })
      .then((text) => {
        document.getElementById(sectionId).innerHTML = marked.parse(text);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function showSection(sectionId) {
    sections.forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
      if (sectionId !== "experience") {
        loadMarkdown(sectionId);
      }
    }
  }

  function highlightNavLink(sectionId) {
    navLinks.forEach((l) => l.classList.remove("active"));
    const active = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (active) active.classList.add("active");
  }

  // Initial load
  showSection("about");
  highlightNavLink("about");

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
      highlightNavLink(sectionId);
    });
  });

  // Scroll-triggered animation for experience/project blocks
  const experienceBlocks = document.querySelectorAll('#experience .project-block');

  const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.4,
  });

  experienceBlocks.forEach(block => experienceObserver.observe(block));
});
