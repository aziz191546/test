const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const fs = require("fs");
const Emoji = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));

const client = new Discord.Client({

  fetchAllMembers: false,

  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  presence: {
    afk: false,
    activity: {
      name: `${require("./botconfig/config.json").status.text}`.replace("{prefix}", require("./botconfig/config.json").prefix), 
      type: require("./botconfig/config.json").status.type, 
      url: require("./botconfig/config.json").status.url
    },
    status: "online"
  }
});





const Meme = require("memer-api");
client.memer = new Meme("rwYx7KVLEhC");


client.on('ready', () => {
  client.user.setActivity('*help', { type: 'PLAYING' })
})

//Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);

function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requirehandlers();

function requiresociallogs(){
  client.socialhandlers = Array(
    "twitterfeed", /*"twitterfeed2",*/ "livelog", "youtube", "tiktok"
  );
  client.socialhandlers.forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); }catch (e){ console.log(e) }
  })
}requiresociallogs();

function requireallhandlers(){
  client.allhandlers = Array(
    "apply", "apply2", "apply3", "apply4", "apply5",
    "ticket", "ticket2", "ticket3", "ticket4", "ticket5",
    "roster", "roster2", "roster3",
    "welcome", "leave",
    "jointocreate", "logger", "reactionrole", "ranking",
    "antidiscord", "antilinks","anticaps", "blacklist", "keyword",
    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat"
  )
  client.allhandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requireallhandlers();







module.exports.requirehandlers = requirehandlers;
module.exports.requiresociallogs = requiresociallogs;
module.exports.requireallhandlers = requireallhandlers;







const api = require("imageapi.js");

client.on('message', async msg => {
  if (msg.content === prefix + 'meme') {
                 if (!msg.channel.guild) return;
    if (msg.author.bot) return;
    if (!msg.channel.guild) return;

    let subreddits = [
      "memes"
    ];
    let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];
    let img = await api(subreddit)
    const Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setImage(img)
    msg.channel.send(Embed)
  }
});


const {  prefix } = require("./botconfig/config.json");
const db = require("quick.db"); //WE WILL BE USING QUICK.DB



 client.on("message", message => {
        if (!message.channel.guild) return;
    if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "xo")) {
    let array_of_mentions = message.mentions.users.array();
    let symbols = [":o:", ":x:"];
    var grid_message;

    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id;
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `The game is among the following players <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += "\n_(Play with yourself :joy:)_";
      }
      message.channel
        .send(`Xo ${initial_message}`)
        .then(console.log("Successful tictactoe introduction"))
        .catch(console.error);
      message.channel
        .send(
          ":one::two::three:" +
            "\n" +
            ":four::five::six:" +
            "\n" +
            ":seven::eight::nine:"
        )
        .then(new_message => {
          grid_message = new_message;
        })
        .then(console.log("Successful tictactoe game initialization"))
        .catch(console.error);
      message.channel
        .send("Loading... Please wait for the :ok: reaction.")
        .then(async new_message => {
          await new_message.react("1⃣");
          await new_message.react("2⃣");
          await new_message.react("3⃣");
          await new_message.react("4⃣");
          await new_message.react("5⃣");
          await new_message.react("6⃣");
          await new_message.react("7⃣");
          await new_message.react("8⃣");
          await new_message.react("9⃣");
          await new_message.react("🆗");
          await new_message
            .edit(`It\'s <@${turn_id}>\'sWork! The symbol is ${symbol}`)
            .then(new_new_message => {
              require("./xo.js")(
                client,
                message,
                new_new_message,
                player1_id,
                player2_id,
                turn_id,
                symbol,
                symbols,
                grid_message
              );
            })
            .then(
              console.log("Successful tictactoe listeprefix initialization")
            )
            .catch(console.error);
        })
        .then(console.log("Successful tictactoe react initialization"))
        .catch(console.error);
    } else {
      message.channel
        .send(`try *xo @uesr`)
        .then(console.log("Successful error reply"))
        .catch(console.error);
    }
  }
});


client.on('message', alphamsg => {
      if(alphamsg.content === prefix + "allbots") { 
      if(!alphamsg.channel.guild) return;
      if(alphamsg.author.bot) return;
    let alphaf = 1;
  const alpha = alphamsg.guild.members.cache.filter(m=>m.user.bot).map(m=>`:small_orange_diamond: ${alphaf++} - <@${m.id}>`);
              alphamsg.channel.send(`**Found ${alphamsg.guild.members.cache.filter(m=>m.user.bot).size} bots
The bots in the server are
 || By 💎BestBot💎 ||
${alpha.join('n')}
 || By 💎BestBot💎 ||**
`)
 }
});


let rules = JSON.parse(fs.readFileSync("./rules.json", 'utf8'));

