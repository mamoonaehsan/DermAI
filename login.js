document.addEventListener("DOMContentLoaded", function () {
    let isSignupState = false;

    // Elements Selection
    const authForm = document.getElementById("authForm");
    const nameGroup = document.getElementById("nameGroup");
    const usernameInput = document.getElementById("username");
    const roleGroup = document.getElementById("roleGroup");
    const cnicGroup = document.getElementById("cnicGroup");
    const cnicInput = document.getElementById("doctor_document"); // Target File Input
    const rememberGroup = document.getElementById("rememberGroup");
    const submitBtn = document.getElementById("submitBtn");
    const toggleText = document.getElementById("toggleText");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const pageSubtitle = document.getElementById("pageSubtitle");
    
    // Side Panel Elements
    const sideTitle = document.getElementById("sideTitle");
    const sideDesc = document.getElementById("sideDesc");

    // Global Function for Switching States
    window.switchToSignup = function (e) {
        e.preventDefault();

        if (!isSignupState) {
            // Change to SIGNUP State
            authForm.action = "/signup";
            
            nameGroup.style.display = "block";
            usernameInput.setAttribute("required", "required");
            roleGroup.style.display = "block";
            rememberGroup.style.display = "none";
            forgotPasswordLink.style.display = "none";
            
            pageSubtitle.innerText = "Create Your Account";
            submitBtn.innerText = "Register Now";
            toggleText.innerHTML = 'Already have an account? <a href="#" onclick="switchToSignup(event)" id="toggleLink">Sign In</a>';
            
            sideTitle.innerText = "Join DermScan";
            sideDesc.innerText = "Register today to identify skin conditions and get expert insights instantly.";
            
            toggleCnicField(); // Manage Document field visibility based on dropdown selection
            isSignupState = true;
        } else {
            // Change back to LOGIN State
            authForm.action = "/login";
            
            nameGroup.style.display = "none";
            usernameInput.removeAttribute("required");
            roleGroup.style.display = "none";
            cnicGroup.style.display = "none";
            cnicInput.removeAttribute("required");
            rememberGroup.style.display = "flex";
            forgotPasswordLink.style.display = "block";
            
            pageSubtitle.innerText = "Skin Disease Detection";
            submitBtn.innerText = "Sign In";
            toggleText.innerHTML = 'Don\'t have an account? <a href="#" onclick="switchToSignup(event)" id="toggleLink">Sign Up</a>';
            
            sideTitle.innerText = "Welcome Back";
            sideDesc.innerText = "Sign in to access your skin health analysis and medical records.";
            
            isSignupState = false;
        }
    };

    // Global Function to Handle Role Selection
    window.toggleCnicField = function () {
        var roleSelect = document.getElementById("role");
        
        if (isSignupState && roleSelect && roleSelect.value === "doctor") {
            cnicGroup.style.display = "block";
            cnicInput.setAttribute("required", "required");
        } else {
            cnicGroup.style.display = "none";
            cnicInput.removeAttribute("required");
            cnicInput.value = ""; // Safely clears out selected files
        }
    };
});