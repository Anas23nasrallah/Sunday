import React, {useEffect, useState} from 'react';
import './Compose.css';

export default function Compose(props) {

  const [input, setInput] = useState('')

  const sendInput = props.sendInput

  const sendMessage = (e) => {
    sendInput(e,input)
    setInput('')
  }

    return (
      <div className="compose">
        <input type="text" className="compose-input" placeholder="Type a message, @name"
          value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={(e)=>sendMessage(e)}>Send</button>
        {
          props.rightItems
        }
      </div>
    );
}


    // return (
    //    <div>
    //        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
    //        <button onClick={sendInput}>Send</button>
    //        Messages:
    //        {messages.map( m => <p>{'User with ID ' +  m.sender + ' says: '+ m.text}</p>)}
    //        <Messenger />
    //    </div>
    // )

        
// export default Chat;

