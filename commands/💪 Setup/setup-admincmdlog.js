var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-botlog",
  category: "💪 Setup",
  aliases: [""],
  cooldown: 5,
  usage: "setup-admincmdlog  -->  Follow the Steps",
  description: "Enable/Disable logging administration commands, execution",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **== \`✔️ Enable\` / Set** Channel
        
2️⃣ **== \`❌ Disable\`** Log

📑 **== Show Settings**



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("❌ ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "disable"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("❌ ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

      if(temptype == "set"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle("Which Channel do you wanna use?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`*Just ping the channel with #channel in the Chat*`).setFooter(es.footertext, es.footericon)
      })
      var thecmd;
      await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var message = collected.first();
          if(!message) throw "NO MESSAGE SENT";
          if(message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first()){
            client.settings.set(message.guild.id, message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first().id, `adminlog`)
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(`✅ The Channel: \`${message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first().name}\` is now registered as the Admin logger`)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`If someone executes an Admin Command, an Information will be sent in that Channel`.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            });
          }
          else{
            throw "NO CHANNEL PINGED";
          }
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("❌ ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
      } else if (temptype == "disable") {
          client.settings.set(message.guild.id, "no", `adminlog`)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(`✅ Disabled the Admin logger`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`If someone executes an Admin Command, **no** Information will be sent`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          });
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `adminlog`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`📑 Settings of the Admin Command Log`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`**Channel:** ${thesettings == "no" ? "Not Setupped" : `<#${thesettings}> | \`${thesettings}\``}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      }else {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("❌ ERROR | PLEASE CONTACT `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`❌ Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by [𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */