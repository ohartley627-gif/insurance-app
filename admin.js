const API_BASE = "YOUR_API_URL"; // example: http://IP:PORT

async function loadApplications() {
    const res = await fetch(`${API_BASE}/applications`);
    const apps = await res.json();

    const container = document.getElementById("applications");
    container.innerHTML = "";

    apps.forEach(app => {
        const card = document.createElement("div");
        card.className = "application-card";

        card.innerHTML = `
            <h3>User: ${app.userId}</h3>
            <pre>${JSON.stringify(app.answers, null, 2)}</pre>
            <button class="accept-btn" onclick="acceptApp('${app.token}')">Accept</button>
            <button class="deny-btn" onclick="denyApp('${app.token}')">Deny</button>
        `;

        container.appendChild(card);
    });
}

async function acceptApp(token) {
    await fetch(`${API_BASE}/applications/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
    });
    loadApplications();
}

async function denyApp(token) {
    await fetch(`${API_BASE}/applications/deny`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
    });
    loadApplications();
}

loadApplications();