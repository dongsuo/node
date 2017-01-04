var server = require('./server');
var route = require('./route');
var reqHandlers = require('./reqHandlers');

var handle = {};
handle['/start'] = reqHandlers.start;
handle['/upload'] = reqHandlers.upload;
handle['/login'] = reqHandlers.login;
handle['/show'] = reqHandlers.show;
handle['/test/'] = reqHandlers.test;
handle['/spider'] = reqHandlers.spider;
handle['/newslist'] = reqHandlers.newslist;
handle['/getBookCatalog'] = reqHandlers.getBookCatalog;
handle['/getBookInfo'] = reqHandlers.getBookInfo;


server.start(route.route,handle);
