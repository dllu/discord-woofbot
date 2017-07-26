var Discord = require('discord.js');
var Chess = require('chess.js').Chess;
var why = require('./why.js');
const Engine = require('node-uci').Engine

const stockfish = new Engine('/home/dllu/stockfish-8-linux/Linux/stockfish_8_x64_modern');
stockfish.init();
stockfish.setoption('MultiPV', 3);

var puppy = new Discord.Client({autoReconnect: true});

var chesses = {};
var chessmsg = {};
var thinking = {};
var MOVETIME = 300;

var CHESS = 'puppy chess';
var WEATHER = 'puppy weather';

var SIDENAMES = {w:'Black', b:'White'};

function strip(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function end_game(id, resign, quiet) {
    if(chesses[id] === undefined) return;
    if(!quiet) {
        var winner;
        if(resign) {
            winner = SIDENAMES[chesses[id].turn()] + ' wins by resignation!';
        } else if(chesses[id].in_checkmate()) {
            winner = SIDENAMES[chesses[id].turn()] + ' wins by checkmate!';
        } else if(chesses[id].in_stalemate()) {
            winner = 'Draw by stalemate!';
        } else if(chesses[id].in_threefold_repetition()) {
            winner = 'Draw by threefold repetition!';
        } else if(chesses[id].insufficient_material()) {
            winner = 'Draw by insufficient material!';
        } else if(chesses[id].in_draw()) {
            winner = 'Draw!';
        }
        chessmsg[id].reply('http://i.imgur.com/w4TR9IT.png Game over: ' + winner + 
                '\n' + chesses[id].pgn({newline_char: '\n'}));
    }
    console.log('Chess game end: ', chessmsg[id].author.username, chessmsg[id].channel.name);
    delete chesses[id];
    delete thinking[id];
}

function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
    /*
     * apparently discord font is not truly monospace so chess characters are wider
     var s = chesses[id].ascii();
     var chess_characters = {
r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
};
for(var c in chess_characters) {
var re = new RegExp(c, 'g');
s = s.replace(re, chess_characters[c]);
}
s = s.replace(/^/g,'`');
s = s.replace(/$/g,'`');
return s;
     */
    }

var awoore = /^aw(o|0)+$/;
var garurure = /^garu(ru)+~?$/;
var woofwoofre = /^a?(w(u|a|o|0)+r?f+ ?)+$/;
var barkre = /^(b(o|a|(jö))rk ?)+/;
var gavre = /^(гав( |-)?)+$/;
var wangre = /^汪+$/;