client.on('message', bas7woiq => {
  if(bas7woiq.content.startsWith(prefix + "set-rules")){
                if (!bas7woiq.channel.guild) return;
    if (!bas7woiq.channel.guild) return;
  if (bas7woiq.author.bot) return;
               if (!bas7woiq.member.hasPermission('ADMINISTRATOR')) return bas7woiq.channel.send(`You don't have permission to use this command.`);
    const args = bas7woiq.content.split(" ").slice(1).join(" ")
if(!args[0]) return bas7woiq.reply('Please write the Rules'); 
        rules[bas7woiq.guild.id] = {
aa: args,
        }
         fs.writeFile("./rules.json", JSON.stringify(rules), (err) => {
if(err)
console.error(err);
 
})
bas7woiq.channel.send("done")
  }
})

client.on('message', bas7woiq => {
  if(bas7woiq.content.startsWith(prefix + "rules")){
                if (!bas7woiq.channel.guild) return;
    if (!bas7woiq.channel.guild) return;
  if (bas7woiq.author.bot) return;


 if(!rules[bas7woiq.guild.id]) return bas7woiq.channel.send('please set rules message')

    
let rrr = rules[bas7woiq.guild.id].aa

    var embed = new Discord.MessageEmbed()
    .setTitle(`Server Rules\`${bas7woiq.guild.name}\``)
    .setDescription(`${rrr}`)
    bas7woiq.channel.send(embed)
    fs.writeFile("./rules.json", JSON.stringify(rules), (err) => {
if(err)
console.error(err);
 
})
  }
})


// Check dependency installation
try  {
  var ffmpeg = require("ffmpeg-static");
} catch (e) {
  console.log(e.stack);
  console.log(process.version);
  console.log("Please run npm install and ensure it passes with no errors!"); // if there is an error, tell to install dependencies.
  process.exit();
}

// load config
const configa = require("./configa.json");

// Get authentication data

var isMuted = false



client.on("message", (message) => {
  // do not process bot messages
                 if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.channel.guild) return;
           if (!message.member.hasPermission('ADMINISTRATOR')) return


  // do not process message without bot prefix
  if(message.content.indexOf(configa.prefix) !== 0) return;

  // flag for bot feedback on current message
  sucess = false

  // Split messages
  commands = getCommandsFromMessage(message)
  if (commands.length > 0) {
    // take frist instruction only
    cmd = getCmdFromCommand(commands[0])
  }

  if (configa.useMasterRole) {
    // only master is allowed to call the additionnal command
    if(!checkMessageAuthorIsMaster(message, message.author)) {
      message.channel.send('Hey <@' + message.author.id + '>! You re not a Mute Master');
      message.react(config.reactionFeedbackFail);
      return;
    }
  }

  if (commands.length > 0) {
    // take frist instruction only
    cmd = getCmdFromCommand(commands[0])
    args = getArgsFromCommand(commands[0])
    if(cmd == "muteall") {
      muteAll(args, message)
      sendReactionFeedbackMute(message)
      return
    } else if (cmd == "unmuteall"){
      unmuteAll(args, message)
      sendReactionFeedbackUnMute(message)
      return
    }
  }
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (!newState.serverMute && isMuted && newState.channelID && newState.member.voice && !newState.member.user.bot) {
    // New User in vocal channel
    muteCurrentUser = true;
    if (configa.useTeacherMode) {
      // Check is new user is Master before muting
      masterRoleFound = newState.guild.roles.cache.find(role => role.name == configa.masterRoleName)
      if (checkUserIsMaster(masterRoleFound, newState.member.user)){
        // do not mute current user
        muteCurrentUser = false;
      }
    }

    // Process user mute
    if (muteCurrentUser) {
      console.log("New Real User Is Muted");
      newState.member.voice.setMute(true);
    }
  }

  if (newState.serverMute && oldState.channelID != null && newState.channelID == null && !newState.member.user.bot) {
    // Currrent user leave the voice channel while muted
    currentUserIsMuted = true;
    if (configa.useTeacherMode) {
      // Check is new user is Master before muting
      masterRoleFound = newState.guild.roles.cache.find(role => role.name == configa.masterRoleName)
      if (checkUserIsMaster(masterRoleFound, newState.member.user)){
        // do not log current user
        currentUserIsMuted = false;
      }
    }

    // Process user leave
    if (currentUserIsMuted) {
      console.log("User leave voice channel while being muted")
      // TODO unmute user for next voice chat
    }
  }
});

async function muteAll(args, message) {
  if (message.member.voice.channelID) {
    // Mute All real users
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);

    muteAllmembers = true;

    if (configa.useTeacherMode) {
      // Mute all but Master
      masterRoleFound = message.guild.roles.cache.find(role => role.name == configa.masterRoleName)
      if (masterRoleFound) {
        muteAllmembers = false
        for (const [memberID, member] of channel.members)
        {
          isUserMaster = checkUserIsMaster(masterRoleFound, member.user)
          if (member.user.bot == false && !isUserMaster) {
            member.voice.setMute(true);
          }
        }
      } else {
        console.log("Cannot find name " + configa.masterRoleName + " in roles")
        // => Mute all members
      }
    }

    if (muteAllmembers) {
      // Mute all members
      for (const [memberID, member] of channel.members)
      {
        if (member.user.bot == false) {
          member.voice.setMute(true);
        }
      }
    }

    // Set Flag muted
    isMuted = true

    playMuteAudioMessage(message)

    message.channel.send(configa.textMessageMute);

  } else {
    console.log("User Has no Voice Channel");
  }
}

