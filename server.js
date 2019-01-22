var server = require('http').Server(),
	io = require('socket.io')(server),
	Redis = require('ioredis'),
	redis = new Redis();

redis.subscribe('notifications');

redis.on('message',function(channel,message){
	message = JSON.parse(message);
	io.emit('notifications',message);
});

io.on("connection",function(socket){
	console.log("A user has been connected");
	
});

server.listen(3000);

