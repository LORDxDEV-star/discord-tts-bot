# Discord TTS Bot 🎙️

A feature-rich Discord Text-to-Speech bot that reads messages with user attribution. Built with Discord.js v14.

## Features ✨

- Text-to-Speech in voice channels
- User attribution (announces who sent the message)
- Channel-specific TTS
- Slash commands and prefix commands support
- Dynamic status messages
- Professional embed messages
- Error handling

## Commands 🛠️

| Command | Description |
|---------|-------------|
| `/join` or `-join` | Join a voice channel and activate TTS |
| `/leave` or `-leave` | Leave the voice channel and stop TTS |

## Setup 🚀

1. Clone the repository
```bash
git clone https://github.com/LORDxDEV-star/discord-tts-bot.git
cd discord-tts-bot
```

2. Install dependencies
```bash
npm install
```

3. Configure the bot
- Rename `config.example.json` to `config.json`
- Add your bot token and client ID
- Customize prefix and status messages if desired

4. Run the bot
```bash
node index.js
```

## Requirements 📋

- Node.js v16.9.0 or higher
- Discord.js v14
- FFmpeg

## Dependencies 📦

- discord.js
- @discordjs/voice
- discord-tts
- @discordjs/opus
- libsodium-wrappers
- ffmpeg-static

## Support 💖

Join our Discord server for support and updates:
[Lunar Developments](https://discord.gg/lunardevs)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits 🙏

Created by Lunar Developments
Support Server: [Join Here](https://discord.gg/lunardevs)

## Contributing 🤝

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---
Made with ❤️ by Lunar Developments
