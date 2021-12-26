const { Client, Message, MessageEmbed, Invite } = require('discord.js');
const fetch = require('node-fetch')
const config = require('../../config/config.json')

module.exports = {
    name: 'betrayal-io',
    aliases: [],
    categories : 'minigames',
    description: 'Starts a betrayal-io session',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("You must be connected to a voice channel to use this command.")
                .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new MessageEmbed()
                    .setDescription("I was unable to start a yt together session.")
                    .setColor("#ff0000")
            )
            let embed = new MessageEmbed()
        .setAuthor("💎BestBot💎", "https://i.imgur.com/6cGQsPI.png")
        .setColor("#FF0000")
        .setDescription(`
Using **betrayal-io Game** you can Play with your friends in a Voice Channel. Click *Join betrayal-io Game* to join in!

__**[Join betrayal-io Game](https://discord.com/invite/${invite.code})**__

⚠ **Note:** This only works in Desktop
`)
        message.channel.send(embed)
        })
    }
}