var querystring = require("querystring");
var url = require('url');

function callback(req){
	var query = url.parse(req.url).query;
    var callback = querystring.parse(query);
    return callback.callback;
}

exports.callback = callback;