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

    function getDurationInMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }

    function updateLeafHeight(leaf) {
        const start = leaf.getAttribute("data-start");
        const end = leaf.getAttribute("data-end");
        const duration = getDurationInMonths(start, end);
        leaf.style.height = `${duration * 10}px`; // Scale for better visibility
    }

    function sortAndArrangeLeaves() {
        const leaves = [...document.querySelectorAll(".leaf")];

        // Sort events based on start date (most recent first)
        leaves.sort((a, b) => {
            const startA = new Date(a.getAttribute("data-start"));
            const startB = new Date(b.getAttribute("data-start"));
            return startB - startA; // Sort descending (latest first)
        });

        const leftBranch = document.querySelector(".branch.left");
        const rightBranch = document.querySelector(".branch.right");

        leftBranch.innerHTML = "";
        rightBranch.innerHTML = "";

        const placedEvents = [];

        leaves.forEach(leaf => {
            const isLeft = leaf.classList.contains("left");
            const start = new Date(leaf.getAttribute("data-start"));
            const end = new Date(leaf.getAttribute("data-end"));
            const duration = getDurationInMonths(start, end);

            // Find correct vertical position
            let positionIndex = placedEvents.length;
            for (let i = 0; i < placedEvents.length; i++) {
                const placedStart = placedEvents[i].start;
                const placedEnd = placedEvents[i].end;

                // If overlapping with an existing event, align it
                if ((start <= placedEnd && end >= placedStart) || start >= placedStart) {
                    positionIndex = i;
                    break;
                }
            }

            // Store event in correct position
            placedEvents.splice(positionIndex, 0, { start, end, duration, isLeft });

            // Set margin to correctly align the event
            leaf.style.marginTop = `${positionIndex * 20}px`; // Offset each level slightly for better alignment

            // Append back to the correct branch
            if (isLeft) {
                leftBranch.appendChild(leaf);
            } else {
                rightBranch.appendChild(leaf);
            }

            updateLeafHeight(leaf);
        });
    }

    function showExperience(sectionId) {
        const expContents = document.querySelectorAll(".exp-content");
        expContents.forEach(content => content.classList.remove("active"));
        const targetContent = document.getElementById(sectionId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    }

    document.querySelectorAll(".leaf").forEach(leaf => {
        leaf.addEventListener("click", function () {
            showExperience(this.getAttribute("data-section"));
        });
    });

    sortAndArrangeLeaves();
});

