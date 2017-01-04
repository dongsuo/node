var fs = require('fs');
var path = require('path');
var mine = require('./mine').types;

function staticHandle(response, pathname) {
    var realPath = path.join("./book", pathname);
    console.log(realPath)
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    console.log(ext)
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' })
            response.write('This Request URL ' + pathname + ' Was Not Found On This Server.');
            response.end();
        } else {
            fs.readFile(realPath, 'binary', function(err, file) {
                    if (err) {
                        console.log(err)
                        response.writeHead('500', { 'Content-Type': 'text/plain' })
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || 'text/plain';
                        console.log(contentType)
                        response.writeHead('200', { 'Content-Type': contentType });
                        response.write(file, 'binary');
                        response.end()
                    }
                })
        }
                        // fs.stat(realPath,function(err,stat){

    })
}

exports.staticHandle = staticHandle;
