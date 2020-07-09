import { observable, action, computed } from 'mobx';
import Axios from 'axios'
// const API_URL = 'http://localhost:3200'
const API_URL = ''

export class ChatStore {
  @observable MY_USER_ID;
  @observable MY_TEAMS_IDS;
  @observable currentTeamDisplayedID;
  @observable teamName  
  @observable MY_USER_NAME
  @observable conversations

  constructor() {
    this.MY_USER_ID = localStorage['userId']
    this.MY_TEAMS_IDS = []
    this.conversations = []
  }

  @action changeCurrentTeamDisplayedID(newID){
    this.currentTeamDisplayedID = newID
  }

  @action setMY_USER_ID(){
    this.MY_USER_ID = localStorage['userId']
  }

  @action setMY_TEAMS_IDS(teamsIDArr){
    this.MY_TEAMS_IDS=teamsIDArr
    }

    @action async getTeamName(){
        Axios.get(`${API_URL}/teamname/${this.currentTeamDisplayedID}`).then( res => {
            this.teamName = res.data[0].teamName
        })
    }

    @action setUserName(){
        Axios.get(`${API_URL}/user/${this.MY_USER_ID}`).then( res => {
            this.MY_USER_NAME = res.data.firstName + ' ' + res.data.lastName
        })
    }

    @action setConversations(){
        if(!this.MY_TEAMS_IDS){return }
        const teamsInfo = []
        for(let t of this.MY_TEAMS_IDS){
            Axios.get(`${API_URL}/teamname/${t}`).then( res => {
                const team = {name:res.data[0].teamName, id:t}
                teamsInfo.push(team)
            })
            }
        this.conversations = teamsInfo
    }
}

export default ChatStore;