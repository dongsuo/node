var server = require('./server');
var route = require('./route');
var reqHandlers = require('./reqHandlers');

var handle = {};
handle['/start'] = reqHandlers.start;
handle['/upload'] = reqHandlers.upload;
handle['/login'] = reqHandlers.login;
handle['/show'] = reqHandlers.show;

server.start(route.route,handle);
