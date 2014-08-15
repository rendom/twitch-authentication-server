var config = require('./config.js');

var endpoint = "https://api.twitch.tv/kraken/oauth2/authorize";
var params = [
	"response_type=token",
	"client_id="+config.client_id,
	"redirect_uri="+config.redirect_uri,
	"scope=user_read+user_follows_edit"
].join('&');

var url = endpoint+"?"+params;

console.log(url);

