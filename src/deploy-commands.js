const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');
const { getAllCommandFiles, registerCommands, registerEvents } = require('./utils/registry');

const commands = [];
const commandFiles = getAllCommandFiles(__dirname + '/commands').filter(file => file.endsWith('.js'));
console.log(commandFiles);
for (const file of commandFiles) {
	const command = require(file);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(clientId, guildId),{ body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// await rest.put(Routes.applicationCommands(clientId),{ body: commands },);