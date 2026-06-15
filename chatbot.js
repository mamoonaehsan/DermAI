document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const toggleBtn = document.getElementById('toggleMode');

    // 1. Core Event Listeners execution setup
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // 2. Chat Processing Function Block
    async function sendMessage() {
        const messageText = userInput.value.trim();
        if (!messageText || !chatBox) return;

        // Append User Interface Text Node
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-msg';
        userDiv.innerText = messageText;
        chatBox.appendChild(userDiv);

        userInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            // Forward user input strings to backend endpoint synchronously
            const response = await fetch('/chatbot/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });
            const data = await response.json();

            // Append Server Bot Response Text Element
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-msg';
            botDiv.innerText = data.response;
            chatBox.appendChild(botDiv);
            
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (error) {
            console.error("Technical Connection Refused Error:", error);
        }
    }

    // 3. Centralized Dark Mode Sync Protocol
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.innerText = "☀️";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                toggleBtn.innerText = "☀️";
            } else {
                theme = 'light';
                toggleBtn.innerText = "🌙";
            }
            localStorage.setItem('theme', theme);
        });
    }
});