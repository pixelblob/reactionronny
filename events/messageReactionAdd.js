const { client } = require("../index.js")
const {MessageAttachment} = require("discord.js")
const fs = require("fs")
const { reaction } = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(messageReaction, user) {

        var {id} = require("../settings/test.json")
        var scores = require("../settings/scores.json")
        if (messageReaction.emoji.name != reaction) return;
        if (user.bot) return;
        if (messageReaction.message.channelId != id) return;

        messageReaction.message = await client.channels.cache.get(messageReaction.message.channelId).messages.fetch(messageReaction.message.id)
        

        var score = scores.find(s=> s.id == messageReaction.message.author.id)

        if (!score) {
            scores.push({id:messageReaction.message.author.id,score: 1,messages:[{id: messageReaction.message.id,score: 1}]})
        } else {
            var scoremessage = score.messages.find(m=> m.id == messageReaction.message.id)
            if (scoremessage) scoremessage.score++
            score.score++
        }

        fs.writeFile("settings/scores.json", JSON.stringify(scores), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(score));
            console.log('writing to ' + "../settings/scores.json");
          });

        console.log(`Collected ${messageReaction.emoji.name} from ${user.tag}`);

    },
};