const Discord = require("discord.js");
const Enmap = require("enmap");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'] });
const config = require("./config.json");

delay = ms => new Promise(res => setTimeout(res, ms)); //setTimeout harus pake async 
client.config = config;

// ambil console logger sama func di modules
client.logger = require("./modules/console");
require("./modules/functions.js")(client);

client.commands = new Enmap();
client.tabledata = new Enmap({name: "tableData", fetchAll: true, autoFetch: true}); //load di command handler jadi kebaca di file lain

const init = async () => {

  //cek punya DB ato engga - buat voicestateupdate

  if(!client.tabledata.has("Data")){
    client.logger.log("tableData Data Key not found. Creating a new database ...")

    client.tabledata.set("Data", {
    categoryID: [],
    voiceChannelsID: [],
    textChannelsID: [],
    fetchAll: true,
    autoFetch: true
    })

    client.logger.log("Data Key successfuly created.")
  }
  
  if(!client.tabledata.has("Count")){
    client.logger.log("TableData Count Key not found. Creating a new database ...")
    client.tabledata.set("Count", 0)
    client.logger.log("Count Key successfuly created.")
    }

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

client.login(config.token);

// End top-level async/await function.
};

init();