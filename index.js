import { Client, GatewayIntentBits, ComponentAssertions } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

import {getBalance} from "./balance.js"

const TOKEN = 'MTE0NjgxOTU4MDA2MTI5ODY4OA.Gw0FIU.mLk8zCFcPcZ8yRXUH7nA_zXws_Z_SXoXKWHVyw';
const PREFIX = '/'; // Change this to your desired command prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; // Ignore messages from bots
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'grantrole') {
        const walletAddress = args[0]; // Assuming the wallet address is provided as the first argument
        const user = message.author;
        const member = message.member;
        // Check if the user meets the qualification criteria based on the wallet address
        let qualifies;
        
        try {
            const balance = await getBalance(walletAddress);
            if (balance => 1){
                qualifies = true;
            } else {
                qualifies = false;
            }
        } catch {
            qualifies = false;
        }

        if (qualifies) {
            const role = message.guild.roles.cache.find(role => role.name === 'Qualified Role');
            if (role) {
                await member.roles.add(role);
                message.channel.send(`Congratulations! You've been granted the Role.`);
            } else {
                message.channel.send(`The Role doesn't exist. Please contact the server administrator.`);
            }
        } else {
            message.channel.send(`Sorry, you don't hold any NFTs.`);
        }
    }
});

function checkQualification(walletAddress) {
    // Implement your criteria for qualification based on the wallet address
    // Return true if the user qualifies, false otherwise
    return true; // Change this based on your logic
}

client.login(TOKEN);
