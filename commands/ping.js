exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
const resMsg = await message.channel.send({
    "embed": {
        "color": 16770815,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/75937746.jpg",
          "text": "CrunzieL's Maid"
        },
        "description": "**Pinging ...**\n\nMy Latency is : ... ms.\nMy API Latency is : ... ms."
  }
 });
client.logger.cmd(`Command Ping Executed`);

//resMsg.edit('Ping: ' + Math.round((resMsg.createdTimestamp - msg.createdTimestamp) - bot.ping)));
resMsg.edit({
    "embed": {
        "color": 16770815,
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/75937746.jpg",
          "text": "CrunzieL's Maid"
        },
        "description": "**Pong!**\n\nMy Latency is : `" + Math.round(resMsg.createdTimestamp - message.createdTimestamp) + ' ms`.\nMy API Latency is : `' + Math.round(client.ws.ping) + ' ms`.'
  }
 });
}

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping"
};