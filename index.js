const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const discordTTS = require('discord-tts');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.ttsChannels = new Map();

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: '❌ There was an error executing this command!', 
            ephemeral: true 
        });
    }
});

// Handle prefix commands
client.on('messageCreate', async message => {
    // Handle TTS functionality
    if (!message.author.bot) {
        const ttsData = client.ttsChannels?.get(message.guild.id);
        if (ttsData && message.channel.id === ttsData.textChannelId) {
            try {
                const stream = discordTTS.getVoiceStream(message.content);
                const audioResource = createAudioResource(stream);
                ttsData.player.play(audioResource);
            } catch (error) {
                console.error('TTS Error:', error);
            }
        }
    }

    // Handle prefix commands
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        const fakeInteraction = {
            member: message.member,
            guild: message.guild,
            channel: message.channel,
            client: client,
            reply: async (content) => {
                return await message.reply(content);
            }
        };
        await command.execute(fakeInteraction);
    } catch (error) {
        console.error(error);
        await message.reply('❌ There was an error executing this command!');
    }
});

// Load commands
const commandFiles = require('fs').readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Bot ready event
client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log('🎯 Bot is ready to use!');
    
    let statusIndex = 0;
    setInterval(() => {
        const status = config.statusMessages[statusIndex];
        client.user.setActivity(status);
        statusIndex = (statusIndex + 1) % config.statusMessages.length;
    }, 10000);
});

// Error handling
client.on('error', error => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Login
client.login(config.token);