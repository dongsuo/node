var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require('fs');
var formidable = require("formidable");
var utility = require('utility');
var superagent = require('superagent');
var cheerio = require('cheerio');

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

function test(res,req){
    // console.log(req.url)
    var q = querystring.parse(req.url);
    console.log(q)
    console.log(req.query)
    var md5q = utility.md5(q)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('hello test'+'\n'+md5q)
    res.end();
}

function spider(res,req){

    var result = 'nothing:(';
    superagent.get('https://cnodejs.org').end(function(err,sres){
        if(err){
            console.log(err)
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function(idx,element){
            var $element = $(element);
            items.push({
                title:$element.attr('title'),
                href:$element.attr('href')
            })
        })
        var strTitles = JSON.stringify(items)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('hello spider'+'\n'+ strTitles)
        res.end();
    })
    
}

function newslist(res,req){
    var news;
    superagent.get('http://v.juhe.cn/toutiao/index?type=top&key=76254d54157283ab2ea8bb6fb800af39')
    .end(function(err,sres){
        // console.log(sres);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('hello news'+'\n'+ JSON.stringify(sres))
        res.end();
    })
}

exports.start = start;
exports.login = login;
exports.upload = upload;
exports.show = show;
exports.test = test;
exports.spider = spider;
exports.newslist = newslist;
