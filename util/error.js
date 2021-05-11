const { MessageEmbed } = require("discord.js")


module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("303135")
    .setDescription(text)
    .setFooter("> Something went wrong :(")
    await channel.send(embed)
}
