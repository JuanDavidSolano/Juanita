const Discord = require('discord.js');
const client = new Discord.Client();
require('ffmpeg');

require('dotenv').config();

const PREFIX = 'Juanita ';

let soliAvailable = true;
let juanquiAvailable = true;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
	let args = message.content.substring(PREFIX.length).split(' ');

	switch (args[0]) {
		case 'ping':
			message.reply('Pong!');
			console.log(message.member.user.username);
			break;
		case 'mamamela':
			const channel = client.channels.cache.get('447957737528229917');
			if (!channel) return console.error('The channel does not exist!');
			channel
				.join()
				.then((connection) => {
					// Yay, it worked!
					const dispatcher = connection.play('./audio/Esperancita.mp3');

					dispatcher.on('end', (end) => {
						channel.leave();
					});

					//channel.leave();
				})
				.catch((e) => {
					// Oh no, it errored! Let's log it to console :)
					console.error(e);
				});
			break;
		case 'ayuda':
			message.reply('Puedes usar ```Juanita bajame``` para ver acceder a las oficinas disponibles');
			break;
		case 'notifica':
			switch (args[2]) {
				case 'Soli':
					if (soliAvailable) {
						message.reply('Ya notifico a Soli');
						const channel = client.channels.cache.get('447957737528229917');
						if (!channel) return console.error('The channel does not exist!');
						channel
							.join()
							.then((connection) => {
								// Yay, it worked!
								const dispatcher = connection.play('./audio/Soli.mp3');

								dispatcher.on('end', (end) => {
									channel.leave();
								});

								//channel.leave();
							})
							.catch((e) => {
								// Oh no, it errored! Let's log it to console :)
								console.error(e);
							});
					} else {
						message.reply('Soli no esta disponible');
					}
					//console.log(message.member.roles.cache.find(r => r.name === "Patron"));
					break;
				case 'Juanqui':
					if (juanquiAvailable) {
						message.reply('Ya notifico a Juanqui');
						const channel = client.channels.cache.get('447957737528229917');
						if (!channel) return console.error('The channel does not exist!');
						channel
							.join()
							.then((connection) => {
								// Yay, it worked!
								const dispatcher = connection.play('./audio/Juanqui.mp3');
								dispatcher.on('end', (end) => {
									channel.leave();
								});

								//channel.leave();
							})
							.catch((e) => {
								// Oh no, it errored! Let's log it to console :)
								console.error(e);
							});
					} else {
						message.reply('Soli no esta disponible');
					}
					break;
				default:
					message.reply('No se a quien notificar');
			}
			break;
		case 'bloquea':
			if (message.member.roles.cache.find((r) => r.name === 'Patron') != null) {
				let username = message.member.user.username;
				switch (username) {
					case 'JuanDavidSolano':
						message.reply('Listo, Soli no dejare a nadie pasar');
						soliAvailable = false;
						break;
				}
			} else {
				message.reply('No tienes permisos para hacer esto!');
			}
			break;
		case 'desbloquea':
			if (message.member.roles.cache.find((r) => r.name === 'Patron') != null) {
				message.reply('Listo, Soli te notificare si alguien viene');
				soliAvailable = true;
			} else {
				message.reply('No tienes permisos para hacer esto!');
			}
			break;
	}
});

client.login(process.env.TOKEN);
