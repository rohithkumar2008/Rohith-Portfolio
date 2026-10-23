
/* Commit 5: Add dark mode feature */

// Find the theme button
const themeButton = document.getElementById("themeButton");

// Run this function when the button is clicked
themeButton.addEventListener("click", function () {

    // Change the theme of the website
    document.body.classList.toggle("dark-mode");

    // Update the button text
    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }

});


/* =====================================================
   NEW: BASIC ANIMATIONS (3 easy ones)
   ===================================================== */


/* ---- Basic 1: Remember the theme ---- */

// when the page opens, check what was saved last time
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "Light Mode";
}

// every time the button is clicked, save the new choice
themeButton.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


/* ---- Basic 2: Highlight the page you are on ---- */

// the file name of this page, like "about" or "skills"
// (an empty name means the home page)
let pageName = location.pathname.split("/").pop().replace(".html", "");
if (pageName === "") {
    pageName = "index";
}

const navLinks = document.querySelectorAll("nav a");

for (let i = 0; i < navLinks.length; i++) {
    let linkName = navLinks[i].getAttribute("href").replace(".html", "");

    if (linkName === pageName) {
        navLinks[i].classList.add("active");
    }
}


/* ---- Basic 3: Back to top button ---- */

// make the button with JavaScript
const topButton = document.createElement("button");
topButton.id = "topButton";
topButton.textContent = "↑";
document.body.appendChild(topButton);

// show the button only after scrolling down 300px
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});


/* ---- Featured projects carousel (home page only) ---- */

const carouselTrack = document.querySelector(".carousel-track");

if (carouselTrack) {
    const carousel = document.querySelector(".project-carousel");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const previousSlide = document.getElementById("previousSlide");
    const nextSlide = document.getElementById("nextSlide");
    let currentSlide = 0;
    let carouselTimer;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        carouselTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

        for (let i = 0; i < dots.length; i++) {
            const isCurrent = i === currentSlide;
            dots[i].classList.toggle("active", isCurrent);
            dots[i].setAttribute("aria-current", isCurrent ? "true" : "false");
        }
    }

    function startCarousel() {
        carouselTimer = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4500);
    }

    function restartCarousel() {
        clearInterval(carouselTimer);
        startCarousel();
    }

    previousSlide.addEventListener("click", function () {
        showSlide(currentSlide - 1);
        restartCarousel();
    });

    nextSlide.addEventListener("click", function () {
        showSlide(currentSlide + 1);
        restartCarousel();
    });

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function () {
            showSlide(i);
            restartCarousel();
        });
    }

    carousel.addEventListener("mouseenter", function () {
        clearInterval(carouselTimer);
    });

    carousel.addEventListener("mouseleave", startCarousel);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        startCarousel();
    }
}


/* ---- Simple interactive welcome (home page only) ---- */

const helloButton = document.getElementById("helloButton");
const helloMessage = document.getElementById("helloMessage");

if (helloButton && helloMessage) {
    helloButton.addEventListener("click", function () {
        helloMessage.textContent = "Thanks for visiting! I hope you enjoy exploring my portfolio.";
        helloButton.textContent = "Nice to meet you!";
        helloButton.disabled = true;
    });
}


/* ---- Click a skill to learn what it represents ---- */

const skillCards = document.querySelectorAll(".skill-card");

if (skillCards.length > 0) {
    const skillsList = document.querySelector(".skills-list");
    const skillFeedback = document.createElement("p");
    skillFeedback.className = "skill-feedback";
    skillFeedback.setAttribute("aria-live", "polite");
    skillsList.insertAdjacentElement("afterend", skillFeedback);

    function selectSkill(card) {
        for (let i = 0; i < skillCards.length; i++) {
            skillCards[i].classList.remove("selected");
        }

        card.classList.add("selected");
        const skillName = card.querySelector("h3").textContent;
        const skillDescription = card.querySelector("p").textContent;
        skillFeedback.textContent = skillName + ": " + skillDescription;
    }

    for (let i = 0; i < skillCards.length; i++) {
        const card = skillCards[i];
        card.classList.add("interactive-skill");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", "Learn about " + card.querySelector("h3").textContent);

        card.addEventListener("click", function () {
            selectSkill(card);
        });

        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectSkill(card);
            }
        });
    }
}


