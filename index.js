var server = require('./server');
var router = require('./router');

server.start(router.route);
server.info();