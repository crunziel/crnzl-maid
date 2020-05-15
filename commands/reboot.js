exports.run = async (client, message) => {

    if(message.author.id !== client.config.ownerID) return message.reply("You can't do that.")

    await message.reply("Bot is restarting.");
    await Promise.all(client.commands.map(cmd =>
      client.unloadCommand(cmd)
    ));
    process.exit(0);

}



exports.help = {
    name: "reboot",
    category: "Miscelaneous",
    description: "Reboot.",
    usage: "reboot"
};