var express = require('express');//
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

app.use(express.static('./public'));
//what is the difference? between app and server?

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function (req,res){
  	res.render('socket');
  	res.end();
});

io.sockets.on('connection', function(client){
	console.log('Client connected...');
	client.emit('messages', { hello : 'Hello Socket.io'});

	// listen for answers here
    client.on('answer', function(question, answer){
    	client.broadcast.emit('answer', question, answer);
    });

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

server.listen(3000);