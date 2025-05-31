const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 🔒 Replace with your **bot token**
const TOKEN = 'YOUR_BOT_TOKEN_HERE';

// SG3 drops at 8AM Singapore time on June 5, 2025 = 12AM UTC
const targetTime = new Date('2025-06-05T00:00:00.000Z');

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    updateStatus();
    setInterval(updateStatus, 30 * 1000); // every 30s
});

function updateStatus() {
    const now = new Date();
    let diff = targetTime - now;

    if (diff <= 0) {
        client.user.setPresence({
            activities: [{ name: "🎮 SG3 OUT NOW!", type: ActivityType.Playing }],
            status: 'online',
        });
        return;
    }

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    const status = `⏳ SG3 in ${hours}h ${minutes}m ${seconds}s`;

    client.user.setPresence({
        activities: [{ name: status, type: ActivityType.Playing }],
        status: 'idle',
    });

    console.log(`[UPDATE] ${status}`);
}

client.login(TOKEN);
