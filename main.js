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

    function sortLeaves() {
        const leaves = Array.from(document.querySelectorAll(".leaf")); // Get fresh list each time

        // Sort all leaves based on the year inside .year span
        leaves.sort((a, b) => {
            const yearA = parseInt(a.querySelector(".year").textContent, 10);
            const yearB = parseInt(b.querySelector(".year").textContent, 10);
            return yearA - yearB; // Sort in ascending order
        });

        // Reattach sorted leaves, keeping left and right branches
        const leftBranch = document.querySelector(".branch.left");
        const rightBranch = document.querySelector(".branch.right");

        leftBranch.innerHTML = '';  // Clear previous content
        rightBranch.innerHTML = '';

        leaves.forEach(leaf => {
            if (leaf.classList.contains("left")) {
                leftBranch.appendChild(leaf);
            } else {
                rightBranch.appendChild(leaf);
            }
        });

        // Re-apply event listeners after sorting
        attachLeafClickEvents();
    }

    function attachLeafClickEvents() {
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
    }

    // Sort leaves at the start
    sortLeaves();
});
