var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Soket server ready!!!");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection : ' + socket.id);

    socket.on('mouse', mousing);

    function mousing(data){
        //console.log(socket.id, data.x, data.y);
        socket.broadcast.emit('mouse',data); // sent to all OTHER sockets
        //io.sockets.emit('mouse',data); // used to send to ALL socket sincluding self
    }
}

