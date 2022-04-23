const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('bind the bot to a channel')
        .addChannelOption(option => option.setName('destination').setDescription('Select a channel').setRequired(true)),
    async execute(interaction) {

        const file = require("../settings/test.json");
    
 const channel = interaction.options.getChannel('destination');
 file.id = channel.id
    
fs.writeFile("settings/test.json", JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + "../settings/test.json");
});
        
        interaction.reply({ content: 'Changing the channel!' });
    }
}