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
        message = username +' : '+ msg;
        // io.sockets.emit(message);
        io.sockets.emit('broadcast',{ description: message });
        console.log(message);
    });

    socket.on('username', function(name){
        username = name;
        message = username + " has entered the chatroom";
        console.log(message);
        io.sockets.emit('userenter' , {description : message});
    })

    socket.on('disconnect', function(){
        message = username + ' disconnected';
        io.sockets.emit('userexit',{ description: message });
        console.log(message);
    });
});

http.listen(3000, function(){
	console.log("listening on port 3000.");
});