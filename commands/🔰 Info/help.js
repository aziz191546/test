const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `*setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**➡️ Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`➡️ Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**➡️ Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**➡️ Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**➡️ Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**➡️ Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**➡️ Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**➡️ Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      } else {
        let button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<")
        let button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠") 
        let button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>') 
        let button_dc = new MessageButton().setStyle('url').setLabel('Bot Commands').setURL("https://www.bestbot.xyz/")
        let button_invite = new MessageButton().setStyle('url').setLabel('Join us Disocrd').setURL("https://discord.gg/caxGNajAKJ")
        

       let button_facebook = new MessageButton().setStyle('url').setLabel('Facebook Profile').setURL("https://www.facebook.com/aziz.kammoun.311")

              let button_youtube = new MessageButton().setStyle('url').setLabel('Youtube Channel').setURL("https://www.youtube.com/channel/UC62Cp5i7wLSOlNIgz2JpWCw")

                     let button_twitch = new MessageButton().setStyle('url').setLabel('Twitch Channel').setURL("https://www.twitch.tv/0aziztn0")

 

        let buttonRow1 = new MessageActionRow()
          .addComponent(button_dc).addComponent(button_facebook)

                    .addComponent(button_youtube).addComponent(button_twitch)
.addComponent(button_invite)

           


        const allbuttons = [buttonRow1]
        //define default embed
        let FIRSTEMBED = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter("\n"+ client.user.username + " | Made by: www.bestbot.xyz", client.user.displayAvatarURL())
        .setTitle(`Information about the : __**${client.user.username}**__`)
        .addField(":muscle: **__My Features__**",
`>>> **58+ Systems**, like: **Twitter-** & **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced **Music System** with **Audio Filtering**
:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField(":question: **__How do you use me?__**",
`>>> \ Just do *<any commands> like that *setup-welcome`)
.addField(":chart_with_upwards_trend: **__STATS:__**",
`>>> :gear: **300+ Commands**
:file_folder: on **${client.guilds.cache.size} Guilds**
⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join(", ")} Uptime**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**`)        

        //Send message with buttons
        let helpmsg = await message.channel.send({   
            content: `***Click on the __Bot Commands__ To Go Bot Website***`,
            embed: FIRSTEMBED, 
            components: allbuttons
        });
        //create a collector for the thinggy
        const collector = helpmsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        var edited = false;
        var embeds = [FIRSTEMBED]
        for(const e of allotherembeds())
          embeds.push(e)        
        let currentPage = 0;
        collector.on('collect', async b => {
            if(b.clicker.user.id !== message.author.id)
              return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`)
            if(b.id.includes("button_cat_")){
              //b.reply.send(`***Going to the ${b.id.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
            }
        });
        

        let d_button_dc = new MessageButton().setStyle('url').setLabel('Bot Commands').setURL("https://www.bestbot.xyz/");  
  
        let d_button_facebook = new MessageButton().setStyle('url').setLabel('Facebook Profile').setURL("https://www.facebook.com/aziz.kammoun.311");

         let d_button_youtube = new MessageButton().setStyle('url').setLabel('Youtube Channel').setURL("https://www.youtube.com/channel/UC62Cp5i7wLSOlNIgz2JpWCw");
       
       let d_button_twitch = new MessageButton().setStyle('url').setLabel('Twitch Channel').setURL("https://www.twitch.tv/0aziztn0");

        let d_button_invite = new MessageButton().setStyle('url').setLabel('Join us Discord').setURL("https://discord.gg/caxGNajAKJ");


        const alldisabledbuttons = []
        collector.on('end', collected => {
          edited = true;
          helpmsg.edit({content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
        });
        setTimeout(()=>{
          if(!edited)
            helpmsg.edit({content: `Time has ended type ${prefix}help again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
        }, 180e3 + 150)
      }
        function allotherembeds(){
          var embeds = [];

         


          
          
        
       
      
 

          return embeds
        }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`❌ An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
