const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const { readdirSync } = require("fs")
const ms = require('ms')
const lineReply = require('discord-reply')
const client = new Client({
    disableEveryone: true
})
const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb, {
    useUnifiedTopology: false,
    useNewUrlParser: true,
}).then(console.log('MongoDb is connected!'))
const prefixSchema = require('./models/prefix')
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
module.exports = client;
client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 


client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})
  
client.on('message', async message => {
    const newp = await client.prefix(message)
    if(message.content.startsWith(`<@${client.user.id}>`)) {
      await message.lineReply(`Prefix in ${message.guild.name} is ${newp}`)
    }
    if (!message.content.startsWith(newp)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(newp.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
})

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id })
        }
    })
})




  
client.login(process.env.TOKEN)
