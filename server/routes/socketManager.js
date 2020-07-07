const io = require('../../server').io

module.exports = (socket) => {
    
    // console.log('Socket id:' + socket.id)

    socket.on('joinRoom', (roomNum) => {
        socket.rooms = {}
        socket.join(roomNum)
        // console.log(roomNum)
    })

    // socket.on('leaveRooms', () => {
    //     socket.rooms = {}
    //   })

    socket.on('chat message', (msg,roomNum) => {
        // console.log('msg:' + msg.text)

        // socket.broadcast.emit('chat message', msg); //this is single room way
        // console.log('room num:' + roomNum)           
        socket.to(roomNum).emit('chat message', msg);           //all the room not sender
    });
    
}
