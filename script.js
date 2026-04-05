// === CONFIG ===
const CLIENT_ID = "1490180678036226139";
const REDIRECT_URI = "https://ohartley627-gif.github.io/insurance-app/";
const BOT_API_URL = "http://fi11.bot-hosting.net:20376/submit-application";

// === GET TOKEN FROM URL ===
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

// === DOM ELEMENTS ===
const loginSection = document.getElementById("login-section");
const loginBtn = document.getElementById("login-btn");
const form = document.getElementById("app-form");
const statusText = document.getElementById("status");

// === DISCORD LOGIN URL ===
const discordAuthURL =
    `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token&scope=identify&state=${token}`;

// === LOGIN BUTTON CLICK ===
loginBtn.href = discordAuthURL;

// === CHECK IF USER JUST LOGGED IN ===
if (window.location.hash.includes("access_token")) {
    loginSection.classList.add("hidden");
    form.classList.remove("hidden");
}

// === FORM SUBMISSION ===
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;

    statusText.textContent = "Submitting...";

    const response = await fetch(BOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: token,
            answers: {
                why_join: q1,
                read_info: q2
            }
        })
    });

    if (response.ok) {
        statusText.textContent = "Application submitted successfully!";
        form.reset();
        form.classList.add("hidden");
    } else {
        statusText.textContent = "Error submitting application.";
    }
});