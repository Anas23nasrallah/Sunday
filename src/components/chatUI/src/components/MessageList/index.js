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


// const MY_USER_ID = localStorage['userId'];     //local storage//store
// let MY_TEAMS_IDS = [];     //function getTeamId

export default inject('tasksStore', 'user', 'chatStore')(observer(function MessageList(props) {
  
  const chatStore = props.chatStore
  const userStore = props.user
  const MY_USER_ID = chatStore.MY_USER_ID     //local storage//store
  let MY_TEAMS_IDS = chatStore.MY_TEAMS_IDS    //function getTeamId
  // let MY_USER_NAME = userStore.firstName + ' ' + userStore.lastName
  let MY_USER_NAME = 'Eitan Gueron'
  const [messages, setMessages] = useState([])    //intiate with past msgs from DB sorted by date time
  const [messagesToRender, setMessagesToRender] = useState([])
  let currentTeamDisplayedID = chatStore.currentTeamDisplayedID 
  let teamName = chatStore.teamName
  // let currentTeamDisplayedID = 2    //hard codded rn

  // const [currentTeamDisplayedID, setCurrentTeamDisplayedID] = useState('')

  //might occur errors-not sure if need to exit before entering a new one
  //onclick => chatStore.changeCurrentTeamDisplayedID(newID)           setCurrentTeamDisplayedID(newID)

  useEffect(() => {
    getMessages(currentTeamDisplayedID);
  },[])

  useEffect(() => {
      chatStore.setMY_USER_ID()
      Axios.get(`http://localhost:3200/teams/${MY_USER_ID}`).then(teams => {
        console.log(teams)
      chatStore.setMY_TEAMS_IDS(teams.data.map(t => t.teamId))       
      chatStore.changeCurrentTeamDisplayedID(chatStore.MY_TEAMS_IDS[0])         //until side will b available
      })
  },[])
  
  useEffect(() => {
    renderMessages();
  },[messages])


  useEffect(()=>{
    socket.emit('joinRoom',currentTeamDisplayedID)   
    getMessages(currentTeamDisplayedID)       //byteamID
    chatStore.getTeamName()
  },[currentTeamDisplayedID])


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
      Axios.get(`http://localhost:3200/teamschat/${currentTeamDisplayedID}`).then( pastMessages => {
        // console.log(pastMessages.data)
        setMessages([...pastMessages.data])
      })
      // setMessages([...messages, ...tempMessages])
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author == MY_USER_ID;
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
          // authorName={current.author}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    setMessagesToRender(tempMessages)
  }


      socket.on('connect', () => {
        socket.emit('joinRoom',currentTeamDisplayedID)      //when entering a new room = change of teamdisplayed
        console.log('connection to room: '+currentTeamDisplayedID)
      })

      socket.on('disconnect', () => {
          console.log('user disconnected');
      });


      const addToMessages = (message) => {
        const newMessages = [...messages]
        const newMessage = {
          id: message.id,
          author: message.authorid,
          authorname: message.author,
          message: message.message,
          timestamp: message.timestamp,
        }
        newMessages.push(newMessage)
        setMessages(newMessages)
      }

      const saveToDB = async (message) => {
        Axios.post(`http://localhost:3200/teamschat`,message).then( res => {
          return res.data
        })
      }

      socket.on('chat message', (msg) => {
        addToMessages(msg)
      });

      const sendInput = async (e,message) => {
        e.preventDefault(); // prevents page reloading
        const messageData = { message:message, author:MY_USER_NAME, authorid:MY_USER_ID, teamId:currentTeamDisplayedID}
        const messageToDisplayAndSave = await saveToDB(messageData)
        socket.emit('chat message', {...messageToDisplayAndSave, ...messageData}, currentTeamDisplayedID);
        addToMessages({...messageToDisplayAndSave, ...messageData})
        return false;
      }
 

    return(
      <div className="message-list">
        <Toolbar
          title={chatStore.teamName + ' Team'}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            // <ToolbarButton key="video" icon="ion-ios-videocam" />,
            // <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">
        {/* {console.log(messagesToRender)} */}
          {messagesToRender.map( (m,i) => 
            <div key={i}>
              {/* show who sent what no style: */}
              {/* {m.props.data.authorname + ' :\n'}    */}
              {m}
            </div>)
            }
          </div>

        <Compose sendInput={sendInput} 
        rightItems={[
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}))