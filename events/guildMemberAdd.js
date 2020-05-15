module.exports = (client, member, guildMember) => {
  member.roles.add('695138954659495948');
  member.guild.channels.cache.find(c => c.name === "welcome").send({
    "embed": {
        "color": 16770815,
        "title": "Welcome to CrunzieL's Cafe",
        "description": member.displayName + ", Welcome abroad to our server!\n\nPlease check our server rules here : \n<#695133812866285629>\n\nHope you have a good time here!",
        "thumbnail": {
        "url": member.user.avatarURL(),
        },
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        },
  }
 }).catch(console.error);
}
