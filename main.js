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
    // Function to sort the leaves based on the year in the 'data-section' attribute
    function sortLeaves() {
        const sortedLeaves = Array.from(leaves).sort((a, b) => {
            const dateA = parseInt(a.querySelector(".year").textContent, 10); // Extract year from the .year span
            const dateB = parseInt(b.querySelector(".year").textContent, 10);
            return dateA - dateB; // Sort in ascending order
        });

        // Reattach the sorted leaves back to their parent containers
        const leftBranch = document.querySelector(".branch.left");
        const rightBranch = document.querySelector(".branch.right");
        
        // Clear the existing leaves in both branches
        leftBranch.innerHTML = '';
        rightBranch.innerHTML = '';

        // Append sorted leaves back to their respective branches
        sortedLeaves.forEach(leaf => {
            if (leaf.classList.contains("left")) {
                leftBranch.appendChild(leaf);
            } else if (leaf.classList.contains("right")) {
                rightBranch.appendChild(leaf);
            }
        });
    }
    
    // Call the sorting function to order the leaves
    sortLeaves();
     });
  });



    
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
