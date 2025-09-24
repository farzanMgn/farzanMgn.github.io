document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".pill");
  const sections = document.querySelectorAll(".content-section");
  const aboutLinks = document.querySelectorAll(".about-link");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal?.querySelector(".close-btn");

  // ----------------------------
  // Utility: Show one section
  // ----------------------------
  function showSection(sectionId) {
    sections.forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add("active");
  }

  // ----------------------------
  // Utility: Highlight nav pills
  // ----------------------------
  function highlightNavLink(sectionId) {
    navLinks.forEach((l) => l.classList.remove("active"));
    const active = document.querySelector(`.pill[data-section="${sectionId}"]`);
    if (active) active.classList.add("active");
  }




  // ----------------------------
  // Init: Default section
  // ----------------------------
  showSection("experience");
  highlightNavLink("experience");

  // ----------------------------
  // Nav events (top + inline About links)
  // ----------------------------
  [...navLinks, ...aboutLinks].forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      if (sectionId) {
        showSection(sectionId);
        highlightNavLink(sectionId);
      }
    });
  });

  // ----------------------------
  // Intersection Observer (1 shared observer)
  // ----------------------------
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".news-article, .media-card, .case-card").forEach((el) => {
    observer.observe(el);
  });

  // ----------------------------
  // Case study modals
  // ----------------------------
  const caseCards = document.querySelectorAll(".case-card");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-btn");
  
  // Open modal on card click
  caseCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    });
  });
  
  // Close when clicking "×"
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });
  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
        }
      });
    }
  });


  // ----------------------------
  // Contact form handler
  // ----------------------------
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            formMessage.textContent = "Thanks for your message! I'll be in touch.";
            formMessage.style.color = "#28a745";
            contactForm.reset();
          } else {
            formMessage.textContent = "Oops! Something went wrong. Please try again.";
            formMessage.style.color = "#dc3545";
          }
        })
        .catch(() => {
          formMessage.textContent = "There was a problem sending your message.";
          formMessage.style.color = "#dc3545";
        });
    });
  }
});
