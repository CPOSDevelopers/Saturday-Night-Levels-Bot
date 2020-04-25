// get environment variables
require('dotenv').config();
const Discord = require('discord.js');
global.client = new Discord.Client();
const { prefix } = require('./config.json');

if (process.env.GLITCH) {
    const run = require("./JS/glitch.js");
}




var voteInfo; // Just vibin' variable

// ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'online',
        game: {
            name: '!help',
            type: 'LISTENING'
        }
    });
});

// commands
client.on('message', message => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();
    // COMMANDS
    if (command === 'help') {
        try {
            message.channel.send('Sent to your DMs via Amazon magic!');
            message.author.createDM().then((DMchannel) => DMchannel.send(helpEmbed));
        } catch (e) { }
    }
    // EVENTS
    if (message.channel.id === '702566800809787494' && message.content.includes('vote')) {
        message.react('✅').then(() => message.react('❌'));
    } else if (message.channel.id === '702566800809787494' && !message.content.includes('vote')) {
        message.delete();
    }
});

// announce passed votes
client.on('messageReactionAdd', (reaction, user) => {
    // count and channel
    let memberCount = reaction.message.guild.members.filter(member => !member.user.bot).size;
    let passedVotes = reaction.message.guild.channels.find(c => c.name === 'passed-votes');
    let pass = Math.ceil(memberCount / 2) + 1;

    if (!passedVotes) {
        try {
            passedVotes = message.guild.createChannel(
                `mod-logs`,
                `text`);
        } catch (e) { }
    } else if (reaction.emoji.name == '✅' && reaction.count >= pass && reaction.channel.id === '702566800809787494') {
        voteInfo = reaction.message.content;
        passedVotes.send(passEmbed);
    }
});

// EMBEDS
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('HELP MEH')
    .setAuthor('Frenbot')
    .setDescription(`Currently there are no commands except help! Why don't you suggest some? :)`)
    .setThumbnail('https://cdn.discordapp.com/avatars/702193677744865341/80771b6913d07d6581c657ef24b4ea4b.png?size=256')
    .setTimestamp()
    .setFooter('Help I\'ve fallen and I can\'t get up!');
const passEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Vote Passed')
    .setAuthor('Frenbot')
    .setDescription(voteInfo)
    .setThumbnail('https://cdn.discordapp.com/avatars/702193677744865341/80771b6913d07d6581c657ef24b4ea4b.png?size=256')
    .setTimestamp()
    .setFooter('Hurry and and enforce it mods!');

client.login(process.env.TOKEN);