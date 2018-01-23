var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis')
var redisClient = redis.createClient(6379, 'redis');
var redisSubscribe = redis.createClient(6379, 'redis');
var authSubscribe = redis.createClient(6379, 'redis');
var redisPublish = redis.createClient(6379, 'redis');
var uuid = require('node-uuid');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var connections = {};
var conversations = {};

io.on('connection', function(socket){
    console.log('client connected')
    console.log(socket.id)

    connections[socket.id] = socket;

    socket.emit('chat message', {
        message: "welcome, your id is " + socket.id,
    });

    socket.emit('meta', {
        socketId:socket.id,
        action: 'connected',
    })

  socket.on('chat message', function(msg){
    try{
        var data = JSON.parse(msg);
        console.log(data);
        io.emit('chat message', msg);

    }catch(e){
        console.log(e);
    }
  });
  socket.on('disconnect', (reason) => {
    connections[socket.id] = null;
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

redisClient.on('connect', () => {
    console.log('connected to redis')
})

redisSubscribe.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    if (message === 'quit') {
        redisSubscribe.unsubscribe();
        redisSubscribe.quit();
        redisPublish.quit();
    }

    var obj = null;
    var msg = message;
    var sockets = Object.keys(connections);
    try {
        console.log('attemtping to parse json')
        obj = JSON.parse(message);
        msg = obj.message;
        if(obj.id){
            sockets = obj.id;
        }
    } catch (e){
        console.log(e)
    }



    sockets.forEach(id => {
        if(connections[id])
            connections[id].emit('chat message', msg);
    });
});

authSubscribe.on('message', (channel, message) => {
    try {
        var data = JSON.parse(message);
        var socketId = data.socketId;
        var socket = connections[socketId];
        if(!socket) return;

        var conversationId = data.conversation;

        conversations[conversationId].push({
            socket: socketId,
            user: data.userId,
        })

        socket.emit('meta', {
            socketId:socket.id,
            action: 'authenticated',
            conversation: {
                id: conversationId,
                participants: conversations[conversationId].map(member => member.user),
            }
        })

        socket.emit('chat message', {
            message: 'you have been added to converstation: ' + converstationId,
        });
    } catch(e){
        console.log(e)
    }
});

redisSubscribe.subscribe("chat");
authSubscribe.subscribe('authentication');