document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById("themeBtn");
    const accordions = document.getElementsByClassName("accordion");

    // Theme Toggle
    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
        });
    }

    // Direct Toggle Logic
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function() {
            // Toggle active class for button styling
            this.classList.toggle("active");
            
            // Panel ko toggle karein
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});