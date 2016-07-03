# discord-woofbot
A chess-playing purple puppy bot for Discord.

## Commands

In a discord server, you may type:

* `woof` to bark at woofbot. Woofbot will bark back.
* `bark` to bark at woofbot. Woofbot will bark back.
* `sleep tight pupper` will cause woofbot to send a picture of itself sleeping.
* `puppy chess [algebraic notation]` will play a move in chess. It will start a game if not already started.
* `puppy chess resign` will resign the ongoing game if exists.
* `puppy why` will give a random excuse.

Right now, you can only play as white and woofbot will always play as black.

## Screenshot

![Screenshot](http://i.imgur.com/97SXUQA.png)

## Dependencies

* [discord.js](https://github.com/hydrabolt/discord.js)
* [stockfish.js](https://www.npmjs.com/package/stockfish)
* [chess.js](https://github.com/jhlywa/chess.js)

Woofbot relies upon the excellent [fen-to-image.com](http://www.fen-to-image.com/manual) for its chess diagrams. This is a free service so please be courteous and refrain from spamming it with heavy traffic. If you are planning to deploy woofbot in a highly active Discord server, kindly make the necessary adjustments to the source code to avoid spamming fen-to-image.
