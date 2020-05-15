module.exports = async (client, reaction, user) => {
        // When we receive a reaction we check if the reaction is partial or not
        if (reaction.partial) {
            // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
            try {
                await reaction.fetch();
            } catch (error) {
                client.logger.error('Something went wrong when fetching the message: ', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        let message = reaction.message, emoji = reaction.emoji;

        client.logger.log(client.id + message.channel.id + message.author.id)

        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
        if (message.channel.id !== '702896291260268604') return
        for (const reaction of userReactions.values()) {
        await reaction.users.remove(user.id);
        }
        } catch (error) {
        console.error('Failed to remove reactions.');
        }     

///////// LOCK REACTION   


        if(emoji.name === '🔒') {
            let userNickname = client.guilds.cache.get('266898539303403521').members.cache.get(user.id).displayName
            let userVoiceChannel = client.guilds.cache.get('266898539303403521').members.cache.get(user.id).voice.channel;
            let cat = client.guilds.cache.get('266898539303403521').members.cache.get(user.id).voice.channel.parentID;
            let userCatChannel = message.guild.channels.cache.get(cat);

            if(message.channel.id !== 702896291260268604 && message.author.id !== 695137063191707698) return;

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

            //Public
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
             //Table not yours
            if (userCatChannel.name.includes("Table") && !userCatChannel.name.includes(userNickname + "'s")) {
                message.channel.send({
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
            return
            }
            //Check #1
             if (userCatChannel.name.includes("🔒")) {
                await userCatChannel.updateOverwrite(client.config.everyoneRole, { CONNECT: true, READ_MESSAGE_HISTORY: true });
                await userCatChannel.setName(userCatChannel.name.replace(' 🔒', ''));
                message.channel.send({
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
                client.logger.log(userNickname + "'s Is Table Unlocked")
            return;
            } else {
                let lockedCatChannel = userCatChannel.name + " 🔒";
                await userCatChannel.updateOverwrite(client.config.everyoneRole, { CONNECT: false, READ_MESSAGE_HISTORY: false });
                await userCatChannel.setName(lockedCatChannel);
                await message.channel.send({
                    "embed": {
                        "color": 16770815,
                        "description" : "**Table successfully locked.**",
                        "timestamp": new Date(),
                        "footer": {
                        "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
                        "text": "CrunzieL's Maid"
                }
                }
                });
                client.logger.log(userNickname + "'s Is Table Locked")
                }
                return;
};
///////// LOCK REACTION END



} //Closing