/* ---- Flip the profile card on tap or keyboard ---- */

const profileCard = document.querySelector(".profile-card");

if (profileCard) {
    profileCard.addEventListener("click", function () {
        profileCard.classList.toggle("flipped");
    });

    profileCard.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            profileCard.classList.toggle("flipped");
        }
    });
}


/* ---- Contact form validation and email request ---- */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const contactEmail = document.getElementById("contactEmail");
    const contactMobile = document.getElementById("contactMobile");
    const formStatus = document.getElementById("formStatus");

    contactMobile.addEventListener("input", function () {
        contactMobile.value = contactMobile.value.replace(/\D/g, "").slice(0, 10);
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailIsValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(contactEmail.value.trim());
        const mobileIsValid = /^\d{10}$/.test(contactMobile.value);

        contactEmail.setCustomValidity(emailIsValid ? "" : "Enter a valid email such as name@mail.com.");
        contactMobile.setCustomValidity(mobileIsValid ? "" : "Enter exactly 10 digits for the mobile number.");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const recipient = contactForm.dataset.recipient;
        const name = document.getElementById("contactName").value.trim();
        const message = document.getElementById("contactMessage").value.trim();
        const subject = "Portfolio contact request from " + name;
        const body = "Name: " + name + "\nEmail: " + contactEmail.value.trim() + "\nMobile: " + contactMobile.value + "\n\nMessage:\n" + message;

        formStatus.textContent = "Your email app is opening with your request ready to send.";
        window.location.href = "mailto:" + encodeURIComponent(recipient) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
}

// go back to the top smoothly when clicked
topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =====================================================
   NEW: MODERATE ANIMATIONS (3 slightly harder ones)
   ===================================================== */


/* ---- Moderate 1: Cards appear one by one while scrolling ---- */

const revealItems = document.querySelectorAll(
    ".about-intro, .about-card, .closing-message, .skill-card, .project-card"
);

// start every card hidden (the CSS class "reveal" makes it invisible)
for (let i = 0; i < revealItems.length; i++) {
    revealItems[i].classList.add("reveal");
}

// a watcher that tells us when a card enters the screen
const watcher = new IntersectionObserver(function (entries) {

    let count = 0; // how many cards appeared in this round

    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {

            const card = entries[i].target;

            // each card waits a little longer than the one before it
            setTimeout(function () {
                card.classList.add("show");
            }, count * 120);

            count = count + 1;
            watcher.unobserve(card); // only animate once
        }
    }

}, { threshold: 0.15 });

for (let i = 0; i < revealItems.length; i++) {
    watcher.observe(revealItems[i]);
}


/* ---- Moderate 2: Typing effect on the home page ---- */

// this only exists on the home page
const typingText = document.querySelector(".intro h3");

if (typingText) {
    const fullText = typingText.textContent;
    let letter = 0;

    // keep the same height so the page does not jump
    typingText.style.minHeight = typingText.offsetHeight + "px";
    typingText.textContent = "";
    typingText.classList.add("typing");

    // add one letter every 70 milliseconds
    const timer = setInterval(function () {
        letter = letter + 1;
        typingText.textContent = fullText.slice(0, letter);

        // all letters done: stop the timer
        if (letter === fullText.length) {
            clearInterval(timer);
            setTimeout(function () {
                typingText.classList.remove("typing");
            }, 1500);
        }
    }, 70);
}


/* ---- Moderate 3: Scroll progress bar at the top ---- */

const progressBar = document.createElement("div");
progressBar.id = "progressBar";
document.body.appendChild(progressBar);

window.addEventListener("scroll", function () {
    // how far we scrolled / total scrollable distance
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    if (total > 0) {
        progressBar.style.width = (scrolled / total) * 100 + "%";
    }
});
