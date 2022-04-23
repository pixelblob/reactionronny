const fs = require('fs');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        //Register's all of the bots "/" commands.
        const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            console.log("Found command: " + command.data.name)
        }

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍';
        };
        
    },
};