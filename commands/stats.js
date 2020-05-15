const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Enmap = require("enmap");


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  await client.tabledata.defer;
  const statsEmbed = new Discord.MessageEmbed()
	.setColor('#FFE6FF')
	.setTitle('STATISTICS')
	.setThumbnail('https://crunziel.com/i/s9tctwm0nrl25.png')
	.setTimestamp()
  .setFooter("CrunzieL's Maid", 'https://crunziel.com/i/s9tctwm0nrl25.png')
  .addField("\u200b", "**Server Information**\nProcessor\nMemory Usage\nOS\nUptime\n\n**Library**\nNode\nDiscord.js\n\n**Clients Information**\nServing\nTotal Users\nTable Active", true)
  .addField("\u200b", `★\n: Intel(R) Xeon(R) CPU E3-1245 v5\n: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n: Ubuntu 18.04\n: ${duration}\n\n\n: ${process.version}\n: v${version}\n\n\n: CrunzieL's Cafe\n: ${client.users.cache.size}\n: ${client.tabledata.get("Count")}`, true);



  message.channel.send(statsEmbed).then(
  /*
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"}).then(
  */
  msg => {
    msg.delete({ timeout: 30000})
  }
);
}

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};