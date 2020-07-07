import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ConversationList.css';
import { observer, inject } from 'mobx-react';
import Axios from 'axios';


  //onclick => chatStore.changeCurrentTeamDisplayedID(newID)           setCurrentTeamDisplayedID(newID)

export default inject('tasksStore', 'user', 'chatStore')(observer(function ConversationList(props) {
  
  const [conversations, setConversations] = useState([]);
  const chatStore = props.chatStore
  const userID = chatStore.MY_USER_ID
  let teamName = chatStore.teamName
  let teamID = chatStore.currentTeamDisplayedID
  // let myTeams []

  useEffect(() => {
    getTeams()
  },[chatStore.currentTeamDisplayedID])


  const getTeams = () => {
    const teamsInfo = []
    // console.log(chatStore.MY_TEAMS_IDS)
    for(let t of chatStore.MY_TEAMS_IDS){
        Axios.get(`http://localhost:3200/teamname/${t}`).then( res => {
          const team = {name:res.data[0].teamName, id:t}
          teamsInfo.push(team)
        })
      }
    setConversations(teamsInfo)
    }


    return (
      <div className="conversation-list">
        <Toolbar
          title="Chats"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map((conversation,i) =>
            <ConversationListItem
              key={conversation.name + i}
              data={conversation}
            />
          )
        }
      </div>
    );
}))