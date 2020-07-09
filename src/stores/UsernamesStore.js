const { observable } = require("mobx");
const { default: Axios } = require("axios");
// const API_URL = 'http://localhost:3200'
const API_URL = ''

export class UsernamesStore {
    @observable usernames = []

    constructor() {
        this.getUsernames()
    }

    getUsernames = async () => {
        const response = await Axios.get(`${API_URL}/users`)
        for (let username of response.data) {
            const fullName = await this.getFullName(username)
            this.usernames.push({ username: username, fullName: fullName })
        }
    }

    getFullName = async (username) => {
        const response = await Axios.get(`${API_URL}/userfullname/${username}`)
        return response.data.firstName + ' ' + response.data.lastName
    }
}