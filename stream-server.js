var fs = require('fs');
var http = require('http');

http.createServer(function(req,res){
	//just to write, not for read
	var newFile 	= fs.createWriteStream("readme_copy.md");
	var fileBYtes 	= req.headers['content-length'];
	var uploadBytes = 0;

	//don't work without it
	req.pipe(newFile);

	req.on('data', function(chunk){
		uploadBytes += chunk.length;
		var progress = (uploadBytes / fileBYtes) * 100;
		res.write("progress: "+ parseInt(progress, 10) + "%\n");

		
	});
	req.on('end', function(){
		res.end();
	});
}).listen(3000);