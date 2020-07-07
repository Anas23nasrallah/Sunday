const { observable } = require("mobx");
const { default: Axios } = require("axios");

export class UsernamesStore {
    @observable usernames = []

    constructor() {
        this.getUsernames()
    }

    getUsernames = async () => {
        const response = await Axios.get('http://localhost:3200/users')
        for (let username of response.data) {
            const fullName = await this.getFullName(username)
            this.usernames.push({ username: username, fullName: fullName })
        }
    }

    getFullName = async (username) => {
        const response = await Axios.get(`http://localhost:3200/userfullname/${username}`)
        return response.data.firstName + ' ' + response.data.lastName
    }
}