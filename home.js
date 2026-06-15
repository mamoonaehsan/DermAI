// home.js

// 1. Dark Mode Toggle
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// 2. Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// 3. Reveal Disease Cards on Load
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.disease-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 150); // Ek ke baad ek card aayega
    });
});