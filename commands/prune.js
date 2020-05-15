exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars


const amount = parseInt(args[0]) + 1;

if (isNaN(amount)) {


} else if (amount < 2 || amount >= 51) { {
    return message.channel.send({
        "embed": {
            "color": 16770815,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
              "text": "CrunzieL's Maid"
            },
            "description": "You need to input a number between 1 and 50"
      }
     });
  }
}

message.channel.messages.fetch({ limit: amount })
  .then(fetchedMessages => {
    const messagesToPrune = fetchedMessages.filter(msg => !msg.pinned);
    return message.channel.bulkDelete(messagesToPrune, true);
  })
  .then(prunedMessages => {
    messageDeleted = prunedMessages.size - 1;
    message.channel.send({
        "embed": {
            "color": 16770815,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
              "text": "CrunzieL's Maid"
            },
            "description": "Deleted " + messageDeleted + ' message' + `${messageDeleted !== 1 ? 's' : ''}` + '.',
      }
     }).then(message => {
         message.delete({ timeout: 5000 })
     });
  })
  .catch(err => {
      logger.error
      message.channel.send({
        "embed": {
            "color": 16770815,
            "timestamp": new Date(),
            "footer": {
              "icon_url": "https://crunziel.com/i/s9tctwm0nrl25.png",
              "text": "CrunzieL's Maid"
            },
            "description": "Something's wrong but it's not your fault.\n\n" + err,
      }
     });
    });

}

exports.help = {
    name: "prune",
    category: "Miscelaneous",
    description: "Delete message(s) from channel.",
    usage: "prune 5"
  };