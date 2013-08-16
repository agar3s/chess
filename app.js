var connect = require('connect');
var http = require('http');

var app = connect();
var server = http.createServer(app);

var socketServer = require('./server');
socketServer.io(server);

app.use(connect.static('app'));
app.use(connect.favicon());
app.use(connect.logger('dev'));

server.listen(3000);
console.log('server ready on http://localhost:3000');
