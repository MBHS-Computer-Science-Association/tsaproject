var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 80

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

 app.get(/^(.+)$/, function(req, res){
     res.sendFile(__dirname + '/html' + req.params[0]);
 });


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',msg);
    io.emit('notification', getMockNotif());
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

function getMockNotif() {
  return {
    date: "2 days ago",
    summary: "Donald Trump became President",
    imgurl: "http://static4.businessinsider.com/image/56c640526e97c625048b822a-480/donald-trump.jpg",
    likes: 3
  };
}
