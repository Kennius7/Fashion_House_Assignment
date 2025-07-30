

// JavaScript Features

// 1. Page Navigation System
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.classList.remove("active"));

    // Show selected page
    document.getElementById(pageId).classList.add("active");

    // Update navigation
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => link.classList.remove("active"));
    event.target.classList.add("active");

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 2. Form Handling with Validation
document
    .getElementById("appointmentForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (
            !data.name ||
            !data.email ||
            !data.phone ||
            !data.service ||
            !data.date
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Simulate form submission
        alert(
            `Thank you, ${data.name}! Your ${data.service} appointment request for ${data.date} has been received. We'll contact you at ${data.email} within 24 hours.`
        );

        // Reset form
        this.reset();
    });

// 3. Interactive Product Cards
document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// 4. Dynamic Time Display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    // Update marquee with current time occasionally
    if (Math.random() < 0.1) {
        // 10% chance each second
        const marquee = document.querySelector(".marquee-content");
        const originalContent = marquee.textContent;
        marquee.textContent = `🕒 Current Time: ${timeString} | ${dateString} | ${originalContent}`;

        setTimeout(() => {
            marquee.textContent = originalContent;
        }, 5000);
    }
}

setInterval(updateTime, 6000);

// 5. Scroll-triggered Animations
function animateOnScroll() {
    const elements = document.querySelectorAll(
        ".product-card, .board-member, .event-card"
    );

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Initialize elements for scroll animation
document
    .querySelectorAll(".product-card, .board-member, .event-card")
    .forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(50px)";
        element.style.transition = "all 0.6s ease";
    });

window.addEventListener("scroll", animateOnScroll);

// 6. Interactive Board Member Cards
document.querySelectorAll(".board-member").forEach((member) => {
    member.addEventListener("click", function () {
        const name = this.querySelector("h3").textContent;
        const role = this.querySelector("p strong").textContent;
        alert(
            `Connect with ${name}\nRole: ${role}\nClick OK to send a message via our contact form.`
        );
        showPage("inquiries");
    });
});

// 7. Dynamic Product Filtering (for products page)
function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");
    products.forEach((product) => {
        if (
            category === "all" ||
            product.textContent.toLowerCase().includes(category.toLowerCase())
        ) {
            product.style.display = "block";
            product.style.animation = "fadeIn 0.5s ease-in";
        } else {
            product.style.display = "none";
        }
    });
}

// 8. Search Functionality
function createSearchBar() {
    const searchHTML = `
        <div style="margin: 2rem 0; text-align: center;">
            <input type="text" id="searchInput" placeholder="Search products, events, or board members..." 
                    style="padding: 0.75rem; width: 300px; border: 2px solid #e0e0e0; border-radius: 25px; font-size: 1rem;">
            <button onclick="performSearch()" style="margin-left: 1rem; padding: 0.75rem 1.5rem; background: linear-gradient(45deg, #d49f2c, #944c09); color: white; border: none; border-radius: 25px; cursor: pointer;">Search</button>
        </div>
    `;

    // Add search bar to each page
    // document.querySelectorAll(".hero").forEach((hero) => {
    //     if (!hero.querySelector("#searchInput")) {
    //         hero.insertAdjacentHTML("beforeend", searchHTML);
    //     }
    // });
}

function performSearch() {
    const searchTerm = document
        .getElementById("searchInput")
        .value.toLowerCase();
    if (!searchTerm) return;

    const searchResults = [];

    // Search in products
    document.querySelectorAll("#products .product-card").forEach((card) => {
        if (card.textContent.toLowerCase().includes(searchTerm)) {
            searchResults.push({
                type: "Product",
                element: card,
                page: "products",
            });
        }
    });

    // Search in board members
    document.querySelectorAll("#board .board-member").forEach((member) => {
        if (member.textContent.toLowerCase().includes(searchTerm)) {
            searchResults.push({
                type: "Board Member",
                element: member,
                page: "board",
            });
        }
    });

    // Search in events
    document.querySelectorAll("#events .event-card").forEach((event) => {
        if (event.textContent.toLowerCase().includes(searchTerm)) {
            searchResults.push({
                type: "Event",
                element: event,
                page: "events",
            });
        }
    });

    if (searchResults.length > 0) {
        alert(
            `Found ${searchResults.length} results for "${searchTerm}". Navigating to first result...`
        );
        showPage(searchResults[0].page);
        setTimeout(() => {
            searchResults[0].element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            searchResults[0].element.style.border = "3px solid #d49f2c";
            setTimeout(() => {
                searchResults[0].element.style.border = "none";
            }, 3000);
        }, 500);
    } else {
        alert(`No results found for "${searchTerm}".`);
    }
}

