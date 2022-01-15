const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'prefix',
    alliases: ['prefix','change-prefix','set-prefix','setprefix'],
    usage: '<new prefix>',
    description: 'To Change Prefix In Guild',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const newprefix = await args.join(" ")
        if(!newprefix) return message.channel.send('prefix?')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : newprefix
                })
                data.save()
                message.channel.send(new Discord.MessageEmbed().setTitle('Prefix Changed!').setAuthor(client.user.username, client.user.avatarURL({dynamic: true})).setDescription(`New Prefix : ${newprefix}`).setFooter(message.author.username, message.author.avatarURL({dynamic:true})))
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : newprefix
                })
                data.save()
                message.channel.send(new Discord.MessageEmbed().setTitle('Prefix Changed!').setAuthor(client.user.username, client.user.avatarURL({dynamic: true})).setDescription(`New Prefix : ${newprefix}`).setFooter(message.author.username, message.author.avatarURL({dynamic:true})))
            }
        })
    }
}
