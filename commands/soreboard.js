const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('scoreboard')
        .setDescription('show le scoreas sbarsosas'),
    async execute(interaction) {

        var scores = require("../settings/scores.json")

        var test = require("../settings/test.json")

        if (!test.lastResetTime) test.lastResetTime = new Date()

        var hours = Math.abs(new Date(test.lastResetTime) - new Date()) / 36e5;

        scores.filter(s=> s.score > 0)
        scores.sort((a, b) => b.score-a.score)

        console.log(hours)
        if (hours > 167) {

            interaction.reply((scores.length > 0 ?"SCORES ARE BEING REEST AFTER THIS MESSAGE!\n":"No scores have been recorded!")+scores.map(s=>`***__${interaction.guild.members.cache.get(s.id).user.username}__:***\n •Most: ${s.messages.sort((a, b) => b.score-a.score)[0].score}\n •Total: ${s.score}\n •Memes: ${s.messages.length}`).join("\n"))

            console.log(test)
            test.lastResetTime = new Date()
            console.log(test)
            scores = []
            fs.writeFile("settings/scores.json", JSON.stringify(scores), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(scores));
                console.log('writing to ' + "../settings/scores.json");
                delete require.cache[require.resolve("../settings/scores.json")];
              });
        }

        fs.writeFile("settings/test.json", JSON.stringify(test), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(test));
            console.log('writing to ' + "../settings/test.json");
          });

          console.log(scores)
          

        if (hours < 167) interaction.reply((scores.length > 0 ?"Below are score, yes:\n":"No scores have been recorded!")+scores.map(s=>`***__${interaction.guild.members.cache.get(s.id).user.username}__:***\n •Most: ${s.messages.sort((a, b) => b.score-a.score)[0].score}\n •Total: ${s.score}\n •Memes: ${s.messages.length}`).join("\n"))

    }
}