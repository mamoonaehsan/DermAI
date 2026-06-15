document.addEventListener('DOMContentLoaded', () => {
    // Elements Selection
    const fileInput = document.getElementById('fileInput');
    const startScanBtn = document.getElementById('startScan');
    const submitBtn = document.getElementById('submitBtn');
    const previewImg = document.getElementById('previewImg');
    const uploadForm = document.getElementById('uploadForm');
    const resultDisplay = document.getElementById('resultDisplay');
    const resPrediction = document.getElementById('res_prediction');
    const resConfidence = document.getElementById('res_confidence');
    
    // Details Section Placeholders
    const resDescription = document.getElementById('res_description');
    const resSymptoms = document.getElementById('res_symptoms');
    const resPrecautions = document.getElementById('res_precautions');

    // 🌟 Doctor Cards Placeholders Injection
    const docRecommendationBox = document.getElementById('doctor-recommendation-box');
    const docName = document.getElementById('doc-name');
    const docHospital = document.getElementById('doc-hospital');
    const docTiming = document.getElementById('doc-timing');
    const docPhone = document.getElementById('doc-phone');
    const docEmail = document.getElementById('doc-email');

    const toggleBtn = document.getElementById('toggleMode');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // 1. Mobile Menu View Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Trigger File Input System Click
    if (startScanBtn) {
        startScanBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // 3. Image Selection Preview Update Logic
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                    previewImg.style.margin = '20px auto';
                    
                    if(submitBtn) submitBtn.style.display = 'inline-block';
                    if(startScanBtn) startScanBtn.innerText = 'Change Image';
                    
                    // Clear older traces dynamically
                    if(resultDisplay) resultDisplay.style.display = 'none';
                    if(docRecommendationBox) docRecommendationBox.style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Submit Payload via AJAX Async Mode
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>⏳</span> Analyzing...';
            
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Update core predictions
                    if(resPrediction) resPrediction.innerText = data.prediction;
                    if(resConfidence) resConfidence.innerText = data.confidence;
                    
                    // Update details descriptions maps
                    if (resDescription) resDescription.innerText = data.description;
                    if (resSymptoms) resSymptoms.innerText = data.symptoms;
                    if (resPrecautions) resPrecautions.innerText = data.precautions;
                    
                    // 🌟 Map & Unhide Doctor details card values
                    if (data.doctor_name && docRecommendationBox) {
                        if(docName) docName.innerText = data.doctor_name;
                        if(docHospital) docHospital.innerText = data.doctor_hospital;
                        if(docTiming) docTiming.innerText = data.doctor_timing;
                        if(docPhone) docPhone.innerText = data.doctor_phone;
                        if(docEmail) docEmail.innerText = data.doctor_email;

                        docRecommendationBox.style.display = 'block';
                    } else if (docRecommendationBox) {
                        docRecommendationBox.style.display = 'none';
                    }
                    
                    // Visual updates animation scroll
                    if(resultDisplay) {
                        resultDisplay.style.display = 'block';
                        resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    alert("Analysis Error: " + (data.error || "Server issue"));
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Technical error: Make sure Flask server is running.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Analyze Now';
            }
        });
    }

    // 5. Dark Mode Configuration
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(toggleBtn) toggleBtn.innerText = "☀️";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                toggleBtn.innerText = "☀️";
            } else {
                theme = 'dark';
                toggleBtn.innerText = "🌙";
            }
            localStorage.setItem('theme', theme);
        });
    }
});