async function unmuteAll(args, message) {
 if (message.member.voice.channelID) {
    playUnMuteAudioMessage(message)

    // Mute all real Users
    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
    for (const [memberID, member] of channel.members)
    {
      if (member.user.bot == false) {
        member.voice.setMute(false);
      }
    }

    // Set Flag muted
    isMuted = false

    message.channel.send(configa.textMessageUnMute);

  } else {
    console.log("User Has no Voice Channel");
  }
}

async function playMuteAudioMessage(message) {
  if (configa.playVoiceWhenMute) {
    // Join Channel
    const connection = await message.member.voice.channel.join();

    // Speak on channel
    const dispatcherMute = connection.play('audio/message_mute.mp3');

    dispatcherMute.on('finish', async () => {
      dispatcherMute.destroy(); // end the stream

      // Leave Channel
      await message.member.voice.channel.leave()
    });
  }
}

async function playUnMuteAudioMessage(message) {
  if (configa.playVoiceWhenUnMute) {
    // Join Channel
    const connection = await message.member.voice.channel.join();

    // Speak on channel
    const dispatcherUnMute = connection.play('audio/message_unmute.mp3');

    dispatcherUnMute.on('finish', async () => {
      dispatcherUnMute.destroy(); // end the stream

      // Leave Channel
      await message.member.voice.channel.leave()
    });
  }
}


function sendReactionFeedbackMute(message) {
  message.react(configa.reactionFeedbackMute);
}

function sendReactionFeedbackUnMute(message) {
  message.react(configa.reactionFeedbackUnMute);
}

function checkUserIsMaster(masterRole, user)  {
  userfound = masterRole.members.find(guildmember  => guildmember.user.id == user.id)
  isUserMaster = (userfound) ? (true) : (false)
  return isUserMaster
}

function checkMessageAuthorIsMaster(message, user)  {
  masterRoleFound = message.guild.roles.cache.find(role => role.name == configa.masterRoleName)
  if (masterRoleFound) {
    userfound = masterRoleFound.members.find(guildmember  => guildmember.user.id == user.id)
    isAuthorMaster = (userfound) ? (true) : (false)
  } else {
    console.log("Cannot find name " + configa.masterRoleName + " in roles")
    isAuthorMaster = false
  }
  return isAuthorMaster
};

function getCmdFromCommand(command) {
  split = command.split(/ +/g);
  // if command start with spaces remove them
  cmd = (split[0].trim() == '' && split.length > 1) ? (split[1] ) : (split[0])
  return cmd.trim()
}
function getArgsFromCommand(command) {
  split = command.split(/ +/g);
  args = (split[0].trim() == '') ? (split.slice(2) ) : (split.slice(1))
  return args
}
function getCommandsFromMessage(message) {
  withoutPrefix = message.content.slice(configa.prefix.length);
  commands = withoutPrefix.split(',');
  return commands
};

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "fshop")) {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    var Bping = `${Math.round(client.ws.ping)}`;

    const E1ping = new Discord.MessageEmbed()
    	.setImage('https://ctk-api.herokuapp.com/fortnite-shop')

      .setFooter(`Requested by | ${message.author.tag}`)
      .setColor("RANDOM");
    message.channel.send(E1ping);
  }
});

client.config = require("./config/bot.json")
client.build = require("./config/build.json")


