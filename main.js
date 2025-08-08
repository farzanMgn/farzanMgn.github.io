document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  // Load markdown for About and Contact sections
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

  // Show one section and hide others
  function showSection(sectionId) {
    sections.forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
      if (!["experience", "about"].includes(sectionId)) {
        loadMarkdown(sectionId);
      }
    }
  }

  // Highlight the active nav link
  function highlightNavLink(sectionId) {
    navLinks.forEach((l) => l.classList.remove("active"));
    const active = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (active) active.classList.add("active");
  }

  // Initialize on first load
  showSection("about");
  highlightNavLink("about");

  // Navigation click behavior
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
      highlightNavLink(sectionId);
    });
  });

  // Animate project blocks in the experience section
  const projectBlocks = document.querySelectorAll('#experience .project-block');

  if (projectBlocks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
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

    projectBlocks.forEach(block => observer.observe(block));
  }

  // Contact form handler (via Formspree or similar)
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            formMessage.textContent = "Thanks for your message! I'll be in touch.";
            contactForm.reset();
            formMessage.style.color = "#28a745"; // green
          } else {
            formMessage.textContent = "Oops! Something went wrong. Please try again.";
            formMessage.style.color = "#dc3545"; // red
          }
        })
        .catch(() => {
          formMessage.textContent = "There was a problem sending your message.";
          formMessage.style.color = "#dc3545";
        });
    });
  }
});
