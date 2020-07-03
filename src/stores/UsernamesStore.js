const { observable } = require("mobx");
const { default: Axios } = require("axios");

export class UsernamesStore {
    @observable usernames = []

    constructor(){
        this.getUsernames()
    }

    getUsernames = async () => {
        const response = await Axios.get('http://localhost:3200/users')
        this.usernames = response.data
    }
}