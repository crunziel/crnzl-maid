exports.run = async (client, message, args) => {
await message.channel.send({
    "embed": {
        "color": 16770815,
        "title": "RESERVE A TABLE",
        "description": `At CrunzieL's Cafe, you can make a Private "Table" for you and your friends to play.\n\n**How?**\nIt's easy.\nYou just need to connect to a voice channel named "Reserve Here!"\nYou can always find me there, if you connect to that channel,\ni will immidiately create a table for you, and don't worry, because i will move you to that table too so you don't need to search for your table.\n\nYou can also lock your table, that enables the Table Owner to lock and makes nobody can connect to your table.\nYou can type` + ' `;lock` ' +  'and ' + '`;unlock` ' + "to lock and unlock your table, and locked table will have this emoji 🔒 beside it's name.\n\nPlease keep in mind that your Private Table will be automatically deleted if there is nobody inside.\n\nLastly, if you can't find me inside the Reserve Channel, please contact CrunzieL#1213 Thankyou!",
        "timestamp": new Date(),
        "footer": {
          "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
          "text": "CrunzieL's Maid"
        }
   }
  });
  /*
  const embed = new Discord.RichEmbed()
  .setColor(FFE6FF)
  .setFooter("CrunzieL's Maid's", "https://crunziel.com/i/s9tctwm0nrl25.png")
  .setImage("https://cdn.discordapp.com/attachments/702500408643420180/702500492407734352/tutorial.gif")
  .setTimestamp();
  */
  
await message.channel.send({
    files: ['./images/tutorial.gif']
});
 }
 
 exports.help = {
  name: "tutorialtable",
  category: "Tutorial",
  description: "Tutorial Cara Menggunakan Private Table",
  usage: "tutorialtable"
};