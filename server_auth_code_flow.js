var http	= require('http'),
	https	= require('https'),
	url		= require('url'),
	fs		= require('fs'),
	config  = require('./config.js'),
	html	= fs.readFileSync('cf.pr0n'),
	port	= 9899;


var postRequest = function(code, callback){
	var postData =	[
		'client_id='+config.client_id,
		'client_secret='+config.client_secret,
		'grant_type=authorization_code',
		'redirect_uri='+config.redirect_url,
		'code='+code
	].join('&');
	
	var options = {
		host: 'api.twitch.tv',
		port: 443,
		path: '/kraken/oauth2/token',
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
			'Content-Length':postData.length
		}
	};
	var req = https.request(options, function(r){
		r.setEncoding('utf-8');
		r.on('data', function(d){
			callback(false, d);
		});
		r.on('error', callback);
	});
};

http.createServer(function(req, res){
	var requestData = url.parse(req.url, true).query;

	if(requestData.code === undefined ||
	   requestData.code === '' || 
	  !requestData.code.match(/[\w\d]+/)
	){
		console.log('\033[31m*\033[0m 404 Response');
		res.writeHead(404, {
			'Content-Type':'text/plain'
		});
		res.end('404 Not Found\n');
		return;
	}

	postRequest(requestData.code, function(err, data){
		if(err) {
			console.log('\033[31m*\033[0m Error');
			res.writeHead(500, { 'Content-type':'text/plain' }).end('Something went wrong please try again');
			return;
		}else{ 
			res.writeHead(200,{
				'Content-Type':'text/html'	
			});
			var dataObj = JSON.parse(data);
			var page = html.toString();
			page = page.replace('{{token}}', dataObj.access_token);
			res.end(page);	
		}

	});


}).listen(port);
