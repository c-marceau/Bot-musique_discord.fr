const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Basculer l'élagage des messages de bot",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Une erreur s'est produite lors de l'écriture dans le fichier.").catch(console.error);
      }

      return message.channel
        .send(`L'élagage des messages est ${config.PRUNING ? "**activé**" : "**désactivé**"}`)
        .catch(console.error);
    });
  }
};