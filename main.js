// # usr/bin/env node
// Code by Jack 
// Built for Discord.JS V12.

// Bot Settings
const settings = { 
	mode: true,
	framework: "Orbital framework",
	version: "3.0",
	token: process.env['token'],
	prefix: 'o!',
	activity: 'Discord',
	type: 'WATCHING'
}

// HTML Ports
const express = require('express');
const app = express();
const port = 6000;

// Create a new localhost port.
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App Bound to: http://localhost:${port}`));

// Packages
const Discord = require('discord.js');
const fs = require('fs');

// Folders
const commandFolders = fs.readdirSync('./Commands');
const memberCounter = require('./Schemas/member-counter');

// Client
const client = new Discord.Client();

client.once('ready', async () => {
	
	if (!settings.mode) {
		
		console.log("Bot is currently in Maintenance...");
		
	} else {
		
		
		
	}
	
	console.log("Running " + settings.framework + " " + settings.version);
	client.user.setActivity(settings.activity, { type: settings.type });
	
	// Counts Members in specific client.
	memberCounter(client);

    bootup();
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.events  = new Discord.Collection();

// Different Handlers for Commands/Events
['command_handler', 'event_handler'].forEach(handler =>{
	require(`./Handlers/${handler}`)(client, Discord);
});

// Check for command folders.
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./Commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Show the Orbital framework version and logo.
function bootup() {
    console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =");
    console.log("     *                                                            *");
    console.log("                             aaaaaaaaaaaaaaaa               *");
    console.log("                         aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("                    aaaaaaaaaaaaaaaaa           aaaaaa");
    console.log("                  aaaaaaaaaaaaaaaa                  aaaa");
    console.log("                 aaaaaaaaaaaaaaaa                      aa");
    console.log("*               aaaaaaaaaaaaaaaa                         a");
    console.log("                aaaaaaaaaaaaaaa");
    console.log("          *    aaaaaaaaaaaaaaaaa");
    console.log("               aaaaaaaaaaaaaaaaaaa                               *");
    console.log("               aaaaaaaaaaaaaaaaaaaaa");
    console.log("               aaaaaaaaaaaaaaaaaaaaaa");
    console.log("                aaaaaaaaaaaaaaaa");
    console.log("                aaaaaaaa                                 a");
    console.log("                 aaaaaaaaaa                            aa");
    console.log("                  aaaaaaaaaaaaaaaa                  aaaa");
    console.log("                    aaaaaaaaaaaaaaaaa           aaaaaa        *");
    console.log("      *               aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("                         aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("                      *      aaaaaaaaaaaaaaaa");
    console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =");
    console.log("                          Orbital Framework 3.0                    ");
    slashN();
    console.log("                            By Colack (Jack)                       ");
}

// Set Activity for the bot.
function setActivity() {
    client.user.setActivity(settings.activity, { type: settings.type });
}

// Make a line break.
function slashN() {
    console.log("\n");
}

// Login as the Bot

client.login(settings.token);

console.log("Bot Fully Logged in Without Any Errors!");
