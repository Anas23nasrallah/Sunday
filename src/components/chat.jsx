import React from 'react';
import io from 'socket.io-client'
import { useState } from 'react';
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const socketURL = "http://localhost:3200"
const Chat = inject('tasksStore', 'user')(observer((props) => {
    
    // const [socket,setSocket] = useState(null)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])        //intiate with past msgs from DB sorted by date time

    const userInfo = {
        userID:localStorage['userId'],
        userName: props.user.firstName + ' ' + props.user.lastName          //having problem with user store?
    }

    const socket = io(socketURL)

    socket.on('connect', () => {
        console.log('connection')
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', function(msg){
        const msgs = [...messages]
        msgs.push(msg)
        setMessages(msgs)
    });
    
    // const initSocket = () => {
    // }
    // useEffect(initSocket)

    const sendInput = (e) => {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', {text:input, sender:localStorage['userId']});
        // console.log(input)
        return false;
    }

    return (
       <div>
           <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
           <button onClick={sendInput}>Send</button>
           Messages:
           {messages.map( m => <p>{'User with ID ' +  m.sender + ' says: '+ m.text}</p>)}
       </div>
    )
}))
        
export default Chat;

