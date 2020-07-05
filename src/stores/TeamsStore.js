import { observable, action } from "mobx";

export class TeamsStore {
    
    @observable teams = []

    constructor(){
        //get teams from db or useEffect
    }

    @action addTeam = (team) => {
        this.teams.push(team)
    }
}