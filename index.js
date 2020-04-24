// get environment variables
require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
  if (msg.channel.id === '702566800809787494' && msg.content.includes('vote')) {
    msg.react('✅').then(() => msg.react('❌'));
  } else {
    msg.delete();
});
  }
});

client.login(process.env.TOKEN);
