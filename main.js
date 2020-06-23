const Discord = require('discord.js');
const client = new Discord.Client();
require('ffmpeg');

require('dotenv').config();

const PREFIX = 'Juanita ';

let soliAvailable = true;
let juanquiAvailable = true;

var channel;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
	let args = message.content.substring(PREFIX.length).split(' ');

	switch (args[0]) {
		case 'ping':
			message.reply('Pong!');
			break;
		case 'mamamela':
			channel = message.member.voice.channel;
			if (!channel) return console.error('The channel does not exist!');
			channel
				.join()
				.then((connection) => {
					const dispatcher = connection.play('./audio/Esperancita.mp3');
					dispatcher.on('finish', (end) => {
						channel.leave();
					});
				})
				.catch((e) => {
					console.error(e);
				});
			break;
		case 'tintico':
			channel = message.member.voice.channel;
			if (!channel) return console.error('The channel does not exist!');
			channel
				.join()
				.then((connection) => {
					const dispatcher = connection.play('./audio/Tinticos.mp3');

					dispatcher.on('finish', (end) => {
						channel.leave();
					});
				})
				.catch((e) => {
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
						channel = client.channels.cache.get('447957737528229917');
						if (!channel) return console.error('The channel does not exist!');
						channel
							.join()
							.then((connection) => {
								// Yay, it worked!
								const dispatcher = connection.play('./audio/Soli.mp3');

								dispatcher.on('finish', (end) => {
									channel.leave();
								});
							})
							.catch((e) => {
								// Oh no, it errored! Let's log it to console :)
								console.error(e);
							});
					} else {
						message.reply('Soli no esta disponible');
					}
					break;
				case 'Juanqui':
					if (juanquiAvailable) {
						message.reply('Ya notifico a Juanqui');
						const channel = client.channels.cache.get('614117620450590734');
						if (!channel) return console.error('The channel does not exist!');
						channel
							.join()
							.then((connection) => {
								// Yay, it worked!
								const dispatcher = connection.play('./audio/Juanqui.mp3');

								dispatcher.on('finish', (end) => {
									channel.leave();
								});
							})
							.catch((e) => {
								// Oh no, it errored! Let's log it to console :)
								console.error(e);
							});
					} else {
						message.reply('Juanqui no esta disponible');
					}
					break;
				case 'Saven':
					if (juanquiAvailable) {
						message.reply('Ya notifico a Juanqui');
						const channel = client.channels.cache.get('614117620450590734');
						if (!channel) return console.error('The channel does not exist!');
						channel
							.join()
							.then((connection) => {
								// Yay, it worked!
								const dispatcher = connection.play('./audio/Juanqui.mp3');

								dispatcher.on('finish', (end) => {
									channel.leave();
								});
							})
							.catch((e) => {
								// Oh no, it errored! Let's log it to console :)
								console.error(e);
							});
					} else {
						message.reply('Juanqui no esta disponible');
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
					case 'Saven':
						message.reply('Listo, Juanqui no dejare a nadie pasar');
						juanquiAvailable = false;
						break;
				}
			} else {
				message.reply('No tienes permisos para hacer esto!');
			}
			break;
		case 'desbloquea':
			if (message.member.roles.cache.find((r) => r.name === 'Patron') != null) {
				let username = message.member.user.username;
				switch (username) {
					case 'JuanDavidSolano':
						message.reply('Listo, Soli te avisare');
						soliAvailable = true;
						break;
					case 'Saven':
						message.reply('Listo, Juanqui te avisare');
						juanquiAvailable = true;
						break;
				}
			} else {
				message.reply('No tienes permisos para hacer esto!');
			}
			break;
	}
});

client.login(process.env.TOKEN);
