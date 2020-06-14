
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

const PREFIX = "Juanita ";

let soliAvailable = true;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {



    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.reply('Pong!');
            break;
        case 'ayuda':
            message.reply('Puedes usar ```Juanita bajame``` para ver acceder a las oficinas disponibles');
            break;
        case 'notifica':
            switch (args[2]) {
                case "Soli":
                    if (soliAvailable) {
                        message.reply('Ya notifico a Soli');
                    } else {
                        message.reply('Soli no esta disponible');
                    }
                    //console.log(message.member.roles.cache.find(r => r.name === "Patron"));
                    break;
                case "Juanqui":
                    message.reply('Juanqui no esta disponible');
                default:
                    message.reply('No se a quien notificar');
            }
            break;
        case 'bloquea':
            if (message.member.roles.cache.find(r => r.name === "Patron") != null) {
                message.reply('Listo, Soli no dejare a nadie pasar');
                soliAvailable = false;
            } else {
                message.reply('No tienes permisos para hacer esto!');
            }
            break;
        case 'desbloquea':
            if (message.member.roles.cache.find(r => r.name === "Patron") != null) {
                message.reply('Listo, Soli te notificare si alguien viene');
                soliAvailable = true;
            } else {
                message.reply('No tienes permisos para hacer esto!');
            }
            break;
    }
});

client.login(process.env.TOKEN);
