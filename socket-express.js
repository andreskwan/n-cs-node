var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

app.use(express.static('./public'));
//what is the difference? between app and server?

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function (req,res){
  	res.render('socket.html');
  	res.end();
});

io.sockets.on('connection', function(client){
	console.log('Client connected...');
	//when client connects send this message
	client.emit('ConnectionMSG', { hello : 'App opened'});

	// listen for answers here
    client.on('answer', function(question, answer){
    	//como se recibe este mensaje?
    	client.broadcast.emit('answer', question, answer);
   		console.log(question + " " + answer);
    });

    //I don't understand this code!!!
    //question is an event send from the client
    //the callback for this event
    //validates
	client.on('question', function(question) {
    	client.get('question_asked', function(err, asked){
    		// debugger;
      		if(!asked){
      			client.set('question_asked', asked);
      			client.broadcast.emit('question', question);
      		}else{
		   		console.log(asked);
      			client.set('question_asked', asked);
      		}
		});
	});
});

server.listen(3001);
