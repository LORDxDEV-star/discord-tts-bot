const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join a voice channel and start TTS'),
        
    async execute(interaction) {
        const member = interaction.member;
        
        if (!member.voice.channel) {
            return await interaction.reply({ 
                content: '❌ You need to be in a voice channel first!',
                ephemeral: true 
            });
        }

        try {
            const connection = joinVoiceChannel({
                channelId: member.voice.channel.id,
                guildId: member.guild.id,
                adapterCreator: member.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });

            connection.subscribe(player);
            
            interaction.client.ttsChannels.set(interaction.guild.id, {
                textChannelId: interaction.channel.id,
                player: player,
                connection: connection
            });

            await interaction.reply({
                embeds: [{
                    color: 0x00ff00,
                    title: '✅ TTS Activated!',
                    description: `I will read messages from ${interaction.channel}`,
                    footer: { text: 'Type messages in this channel to hear them in TTS' }
                }]
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: '❌ There was an error joining the voice channel!',
                ephemeral: true 
            });
        }
    },
};
