var connect = require('connect'),
    http = require('http'),
    ws = require('ws');

var WebSocketServer = ws.Server, 
    wss = new ws.Server({port: 8080});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});

connect()
    .use(connect.static('app'))
    .listen(3000);
console.log('server ready on http://localhost:3000');
