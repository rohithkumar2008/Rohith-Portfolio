
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