puppy.on('message', function(message) {
        var msg = strip(message.content);
        if (message.author.id === puppy.user.id) {
            return;
        }
        var pp = '165886688625819649';
        var umsg = msg.toLowerCase();
        if(message.isMentioned(puppy.user)) {
            if(msg.indexOf('help') !== -1) {
                message.reply('Valid commands are: `woof`, `bark`, `sleep tight pupper`, `puppy chess [algebraic chess notation]`, `puppy chess resign`, `puppy why`');
            } else if(msg.indexOf('do you love me?') !== -1) {
                if(message.author.id === pp) {
                    message.reply('Yes master! ❤');
                } else {
                    message.reply('Sometimes...');
                }
            } else if (umsg.indexOf('woof if ') !== -1) {
                return;
            } else {
                message.reply('woof');
            }
        }

        if (message.author.id === pp) {
            if (umsg === 'ruff') {
                //message.reply('indeed, the Weierstrass function is pretty ruff. http://dllu.net/sc/ruff.gif');
                message.reply('the Weierstrass function, \\sum_{n=0}^\\infty a^n \\cos(b^n \\pi x), where 0 < a < 1 and b is a positive odd integer, has the remarkable property of being continuous everywhere but differentiable nowhere, making it a very ruff function indeed.');
                return;
            } else if (umsg === 'disappointed') {
                message.reply('https://www.youtube.com/watch?v=cdEQmpVIE4A');
                return;
            }
        }
        if (umsg === 'sudo woof') {
            if (message.author.id === pp) {
                message.reply('# woof');
            } else {
                message.reply(message.author.username + ' is not in the sudoers file.   This incident will be reported.');
            }
        } else if (umsg.search(woofwoofre) !== -1 ||
                umsg.search(garurure) !== -1 ||
                umsg.search(barkre) !== -1 ||
                umsg === 'arf' ||
                umsg === 'yip' ||
                umsg === "l'aboiement" ||
                umsg === 'ouaf' ||
                umsg.search(awoore) !== -1 ||
                umsg.search(gavre) !== -1 ||
                umsg.search(wangre) !== -1
                ) {
            var s = msg;
            if(Math.random() < 0.05 || message.author.id === pp && Math.random() < 0.2) {
                s += ' http://i.imgur.com/49ZT1dG.png';
            }
            message.reply(s);
        } else if(umsg.search(woofwoofre) !== -1) {
            var numwoofs = ~~((umsg.length + 1)/5);
            message.reply('woof^' + numwoofs);
        } else if (umsg === 'meow' || umsg === 'nya~') {
            if (Math.random() < 0.1 || message.author.id === pp && Math.random() < 0.3) {
                message.reply(msg);
            }
        } else if (umsg === 'subwoof') {
            message.reply('ʷᵒᵒᶠ');
        } else if(umsg === 'sleep tight pupper') {
            message.reply('http://i.imgur.com/ZbkyEk8.png');
        } else if (umsg == 'puppy why') {
            message.reply(why.why());
        } else if(umsg == 'pupper why') {
            message.reply(why.why());
            if (Math.random() < 0.3) {
                setTimeout(function() {
                        message.reply("also, it's puppy, not pupper");
                        }, 100);
            }
        } else if(umsg.indexOf(WEATHER) === 0) {
            var where = strip(umsg.substring(WEATHER.length + 1)).replace(/ /g, '+');
            if (where == 'redwood+city' && Math.random() < 0.2) {
                message.reply('http://i.imgur.com/ZOjoeQ6.png');
                return;
            }
            message.reply('http://wttr.in/' + where + '_0tqp_lang=en_t_m.png?' + Date.now());
        } else if(umsg.indexOf(CHESS) === 0) {
            var id = message.author.id + '!?#' + message.channel.id;
            chessmsg[id] = message;
            if(chesses[id] === undefined) {
                chesses[id] = new Chess();
                console.log('Chess game: ', message.author.username, message.channel.name);
                thinking[id] = false;
            }
            var move = strip(msg.substring(CHESS.length + 1));
            if(move === 'resign') {
                end_game(id, true, false);
                return;
            }
            if(thinking[id] === true) {
                puppy.reply(chessmsg[id], "I'm still thinking...");
                return;
            }
            if(move !== 'skip' && chesses[id].move(move, {sloppy: true}) === null) {
                chessmsg[id].reply('Woof! Illegal move! Valid moves are: ' + chesses[id].moves().join(', ') + 
                        '\n' + get_fen_img(id));
                return;
            }

            const chain = stockfish.chain()
                .position(chesses[id].fen())
                .go({depth: 5})
                .then(function(result) {
                        var match = result.bestmove.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?/);
                        if(match) {
                            var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
                            chessmsg[id].reply(m.san + '\n' + get_fen_img(id));
                            thinking[id] = false;
                            if(chesses[id].game_over()) {
                                end_game(id, false, false);
                            }
                        }
                    });
            thinking[id] = true;
            if(chesses[id].game_over()) {
                end_game(id, false, false);
            }
        } else if (umsg === 'sux') {
            message.reply('ur face sux');
        } else if (umsg === 'sax') {
            message.reply(':saxophone:');
        }
});

puppy.login(/* INSERT YOUR TOKEN HERE */);
console.log(puppy)
