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

    // Function to load markdown into a section
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

    // Function to show the active section
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

    // Function to highlight the active navigation link
    function highlightActiveLink(targetSection) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`a[data-section="${targetSection}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    // Initial setup to show the "about" section
    showSection("about");
    highlightActiveLink("about");

    // Navigation links event listener
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute("data-section");
            showSection(targetSection);
            highlightActiveLink(targetSection);
        });
    });

    // Function to calculate the duration in months
    function getDurationInMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        return months;
    }

    // Function to update leaf height based on its duration
    function updateLeafHeight(leaf) {
        const start = leaf.getAttribute("data-start");
        const end = leaf.getAttribute("data-end");
        const duration = getDurationInMonths(start, end);
        leaf.style.height = `${duration * 10}px`; // 30px per month for example
    }

    // Function to sort and update leaves based on start date
    function sortLeaves() {
        const leaves = Array.from(document.querySelectorAll(".leaf"));
        
        // Sort all leaves by start date (most recent first)
        leaves.sort((a, b) => {
            const startA = new Date(a.getAttribute("data-start"));
            const startB = new Date(b.getAttribute("data-start"));
            return startB - startA; // Sort leaves by start date (most recent first)
        });

        // Now, append them back to their respective branches
        const leftBranch = document.querySelector(".branch.left");
        const rightBranch = document.querySelector(".branch.right");

        // Clear existing leaves from branches
        leftBranch.innerHTML = "";
        rightBranch.innerHTML = "";

        // Distribute leaves back into left and right branches based on their position
        leaves.forEach(leaf => {
            const isLeft = leaf.classList.contains("left");
            if (isLeft) {
                leftBranch.appendChild(leaf);
            } else {
                rightBranch.appendChild(leaf);
            }
            updateLeafHeight(leaf); // Update height based on the duration
        });
    }

    // Function to display the experience details
    function showExperience(sectionId) {
        const expContents = document.querySelectorAll(".exp-content");
        expContents.forEach(content => content.classList.remove("active"));
        const targetContent = document.getElementById(sectionId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    }

    // Event listener for leaves click
    const leaves = document.querySelectorAll(".leaf");
    leaves.forEach(leaf => {
        leaf.addEventListener("click", function () {
            const targetSection = this.getAttribute("data-section");
            showExperience(targetSection);
        });
    });

    // Initialize the sorting and height adjustment for leaves
    sortLeaves(); // Ensure leaves are sorted and height adjusted

});
