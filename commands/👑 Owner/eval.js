const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `eval`,
  category: `π Owner`,
  aliases: [`evaluate`],
  description: `eval Command`,
  usage: `eval <CODE>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if ("604041543485227009" !== message.author.id)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the **\`[ππ­ππ­ πππ π π’π¨π‘]#1919\`** is allowed to run this Cmd`)
      );
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(`${emoji.msg.ERROR}  Error | You have to at least include one evaluation arguments`)
      );
    let evaled;
    try {
      if (args.join(` `).includes(`token`)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);

      evaled = await eval(args.join(` `));
      //make string out of the evaluation
      let string = inspect(evaled);
      //if the token is included return error
      if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
      //define queueembed
      let evalEmbed = new MessageEmbed()
        .setTitle(`πBestBotπ Development | Evaluation`)
        .setColor(es.color);
      //split the description
      const splitDescription = splitMessage(string, {
        maxLength: 2040,
        char: `\n`,
        prepend: ``,
        append: ``
      });
      //(over)write embed description
      evalEmbed.setDescription(`\`\`\`` + splitDescription[0] + `\`\`\``);
      //send embed
      message.channel.send(evalEmbed);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
