
const { exists } = require('../utils/mongodb/models/User');
const userModel = require('../utils/mongodb/models/User');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		userModel.findOne({
			name: client.user.tag,
		}).then((doc) => {
			if (!doc) {
				let user = await userModel.create({ name: client.user.tag, email: '', moblie: '', password: '' });
				user.save();
			} else {
				console.log(`client ${client.user.tag} exists.`)
			}
		});
	},
};
