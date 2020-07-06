import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import io from 'socket.io-client'
import { inject, observer } from 'mobx-react';

const socketURL = "http://localhost:3200"
const socket = io(socketURL)


const MY_USER_ID = 'apple';     //local storage//store
const MY_TEAMS_IDS = [];     //function getTeamId


export default inject('tasksStore', 'user')(observer(function MessageList(props) {
  
  const [messages, setMessages] = useState([])    //intiate with past msgs from DB sorted by date time
  const [messagesToRender, setMessagesToRender] = useState([])
  const [currentTeamDisplayed, setCurrentTeamDisplayed] = useState('')

  useEffect(() => {
    getMessages();
  },[])

  useEffect(() => {
    renderMessages();
  },[messages])


  // useEffect(() => {
  //   getUserTeamsIDS(MY_USER_ID);
  // },[])

  // const getUserTeamsIDS(userID)=>{
  //   MY_TEAMS_IDS = ['TeamIDS']
  // }

  // useEffect(()=>{
  //   getMessages(currentTeamDisplayed)       //byteamID
  // },[currentTeamDisplayed])

  //onclick => setCurrentTeamDisplayed(newID)


  //We need to change to b By team id (for the room)
  const getMessages = () => {
     var tempMessages = [
        {
          id: 1,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 2,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 3,
          author: 'orange',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 4,
          author: 'apple',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 5,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 6,
          author: 'apple',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 7,
          author: 'orange',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 8,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 9,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 10,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
      ]
      setMessages([...messages, ...tempMessages])
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    setMessagesToRender(tempMessages)
  }

      // const [messages, setMessages] = useState([])        //intiate with past msgs from DB sorted by date time
      // const messages=props.messages
      // const setMessages=props.setMessages

      socket.on('connect', () => {
        console.log('connection')
      })

      socket.on('disconnect', () => {
          console.log('user disconnected');
      });


      const addToMessages = (msg) => {
        const msgs = [...messages]
        const newMsg = {
          id: 11,
          // author: msg.sender,
          author: 'orange',
          message: msg.text,
          timestamp: new Date().getTime()
        }
        // console.log(socket)
        msgs.push(newMsg)
        setMessages(msgs)
      }

      socket.on('chat message', (msg) => {
        addToMessages(msg)
      });

      const sendInput = (e,msg) => {
        const msgData = {text:msg, sender:localStorage['userId']}
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', msgData);
        addToMessages(msgData)
        //2DO >> save to db function
        return false;
      }

    return(
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">
          {/* {renderMessages()} */}
          {messagesToRender.map( m => <div>{m}</div>)}
          </div>

        <Compose sendInput={sendInput} 
        rightItems={[
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}))