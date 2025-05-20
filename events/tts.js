const discordTTS = require('discord-tts');
const { createAudioResource } = require('@discordjs/voice');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        // Get TTS channel info for this guild
        const ttsData = client.ttsChannels?.get(message.guild.id);
        if (!ttsData) return;

        // Check if message is from the bound text channel
        if (message.channel.id !== ttsData.textChannelId) return;

        try {
            const stream = discordTTS.getVoiceStream(message.content);
            const audioResource = createAudioResource(stream);
            ttsData.player.play(audioResource);
        } catch (error) {
            console.error('TTS Error:', error);
            message.channel.send('❌ Error playing TTS message!').catch(console.error);
        }
    });
};