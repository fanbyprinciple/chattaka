var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket){
    console.log("A user connected");
    var username ='anonymous';
    var message = "";
    socket.on('chat message', function(msg){
        message = username +' :'+ msg;
        io.emit(message);
        console.log(message);
    });
    socket.on('username', function(name){
        username = name;
        console.log(username + " has entered the chatroom");
    })
    socket.on('disconnect', function(){
        message = username + ' disconnected';
        io.emit(message);
        console.log(message);
    });
});

http.listen(3000, function(){
	console.log("listening on port 3000.");
});