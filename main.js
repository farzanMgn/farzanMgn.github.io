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

    // Load Markdown content for a given section
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

    // Show the selected section
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

    // Highlight the active navigation link
    function highlightActiveLink(targetSection) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`a[data-section="${targetSection}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    // Initialize with the "About" section
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

    // Experience Timeline Logic
    function getDurationInMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }

    function sortAndArrangeLeaves() {
        const leaves = [...document.querySelectorAll(".leaf")];

        // Sort events by start date (most recent first)
        leaves.sort((a, b) => new Date(b.getAttribute("data-start")) - new Date(a.getAttribute("data-start")));

        const leftBranch = document.querySelector(".branch.left");
        const rightBranch = document.querySelector(".branch.right");

        leftBranch.innerHTML = "";
        rightBranch.innerHTML = "";

        const positionedEvents = [];

        leaves.forEach(leaf => {
            const isLeft = leaf.classList.contains("left");
            const start = new Date(leaf.getAttribute("data-start"));
            const end = new Date(leaf.getAttribute("data-end"));
            const duration = getDurationInMonths(start, end);

            leaf.style.height = `${duration * 10}px`; // Scale height based on duration

            // Find correct vertical position
            let positionIndex = 0;
            for (let i = 0; i < positionedEvents.length; i++) {
                const placedStart = positionedEvents[i].start;
                const placedEnd = positionedEvents[i].end;

                if (start <= placedEnd && end >= placedStart) {
                    positionIndex = i; // Align with overlapping event
                    break;
                }
            }

            positionedEvents.splice(positionIndex, 0, { start, end, duration, isLeft });

            leaf.style.marginTop = `${positionIndex * 20}px`; // Adjust spacing to prevent overlap

            if (isLeft) {
                leftBranch.appendChild(leaf);
            } else {
                rightBranch.appendChild(leaf);
            }
        });
    }

    function showExperience(sectionId) {
        document.querySelectorAll(".exp-content").forEach(content => content.classList.remove("active"));
        const targetContent = document.getElementById(sectionId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    }

    document.querySelectorAll(".leaf").forEach(leaf => {
        leaf.addEventListener("click", function () {
            const targetSection = this.getAttribute("data-section");
            showExperience(targetSection);
        });
    });

    sortAndArrangeLeaves();
});
