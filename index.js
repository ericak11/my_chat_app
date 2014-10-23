var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8569;

var usernames = {};

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    socket.broadcast.emit('user joined', {
      username: socket.username,
    });
    console.log(usernames)
  });
});



