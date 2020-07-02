const { observable, action } = require("mobx");

export class User {
    @observable userName = null
    @observable firstName = null
    @observable lastName = null
    @observable birthDate = null
    @observable email = null

    @action setDetails(details){
        this.userName = details.userName
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.birthDate = details.birthDate
        this.email = details.email
    }
}