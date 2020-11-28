const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


let prefix = config.prefix



client.on('ready', () => {
   console.log(`Let's start the motherfucking party girls`);
});

client.on('message',  async (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var version = config.version;
   
  if(command === "flipcoin"){
    var flip = ["side","tails"]
    var flipcoin = flip[Math.floor(Math.random() * flip.length)]
    let embed = new Discord.MessageEmbed()
    .setTitle("*Result:*")
    .setDescription(`**${flipcoin}**`)
    .setFooter(version, client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  }
   
  if(command === "avatar"){
    if(message.author.bot) return;
    let mencionado = message.mentions.users.first()
    if(!mencionado) return message.channel.send("Ping someone")
    const embed = new Discord.MessageEmbed()
    .setTitle("Avatar from: "+mencionado.username)
    .setImage(mencionado.displayAvatarURL())
    .setFooter(version, client.user.displayAvatarURL())
    message.channel.send(embed)
  }
  
  if(command === "ppt"){
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
    const options = [
        "Rock :shell: ",
        "Paper :newspaper2:",
        "Scissors :scissors: "
    ]
    const option = options[Math.floor(Math.random() * options.length)]
    message.delete().catch
    message.channel.send(`${option}`)
}

  if(command === "say"){
    if(!message.content.startsWith(prefix)) return;
    let text = args.join(" ");
    if(message.author.bot) return;
    if(!text) return message.channel.send(`Send some text to say`).then(message => message.delete({ timeout: 5000}))
    message.delete().catch
    message.channel.send(text);

  }

  if(command === "8ball"){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!args[0]) return message.channel.send("Make me a question")
    let answer = [
      "yes","no","idk", "obviously no","maybe"
    ];
    var random = answer[Math.floor(Math.random() * respuesta.length)]
    var question = args.join(" ")
    const embed = new Discord.MessageEmbed()
    .setColor(000000)
    .addField("*My answer:*", `${random}`)
    message.channel.send(embed)
}

  if(command === "help"){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const embed = new Discord.MessageEmbed()
    .setTitle("Help commands:")
    .setColor(0x00AE86)
    .setDescription("Use them in #commands")
    .setFooter(version, client.user.avatarURL)
    .setTimestamp()
    .setURL("https://github.com/SrGamersito")
    .addField("**Fun:**", "```say, 8ball, rps```")
    .addField("**Utility:**", "```poll```")
    .addField("**Moderation:**", "```ban, kick, clear```")
    message.channel.send(embed)
  }
  
///////////////////////////////MODERATION///////////////////////////////
   
   if(command === "clear"){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You need permissions").then(message => message.delete({ timeout: 5000}))
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I need permissions").then(message => message.delete({ timeout: 5000}))
    if(!args[0]) return message.channel.send("Write how many messages you wanna delete").then(message => message.delete({ timeout: 5000}))
    let number = args[0]
    if(isNaN(number)) return message.channel.send("Write a number, not words or symbols").then(message => message.delete({ timeout: 5000}))
    number = parseInt(number)
    if(number >= 120 || number <= 0) return message.channel.send("Write a number up to 0 - Down to 120").then(message => message.delete({ timeout: 5000}))
    message.channel.bulkDelete(number + 1 ).then( () =>{
      message.channel.send(`I cleared **${number} mensajes**`).then(message => message.delete({ timeout: 5000}))
    })
  }

  if(command === "kick"){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    let kicked = message.mentions.users.first();
    if(kicked.id === client.user.id) return message.channel.send("Don't ping me")

    if (!message.member.permissions.has("KICK_MEMBERS")){
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You need the permission KICK_MEMBERS to do that!"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);
      return;
    }
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "I need the permission `KICK MEMBERS` to do that"
        )
        .setColor("#2C2F33");
      message.channel.send(botnopermsembed);
  
      return;
    }
    if(!kicked) return message.reply(`Ping a member to ban him`);
    
    message.guild.member(mencionado).kick();
    message.channel.send(`**${mencionado.username}** was kicked`);
    
  }

  if(command === "ban"){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let banned = message.mentions.users.first();
    if(banned.id === client.user.id) return message.channel.send("Don't ping me")

    if (!message.member.permissions.has("BAN_MEMBERS")){
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You need the permission BAN_MEMBERS to do that!"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);
      return;
    }
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "I need the permission `BAN MEMBERS` to do that"
        )
        .setColor("#2C2F33");
      message.channel.send(botnopermsembed);
  
      return;
    }
    if(!banned) return message.reply(`Ping a member to ban him`);
    
    message.guild.member(banned).ban();
    message.channel.send(`**${banned.username}** was banned`);
    
  }

});

client.login(config.token);
