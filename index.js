const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILD_VOICE_STATES", "GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_INTEGRATIONS", "GUILD_PRESENCES", "DIRECT_MESSAGES"], partials: ["CHANNEL", 'USER', 'REACTION', 'MESSAGE'] });
const { token } = require('./config.json');
const { Collection, MessageActionRow } = require('discord.js');
global.AbortController = require("node-abort-controller").AbortController;
const fs = require('fs');

module.exports = {
    client
}

client.commands = new Collection();
client.events = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        var listener = client.once(event.name, (...args) => event.execute(...args));
        //event.listener = listener
        client.events.set(event.name, event);
    } else {
        var listener = client.on(event.name, (...args) => event.execute(...args));
        //event.listener = listener
        //console.log(event)
        client.events.set(event.name, event);
    } 
    console.log("Found event: " + event.name)
}

client.once('ready', function() {
    console.log('Ready!\n' + "Current Servers" + "(" + client.guilds.cache.map(g => g.name).length + ")" + " : " + client.guilds.cache.map(g => g.name).join(" / "))
})



client.login(token);