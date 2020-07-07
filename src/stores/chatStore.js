import { observable, action, computed } from 'mobx';
import Axios from 'axios'

export class ChatStore {
  @observable MY_USER_ID;
  @observable MY_TEAMS_IDS;
  @observable currentTeamDisplayedID;
  @observable teamName  

  constructor() {
    this.MY_USER_ID = localStorage['userId']
    this.MY_TEAMS_IDS = []
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
        Axios.get(`http://localhost:3200/teamname/${this.currentTeamDisplayedID}`).then( res => {
            this.teamName = res.data[0].teamName
        })
    }

}

export default ChatStore;