var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 88
var cacheData = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

 app.get(/^(.+)$/, function(req, res){
     res.sendFile(__dirname + '/html' + req.params[0]);
 });

 http.listen(port, function(){
  console.log('listening on *:' + port);
});

// User connection
io.on('connection', function(socket){
  console.log('User Connected');
  
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  
  socket.on('', function(nick, pin, pass){
  });

  socket.on('', function(nick, pin, pass){
  });

  socket.on('', function(nick, pin, pass){
  });

  socket.on('', function(nick, pin, pass){
  });

  socket.on('', function(nick, pin, pass){
  });
});

