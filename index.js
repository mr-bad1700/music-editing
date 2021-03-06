const express = require('express');
const app = express();
app.listen(() => console.log('🙂'));
app.listen(() => console.log('Starting...'));
app.use('/ping', (req, res) => {
	res.send(new Date());
});
require("dotenv").config();
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.queue = new Map()

client.config = {
  prefix: "m.",
  SOUNDCLOUD: "dmDh7QSlmGpzH9qQoH1YExYCGcyYeYYC"
}

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.login("ODI4MzMxNjY3MDEzMTA3NzIy.YGoB-w.Zo6cIFB_suucFL3TX6GiJcLxgC4");
