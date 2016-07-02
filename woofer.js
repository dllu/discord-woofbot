var Discord = require('discord.js');
var Stockfish = require('stockfish');
var Chess = require('chess.js').Chess;

var puppy = new Discord.Client();

var chesses = {};
var stockfishes = {};
var chessmsg = {};
var thinking = {};

var CHESS = 'puppy chess';
var DEPTH = 3;

var SIDENAMES = {w:'Black', b:'White'};

function end_game(id, resign) {
    if(chesses[id] === undefined) return;
    var winner;
    if(resign) {
        winner = 'Black wins by resignation!';
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
    puppy.reply(chessmsg[id], 'http://i.imgur.com/w4TR9IT.png Game over: ' + winner);
    delete chesses[id];
    delete stockfishes[id];
    delete thinking[id];
}

function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/' + chesses[id].fen().split(' ')[0];
}


puppy.on('message', function(message) {
    if(message.content === 'woof') {
        var s = 'woof';
        if(Math.random() < 0.01) {
            s += ' http://i.imgur.com/49ZT1dG.png';
        }
        puppy.reply(message, s);
    } else if(message.content === 'bark') {
        puppy.reply(message, 'bark');
    } else if(message.content === 'sleep tight pupper') {
        puppy.reply(message, 'http://i.imgur.com/ZbkyEk8.png');
    } else if(message.content.indexOf(CHESS) === 0) {
        var id = message.author.id + '!?#' + message.server.id;
        chessmsg[id] = message;
        if(chesses[id] === undefined) {
            chesses[id] = new Chess();
            thinking[id] = false;
            stockfishes[id] = Stockfish();
            stockfishes[id].postMessage('setoption name Contempt value 1');
            stockfishes[id].postMessage('setoption name King Safety value 1');
            stockfishes[id].postMessage('setoption name Skill Level value 20');
            stockfishes[id].postMessage('ucinewgame');
            stockfishes[id].postMessage('isready');
            stockfishes[id].onmessage = function(event) {
                console.log(event);
                var line;
                if(event && typeof event === 'object') {
                    line = event.data;
                } else {
                    line = event;
                }
                var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                if(match) {
                    var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
                    puppy.reply(chessmsg[id], get_fen_img(id) + '  ' + m.san);
                    thinking[id] = false;
                    if(chesses[id].game_over()) {
                        end_game(id, false);
                    }
                }
            }
        }
        var move = message.content.substring(CHESS.length + 1);
        if(move === 'resign') {
            end_game(id, true);
            return;
        }
        if(thinking[id] === true) {
            puppy.reply(chessmsg[id], "I'm still thinking...");
            return;
        }
        if(chesses[id].move(move, {sloppy: true}) === null) {
            puppy.reply(chessmsg[id], 'Woof! Illegal move!');
            return;
        }
        thinking[id] = true;
        stockfishes[id].postMessage('position fen ' + chesses[id].fen());
        stockfishes[id].postMessage('go depth ' + DEPTH);
        if(chesses[id].game_over()) {
            end_game(id, false);
        }
    }
});

puppy.loginWithToken(/* INSERT YOUR TOKEN HERE */);

