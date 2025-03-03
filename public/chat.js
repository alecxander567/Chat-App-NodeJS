const socket = io("https://chat-app-nodejs-txw9.onrender.com");
let username = prompt("Enter your name:") || "Anonymous";

document.getElementById('profile-name').innerText = username;
socket.emit("register", username);

function sendPrivateMessage() {
    let receiver = document.getElementById("receiver").value.trim();
    let privateMsg = document.getElementById("privateMessage").value.trim();

    if (receiver !== "" && privateMsg !== "") {
        socket.emit("privateMessage", { sender: username, receiver, text: privateMsg });

        let privateChatBox = document.getElementById("private-chat-box");
        privateChatBox.innerHTML += `
            <div class="message sent">
                 <div class="text"><strong>You:</strong> ${privateMsg}</div>
            </div>
        `;
        privateChatBox.scrollTop = privateChatBox.scrollHeight;

        document.getElementById("privateMessage").value = "";
    }
}

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

socket.on("privateMessage", (data) => {
    let privateChatBox = document.getElementById("private-chat-box");
    privateChatBox.innerHTML += `
        <div class="message received">
            <div class="text"><strong>${data.sender}:</strong> ${data.text}</div>
        </div>
    `;
    privateChatBox.scrollTop = privateChatBox.scrollHeight;
});

socket.on("userList", (users) => {
    let userSelect = document.getElementById("receiver");
    userSelect.innerHTML = '<option value="">Select User</option>'; 

    users.forEach((user) => {
        if (user !== username) {
            let option = document.createElement("option");
            option.value = user;
            option.textContent = user;
            userSelect.appendChild(option);
        }
    });
});
  
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

