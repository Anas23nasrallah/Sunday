import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import io from 'socket.io-client'
import { inject, observer } from 'mobx-react';
import Axios from 'axios';

const socketURL = "http://localhost:3200"
const socket = io(socketURL)


const MY_USER_ID = localStorage['userId'];     //local storage//store
let MY_TEAMS_IDS = [];     //function getTeamId

export default inject('tasksStore', 'user', 'chatStore')(observer(function MessageList(props) {
  
  const chatStore = props.chatStore

  const MY_USER_ID = chatStore.MY_USER_ID     //local storage//store
  let MY_TEAMS_IDS = chatStore.MY_TEAMS_IDS    //function getTeamId
  const [messages, setMessages] = useState([])    //intiate with past msgs from DB sorted by date time
  const [messagesToRender, setMessagesToRender] = useState([])
  let currentTeamDisplayedID = chatStore.currentTeamDisplayedID
  // const [currentTeamDisplayedID, setCurrentTeamDisplayedID] = useState('')


  useEffect(() => {
    getMessages();
  },[])

  useEffect(() => {
    renderMessages();
  },[messages])


  // useEffect(() => {
      //chatStore.setMY_USER_ID()
      //Axios.get('/get all teams for id=MY_USER_ID').then(teams => {
      // MY_TEAMS_IDS = teams.map(t => t.id)

      //chatStore.setMY_TEAMS_IDS(teams.map(t => t.id))       >> maybe ?

      // })
  // },[])


  // useEffect(()=>{
  //   getMessages(currentTeamDisplayedID)       //byteamID
  // },[currentTeamDisplayedID])

  //onclick => chatStore.changeCurrentTeamDisplayedID(newID)           setCurrentTeamDisplayedID(newID)

  //We need to change to b By team id (for the room)
  const getMessages = async (teamID) => {
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
      //Axios.get('/get all team messages from db').then( tempMessages => {
        // setMessages([...tempMessages])
      // })
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


      socket.on('connect', () => {
        console.log('connection')
      })

      socket.on('disconnect', () => {
          console.log('user disconnected');
      });


      const addToMessages = (message) => {
        const newMessages = [...messages]
        const newMessage = {
          id: 11,
          // author: message.id,
          author: message.author,
          // author: 'orange',
          message: message.message,
          timestamp: new Date().getTime()
          // timestamp: message.timestamp,
        }
        newMessages.push(newMessage)
        setMessages(newMessages)
      }

      // const saveToDB = (message) => {
      //   Axios.post('/save new text',message).then(message => {
      //     return message
      //   })
      // }

      socket.on('chat message', (msg) => {
        addToMessages(msg)
      });

      const sendInput = (e,message) => {
        e.preventDefault(); // prevents page reloading
        console.log(MY_USER_ID)
        const messageData = { message:message, author:MY_USER_ID}
        //const messageToDisplayAndSave = await saveToDB(messageData)
        socket.emit('chat message', messageData);
        addToMessages(messageData)
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
          {messagesToRender.map( (m,i) => <div key={i}>{m}</div>)}
          </div>

        <Compose sendInput={sendInput} 
        rightItems={[
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}))