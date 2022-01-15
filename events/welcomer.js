const client = require('../index')
const Schema = require('../models/welcomeChannel')
const Canvas = require('discord-canvas')

const { Discord, MessageEmbed, MessageAttachment } = require('discord.js')


client.on('guildMemberAdd', async member => {
    Schema.findOne({Guild : member.guild.id}, async(e,data) => {
        if(!data) return;
        const image = await new Canvas.Welcome()
    .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(member.guild.memberCount)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ format: 'png'}))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://media.discordapp.net/attachments/893475882327490578/930851743779135488/pngtree-modern-double-color-futuristic-neon-background-image_351866.png")
  .toAttachment();
 
const attachment = new MessageAttachment(image.toBuffer(), "welcome.png")
const channel = member.guild.channels.cache.get(data.Channel)
await channel.send(attachment)
    })
})
