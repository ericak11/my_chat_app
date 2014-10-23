var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var usernames = {};

app.get('/', function(req, res){
  res.sendFile('index.html');
});

http.listen(port);

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



