const io = require('../../server').io

module.exports = function(socket){
    console.log('Socket id:' + socket.id)

    socket.on('chat message', (msg) => {
        socket.emit('chat message', msg);
    });
    
}
