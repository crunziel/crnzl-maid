module.exports = async (client, oldState, newState) => {


    await client.tabledata.defer;

     const tableCategory = '702060307417137172';
     const reserveChannel = '702350226299813939';
     const botID = '695137063191707698';
     const userNickname = newState.member.displayName;
     const connection = await client.channels.cache.get('702350226299813939').join();

     //code anjing
       if(newState.channelID === reserveChannel && newState.id !== botID){
        await delay(1000)
        const dispatcher = connection.play('/home/crunziel/maid/audio/senko.mp3', { volume: 0.3 });
        dispatcher.on('start', () => {});
        dispatcher.on('finish', () => {});
        dispatcher.on('error', console.error);     

        if(newState.guild.channels.cache.find(c => c.name.includes(`${userNickname}'s Table`) && c.type == "category") !== undefined){
          newState.guild.channels.cache.find(c => c.name === "table-history").send({
            "embed": {
                "color": 16770815,
                "title": 'RESERVATION',
                "description": '\n' + userNickname + ", you can only have 1 table at a time.\nI will move you to your table in 5 seconds.",
                "timestamp": new Date(),
                "footer": {
                  "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
                  "text": "CrunzieL's Maid"
                      },
                }
        })
        await delay(4500)
        await newState.setChannel(newState.guild.channels.cache.find(c => c.name.includes(`${userNickname}'s Table`) && c.type == "category").children.find(c => c.type == "voice"))
        return;
        }

        await newState.guild.channels.create(`⬧︎ ${userNickname}'s Table ⬧︎`, {
            type: 'category',
            permissionOverwrites: [
               {
                 id: newState.id,
                 allow: ['MOVE_MEMBERS', 'CONNECT'],
              },
            ],
          })
            .then(async channel => {
                client.tabledata.push("Data", { newID: channel.id, guild: newState.guild.id }, "categoryID")

        await newState.guild.channels.create(`chit-chat`, {type: 'text', parent: channel.id})
        .then(async channel => {
            client.tabledata.push("Data", { newID: channel.id, guild: newState.guild.id }, "textChannelsID")
            await channel.send({
                "embed": {
                    "color": 16770815,
                    "title": "RESERVED",
                    "description": "\nThis table is reserved under **" + userNickname + "**\n\nOn behalf of CrunzieL, I would like to thank you for making a reservation at CrunzieL's Cafe.\nI encourage you to contact him at any time with your concerns and feedback about this server and i hope you have a great time.\n\nThank you again for coming! We are honored to serve you!",
                    "timestamp": new Date(),
                    "footer": {
                      "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
                      "text": "CrunzieL's Maid"
                    },
              }
             })
            });

        // Create channel...
         await newState.guild.channels.create(`Voice Chat`, {type: 'voice', parent: channel.id})
        .then(async channel => {
            client.tabledata.push("Data", { newID: channel.id, guild: newState.guild.id }, "voiceChannelsID")
            // A new element has been added to temporary array!
            await newState.guild.channels.cache.find(c => c.name === "table-history").send({
            "embed": {
                "color": 16770815,
                "title": 'RESERVATION',
                "description": '\n' + userNickname + ", i have reserved a table for you.\nI will move you to the table in 5 seconds.",
                "timestamp": new Date(),
                "footer": {
                  "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
                  "text": "CrunzieL's Maid"
                      },
                }
        })
        await delay(3000);
        await newState.setChannel(channel.id)
        await client.tabledata.inc("Count")
        await delay(1500);
        await client.logger.log(`${userNickname}` + "Table Created. Total Active Table: " + client.tabledata.get("Count"))
    })
  });
}

     if(client.tabledata.get('Data', 'voiceChannelsID').length >= 0) for(let i = 0; i < client.tabledata.get('Data', 'voiceChannelsID').length; i++) {  
         let voiceChannelGuildID = client.tabledata.get('Data', `voiceChannelsID.${i}.guild`)
         let voiceChannelID = client.tabledata.get('Data', `voiceChannelsID.${i}.newID`)
         let textChannelGuildID = client.tabledata.get('Data', `textChannelsID.${i}.guild`)
         let textChannelID = client.tabledata.get('Data', `textChannelsID.${i}.newID`)
         let categoryGuildID = client.tabledata.get('Data', `categoryID.${i}.guild`)
         let categoryID = client.tabledata.get('Data', `categoryID.${i}.newID`)

         let vc = client.guilds.cache.find(x => x.id === voiceChannelGuildID).channels.cache.find(x => x.id === voiceChannelID)
         await delay (1000)
         if(vc.members.size <= 0){
            await vc.delete()
            await client.guilds.cache.find(x => x.id === textChannelGuildID).channels.cache.find(x => x.id === textChannelID).delete()
            await client.guilds.cache.find(x => x.id === categoryGuildID).channels.cache.find(x => x.id === categoryID).delete()
            await delay(1000)
            await client.tabledata.dec("Count")
            await client.tabledata.remove('Data', `{ newID: ${voiceChannelID}, guild: ${voiceChannelGuildID} }`, 'voiceChannelsID')
            await client.tabledata.remove('Data', `{ newID: ${textChannelID}, guild: ${textChannelGuildID} }`, 'textChannelsID')
            await client.tabledata.remove('Data', `{ newID: ${categoryID}, guild: ${categoryGuildID} }`,'categoryID')
            await client.logger.log("1 Table Destroyed. Total Active Table: " + client.tabledata.get("Count"))
         }
     }

}
