const Schema = require('../models/welcomeChannel')
const { MessageEmbed, Discord } = require('discord.js')


module.exports = {
  name: 'set-welcome-channel',

  run: async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('Channel?')

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Channel = channel.id;
        data.save;

      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();

      }
      message.reply(new MessageEmbed().setTitle('New Welcome Channel!').setDescription(`${channel} has been set as the welcome channel`))
    })

  }
}