fs.readdir(`./src/cmd/admin/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/admin/${file}`);
        console.log("Loading Admin Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/music/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        console.log("Loading Musci Command \"" + commandName + "\"")
    })
});
fs.readdir(`./src/cmd/general/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/general/${file}`);
        console.log("Loading General Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/author/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/author/${file}`);
        console.log("Loading Author Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/games/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/games/${file}`);
        console.log("Loading Games Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/level/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/level/${file}`);
        console.log("Loading Level Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/economy/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/economy/${file}`);
        console.log("Loading Economy Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/ticket/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/ticket/${file}`);
        console.log("Loading Ticket Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});


const AntiSpam = require('discord-anti-spam');

 
client.on('ready', () => console.log(`Logged in as ${client.user.tag}.\nYour bot is ready master!`));
 
 
const antiSpam11 = new (require("discord-anti-spam"))({
  warnThreshold: 3,
  kickThreshold: 7,
  banThreshold: 7,
  maxInterval: 5000,
  warnMessage: "{@user}, Please stop spamming.",
  kickMessage: "**{user_tag}** has been kicked for spamming.",
  banMessage: "**{user_tag}** has been banned for spamming.",
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: [],
  ignoreBots: false,
  verbose: true,
  ignoredUsers: []
});

client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.toLowerCase() == "*setup-antispam") {
                         if (!message.channel.guild) return;
    if (!message.channel.guild) return;
  if (message.author.bot) return;
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You Dont Have Permission')
    let on_or_off = db.get(message.guild.id);
    message.channel.send(`**Anti Spam is __${on_or_off ? "OFF" : "ON"}__**`);
    db.set(message.guild.id, on_or_off ? false : true);
  }
}).on("message", message => message.guild ? (db.get(message.guild.id) ? antiSpam11.message(message) : null) : null);






client.on('message',message =>{
    if(message.content.startsWith(prefix + 'topinvites')) {
         if(!message.channel.guild) return;
         if(message.author.bot) return;
  message.guild.fetchInvites().then(i =>{
  var invites = [];
   
  i.forEach(inv =>{
    var [invs,i]=[{},null];
     
    if(inv.maxUses){
        invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
    }else{
        invs[inv.code] =+ inv.uses;
    }
        invites.push(`invite: ${inv.url} inviter: ${inv.inviter} \`${invs[inv.code]}\`;`);
   
  });
  var embed = new Discord.MessageEmbed()
  .setColor("#000000")
  .setDescription(`${invites.join(`\n`)+'\n\n**By:** '+message.author}`)
           message.channel.send({ embed: embed });
   
  });
   
    }
  }); 

  client.on('message', msg => {

  const at_reply = ('<@' + msg.author.id + '>  '); 
   if(!msg.channel.guild) return;
  if (msg.author.bot) return; 


  if (msg.content === prefix + 'id') {
      msg.channel.send(at_reply + msg.author.id); 
  };

  if (msg.content === prefix + 'ch_id') { 
      msg.channel.send(at_reply + msg.channel.name + '  ' + '<' + msg.channel.id + '>'); 
  }; 
 
});


client.on("message", (msg) => {
    if (msg.content.startsWith(prefix + "designs")) {
        if (msg.author.bot) return
        if (msg.channel.type == "dm") return msg.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle(`❌ **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))
        msg.channel.send(new Discord.MessageEmbed().setTitle("**Bot Orders**").setThumbnail(msg.member.user.avatarURL({ format: "gif", format: "png", dynamic: true, size: 1024 }))
            .addField(prefix + "create-design-1", "⌠『Simple Server』⌡", true)
            .addField(prefix + "create-design-2", "⌠『Bot Support Server』⌡", true)
            .addField(prefix + "create-design-3", "⌠『Leveling Server』⌡", true)
            .addField(prefix + "create-design-4", "⌠『Reword Server』⌡", true)
            .addField(prefix + "create-design-5", "⌠『Gaming Server』⌡", true)
        )
    }
})

client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "delete-design")) {
        if (msg.author.bot) return
        if (msg.channel.type == "dm") return msg.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle(`❌ **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))
        msg.guild.channels.cache.forEach(c => {
            c.delete().then(deleted => console.log(`Deleted channel ${deleted.name}`))

            .catch(console.error)
        })
        msg.guild.roles.cache.forEach(r => {
            r.delete().then(deleted => console.log(`Deleted role ${deleted.name}`))

            .catch(console.error)
        })
        const embed1 = new Discord.MessageEmbed()
            .setTitle("✅ **design has ben deleted**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1)
    }
})

client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "create-design-1")) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))
        msg.guild.channels.create(`✽⁦『 INFO 』✽`, { type: "category" }).then(cc1 => {
                msg.guild.channels.create('⌠✅⌡・verify', { type: 'text' }).then(ch1 => {
                        ch1.setParent(cc1.id)
                        console.log(`added ${ch1.name}`)
                    })
                    .catch(console.error)
                msg.guild.channels.create('⌠🖤⌡・Welcome', { type: 'text' }).then(ch2 => {
                        ch2.setParent(cc1.id)
                        console.log(`added ${ch2.name}`)
                    })
                    .catch(console.error)
                msg.guild.channels.create('⌠📜⌡・Rules', { type: 'text' }).then(ch3 => {
                        ch3.setParent(cc1.id)
                        console.log(`added ${ch3.name}`)
                    })
                    .catch(console.error)
                msg.guild.channels.create('⌠📰⌡・News', { type: 'text' }).then(ch4 => {
                        ch4.setParent(cc1.id)
                        console.log(`added ${ch4.name}`)
                    })
                    .catch(console.error)
                msg.guild.channels.create('⌠🎉⌡・giveaways', { type: 'text' }).then(ch5 => {
                        ch5.setParent(cc1.id)
                        console.log(`added ${ch5.name}`)
                    })
                    .catch(console.error)
                msg.guild.channels.create('⌠🎊⌡・giveaways', { type: 'voice' }).then(ch6 => {
                        ch6.setParent(cc1.id)
                        console.log(`added ${ch6.name}`)
                    })
                    .catch(console.error)
            })
            .catch(console.error)
        msg.guild.channels.create(`✽⁦『 General 』✽`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('⌠🌏⌡・public-chat', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc2.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('⌠🤖⌡・commands', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc2.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)

            msg.guild.channels.create('⌠🎮⌡・games', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('⌠🤡⌡・photos', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc2.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('⌠📡⌡・Voice 1', { type: 'voice' }).then(ch5 => {
                ch5.setParent(cc2.id)
                console.log(`add ${ch5.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('⌠📡⌡・Voice 2', { type: 'voice' }).then(ch6 => {
                ch6.setParent(cc2.id)
                console.log(`add ${ch6.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('⌠📡⌡・Voice 3', { type: 'voice' }).then(ch7 => {
                    ch7.setParent(cc2.id)
                    console.log(`add ${ch7.name}`)
                })
                .catch(console.error)
        })
        msg.guild.roles.create({
                data: {
                    name: "言・Permissions",

                    permissions: [
                        "KICK_MEMBERS",
                        "BAN_MEMBERS",
                        "MANAGE_CHANNELS",
                        "ADD_REACTIONS",

                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "SEND_TTS_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "READ_MESSAGE_HISTORY",
                        "MENTION_EVERYONE",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "MANAGE_NICKNAMES",
                        "ADMINISTRATOR"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "言・ OwnerShip",
                    color: "#fff",

                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "✽・ProProtection",

                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "✽・ErumBot",

                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "✽・ProBot",

                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Founder",
                    color: "#001",

                    permissions: [

                        "KICK_MEMBERS",
                        "BAN_MEMBERS",
                        "MANAGE_CHANNELS",
                        "ADD_REACTIONS",

                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "SEND_TTS_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "READ_MESSAGE_HISTORY",
                        "MENTION_EVERYONE",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "MANAGE_NICKNAMES"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Owner",
                    color: "#000",

                    permissions: [

                        "KICK_MEMBERS",
                        "ADD_REACTIONS",
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MENTION_EVERYONE",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "MANAGE_NICKNAMES"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Leader",
                    color: "#000",
                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MENTION_EVERYONE",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Colonel",
                    color: "#000",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Assistant",
                    color: "#000",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Support",
                    color: "#000",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Staff",
                    color: "#000",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "MANAGE_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "MUTE_MEMBERS",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Developer",
                    color: "#0066ff",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Booster",
                    color: "#f40df4",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Partber",
                    color: "#50d7cf",
                    permissions: []
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Youtuber",
                    color: "RED",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Prime",
                    color: "BLUE",
                    permissions: []
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Frindes",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Vip +",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Vip",

                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Active Member",
                    permissions: [
                        "VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",
                        "MOVE_MEMBERS",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
                data: {
                    name: "⌥ Member",
                    permissions: ["VIEW_CHANNEL",

                        "SEND_MESSAGES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY"
                    ]
                }
            })
            .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "Muted",
                permissions: []
            }
        })
        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server ...**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your server is configured**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 6000)
        })
    }
})

client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "create-design-2")) {

        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))

        msg.guild.channels.create(`✦・INFO`, { type: "category" }).then(cc1 => {
            msg.guild.channels.create('۝・our・bot', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('۝・bot・invite', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('۝・status', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('۝・update', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('۝・announcements', { type: 'text' }).then(ch5 => {
                ch5.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('۝・rules', { type: 'text' }).then(ch6 => {
                ch6.setParent(cc1.id)
            })

            .catch(console.error)
        })

        .catch(console.error)
        msg.guild.channels.create(`✦・Opinions`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('✧・feedbacks', { type: 'text' }).then(ch1 => {
                    ch1.setParent(cc2.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('✧・suggestion', { type: 'text' }).then(ch2 => {
                    ch2.setParent(cc2.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('✧・bugs', { type: 'text' }).then(ch4 => {
                    ch4.setParent(cc2.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
        })
        msg.guild.channels.create(`✦・Public`, { type: "category" }).then(cc3 => {
            msg.guild.channels.create('✽・chat-ar', { type: 'text' }).then(ch1 => {
                    ch1.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('✽・chat-en', { type: 'text' }).then(ch2 => {
                    ch2.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('✽・commands', { type: 'text' }).then(ch3 => {
                    ch3.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('✽・Voice', { type: 'voice' }).then(ch4 => {
                    ch4.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
        })
        msg.guild.channels.create(`✦・Support`, { type: "category" }).then(cc3 => {
            msg.guild.channels.create('★・support-ar', { type: 'text' }).then(ch1 => {
                    ch1.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('★・support-en', { type: 'text' }).then(ch2 => {
                    ch2.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('★・Voice Ar Support', { type: 'voice' }).then(ch3 => {
                    ch3.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
            msg.guild.channels.create('★・Voice En Support', { type: 'voice' }).then(ch4 => {
                    ch4.setParent(cc3.id)
                })
                .then(add => {
                    console.log(`done `)
                })
                .catch(console.error)
        })

        msg.guild.roles.create({ data: { name: "言・Permissions", permissions: ["ADMINISTRATOR"] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "✽・ProProtection", permissions: ["ADMINISTRATOR"] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "✽・ErumBot", permissions: ["ADMINISTRATOR"] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "✽・ProBot", permissions: ["ADMINISTRATOR"] } })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "言・Bot Developer",
                color: "#001",
                permissions: ["CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MANAGE_CHANNELS",
                    "ADD_REACTIONS",
                    "VIEW_AUDIT_LOG",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "言・Bot Team",
                color: "#000",
                permissions: ["CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "ADD_REACTIONS",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "言・Support Team",
                color: "#000",
                permissions: ["VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🛠・Support en",
                color: "#000",
                permissions: []
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🛠・Support ar",
                color: "#000",
                permissions: []
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🤖・Developer",
                color: "#0066ff",
                permissions: ["VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "✨・Booster",
                color: "#f40df4",
                permissions: ["VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🎏・Youtuber",
                color: "#811",
                permissions: ["VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🧍‍♂️・Frindes",
                permissions: ["VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🎆・Premium",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🎇・Prime",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "🕑・Active",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "😃・Member",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "USE_VAD"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "Muted",
                permissions: []
            }
        })

        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server ...**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your server is configured**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 6000)
        })
    }
})


client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "create-design-3")) {

        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))

        msg.guild.channels.create(`⌗ 𝐈𝐍𝐅𝐎`, { type: "category" }).then(cc1 => {
            msg.guild.channels.create('ャ・𝐆𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc1.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐑𝐔𝐋𝐄𝐒', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc1.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓𝐒', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc1.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐔𝐏𝐃𝐀𝐓𝐄𝐒', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc1.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐕𝐄𝐑𝐈𝐅𝐘', { type: 'text' }).then(ch5 => {
                ch5.setParent(cc1.id)
                console.log(`add ${ch5.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐖𝐄𝐋𝐂𝐎𝐌𝐄', { type: 'text' }).then(ch6 => {
                ch6.setParent(cc1.id)
                console.log(`add ${ch6.name}`)
            })

            .catch(console.error)
        })

        .catch(console.error)
        msg.guild.channels.create(`⌗ 𝐆𝐄𝐍𝐄𝐑𝐀𝐋`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('₪・𝐂𝐇𝐀𝐓', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc2.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('₪・𝐂𝐇𝐀𝐓 𝐖𝐈𝐓𝐇 𝐁𝐎𝐓', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc2.id)
                console.log(`add ${ch1.name}`)
                client.on("message", async client => {
                    let alexa = require("alexa-bot-api")
                    let alexa_reply = new alexa()
                    if (client.channel.id === ch1.id) {
                        if (client.author.bot) return
                        let reply = client.content
                        alexa_reply.getReply(reply).then(msg => client.channel.send(msg))
                    }
                })
            })

            .catch(console.error)
            msg.guild.channels.create('₪・𝐂𝐌𝐃', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc2.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('₪・𝐆𝐀𝐌𝐄𝐒', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
        })
        msg.guild.channels.create(`⌗ 𝐌𝐔𝐒𝐈𝐂`, { type: "category" }).then(cc3 => {
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟏', { type: 'voice' }).then(ch1 => {
                ch1.setParent(cc3.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟐', { type: 'voice' }).then(ch2 => {
                ch2.setParent(cc3.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟑', { type: 'voice' }).then(ch3 => {
                ch3.setParent(cc3.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟒', { type: 'voice' }).then(ch4 => {
                ch4.setParent(cc3.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
        })
        msg.guild.roles.create({
            data: {
                name: "☠",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ProProtection",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ErumBot",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ProBot",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・OwnerShip",
                color: "#001",
                permissions: [
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MANAGE_CHANNELS",
                    "ADD_REACTIONS",
                    "VIEW_AUDIT_LOG",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・Moderatore",
                color: "#000",
                permissions: [
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "ADD_REACTIONS",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・Monitor the chat",
                color: "#000",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "இ・Booster",
                color: "#f40df4",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "இ・Youtuber",
                color: "#811",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "இ・Frindes",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "இ・Member",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❹⓿】", permissions: [] } })
        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server ...**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your server is configured**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 6000)
        })
    }
})


client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "create-design-4")) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))
        msg.guild.channels.create(`✦・INFO`, { type: "category" }).then(cc1 => {
            msg.guild.channels.create('ㄨ・Your・Invites', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('ㄨ・Giveaways', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('ㄨ・Boost', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc1.id)
            })

            .catch(console.error)
            msg.guild.channels.create('ㄨ・special offer', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc1.id)
            })

            .catch(console.error)
        })

        .catch(console.error)
        msg.guild.channels.create(`✦・REWORD`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('✧・Reword・Rules', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc2.id)
            })

            .catch(console.error)
            msg.guild.channels.create('✧・Reword', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc2.id)
            })

            .catch(console.error)
        })
        msg.guild.channels.create(`✦・Ticket`, { type: "category" }).then(cc3 => {
            msg.guild.channels.create('✽・Ticket・Rules', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc3.id)
            })

            .catch(console.error)
            msg.guild.channels.create('✽・Tickets', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc3.id)
            })

            .catch(console.error)
        })
        msg.guild.roles.create({
            data: {
                name: "言・Permissions",
                permissions: [
                    "ADMINISTRATOR",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MANAGE_CHANNELS",
                    "ADD_REACTIONS",
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",
                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error);
        msg.guild.roles.create({
            data: {
                name: "✽・ProProtection",
                permissions: ["ADMINISTRATOR"]
            }
        })

        .catch(console.error);
        msg.guild.roles.create({
                data: {
                    name: "✽・ErumBot",
                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error);
        msg.guild.roles.create({
                data: {
                    name: "✽・ProBot",
                    permissions: ["ADMINISTRATOR"]
                }
            })
            .catch(console.error);
        msg.guild.roles.create({
                data: {
                    name: "😃・Member",
                    permissions: [
                        "VIEW_CHANNEL",
                        "SEND_MESSAGES",
                        "EMBED_LINKS",
                        "ATTACH_FILES",
                        "CONNECT",
                        "SPEAK",
                        "READ_MESSAGE_HISTORY",

                        "CHANGE_NICKNAME",
                        "ADD_REACTIONS"
                    ]
                }
            })
            .catch(console.error);
        msg.guild.roles.create({
                data: {
                    name: "Muted",
                    permissions: []
                }
            })
            .catch(console.error);
        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server ...**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your server is configured**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 6000)
        })
    }
})

client.on("message", async(msg) => {
    if (msg.content.startsWith(prefix + "create-design-5")) {

        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        if (!msg.guild.me.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **I Can't Do Any Thing In This Server Becuse I Don't Have `ADMINISTRATOR` Permission!**"))

        msg.guild.channels.create(`『📜』𝐈𝐍𝐅𝐎`, { type: "category" }).then(cc1 => {
            msg.guild.channels.create('ャ・𝐆𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc1.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐑𝐔𝐋𝐄𝐒', { type: 'text' }).then(ch2 => {
                ch2.setParent(cc1.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓𝐒', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc1.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐔𝐏𝐃𝐀𝐓𝐄𝐒', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc1.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐕𝐄𝐑𝐈𝐅𝐘', { type: 'text' }).then(ch5 => {
                ch5.setParent(cc1.id)
                console.log(`add ${ch5.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐖𝐄𝐋𝐂𝐎𝐌𝐄', { type: 'text' }).then(ch6 => {
                ch6.setParent(cc1.id)
                console.log(`add ${ch6.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐁𝐎𝐎𝐒𝐓', { type: 'text' }).then(ch8 => {
                ch6.setParent(cc1.id)
                console.log(`add ${ch8.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ャ・𝐄𝐕𝐄𝐍𝐓𝐒', { type: 'text' }).then(ch7 => {
                ch6.setParent(cc1.id)
                console.log(`add ${ch7.name}`)
            })

            .catch(console.error)
        })

        .catch(console.error)
        msg.guild.channels.create(`『🌏』𝐆𝐄𝐍𝐄𝐑𝐀𝐋`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('あ・𝐂𝐇𝐀𝐓', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc2.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('あ・𝐏𝐈𝐂𝐓𝐔𝐑𝐄', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc2.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('あ・𝐌𝐄𝐌𝐒', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('あ・𝐀𝐍𝐈𝐌𝐄', { type: 'text' }).then(ch5 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch5.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('あ・𝐕𝐈𝐃𝐄𝐎𝐒', { type: 'text' }).then(ch6 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch6.name}`)
            })

            .catch(console.error)
        })
        msg.guild.channels.create(`『🤖』𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒`, { type: "category" }).then(cc2 => {
                msg.guild.channels.create('இ・𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒', { type: 'text' }).then(ch3 => {
                    ch3.setParent(cc2.id)
                    console.log(`add ${ch3.name}`)
                })

                .catch(console.error)
                msg.guild.channels.create('இ・𝐁𝐎𝐓 𝐆𝐀𝐌𝐄𝐒', { type: 'text' }).then(ch1 => {
                    ch1.setParent(cc2.id)
                    console.log(`add ${ch1.name}`)
                })
            })
            .catch(console.error)
        msg.guild.channels.create(`『🕹』𝐆𝐀𝐌𝐄𝐒`, { type: "category" }).then(cc2 => {
            msg.guild.channels.create('ஐ・𝐂𝐇𝐀𝐓 𝐆𝐀𝐌𝐄𝐒', { type: 'text' }).then(ch3 => {
                ch3.setParent(cc2.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ඞ・𝐀𝐌𝐎𝐔𝐍𝐆 𝐔𝐒', { type: 'text' }).then(ch1 => {
                ch1.setParent(cc2.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ඞ・𝐀𝐌𝐎𝐔𝐍𝐆 𝐔𝐒', { type: 'voice' }).then(ch2 => {
                ch2.setParent(cc2.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ツ・𝐏𝐔𝐁𝐆', { type: 'text' }).then(ch4 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('ツ・𝐏𝐔𝐁𝐆', { type: 'voice' }).then(ch5 => {
                ch4.setParent(cc2.id)
                console.log(`add ${ch5.name}`)
            })

            .catch(console.error)
        })
        msg.guild.channels.create(`『🎶』𝐌𝐔𝐒𝐈𝐂`, { type: "category" }).then(cc3 => {
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟏', { type: 'voice' }).then(ch1 => {
                ch1.setParent(cc3.id)
                console.log(`add ${ch1.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟐', { type: 'voice' }).then(ch2 => {
                ch2.setParent(cc3.id)
                console.log(`add ${ch2.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟑', { type: 'voice' }).then(ch3 => {
                ch3.setParent(cc3.id)
                console.log(`add ${ch3.name}`)
            })

            .catch(console.error)
            msg.guild.channels.create('♬・𝐕𝐎𝐈𝐂𝐄 𝟒', { type: 'voice' }).then(ch4 => {
                ch4.setParent(cc3.id)
                console.log(`add ${ch4.name}`)
            })

            .catch(console.error)
        })
        msg.guild.roles.create({
            data: {
                name: "☠",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ProProtection",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ErumBot",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "あ・ProBot",
                permissions: [
                    "ADMINISTRATOR"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・King",
                color: "#001",
                permissions: [
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS",
                    "MANAGE_CHANNELS",
                    "ADD_REACTIONS",
                    "VIEW_AUDIT_LOG",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "SEND_TTS_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・Dev",
                color: "#000",
                permissions: [
                    "CREATE_INSTANT_INVITE",
                    "KICK_MEMBERS",
                    "ADD_REACTIONS",
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "MANAGE_NICKNAMES"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・Mod",
                color: "#000",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "MANAGE_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "MUTE_MEMBERS",
                    "DEAFEN_MEMBERS",
                    "READ_MESSAGE_HISTORY",
                    "MENTION_EVERYONE",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "㊝・Admin",
                color: "#f40df4",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "۝・Youtuber",
                color: "#811",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "۝・Frindes",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "௹・Support",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "௹・Designer",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                    "MOVE_MEMBERS",

                    "CHANGE_NICKNAME",
                    "ADD_REACTIONS"
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({
            data: {
                name: "இ・Member",
                permissions: [
                    "VIEW_CHANNEL",

                    "SEND_MESSAGES",
                    "EMBED_LINKS",
                    "ATTACH_FILES",
                    "CONNECT",
                    "SPEAK",
                    "READ_MESSAGE_HISTORY",
                ]
            }
        })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❶❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❷❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸⓿】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❶】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❷】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❸】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❹】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❺】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❻】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❼】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❽】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❸❾】", permissions: [] } })

        .catch(console.error)
        msg.guild.roles.create({ data: { name: "Δ・Level 【❹⓿】", permissions: [] } })
        const embed1 = new Discord.MessageEmbed()
            .setTitle("🕑 **Preparing your server ...**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        const embed2 = new Discord.MessageEmbed()
            .setTitle("✅ **Your server is configured**")
            .setFooter(`Request By ${msg.author.username}`)
            .setTimestamp()
        msg.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 6000)
        })
    }
})


client.on("message", (msg) => {
    if (msg.content.startsWith(prefix + "templats")) {
                 if(!msg.channel.guild) return;
             if(msg.author.bot) return;

        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(new Discord.MessageEmbed().setTitle("❌ **You Need `ADMINISTRATOR` Permission To Use This Command!**"))
        const embed = new Discord.MessageEmbed().setAuthor("Template").setDescription(`**
                            言・templat- => [Click Here]
                            (https://discord.new/gSBPM2FwnnCs)
                            言・templat- => [Click Here]
                            (https://discord.new/DrSegZu2wS7U)
                            言・templat- => [Click Here]
                            (https://discord.new/gTQY7882jrnw)
                            言・templat- => [Click Here]
                            (https://discord.new/rJQZ8ujDPGJx)
                            言・templat- => [Click Here]
                            (https://discord.new/3Ck5ZJhvQUx6)
                            言・templat- => [Click Here]
                            (https://discord.new/CHnayxrwrRry)
                            言・templat- => [Click Here]
                            (https://discord.new/nQBydZkcxPfY)
                            言・templat- => [Click Here]
                            (https://discord.new/U4cyMedMjTnX)
                            **`)
        msg.channel.send(embed)
        const embed2 = new Discord.MessageEmbed().setAuthor("Template").setDescription(`**
                            言・templat- => [Click Here]
                            (https://discord.new/vmDnDZYcsrVh)
                            言・templat- => [Click Here]
                            (https://discord.new/8xcmFcVJgfhV)
                            言・templat- => [Click Here]
                            (https://discord.new/SajvfV8Us3Xa)
                            言・templat- => [Click Here]
                            (https://discord.new/CdQPVCqsywsJ)
                            言・templat- => [Click Here]
                            (https://discord.new/kAe4GhNCGGt9)
                            言・templat- => [Click Here]
                            (https://discord.new/9KpbsFp9kJsW)
                        **`)
        msg.channel.send(embed2)
        const embed3 = new Discord.MessageEmbed().setAuthor("Template").setDescription(`**
                            言・templat- => [Click Here]
                            (https://discord.new/ecdYRF2WuWeE)
                            言・templat- => [Click Here]
                            (https://discord.new/Fk293AgJpyja)
                            言・templat- => [Click Here]
                            (https://discord.new/kC4HGVQnCRPY)
                            言・templat- => [Click Here]
                            (https://discord.new/BhRydQ7q7tN6)
                            言・templat- => [Click Here]
                            (https://discord.new/fjYydK5mvpwB)
                            言・templat- => [Click Here]
                            (https://discord.new/K6D2d9r9Ukzu)
                            言・templat- => [Click Here]
                            (https://discord.new/AKvvfbAMVZjJ)
                        **`)
        msg.channel.send(embed3)
    }
})




 client.login(process.env.TOKEN);
