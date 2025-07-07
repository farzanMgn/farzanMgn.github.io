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

  // Modal functionality
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-button");

  const experienceDetails = {
    "details-ms": {
      title: "M.Sc. in Computer Engineering",
      content: `
        <p>I pursued my Master’s at the University of Pisa, focusing on Cyber-Physical Systems and Data Mining.</p>
        <img src="./assets/ms_photo.jpg" alt="MS photo" style="width:100%; margin-top:10px; border-radius:8px;" />
        <p>My thesis developed an LSTM-powered industrial optimization system.</p>
      `
    },
    "details-zerynth": {
      title: "Data Scientist - Zerynth",
      content: `
        <p>Worked on predictive maintenance and real-time dashboards for industrial IoT.</p>
        <img src="./assets/zerynth_photo.jpg" alt="Zerynth photo" style="width:100%; margin-top:10px; border-radius:8px;" />
      `
    },
    "details-bc": {
      title: "B.Sc. in Computer Engineering",
      content: `
        <p>Explored machine learning and Android-based robotics for physical therapy systems.</p>
        <img src="./assets/bc_photo.jpg" alt="BC photo" style="width:100%; margin-top:10px; border-radius:8px;" />
      `
    }
  };

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.getAttribute("data-target");
      const data = experienceDetails[key];
      if (data) {
        modalContent.innerHTML = `<h3>${data.title}</h3>${data.content}`;
        modal.style.display = "block";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
