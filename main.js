// document.addEventListener("DOMContentLoaded", function () {
//     const navLinks = document.querySelectorAll(".my-navlink");
//     const sections = document.querySelectorAll("main section");

//     async function loadMarkdown(sectionId) {
//         try {
//             const response = await fetch(`./assets/${sectionId}.md`);
//             if (!response.ok) throw new Error("Failed to load markdown");
//             const text = await response.text();
//             document.getElementById(sectionId).innerHTML = marked.parse(text);
//         } catch (error) {
//             console.error("Error loading markdown:", error);
//         }
//     }

//     function showSection(sectionId) {
//         sections.forEach(section => section.classList.remove("active"));
//         const targetSection = document.getElementById(sectionId);
//         if (targetSection) {
//             targetSection.classList.add("active");
//             if (sectionId !== "experience") { 
//                 loadMarkdown(sectionId);
//             }
//         } 
//     }

//     function highlightActiveLink(targetSection) {
//         navLinks.forEach(link => link.classList.remove("active"));
//         const activeLink = document.querySelector(`a[data-section="${targetSection}"]`);
//         if (activeLink) {
//             activeLink.classList.add("active");
//         }
//     }

//     showSection("about");
//     highlightActiveLink("about");

//     navLinks.forEach(link => {
//         link.addEventListener("click", function (e) {
//             e.preventDefault();
//             const targetSection = this.getAttribute("data-section");
//             showSection(targetSection);
//             highlightActiveLink(targetSection);
//         });
//     });

//     const leaves = document.querySelectorAll(".leaf");
//     const expContents = document.querySelectorAll(".exp-content");

//     function showExperience(sectionId) {
//         expContents.forEach(content => content.classList.remove("active"));
//         const targetContent = document.getElementById(sectionId);
//         if (targetContent) {
//             targetContent.classList.add("active");
//         }
//     }

//     leaves.forEach(leaf => {
//         leaf.addEventListener("click", function () {
//             const targetSection = this.getAttribute("data-section");
//             showExperience(targetSection);
//         });
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".my-navlink");
    const sections = document.querySelectorAll("main section");

    function loadMarkdown(sectionId) {
        fetch(`./assets/${sectionId}.md`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load markdown");
                return response.text();
            })
            .then(text => {
                document.getElementById(sectionId).innerHTML = marked.parse(text);
            })
            .catch(error => console.error("Error loading markdown:", error));
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

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute("data-section");
            showSection(targetSection);
            highlightActiveLink(targetSection);
        });
    });

    // Initially show the "about" section
    showSection("about");
    highlightActiveLink("about");

    // --- Experience Section Handling ---
    function getDurationInMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }

    function updateLeafHeight(leaf) {
        const start = leaf.getAttribute("data-start");
        const end = leaf.getAttribute("data-end");
        const duration = getDurationInMonths(start, end);
        leaf.style.height = `${duration * 5}px`; // Scale factor: 5px per month (adjust as needed)
    }

    function sortAndArrangeLeaves() {
        const treeContainer = document.querySelector(".tree-container");
        let leaves = Array.from(document.querySelectorAll(".leaf"));

        // Sort leaves by start date (most recent first)
        leaves.sort((a, b) => new Date(b.getAttribute("data-start")) - new Date(a.getAttribute("data-start")));

        // Clear existing branches
        treeContainer.innerHTML = "";

        // Create new branch container
        const newBranch = document.createElement("div");
        newBranch.classList.add("branch");
        treeContainer.appendChild(newBranch);

        // Reassign left/right alternately and update height
        leaves.forEach((leaf, index) => {
            leaf.classList.remove("left", "right"); // Reset classes
            leaf.classList.add(index % 2 === 0 ? "left" : "right");
            updateLeafHeight(leaf);
            newBranch.appendChild(leaf);
        });

        // Reattach event listeners after reordering
        document.querySelectorAll(".leaf").forEach(leaf => {
            leaf.addEventListener("click", function () {
                showExperience(this.getAttribute("data-section"));
            });
        });
    }

    function showExperience(sectionId) {
        document.querySelectorAll(".exp-content").forEach(content => content.classList.remove("active"));
        document.getElementById(sectionId)?.classList.add("active");
    }

    // Sort leaves and apply styles
    sortAndArrangeLeaves();
});
