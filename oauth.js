const CLIENT_ID = "YOUR_CLIENT_ID";
const REDIRECT_URI = "YOUR_REDIRECT_URL"; 
const REQUIRED_ROLES = [
    "1490156186224562346",
    "1486487545775657022",
    "1486486832249311342"
];

async function getUserData(token) {
    const res = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}

async function getUserGuilds(token) {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}

async function getUserRoles(token, guildId) {
    const res = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}