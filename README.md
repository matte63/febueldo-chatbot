# Febueldo

## Overview

Given a list of channels this bot starts sending a <3 every `N` minutes ~~and replies to `ciao` with `ciao <3`.~~

The bot also replies to some keywords.

### Get Environment Variables

To start, you’ll need three environment variables:

| _Variable_        | _Description_                                                                                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_USERNAME`    | The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate.                                                 |
| `CHANNEL_LIST`    | The Twitch channel name list where you want to run the bot. _Separate channel names with a single space._                                                                                                                                                                                 |
| `OAUTH_TOKEN`     | The token to authenticate your chatbot with Twitch's servers. Generate this with [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string. |
| `TIMEOUT_SECONDS` | The interval in seconds between one message and another. _To avoid spam the minimum value is set to 30 ._                                                                                                                                                                                 |
| `ON_START`        | The toggle that determines if the chatbot should start sending messages as soon as it is started. It is a boolean variable that accepts `true` or `false` values. Default is `false`.                                                                                                     |
| `REPLIES`         | The toggle that activates the auto replies to certain keywords. It is a boolean variable that accepts `true` or `false` values. Default is `false`.                                                                                                                                       |
| `MIN_INTERVAL`    | The minimum interval at witch the bot responds. _To avoid spam the minimum value is set to 30 s._                                                                                                                                                                                         |
| `FRY_USERNAME`    | Fry username.                                                                                                                                                                                                                                                                             |

### Running the bot

1. To start with this template, click the Remix button in the upper right.

2. Glitch automatically installs Node and Tmi.js for us.

3. Add the environmental vars in our [`.env`](https://glitch.com/edit/#!/febueldo?path=.env:1:0) file.

4. View the code in `bot.js`.

5. Your chatbot is ready to run! Glitch automatically deploys & runs each version. View the status button to ensure there are no errors.

6. Try the chatbot! ~~Interact with your channels by trying the `ciao` command.~~

**Note**: This bot connects to the IRC network as a client and isn't designed to respond over HTTP. If you click "Show Live" you will see a simple "Hello World"

#### Made with <3 by [m_tte63](https://twitch.tv/m_tte63/)

Hours wasted on this project: `8`
