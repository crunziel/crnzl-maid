const config = require("../config.json");
const botsChannel = '695204647547437097'
const testChannel = '702378231776411697'

module.exports = async (client, message) => {


  /*
  // Ignore if not in bot commands
  if (message.author.id !== config.ownerID
    && (message.channel.id !== botsChannel)
    && (message.channel.id !== testChannel)) return;
   */

  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};