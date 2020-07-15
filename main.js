const Discord = require('discord.js');
const client = new Discord.Client();
require('ffmpeg');

require('dotenv').config();

const PREFIX = 'Juanita ';

var channel;

var patronesMap = new Map();

patronesMap.set('soli', { available: true, channelId: '447957737528229917' });
patronesMap.set('juanqui', { available: true, channelId: '614117620450590734' });
//patronesMap.set('Yonnyce', { available: true, channelId: '' }); No tengo canal ctm



client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', procesMessage);

function procesMessage(message) {
	let args = message.content.substring(PREFIX.length).split(' ');

	//TODO antiSpam
	//TODO ...
	routeMessage(message, args);

}

function routeMessage(message, args) {

	switch (args[0]) {
		case 'ping':
			pingMessage(message);
			break;
		case 'mamamela':
			mamamelaMessage(message);
			break;
		case 'tintico':
			tinticoMessage(message);
			break;
		case 'ayuda':
			ayudaMessage(message);
			break;
		case 'notifica':
			notificaMessage(message, args[2])
			break;
		case 'bloquea':
			bloqueaMessage(message)
			break;
		case 'desbloquea':
			desbloqueaMessage(message)
			break;
	}
}

function notificaMessage(message, notifyTo) {

	let patron = patronesMap.get(notifyTo.toLowerCase())

	if (!patron || !patron.available) {
		message.reply(`${notifyTo} no esta disponible (O no existe)`);
		return;
	}

	message.reply(`Ya notifico a ${notifyTo}`);
	joinAndPlaySound(patron.channelId, `./audio/${notifyTo}.mp3`);

}

function bloqueaMessage(message) {

	if (message.member.roles.cache.find((r) => r.name === 'Patron') == null) {
		message.reply('No tienes permisos para hacer esto!');
		return;
	}

	let patron = patronesMap.get(message.member.user.username);
	patron.available = false;
	message.reply(`Listo, ${message.member.user.username} no dejare a nadie pasar`);
}

function desbloqueaMessage(message) {

	if (message.member.roles.cache.find((r) => r.name === 'Patron') == null) {
		message.reply('No tienes permisos para hacer esto!');
		return;
	}

	let patron = patronesMap.get(message.member.user.username);
	patron.available = true;
	message.reply(`Listo, ${message.member.user.username} te avisare`);
}

function pingMessage(message) {
	message.reply('Pong!');
}

function mamamelaMessage(message) {
	//TODO verificar nombre de proiedad id
	joinAndPlaySound(message.member.voice.channel.id, './audio/Esperancita.mp3');
}

function tinticoMessage(message) {
	//TODO verificar nombre de propiedad id
	joinAndPlaySound(message.member.voice.channel.id, './audio/Tinticos.mp3');
}

function ayudaMessage(message) {
	message.reply('Puedes usar ```Juanita bajame``` para ver acceder a las oficinas disponibles');
}

function joinAndPlaySound(channelId, audioRoute) {

	channel = client.channels.cache.get(channelId);
	if (!channel) return console.error('The channel does not exist!');
	channel
		.join()
		.then((connection) => {
			// Yay, it worked!
			const dispatcher = connection.play(audioRoute);

			dispatcher.on('finish', (end) => {
				channel.leave();
			});
		})
		.catch((e) => {
			// Oh no, it errored! Let's log it to console :)
			console.error(e);
		});

}

client.login(process.env.TOKEN);
