import React, {useEffect} from 'react';
import shave from 'shave';
import io from 'socket.io-client'
import './ConversationListItem.css';
import { observer, inject } from 'mobx-react';

const socketURL = "http://localhost:3200"
const socket = io(socketURL)

export default inject('tasksStore', 'user', 'chatStore')(observer(function ConversationListItem(props) {
  
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })


  const { photo, name, text, id } = props.data;
  const smileyURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwHl3CqnmdRLzFDr5ZtpWEt8qq2MiHUetfww&usqp=CAU'

    const changeCurrentTeamDisplayedID = () => {
      props.chatStore.changeCurrentTeamDisplayedID(id)
      socket.emit('leaveRooms')    //leave old room
      socket.emit('joinRoom',id)      //when entering a new room = change of teamdisplayed
    }

    
    return (
      <div className="conversation-list-item" onClick={changeCurrentTeamDisplayedID} style={props.chatStore.currentTeamDisplayedID===id? {color:'white', background:'#057afb'} : null}>
        <img className="conversation-photo" src={smileyURL} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          {/* <p className="conversation-snippet">{ text }</p> */}
        </div>
      </div>
    );
}))