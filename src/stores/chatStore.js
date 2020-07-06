import { observable, action, computed } from 'mobx';


export class ChatStore {
  @observable MY_USER_ID;
  @observable MY_TEAMS_IDS;
  @observable currentTeamDisplayedID;


  constructor() {
    this.MY_USER_ID = localStorage['userId']
    // this.MY_TEAMS_IDS
    // this.currentTeamDisplayedID 
  }

  @action changeCurrentTeamDisplayedID(newID){
    this.currentTeamDisplayedID = newID
  }

  @action setMY_USER_ID(){
    this.MY_USER_ID = localStorage['userId']
  }

  @action setMY_TEAMS_IDS(teamsIDArr){
    this.MY_TEAMS_IDS=teamsIDArr
    // if(teamsIDArr[0]){
    //     this.currentTeamDisplayedID =  teamsIDArr[0]
    // }

  }

}

export default ChatStore;