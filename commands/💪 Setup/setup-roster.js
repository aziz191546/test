var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, edit_msg, send_roster, send_roster2, send_roster3, edit_msg2, edit_msg3
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-roster",
  category: "💪 Setup",
  aliases: ["setuproster", "roster-setup", "rostersetup"],
  cooldown: 5,
  usage: "setup-roster --> Follow Steps",
  description: "Manage 3 different Roster Systems",
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
        var thedb = client.roster;
        var rostercount = 1;

        tempmsg = await message.channel.send(new Discord.MessageEmbed()
          .setTitle("What do you want to do?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`1️⃣ **==** Manage the **first** Roster System

2️⃣ **==** Manage the **second** Roster System

3️⃣ **==** Manage the **third** Roster System



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
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
          if (reaction.emoji.name === "1️⃣") thedb = client.roster;
          else if (reaction.emoji.name === "2️⃣") thedb = client.roster2;
          else if (reaction.emoji.name === "3️⃣") thedb = client.roster3;
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


        if(thedb == client.roster2) rostercount = 2;
        if(thedb == client.roster3) rostercount = 3;




        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(`What do you want to do? | Roster: \`${thedb.get(message.guild.id, "rostertitle")}\` (\`${rostercount}. Roster\`)`.substr(0, 256))
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`1️⃣ **==** Define the **Channel** of where the **new** Roster should be

2️⃣ **==** **Add** a Role which should be listed

3️⃣ **==** **Remove** a Role from the listed ones

4️⃣ **==** **Show** all Roles, which are beeing listed

5️⃣ **==** Change the **TYPE** of the Design of the ROSTER

6️⃣ **==** Edit the **EMOJI / TEXT** Infront of **each** Listed-Roster-Member

7️⃣ **==** Set the **Roster Title** of the Roster

8️⃣ **==** ${thedb.get(message.guild.id, "inline") ? "Disable Multiple Roster Rows (Inline Fields)": "Enable Mulitple Roster Rows (Inline Fields)"}

9️⃣ **==** ${thedb.get(message.guild.id, "showallroles") ? "Disable that i show all Role Members and cut them off!" : "Enable that i show all Role Members, instead of cutting of"}

☠️ **== Reset** all \`ROSTER ${rostercount}\` SETTINGS



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        try {
          //client.roster3.get(guild.id, "rosteremoji")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
          tempmsg.react("6️⃣")
          tempmsg.react("7️⃣")
          tempmsg.react("8️⃣")
          tempmsg.react("9️⃣")
          tempmsg.react("☠️")
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
            if (reaction.emoji.name === "1️⃣") temptype = "channel"
            else if (reaction.emoji.name === "2️⃣") temptype = "addrole"
            else if (reaction.emoji.name === "3️⃣") temptype = "removerole"
            else if (reaction.emoji.name === "4️⃣") temptype = "viewroles"
            else if (reaction.emoji.name === "5️⃣") temptype = "type"
            else if (reaction.emoji.name === "6️⃣") temptype = "emoji"
            else if (reaction.emoji.name === "7️⃣") temptype = "title"
            else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline"
            else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline"
            else if (reaction.emoji.name === "9️⃣") temptype = "showallroles"
            else if (reaction.emoji.name === "☠️") temptype = "reset"
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
  
      for(const roleid of thedb.get(message.guild.id, "rosterroles")){
        try{
          var role = message.guild.roles.cache.get(roleid);
          if(!role || role == null) throw "NOT A RIGHT ROLE"
        }catch{
          thedb.remove(message.guild.id, roleid, "rosterroles")
        }
      }

      if (temptype === "channel") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna use?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Channel now!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
            if (channel) {
              try {
                thedb.set(message.guild.id, channel.id, "rosterchannel")
                if(thedb == client.roster) send_roster(client, message.guild)
                if(thedb == client.roster2) send_roster2(client, message.guild)
                if(thedb == client.roster3) send_roster3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ The Roster is now locked to: \`${channel.name}\`. It is updating automatically!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\``.substr(0, 2048))
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
      } else if (temptype === "addrole") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Role do you wanna add?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Role now!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
            if (role) {
              var rosteroles = thedb.get(message.guild.id, "rosterroles")
              if (rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                .setTitle(`❌ ERROR | The role: \`${role.name}\` is already registered as an Admin Role`)
                .setColor(es.wrongcolor)
                .setDescription(`Remove it with: \`${prefix}setup-roster\``)
                .setFooter(es.footertext, es.footericon)
              );
              try {
                thedb.push(message.guild.id, role.id, "rosterroles")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ Added the Role: \`${role.name}\``)
                  .setDescription(`It will update in less then **5 Minutes**, *If it did not update yet*`)
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
              throw "you didn't ping a valid Role"
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


      } else if (temptype === "removerole") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Role do you wanna add?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Role now!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
            if (role) {
              var rosteroles = thedb.get(message.guild.id, "rosterroles")
              if (!rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                .setTitle(`❌ ERROR | The role: \`${role.name}\` is not registered as an Admin Role yet!`)
                .setColor(es.wrongcolor)
                .setDescription(`Remove it with: \`${prefix}setup-roster\``)
                .setFooter(es.footertext, es.footericon)
              );
              try {
                thedb.remove(message.guild.id, role.id, "rosterroles")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ Removed the Role: \`${role.name}\``)
                  .setDescription(`It will update in less then **5 Minutes**, *If it did not update yet*`)
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
              throw "you didn't ping a valid Role"
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
        
      } else if (temptype === "viewroles") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Those Roles will be listed in the Roster Embed:")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`<@&${thedb.get(message.guild.id, "rosterroles").join(">\n<@&")}>`)
          .setFooter(es.footertext, es.footericon)
        })
       
      } else if (temptype === "type") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What Type do you wanna use??")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`1️⃣ **==** First Type Example: \n> <@${message.author.id}> | \`${message.author.tag}\`\n\n2️⃣ **==** Second Type Example: \n> <@${message.author.id}>\n\n3️⃣ **==** Third Type Example: \n> **${message.author.tag}**\n\n4️⃣ **==** Fourth Type Example: \n> **${message.author.username}**\n\n5️⃣ **==** Fifth Type Example: \n> <@${message.author.id}> | \`${message.author.id}\`\n\n6️⃣ **==** Sixth Type Example: \n> <@${message.author.id}> | **${message.author.username}**\n\n7️⃣ **==** Seventh Type Example: \n> <@${message.author.id}> | **${message.author.tag}**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") {
              thedb.set(message.guild.id, "1", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "2️⃣") {
              thedb.set(message.guild.id, "2", "rosterstyle")
              if(thedb == client.roster) edit_msg(client, message.guild)
              if(thedb == client.roster2) edit_msg2(client, message.guild)
              if(thedb == client.roster3) edit_msg3(client, message.guild)
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "3️⃣") {
              thedb.set(message.guild.id, "3", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "4️⃣") {
              thedb.set(message.guild.id, "4", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "5️⃣") {
              thedb.set(message.guild.id, "5", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "6️⃣") {
              thedb.set(message.guild.id, "6", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "7️⃣") {
              thedb.set(message.guild.id, "7", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle("SUCCESS! | Changed the ROSTER TYPE!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
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
       
      } else if (temptype === "emoji") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Emoji / Text do You wanna use?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Note, that the Maximum lenght is \`5\`!\n\nEnter the TEXT / EMOJI now!\nType \`noemoji\` for no Emoji`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var msg = collected.first().content;

            if (msg) {
              if(msg.toLowerCase() == "noemoji"){
                thedb.set(message.guild.id, "", "rosteremoji")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ The Roster will now add ${msg} to each Listed Member!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n<@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
                return;
              }
              try {
                if(msg.includes(":")){
                  thedb.set(message.guild.id, msg, "rosteremoji")
                  if(thedb == client.roster) edit_msg(client, message.guild)
                  if(thedb == client.roster2) edit_msg2(client, message.guild)
                  if(thedb == client.roster3) edit_msg3(client, message.guild)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`✅ The Roster will now add ${msg} to each Listed Member!`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n${msg} <@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
                else{
                  thedb.set(message.guild.id, msg.substr(0, 5), "rosteremoji")
                  if(thedb == client.roster) edit_msg(client, message.guild)
                  if(thedb == client.roster2) edit_msg2(client, message.guild)
                  if(thedb == client.roster3) edit_msg3(client, message.guild)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`✅ The Roster will now add ${msg.substr(0, 5)} to each Listed Member!`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n${msg.substr(0, 5)} <@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("❌ ERROR | Something went wrong, please contact: `[𝗔𝗭𝗜𝗭 𝗞𝗔𝗠𝗠𝗢𝗨𝗡]#1919`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't add a valid message"
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
      } else if (temptype === "title") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Title should your Roster have?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Note, that the Maximum lenght is \`256\`!\n\nEnter the TEXT now!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var msg = collected.first().content;

            if (msg) {
              try {
                thedb.set(message.guild.id, msg.substr(0, 256), "rostertitle")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`✅ The Roster will now add ${msg.substr(0, 256)} to each Listed Member!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
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
              throw "you didn't add a valid message"
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
      } else if (temptype === "toggleinline") {
        thedb.set(message.guild.id, !thedb.get(message.guild.id, "inline"), "inline")
        if(thedb == client.roster) edit_msg(client, message.guild)
        if(thedb == client.roster2) edit_msg2(client, message.guild)
        if(thedb == client.roster3) edit_msg3(client, message.guild)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`✅ The Roster will now ${thedb.get(message.guild.id, "inline") ? "": "__**not**__"} have multiple lines!`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
        
      } else if (temptype === "showallroles") {
        thedb.set(message.guild.id, !thedb.get(message.guild.id, "showallroles"), "showallroles")
        if(thedb == client.roster) edit_msg(client, message.guild)
        if(thedb == client.roster2) edit_msg2(client, message.guild)
        if(thedb == client.roster3) edit_msg3(client, message.guild)


        return message.reply(new Discord.MessageEmbed()
          .setTitle(`✅ The Roster will now ${thedb.get(message.guild.id, "showallroles") ? "": "__**not**__ "}cut of if there are too many Members (20+) who have the Role!`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
        
      } else if (temptype === "reset"){
        await thedb.delete(message.guild.id)
        thedb.ensure(message.guild.id, {
          rosterchannel: "notvalid",
          rosteremoji: "➤",
          showallroles: false,
          rostermessage: "",
          rostertitle: "Roster",
          rosterstyle: "1",
          rosterroles: [],
          inline: false,
        })
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`✅ Resetted ${rostercount} Roster!`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Re-set-it-up with: \`${prefix}setup-roster\``.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      }      
      else {
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
