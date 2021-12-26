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
  name: "setup-twitch",
  category: "💪 Setup",
  aliases: ["setuptwitch", "twitch-setup", "twitchsetup"],
  cooldown: 5,
  usage: "setup-twitch  -->  Follow Steps",
  description: "Manage the Twitch logger, temp role, ping role, adduser, removeuser, etc.",
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
        .setDescription(`1️⃣ **== Manage Channels** (Edit, Delete, etc.)\n\n2️⃣ **== Create/Set Twitch-Channel**\n\n3️⃣ **== Set Discord Twitch Logger Channel**\n\n4️⃣ **== Set ACTIVE LIVE STREAMING ROLE**\n\n5️⃣ **== Set Ghost Ping Role**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("5️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("❌ ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "manage"
          else if (reaction.emoji.name === "2️⃣") temptype = "set"
          else if (reaction.emoji.name === "3️⃣") temptype = "channel"
          else if (reaction.emoji.name === "4️⃣") temptype = "roleID_GIVE"
          else if (reaction.emoji.name === "5️⃣") temptype = "roleID_PING"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle("❌ ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      if (temptype == "set") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Twitch Streamer do you wanna add?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please send me just the link, for example: \`https://www.twitch.tv/0aziztn0\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content;
            if(msg && msg.toLowerCase().includes("https")){
              
              var channelname = msg.split("/")
              channelname = channelname[channelname.length - 1]
              tempmsg = await message.channel.send(new Discord.MessageEmbed()
                .setTitle("Which Discord User is he?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Please Ping the User now! For example: ${message.author}`)
                .setFooter(es.footertext, es.footericon)
              )
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var msg = collected.first().mentions.users.first();
                  if(msg){
                    var discorduser = msg.id;
                    tempmsg = await message.channel.send(new Discord.MessageEmbed()
                      .setTitle("Which Message should I post?")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Please Send the Message now! For example: \`${message.author.username} is live! go Check him out!\``)
                      .setFooter(es.footertext, es.footericon)
                    )
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var msg = collected.first().content;
                        if(msg){
                          var themsg = msg;
                          client.social_log.push(message.guild.id,
                            {
                              ChannelName: channelname,
                              DISCORD_USER_ID: discorduser,
                              twitch_stream_id: "",
                              message: themsg
                            }, "twitch.channels")
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("✅ ADDED the USER to the STREAMER LIST ")
                            .setDescription("DONT FORGET TO ADD A TWITCH_DISCORD_CHANNEL!!!")
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setFooter(es.footertext, es.footericon)
                          );
                        }
                        else{
                          throw {
                            message: "YOU DID NOT SEND A VALID MESSAGE"
                          }
                        }
                      })
                      .catch(e => {
                        console.log(e)
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("❌ ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }
                  else{
                    throw {
                      message: "YOU DID NOT PING A VALID MEMBER"
                    }
                  }
                })
                .catch(e => {
                  console.log(e)
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("❌ ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            else{
              throw {
                message: "YOU DID NOT SEND A VALID LINK"
              }
            }
          })
          .catch(e => {
            console.log(e)
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("❌ ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "manage") {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("❌ ERROR | THIS IS NOT FINISHED YET PLEASE STAND BY")
          .setColor(es.wrongcolor)
          .setDescription(`If you want to delete the USERS DM: \`[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      } else if (temptype == "channel") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna use?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Channel now!\n\nType: \`no\` if you don't wanna disable it!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message.content.toLowerCase() == "no") {
              client.social_log.set(message.guild.id, "", "twitch.channelID")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`✅ Disabled the Twitch Logger System!`)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            }
            var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
            if (channel) {
              try {
                client.social_log.set(message.guild.id, channel.id, "twitch.channelID")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ I will now send all Twtich-logs into: \`${channel.name}\``)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("❌ ERROR | Something went wrong, please contact: `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("❌ ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "roleID_GIVE") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Role do you want me to give to a Streamer when he is live?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Role now!\n\nType: \`no\` if you don't wanna disable it!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message.content.toLowerCase() == "no") {
              client.social_log.set(message.guild.id, "", "twitch.roleID_GIVE")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`✅ Disabled the Twitch Logger Role Granting!`)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            }
            var channel = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
            if (channel) {
              try {
                client.social_log.set(message.guild.id, channel.id, "twitch.roleID_GIVE")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ I will now give to all Streaming Members the Role: \`${channel.name}\``)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("❌ ERROR | Something went wrong, please contact: `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("❌ ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "roleID_PING") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Role do you want me to ping, when someone goes live?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Role now!\n\nType: \`no\` if you don't wanna disable it!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message.content.toLowerCase() == "no") {
              client.social_log.set(message.guild.id, "", "twitch.roleID_PING")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`✅ Disabled the Twitch Logger Role PINGING!`)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            }
            var channel = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
            if (channel) {
              try {
                client.social_log.set(message.guild.id, channel.id, "twitch.roleID_PING")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ I will now ping the Role: \`${channel.name}\` when someone goes live`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("❌ ERROR | Something went wrong, please contact: `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("❌ ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("❌ ERROR | PLEASE CONTACT `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
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
