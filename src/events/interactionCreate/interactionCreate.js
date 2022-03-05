
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		// 指令實際註冊&執行監控
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		console.log(command);
		if (!command) return;

		try {
			await command.execute(interaction);
			const msg = `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`;
			console.log(msg);
			
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};