// 9. Theme Switcher
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;

    if (isDarkMode) {
        body.style.background =
            "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)";
        body.style.color = "#ecf0f1";
        document
            .querySelectorAll(
                ".product-card, .board-member, .event-card, .form-container, .dom-tree"
            )
            .forEach((card) => {
                card.style.background = "#34495e";
                card.style.color = "#ecf0f1";
            });
    } else {
        body.style.background =
            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
        body.style.color = "#333";
        document
            .querySelectorAll(
                ".product-card, .board-member, .event-card, .form-container, .dom-tree"
            )
            .forEach((card) => {
                card.style.background = "white";
                card.style.color = "#333";
            });
    }
}

// 10. Add Theme Toggle Button
function addThemeToggle() {
    const themeButton = document.createElement("button");
    themeButton.innerHTML = "🌙";
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        background: linear-gradient(45deg, #d49f2c, #944c09);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    themeButton.addEventListener("click", () => {
        toggleTheme();
        themeButton.innerHTML = isDarkMode ? "☀️" : "🌙";
    });

    themeButton.addEventListener("mouseenter", () => {
        themeButton.style.transform = "scale(1.1)";
    });

    themeButton.addEventListener("mouseleave", () => {
        themeButton.style.transform = "scale(1)";
    });

    document.body.appendChild(themeButton);
}

// 11. Lazy Loading Effect for Images
function addLazyLoading() {
    const productImages = document.querySelectorAll(".product-image");
    const memberPhotos = document.querySelectorAll(".member-photo");

    [...productImages, ...memberPhotos].forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "scale(0.8)";

        setTimeout(() => {
            element.style.transition = "all 0.6s ease";
            element.style.opacity = "1";
            element.style.transform = "scale(1)";
        }, index * 200);
    });
}

// 12. Form Field Animations
function addFormAnimations() {
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.transform = "scale(1.02)";
            this.style.boxShadow = "0 5px 15px rgba(255, 107, 107, 0.2)";
        });

        input.addEventListener("blur", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "none";
        });
    });
}

// 13. Typing Effect for Hero Text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 14. Initialize All Features
document.addEventListener("DOMContentLoaded", function () {
    // Initialize search bars
    createSearchBar();

    // Add theme toggle
    addThemeToggle();

    // Add lazy loading
    setTimeout(addLazyLoading, 500);

    // Add form animations
    addFormAnimations();

    // Initial scroll animation check
    setTimeout(animateOnScroll, 100);

    // Typing effect for main hero
    const heroTitle = document.querySelector("#home .hero h1");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }
});

// 15. Keyboard Navigation
document.addEventListener("keydown", function (e) {
    // Arrow key navigation between pages
    const pages = [
        "home",
        "products",
        "board",
        "inquiries",
        "events",
        "dom",
    ];
    const currentPage = document.querySelector(".page.active").id;
    const currentIndex = pages.indexOf(currentPage);

    if (e.key === "ArrowRight" && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
        document
            .querySelector(`[onclick="showPage('${pages[currentIndex + 1]}')"]`)
            .classList.add("active");
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
        document
            .querySelector(`[onclick="showPage('${pages[currentIndex - 1]}')"]`)
            .classList.add("active");
    }

    // Press 'S' to focus search
    if (
        e.key.toLowerCase() === "s" &&
        !e.target.matches("input, textarea")
    ) {
        e.preventDefault();
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// 16. Performance Monitor
function monitorPerformance() {
    let clickCount = 0;
    let startTime = Date.now();

    document.addEventListener("click", function () {
        clickCount++;
        if (clickCount % 10 === 0) {
            const timeElapsed = (Date.now() - startTime) / 1000;
            console.log(
                `Performance: ${clickCount} clicks in ${timeElapsed.toFixed(
                    2
                )} seconds`
            );
        }
    });
}

monitorPerformance();

