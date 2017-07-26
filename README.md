# discord-woofbot
A chess-playing purple puppy bot for Discord.

## Commands

In a discord server, you may type:

* `woof` to bark at Woofer. Woofer will bark back.
* `bark` to bark at Woofer. Woofer will bark back.
* most bark-like sounds. Woofer will bark back.
* `sleep tight pupper` will cause Woofer to send a picture of itself sleeping.
* `puppy chess [algebraic notation]` will play a move in chess. It will start a game if not already started.
* `puppy chess resign` will resign the ongoing game if exists.
* `puppy chess skip` will skip your turn, and let you switch sides.
* `puppy why` will give a random excuse.
* `puppy weather SF` will give the weather in San Francisco. Substitute SF with any other place on Earth.
* numerous in-jokes.

## Screenshot

![Screenshot](https://lawrence.lu/sc/a342bce8c9.png)

## Dependencies

* [discord.js](https://github.com/hydrabolt/discord.js)
* [chess.js](https://github.com/jhlywa/chess.js)
* [node-uci](https://github.com/ebemunk/node-uci)
* any chess engine, such as [Stockfish](https://stockfishchess.org/), the world's strongest

Woofer relies upon the excellent [fen-to-image.com](http://www.fen-to-image.com/manual) for its chess diagrams. This is a free service so please be courteous and refrain from spamming it with heavy traffic. If you are planning to deploy Woofer in a highly active Discord server, kindly make the necessary adjustments to the source code to avoid spamming fen-to-image.

Likewise, Woofer relies upon the excellent [wttr.in](https://github.com/chubin/wttr.in) for its weather diagrams. This is also a free service so please be courteous and refrain from spamming it with heavy traffic.
