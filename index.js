var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Initialize application with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../chatApp', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){ 
  console.log("connection");
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
    console.log("chatMessage");
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});
// Listen application request on port 3000
// Listen application request on port 3000
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});