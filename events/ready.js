const activities_list = [
  "with CrunzieL <3", 
  "with my hair",
  "with my tail! :3",
  "with your feelings"
  ];

module.exports = async client => {
  client.logger.log(`Initializing CrunzieL's Maid ...`);

  //Activity
  setInterval(async => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index], { type: "PLAYING"});
    }, 10000);
  

  //Active Table
  setInterval(async function() {
  await client.tabledata.defer;
  const tableActive = client.tabledata.get("Count")
  const catID = client.channels.cache.get('695203935035850764')
  if(catID.name.includes(tableActive)) return;
  catID.setName(`Now Serving : ${tableActive} Table` + `${tableActive !== 1 && tableActive !== 0 ? 's' : ''}`)
    }, 5000);
  
  //Join voice channel
  let orderChannel = client.channels.cache.get('702350226299813939');
  await orderChannel.join().then(client.logger.log(`Connected to the Voice Channel`));
  
  /*
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
 */


  client.logger.log("Total Active Table: " + client.tabledata.get("Count"))
  client.logger.log(`I'm ready to serve ${client.channels.cache.size} channels on CrunzieL's Maid server, for a total of ${client.users.cache.size} users.`);
}