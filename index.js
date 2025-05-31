require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const targetTime = new Date('2025-06-05T00:00:00.000Z');

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  updateStatus();
  setInterval(updateStatus, 30000);
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
