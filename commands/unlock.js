exports.run = async (client, message, args) => {

let userVoiceChannel = message.member.voice.channel;
let cat = message.member.voice.channel.parentID;
let userCatChannel = message.guild.channels.cache.get(cat);

if(!userVoiceChannel) return message.channel.send({
    "embed": {
        "color": 16770815,
        "description" : "**You are not inside a voice channel**",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
  }
 });


// Compare the voiceChannels
if (userVoiceChannel.name.startsWith("Public")) return message.channel.send({
    "embed": {
        "color": 16770815,
        "description" : "**You can't lock Public Room.\nPlease reserve a table to use this feature.**",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
  }
 });

if (userCatChannel.name.includes("Table") && !userCatChannel.name.includes(message.member.displayName + "'s")) return message.channel.send({
    "embed": {
        "color": 16770815,
        "description" : "**Sorry, This table is not yours.**",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
  }
 });

if (!userCatChannel.name.includes("🔒")) return message.channel.send({
    "embed": {
        "color": 16770815,
        "description" : "**Table is not locked.\nIf you want to lock please type `;lock`.**",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
  }
 });

await userCatChannel.updateOverwrite(client.config.everyoneRole, { CONNECT: true, READ_MESSAGE_HISTORY: true });
await userCatChannel.setName(userCatChannel.name.replace(' 🔒', ''));
await client.logger.log(message.member.displayName + "'s Is Table Unlocked")
await message.channel.send({
    "embed": {
        "color": 16770815,
        "description" : "**Table successfully unlocked.**",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
  }
 });
}

exports.help = {
  name: "unlock",
  category: "Room",
  description: "ya unlock lah goblok",
  usage: "lock"
};