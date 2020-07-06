const io = require('../../server').io

module.exports = (socket) => {
    // console.log('Socket id:' + socket.id)

    socket.on('chat message', (msg) => {
        // console.log('msg:' + msg.text)
        // socket.emit('chat message', msg);
        socket.broadcast.emit('chat message', msg);
    });
    
}
