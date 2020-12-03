const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Obtenir les paroles de la chanson en cours de lecture",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Il n'y a rien qui joue.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Aucune parole trouvée pour ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Aucune parole trouvée pour ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} — Lyrics`)
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};