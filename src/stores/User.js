import Axios from "axios";

const { observable, action, computed } = require("mobx");

export class User {
    @observable userName = null
    @observable firstName = null
    @observable lastName = null
    @observable birthDate = null
    @observable email = null
    @observable loggedIn = localStorage.getItem('loggedIn')

    @action login(details, userID){
        this.userName = details.userName
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.birthDate = details.birthDate
        this.email = details.email
        localStorage.setItem("userId", userID)
        localStorage.setItem("loggedIn", 'true')
        this.loggedIn = 'true'
        console.log(details);
    }

    @action logout(){
        localStorage.setItem("userId", undefined)
        localStorage.setItem("loggedIn", 'false')
        this.loggedIn = 'false'
    }

    // getTeams = async () =>{
        
    //     const response = await Axios.get(`http://localhost:3200//teams/${localStorage.getItem('userId')}`)
    //     return response.data
    // }
    

    @computed get in(){
        return localStorage.getItem('loggedIn')
    }
}