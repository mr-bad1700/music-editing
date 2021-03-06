const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../util/error");
const splitlyrics = require("../util/pagination");

module.exports = {
    info: {
        name: "lyrics",
        description: "Get lyrics for the currently playing song",
        usage: "[lyrics]",
        aliases: ["ly"],
    },

    run: async function (client, message, args) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError("There is nothing playing.", message.channel).catch(console.error);

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
        } catch (error) {
            lyrics = `No lyrics found for ${queue.songs[0].title}.`;
        }
        const splittedLyrics = splitlyrics.chunk(lyrics, 1024);

        let lyricsEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setThumbnail(queue.songs[0].img)
            .setColor("#303135")
            .setDescription(splittedLyrics[0])
            .setFooter(``)
            .setTimestamp();

        const lyricsMsg = await message.channel.send(lyricsEmbed);
        if (splittedLyrics.length > 1) await splitlyrics.pagination(lyricsMsg, message.author, splittedLyrics);
    },
};
