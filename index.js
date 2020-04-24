// get environment variables
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('config.json');

let memberCount = guild.members.filter(member => !member.user.bot).size;
let passedVotes = message.guild.channels.find(c => c.name === 'passed-votes');

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
    if (!passedVotes) {
        try {
            passedVotes = await message.guild.createChannel(
                `mod-logs`,
                `text`);
        } catch (e) { }
    }
});

// commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();
    // args handling above
    if (command === '!help') {
        try {
            message.channel.send('Sent to your DMs via Amazon magic!');
            message.author.createDM().then((DMchannel) => DMchannel.send(helpEmbed));
            // EMBED
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('HELP MEH')
            .setAuthor('Frenbot')
            .setDescription(`Currently there are no commands except help! Why don't you suggest some? :)`)
            .setThumbnail('https://cdn.discordapp.com/avatars/702193677744865341/80771b6913d07d6581c657ef24b4ea4b.png?size=256')
            .setTimestamp()
            .setFooter('Help I\'ve fallen and I can\'t get up!');
        } catch (e) { }
    }
});

// events
client.on('message', message => {
    if (message.channel.id === '702566800809787494' && msg.content.includes('vote')) {
        message.react('✅').then(() => message.react('❌'));
    } else {
        message.delete();
    }
});

// announce passed votes
client.on('messageReactionAdd', (reaction, user) => {
    let pass = Math.ceil(memberCount / 2) + 1;
    if (reaction.emoji.name == '✅' && reaction.count >= pass && reaction.channel.id === '702566800809787494') {
        passedVotes.send(passEmbed);
    }
    // EMBED
    const passEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vote Passed')
        .setAuthor('Frenbot')
        .setDescription(`${reaction.message.content}`)
        .setThumbnail('https://cdn.discordapp.com/avatars/702193677744865341/80771b6913d07d6581c657ef24b4ea4b.png?size=256')
        .setTimestamp()
        .setFooter('Hurry and and enforce it mods!');
});

client.login(process.env.TOKEN);