const socket = io("https://chat-app-nodejs-txw9.onrender.com");
    let username = prompt("Enter your name:") || "Anonymous";

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
   

function toggleSidebar() {       document.getElementById('sidebar').classList.toggle('active');
    }

