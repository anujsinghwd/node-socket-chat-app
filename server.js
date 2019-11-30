const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){
    console.log(socket.username);    
    // Default UserName
    socket.username = 'Anonymous';

    // UserName Change Req.
    socket.on('change_username', (data) => socket.username = data.username);

    socket.on('chat message', function(msg){
        io.emit('chat message', {message: msg, username: socket.username});
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(6001, function(){
    console.log('listening on *:6001');
});