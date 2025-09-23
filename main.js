document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".pill");
  const sections = document.querySelectorAll(".content-section");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal?.querySelector(".close-btn");
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

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
  // Nav events (pills only)
  // ----------------------------
  navLinks.forEach((link) => {   // CHANGED: removed aboutLinks (not used in HTML)
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      if (sectionId) {
        showSection(sectionId);
        highlightNavLink(sectionId);
        window.scrollTo({ top: 0, behavior: "smooth" }); // NEW: smooth scroll reset
      }
    });
  });

  // ----------------------------
  // Intersection Observer
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
    { threshold: 0.15 } // CHANGED: from 0.3 → smoother on smaller screens
  );

  document.querySelectorAll(".news-article, .media-card, .case-card").forEach((el) => {
    observer.observe(el);
  });

  // ----------------------------
  // Case study modals
  // ----------------------------
  const caseCards = document.querySelectorAll(".case-card");
  caseCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const content = document.getElementById(modalId);
      if (content && modal && modalBody) {
        modalBody.replaceChildren(content.cloneNode(true)); // CHANGED: safer than innerHTML
        modal.style.display = "block";
        closeBtn?.focus(); // NEW: move focus inside modal for accessibility
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hide"); // NEW: fade-out
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 300);
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hide"); // NEW: fade-out
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 300);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.classList.add("hide"); // NEW: fade-out
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 300);
    }
  });

  // ----------------------------
  // Contact form handler
  // ----------------------------
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
            formMessage.textContent = "✅ Thanks for your message! I'll be in touch.";
            formMessage.style.color = "#28a745";
            contactForm.reset();
            setTimeout(() => (formMessage.textContent = ""), 5000); // NEW: auto-hide
          } else {
            formMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
            formMessage.style.color = "#dc3545";
          }
        })
        .catch(() => {
          formMessage.textContent = "❌ There was a problem sending your message.";
          formMessage.style.color = "#dc3545";
        });
    });
  }
});
