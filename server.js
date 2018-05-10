var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Socket server ready!!!");

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

var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(8080);

