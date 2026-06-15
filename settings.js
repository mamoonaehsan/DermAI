document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById("themeBtn");

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
});