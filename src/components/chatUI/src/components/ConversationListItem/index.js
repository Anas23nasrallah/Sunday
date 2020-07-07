import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';
import { observer, inject } from 'mobx-react';

export default inject('tasksStore', 'user', 'chatStore')(observer(function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    const { photo, name, text, id } = props.data;
    const smileyURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwHl3CqnmdRLzFDr5ZtpWEt8qq2MiHUetfww&usqp=CAU'
    
    return (
      <div className="conversation-list-item" onClick={()=>props.chatStore.changeCurrentTeamDisplayedID(id)}>
        <img className="conversation-photo" src={smileyURL} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          {/* <p className="conversation-snippet">{ text }</p> */}
        </div>
      </div>
    );
}))