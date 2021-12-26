const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "transfer",
  category: "💸 Economy",
  aliases: ["givemoney"],
  description: "Transfer Money to someone else!",
  usage: "transfer <@USER> <Amount>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`❌ THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user  = message.author;
    var totransfer = message.mentions.members.filter(member=>member.guild.id == message.guild.id).first();
    if(!totransfer) 
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`❌ You didn't pinged to whom you want to transfer`)
        .setDescription(`Usage: \`${prefix}transfer <@USER> <Amount>\`\n\n\Example: \`${prefix}transfer <@604041543485227009> 1919\``)
      );
    totransfer = totransfer.user;
    let transferamount = Number(args[1]);
    if(!transferamount)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`❌ You didn't add the transferamount`)
        .setDescription(`Usage: \`${prefix}transfer <@USER> <Amount>\`\n\n\Example: \`${prefix}transfer <@604041543485227009> 1919\``)
      );
    //if user or the totransfer user is a bot, return error
    if(user.bot || totransfer.bot) return message.reply("❌ **A Discord Bot can not have Economy!**")
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, user.id);
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, totransfer.id)
    //get the economy data 
    let data = client.economy.get(`${message.guild.id}-${user.id}`)
    let data2 = client.economy.get(`${message.guild.id}-${totransfer.id}`)

    if(transferamount <= 0)
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`❌ You can't transfer a negative Amount of Money or no Money, to ${totransfer}`)
      );
    
    if(transferamount > data.balance)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`❌ You can't transfer more Money than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
      );
  
    client.economy.math(`${message.guild.id}-${user.id}`, "-", transferamount, "balance")
    client.economy.math(`${message.guild.id}-${totransfer.id}`, "+", transferamount, "balance")
    data = client.economy.get(`${message.guild.id}-${user.id}`)
    data2 = client.economy.get(`${message.guild.id}-${totransfer.id}`)
    //return some message!
    return message.reply(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
      .setTitle(`✅ **You transfered \`${transferamount} 💸\` to \`${totransfer.tag}\`**`)
      .setDescription(`👛 **You** now have \`${Math.floor(data.balance)} 💸\` in your Pocket\n\n👛 **${totransfer.username}** now has \`${Math.floor(data2.balance)} 💸\` in his/her Pocket`)
    );
  } catch (e) {
    console.log(String(e.stack).bgRed)
    return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`❌ An error occurred`)
      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
    );
  }
}
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
