exports.run = (client, message, args) => {
  if(message.author.id !== client.config.ownerID) return message.reply("kamu bukan Niko :( Jika kamu membutuhkan bantuan harap menghubungi CrunzieL#1213");
  if(!args || args.length < 1) return message.reply("command apa yang ingin kamu reload ?");
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!client.commands.has(commandName)) {
    return message.reply("command yang kamu ingin reload tidak ditemukan.");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`command ${commandName} telah di reload.`);
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};