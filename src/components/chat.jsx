import React from 'react';
import io from 'socket.io-client'
import { useState } from 'react';
import { useEffect } from 'react';

const socketURL = "http://localhost:3200"
const Chat = inject('tasksStore', 'user')(observer((props) => {
    
    const [socket,setSocket] = useState(null)
    // const [userID,setUserID] = useState(localStorage['userId'])
    // const [userName,setUserName] = useState(props.user.firstName + ' ' + props.user.lastName)

    const userInfo = {
        userID:localStorage['userId'],
        userName: props.user.firstName + ' ' + props.user.lastName
    }

    const initSocket = () => {
        const socket = io(socketURL)
        socket.on('connect', () => {
            console.log('connection')
        })
    }

    useEffect(initSocket,[])

    return (
       <div>
           chat
       </div>
    )
}))
        
export default Chat;

