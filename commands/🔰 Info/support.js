const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "support",
  category: "🔰 Info",
  aliases: [""],
  cooldown: 5,
  usage: "support",
  description: "Gives you an support link for this server",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(":heart: This is my server!")
        .setFooter(ee.footertext, ee.footericon)
        .setURL("https://www.bestbot.xyz/")
        .setDescription("[Click here](https://www.bestbot.xyz/)")
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}
