var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require('fs');
var formidable = require("formidable");

function start(res) {
    console.log('function start called');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="multipart/form-data; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    res.write(body)
    res.end();

}

function login(res) {
    console.log('function login callled');
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('hello login')
    res.end();
}

function upload(res, request) {
    var form = new formidable.IncomingForm();
    form.uploadDir='tmp';
    form.parse(request, function(error, fields, files) {
    	console.log('files'+files)
        fs.renameSync(files.upload.path, 'tmp/test.jpg');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<div>' +
            '上传成功：' + 
            '<img src="/show"/>'

        '</div>' +
        '</body>' +
        '</html>';
        res.write(body)
        res.end();
    })

}

function show(res, postData) {
    fs.readFile('tmp/test.jpg', 'binary', function(err, file) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.write(err + '\n')
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpg' })
            res.write(file, 'binary')
            res.end();
        }
    })
}

exports.start = start;
exports.login = login;
exports.upload = upload;
exports.show = show;
