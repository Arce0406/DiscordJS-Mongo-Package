const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');
const { getAllCommandFiles, registerCommands, registerEvents } = require('./utils/registry');
const db = require('./utils/mongodb/connection')
require('dotenv').config()

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

(async () => {
	client.commands = new Map();

	await registerCommands(client, path.join(__dirname + '/commands'));
	await registerEvents(client, path.join(__dirname + '/events'));
	await client.login(token);	// Login to Discord with your client's token
	// console.log(client.commands);
})();
