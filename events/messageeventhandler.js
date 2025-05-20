const discordTTS = require('discord-tts');
const { createAudioResource } = require('@discordjs/voice');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const ttsChannel = message.client.ttsChannels?.get(message.guild.id);
        if (!ttsChannel) return;

        // Only process messages from the channel where the join command was used
        if (message.channel.id !== ttsChannel.textChannelId) return;

        try {
            const stream = discordTTS.getVoiceStream(message.content);
            const audioResource = createAudioResource(stream);
            ttsChannel.player.play(audioResource);
        } catch (error) {
            console.error('Error creating TTS:', error);
        }
    },
};
