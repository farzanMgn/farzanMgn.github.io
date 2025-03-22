document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".my-navlink");
    const sections = document.querySelectorAll("main section");

    async function loadMarkdown(sectionId) {
        try {
            const response = await fetch(`./assets/${sectionId}.md`);
            if (!response.ok) throw new Error("Failed to load markdown");
            const text = await response.text();
            document.getElementById(sectionId).innerHTML = marked.parse(text);
        } catch (error) {
            console.error("Error loading markdown:", error);
        }
    }

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove("active"));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add("active");
            if (sectionId !== "experience") { 
                loadMarkdown(sectionId);
            }
        } 
    }

    function highlightActiveLink(targetSection) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`a[data-section="${targetSection}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    showSection("about");
    highlightActiveLink("about");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute("data-section");
            showSection(targetSection);
            highlightActiveLink(targetSection);
        });
    });

    const leaves = document.querySelectorAll(".leaf");
    const expContents = document.querySelectorAll(".exp-content");

    function showExperience(sectionId) {
        expContents.forEach(content => content.classList.remove("active"));
        const targetContent = document.getElementById(sectionId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    }

    leaves.forEach(leaf => {
        leaf.addEventListener("click", function () {
            const targetSection = this.getAttribute("data-section");
            showExperience(targetSection);
        });
    });
});













