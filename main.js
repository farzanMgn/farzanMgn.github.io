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

    // Function to calculate duration in months
    function getDurationInMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }

    // Function to update the height of each leaf based on duration
    function updateLeafHeight(leaf) {
        const start = leaf.getAttribute("data-start");
        const end = leaf.getAttribute("data-end");
        const duration = getDurationInMonths(start, end);
        leaf.style.height = `${duration * 5}px`; // Adjust scale (5px per month)
    }

    // Function to sort and arrange the leaves correctly
    function sortLeaves() {
        const branches = document.querySelector(".tree-container");

        // Get all leaves from both sides
        let leaves = Array.from(document.querySelectorAll(".leaf"));

        // Sort all leaves by start date (most recent first)
        leaves.sort((a, b) => {
            return new Date(b.getAttribute("data-start")) - new Date(a.getAttribute("data-start"));
        });

        // Clear current structure
        branches.innerHTML = "";

        // Rebuild tree structure with sorted leaves
        const newBranch = document.createElement("div");
        newBranch.classList.add("branch");
        branches.appendChild(newBranch);

        // Assign left/right alternately
        leaves.forEach((leaf, index) => {
            leaf.classList.remove("left", "right"); // Reset classes
            if (index % 2 === 0) {
                leaf.classList.add("left");
            } else {
                leaf.classList.add("right");
            }
            updateLeafHeight(leaf);
            newBranch.appendChild(leaf);
        });
    }

    // Function to show experience details when clicking a leaf
    function showExperience(sectionId) {
        document.querySelectorAll(".exp-content").forEach(content => content.classList.remove("active"));
        document.getElementById(sectionId)?.classList.add("active");
    }

    // Click event for leaves
    document.querySelectorAll(".leaf").forEach(leaf => {
        leaf.addEventListener("click", function () {
            showExperience(this.getAttribute("data-section"));
        });
    });

    // Initialize sorting and resizing
    sortLeaves();
});

