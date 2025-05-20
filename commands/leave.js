const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave the voice channel'),
        
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        
        if (!connection) {
            return await interaction.reply({ 
                content: '❌ I am not in any voice channel!',
                ephemeral: true 
            });
        }

        try {
            connection.destroy();
            interaction.client.ttsChannels.delete(interaction.guild.id);
            
            await interaction.reply({
                embeds: [{
                    color: 0xff0000,
                    title: '👋 Left Voice Channel',
                    description: 'TTS has been disabled.',
                }]
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: '❌ There was an error leaving the voice channel!',
                ephemeral: true 
            });
        }
    },
};
