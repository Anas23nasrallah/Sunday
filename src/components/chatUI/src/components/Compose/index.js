import React, {useEffect, useState} from 'react';
import './Compose.css';

export default function Compose(props) {

  const [input, setInput] = useState('')

  // const userInfo = {
  //   userID:localStorage['userId'],
  //   userName: props.user.firstName + ' ' + props.user.lastName          //having problem with user store?
  // }

  const sendInput = props.sendInput

    return (
      <div className="compose">
        <input type="text" className="compose-input" placeholder="Type a message, @name"
          value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={(e)=>sendInput(e,input)}>Send</button>
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

