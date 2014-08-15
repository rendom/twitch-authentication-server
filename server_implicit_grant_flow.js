var http	= require('http'),
	fs		= require('fs'),
	html	= fs.readFileSync('igf.html'),
	port	= 9899;

http.createServer(function(req, res){
	console.log('* Serving page');
	res.writeHead(200,{'Content-Type':'text/html'})
	res.end(html);
}).listen(port);
