// =======================
// GET ELEMENTS
// =======================
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');

// =======================
// FORM SUBMISSION
// =======================
loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberCheckbox.checked;

    // Basic validation
    if(!validateEmail(email)){
        showError("Please enter a valid email");
        return;
    }
    if(password.length < 6){
        showError("Password must be at least 6 characters");
        return;
    }

    // Simulate login
    performLogin(email, password, rememberMe);
});

// =======================
// EMAIL VALIDATION
// =======================
function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// =======================
// SIMULATE LOGIN (Updated for Flask)
// =======================
function performLogin(email, password, rememberMe){
    const loginBtn = loginForm.querySelector('.btn-login');
    loginBtn.textContent = 'Signing In...';
    loginBtn.disabled = true;

    setTimeout(()=> {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify({email, rememberMe}));
        localStorage.setItem('isLoggedIn','true');

        showSuccess("Login successful! Redirecting...");

        // CRITICAL CHANGE: Redirecting to Flask Route instead of .html file
        setTimeout(()=> {
            window.location.href = '/home'; 
        }, 1500);
    }, 1200);
}

// =======================
// NOTIFICATION HELPERS
// =======================
function showError(msg){
    removeMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.marginBottom = '10px';
    errorDiv.textContent = msg;
    loginForm.prepend(errorDiv);

    setTimeout(()=> { errorDiv.remove(); }, 5000);
}

function showSuccess(msg){
    removeMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.style.color = '#2ecc71';
    successDiv.style.marginBottom = '10px';
    successDiv.textContent = msg;
    loginForm.prepend(successDiv);
}

function removeMessages(){
    const alerts = loginForm.querySelectorAll('.alert');
    alerts.forEach(a => a.remove());
}

// =======================
// REMEMBER EMAIL
// =======================
window.addEventListener('DOMContentLoaded', ()=> {
    const remembered = JSON.parse(localStorage.getItem('user'));
    if(remembered && remembered.rememberMe){
        emailInput.value = remembered.email;
        rememberCheckbox.checked = true;
    }
});

