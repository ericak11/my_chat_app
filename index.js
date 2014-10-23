var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var usernames = {};


app.get('/', function(req, res){
  res.sendfile('index.html');
});


// http.listen(port);
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
http.listen(server_port, server_host);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    // console.log('message: ' + msg);
  });
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    socket.broadcast.emit('user joined', {
      username: socket.username,
    });
  });
});



