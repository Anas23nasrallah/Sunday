const { observable, action, computed } = require("mobx");

export class User {
    @observable userName = null
    @observable firstName = null
    @observable lastName = null
    @observable birthDate = null
    @observable email = null
    @observable loggedIn = false

    @action setDetails(details){
        this.userName = details.userName
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.birthDate = details.birthDate
        this.email = details.email
        this.loggedIn = true
    }

    @computed get isUserLoggedIn() {
        return this.isLoggedIn
    }
}