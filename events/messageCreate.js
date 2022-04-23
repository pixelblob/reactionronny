const { client } = require("../index.js")
const {MessageAttachment} = require("discord.js")

/**
 *
 * @param {Discord.Client} bot
 * @param {Discord.Message} msg
 */

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(msg) {
        var {id} = require("../settings/test.json")
        if (msg.channel.id != id) return;
        if (!msg.attachments.size > 0 && !msg.embeds.length > 0) return;

        msg.react("👍")


        
    },
};
