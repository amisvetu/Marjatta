// Lataa tallennettu historia
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

function renderChat() {
    const box = document.getElementById("chat-box");
    box.innerHTML = "";

    chatHistory.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + msg.sender;
        div.textContent = msg.text;
        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    // Lisää käyttäjän viesti
    chatHistory.push({ sender: "user", text });
    input.value = "";

    // Botin vastaus (yksinkertainen placeholder)
    const botReply = "Vastaan: " + text;
    chatHistory.push({ sender: "bot", text: botReply });

    // Tallenna LocalStorageen
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    renderChat();
}

renderChat();
