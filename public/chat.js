    const socket = io("http://localhost:3000");
    let username = prompt("Enter your name:") || "Anonymous";

    // Update user profile name in sidebar
    document.getElementById('profile-name').innerText = username;

    function sendMessage() {
        let msg = document.getElementById('message').value.trim();
        if (msg !== "") {
            socket.emit('chatMessage', { user: username, text: msg });
            document.getElementById('message').value = '';
        }
    }

    socket.on('chatMessage', (data) => {
        let chatBox = document.getElementById('chat-box');
        let messageClass = (data.user === username) ? 'sent' : 'received';
        chatBox.innerHTML += `
            <div class="message ${messageClass}">
                <div class="text">
                    <strong>${data.user}:</strong> ${data.text}
                </div>
            </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    // Sidebar toggle function
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
    }

