//cargar DOM
$(document).ready(function (){
//conectarme al servidor
	window.io = io.connect(); 
	
	//cuando este conectado 
	//Never called 
	// io.on('connection', function(socket){
	// 	console.log('hi');
	// 	// enviando mensajes al server
	// 	// generando el evento "Hello"
	// 	io.emit('Hello');
	// });

	io.on('ConnectionMSG', function(data){
	  console.log('hi');
	  //extract the alert from the JSON
      alert(data.hello);
      //1) name of the event to emit
      //2) param 1
	  //3) param 2
      io.emit('answer', "BROADCAS: call the event: ", "answer");
    });
	// //3142155097
	io.on('answer', function(q,a){
      alert(q + " " + a);
      // debugger;
      var nickname = prompt("what is your name?");
      io.emit('question',nickname);
    });

    io.on('question', function(q){
      alert(q + " " + a);
      var nickname = prompt("what is your name?");
      io.emit('question',nickname);
    });
	// io.on('Saludo', function(data){
	// 	// debugger;

	// 	console.log(data);
	// });

	// io.on('log-in', function(data){
	// 	// debugger;
	// 	 $('#users').append('<li>'+data.username+'</li>');
	// });
	// io.on('log-out', function(data){
	// 	// debugger;
	// 	$('#users li').each( function (i, item) {
	// 		if(item.innerText === data.username){
	// 			$(item).remove();
	// 		}
	// 	});
	// });
});