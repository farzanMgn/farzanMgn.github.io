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

    // const leaves = document.querySelectorAll(".leaf");
    // const expContents = document.querySelectorAll(".exp-content");

     // Scroll to corresponding detail section on event click
    const timelineEvents = document.querySelectorAll(".timeline-event");
    timelineEvents.forEach(event => {
        event.addEventListener("click", function () {
            const heading = this.querySelector("h3").textContent;

            let targetId = "";
            if (heading.includes("Pisa")) targetId = "details-ms";
            else if (heading.includes("Zerynth")) targetId = "details-zerynth";
            else if (heading.includes("Mashhad")) targetId = "details-bc";

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                targetElement.classList.add("highlighted");
                setTimeout(() => targetElement.classList.remove("highlighted"), 2000);
            }
        });
    });

    // function showExperience(sectionId) {
    //     expContents.forEach(content => content.classList.remove("active"));
    //     const targetContent = document.getElementById(sectionId);
    //     if (targetContent) {
    //         targetContent.classList.add("active");
    //     }
    // }

    // leaves.forEach(leaf => {
    //     leaf.addEventListener("click", function () {
    //         const targetSection = this.getAttribute("data-section");
    //         showExperience(targetSection);
    //     });
    // });
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////second try
// // document.addEventListener("DOMContentLoaded", function () {
// //     const navLinks = document.querySelectorAll(".my-navlink");
// //     const sections = document.querySelectorAll("main section");

// //     async function loadMarkdown(sectionId) {
// //         try {
// //             const response = await fetch(`./assets/${sectionId}.md`);
// //             if (!response.ok) throw new Error("Failed to load markdown");
// //             const text = await response.text();
// //             document.getElementById(sectionId).innerHTML = marked.parse(text);
// //         } catch (error) {
// //             console.error("Error loading markdown:", error);
// //         }
// //     }

// //     function showSection(sectionId) {
// //         sections.forEach(section => section.classList.remove("active"));
// //         const targetSection = document.getElementById(sectionId);
// //         if (targetSection) {
// //             targetSection.classList.add("active");
// //             if (sectionId !== "experience") { 
// //                 loadMarkdown(sectionId);
// //             }
// //         } 
// //     }

// //     function highlightActiveLink(targetSection) {
// //         navLinks.forEach(link => link.classList.remove("active"));
// //         const activeLink = document.querySelector(`a[data-section="${targetSection}"]`);
// //         if (activeLink) {
// //             activeLink.classList.add("active");
// //         }
// //     }

// //     showSection("about");
// //     highlightActiveLink("about");

// //     navLinks.forEach(link => {
// //         link.addEventListener("click", function (e) {
// //             e.preventDefault();
// //             const targetSection = this.getAttribute("data-section");
// //             showSection(targetSection);
// //             highlightActiveLink(targetSection);
// //         });
// //     });

// //     const leavesContainer = document.querySelector(".tree-container");
// //     let leaves = Array.from(document.querySelectorAll(".leaf"));

// //     function parseDate(dateStr) {
// //         return new Date(dateStr);
// //     }

// //     function sortLeaves() {
// //         leaves.sort((a, b) => {
// //             let startA = parseDate(a.getAttribute("data-start"));
// //             let startB = parseDate(b.getAttribute("data-start"));
// //             return startB - startA; // Sort descending (most recent first)
// //         });

// //         // Reorder elements in the DOM
// //         leaves.forEach(leaf => leavesContainer.appendChild(leaf));
// //     }

// //     function adjustLeafSizes() {
// //         leaves.forEach(leaf => {
// //             let start = parseDate(leaf.getAttribute("data-start"));
// //             let end = parseDate(leaf.getAttribute("data-end")) || new Date(); // Default to today if no end date
// //             let durationYears = (end - start) / (1000 * 60 * 60 * 24 * 365); // Convert ms to years
// //             let minHeight = 60; // Minimum height for short events
// //             let scaleFactor = 30; // Pixels per year

// //             leaf.style.height = `${Math.max(minHeight, durationYears * scaleFactor)}px`;
// //         });
// //     }

// //     function showExperience(sectionId) {
// //         document.querySelectorAll(".exp-content").forEach(content => content.classList.remove("active"));
// //         const targetContent = document.getElementById(sectionId);
// //         if (targetContent) {
// //             targetContent.classList.add("active");
// //         }
// //     }

// //     leaves.forEach(leaf => {
// //         leaf.addEventListener("click", function () {
// //             const targetSection = this.getAttribute("data-section");
// //             showExperience(targetSection);
// //         });
// //     });

// //     sortLeaves();
// //     adjustLeafSizes();
// // });
// //////////////////////////////////////////////////////////////////////////////////////
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

//     const leavesContainer = document.querySelector(".tree-container");
//     let leaves = Array.from(document.querySelectorAll(".leaf"));

//     function parseDate(dateStr) {
//         return new Date(dateStr);
//     }

//     function sortLeaves() {
//         leaves.sort((a, b) => {
//             let startA = parseDate(a.getAttribute("data-start"));
//             let startB = parseDate(b.getAttribute("data-start"));
//             return startB - startA; // Sort descending (most recent first)
//         });

//         // Reorder elements in the DOM
//         leaves.forEach(leaf => leavesContainer.appendChild(leaf));
//     }

//     function showExperience(sectionId) {
//         document.querySelectorAll(".exp-content").forEach(content => content.classList.remove("active"));
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

//     sortLeaves();
// });











