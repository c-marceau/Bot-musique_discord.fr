const fs = require("fs");

module.exports = {
  name: "clips",
  description: "Liste des clips",
  execute(message) {
    fs.readdir("./sounds", function(err, files) {
      if (err) return console.log("Impossible de lire le répertoire : " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.reply(`${clips.join(" ")}`).catch(console.error);
    });
  }
};