var app    = require('express')();
var server = require('http').createServer(app);
var io     = require('socket.io').listen(server);

io.sockets.on('connection', function(client){
	console.log('Client connected...');
	
	client.on('question', function(question) {
    	client.get('question_asked', function(err, asked){
      		if(!asked){
      			client.set('question_asked', asked);
      			client.broadcast.emit('question', question);
      		}else{
      			client.set('question_asked', asked);
      		}
		});
	});
});

	
	
app.listen(8080);