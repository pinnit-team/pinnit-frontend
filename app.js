var app = require('express')();
var http = require('http').createServer(app);
var port = 8080;
var path = require('path');
var io = require('socket.io')(http);

var htmlPath = path.join(__dirname, 'html');


app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/chat.html');
});

io.on('connection', function(socket){
    console.log('New User Connected');
    socket.emit("Welcome to Pinnit");

    socket.on('disconnect', function(){
        console.log("User Disconnected");
    });

    socket.on('message', function(msg){
        console.log("Recieved Msg:" + msg);
        io.emit('message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on:' + port);
});
