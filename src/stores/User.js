const { observable, action, computed } = require("mobx");

export class User {
    @observable userName = null
    @observable firstName = null
    @observable lastName = null
    @observable birthDate = null
    @observable email = null
    @observable loggedIn = false

    @action login(details, userID){
        this.userName = details.userName
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.birthDate = details.birthDate
        this.email = details.email
        this.loggedIn = true
        localStorage.setItem("userId", userID)
    }

    @computed get isUserLoggedIn() {
        return this.isLoggedIn
    }
}