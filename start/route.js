var path = require('path');
var staticHandle = require('./staticHandle');

function route(pathname,handle,res,request) {
	if (pathname === '/') {
        pathname = "/index.html"; //默认页面
    }
	// console.log(pathname)
	var ext = path.extname(pathname)
	// console.log('ext'+ext.length)
	if (typeof(handle[pathname]) === 'function') {
		handle[pathname](res,request);
	}else if(ext.length > 0){
		staticHandle.staticHandle(res,pathname)
	}
	else{
		console.log("No request handler found for " + pathname);
	}
}
exports.route = route;