var Discord = require("discord.js");
var logger = require("winston");
var auth = require("./auth.json");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";
// Initialize Discord Bot
var bot = new Discord.Client();
bot.on("ready", () => {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`

  if (!message.content) {
    return;
  }

  if (message.content.substring(0, 1) == "!") {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case "ping":
        message.channel.send("pong!");
        break;
      // Joins voice channel
      case "join":
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.join();
        } else {
          message.channel.send("You must be in a voice channel!");
        }
        break;
      // Leave the voice channel
      case "leave":
        if (message.guild.me.voiceChannel !== undefined) {
          message.guild.me.voiceChannel.leave();
          message.reply("I have successfully left the voice channel!");
        } else {
          message.reply("I'm not connected to a voice channel!");
        }
        break;
    }
  }
});

bot.login(auth.token);
