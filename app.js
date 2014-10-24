
var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
// var port = process.env.PORT || 3000;
var usernames = {};


app.get('/', function(req, res){
  res.sendfile('index.html');
});


// http.listen(port);
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host);

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
     socket.broadcast.emit('add user', username);
    // socket.broadcast.emit('user joined', {
    //   username: socket.username,
    // });
  });
  socket.on('disconnect', function (username) {
    console.log(socket.username);
    socket.broadcast.emit('user left', socket.username);
    delete usernames[socket.username];

  });
});



