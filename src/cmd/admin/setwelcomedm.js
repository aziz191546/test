const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");

module.exports = {
    name: "setup-welcomedm",
    description: "Sets ur very own guild welcome message using dm",
    run: async (client, message, args) => {
          if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("Unfortunately, you do not have permission ADMINISTRATOR");
let dmwelcomemsg = args.slice(0).join(' ');
let embed = new Discord.MessageEmbed()
.setTitle(`Invaild Usage!`)
.setDescription(`
** EVENTS **
{user} = member name
{guild} = guild name
EXP:
*setup-welcomedm Hey {user} You Joined {guild} Make Sure To Check Our Rules #Rules
`)
.setFooter(message.guild.name, message.author.displayAvatarURL())
if (!dmwelcomemsg) return message.channel.send(embed)   
db.delete(`welcomedm_${message.guild.id}`)
db.set(`welcomedm_${message.guild.id}`, dmwelcomemsg)
let a = dmwelcomemsg.replace('{user}', message.author.username).replace('{guild}', message.guild.name)
message.channel.send(a)
}
  }