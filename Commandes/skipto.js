const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Passer au numéro de file d'attente sélectionné",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Il n'y a pas de file d'attente.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`La file d'attente est seulement ${queue.songs.length} chansons longues !`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ passé ${args[0] - 1} sons`).catch(console.error);
  }
};