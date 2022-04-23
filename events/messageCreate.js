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
        var {id} = require("..``/settings/test.json")
        if (msg.channel.id != id) return;
        //console.log(msg)
        if (!msg.attachments.size > 0 && !msg.embeds.length > 0 && !msg.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) return;

        msg.react("👍")
    },
};
