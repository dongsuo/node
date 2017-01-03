var http = require('http');
var url = require('url');

function start(route,handle) {
	function onRequest(req, res) {
		var pathName = url.parse(req.url).pathname;
		
		route(pathName,handle,res,req)
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('Hello World\n');
    }
    var server = http.createServer(onRequest);
    server.listen(1337, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:1337');
}
exports.start = start;
