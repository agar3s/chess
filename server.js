var socket = require('socket.io');
exports.io = function(server){
  var io = socket.listen(server);

  io.sockets.on('connection', function (socket) {
    socket.on('action', function (data) {
      console.log(data);
    });
  });
}