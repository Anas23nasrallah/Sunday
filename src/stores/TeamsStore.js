import { observable, action } from "mobx";
import Task from '../stores/Task'
import axios from 'axios';
const API_URL = 'http://localhost:3200';


const dummyTeams = [
    {
        name: 'BackEnd Team',
        id: 5646,
        members: ['Ahmad', 'Eitan', 'Anas'],
        tasks: [
            {
                task: new Task(1, 'routes', 'in the back', 'Hight', 'today', 3, 'category1'),
                assignee: 'Ahmad'
            },
            {
                task: new Task(2, 'DataBase', 'in the db', 'Urgernt', 'tmw', 2, 'category2'),
                assignee: 'Ahmad'
            },
            {
                task: new Task(3, 'Dummies', 'for testing', 'Medium', 'today', 6, 'category2'),
                assignee: 'Eitan'
            }
        ]
    }
    ,
    {
        name: 'FronEnd Team',
        id: 3943,
        members: ['Eitan', 'Anas'],
        tasks: [
            {
                task: new Task(1, 'components', 'in REACT', 'Hight', 'today', 0, 'category4'),
                assignee: 'Anas'
            },
            {
                task: new Task(2, 'Stores', 'in the stores file', 'Low', 'today', 54, 'category3'),
                assignee: 'Anas'
            },
            {
                task: new Task(3, 'Material UI', 'for better UI', 'High', 'today', 33, 'category6'),
                assignee: 'Eitan'
            }
        ]
    }
]

export class TeamsStore {

    @observable teams = dummyTeams

    // getTeams = async (userId) => {
    //     const teamsArr = []
    //     const data = await axios.get(`${API_URL}/teams/${userId}`);
    //     const teams = data.data
    //     for (let team of teams) {
    //         let teamInfo = {}
    //         teamInfo.name = team.teamName
    //         teamInfo.id = team.teamId
    //         const tasksFromAPI = await axios.get(`${API_URL}/teamstasks/${team.teamId}`);
    //         const membersFromAPI = await axios.get(`${API_URL}/members/${team.teamId}`);
    //         const teamTasks = tasksFromAPI.data
    //         teamInfo.tasks = []
    //         for (let task of teamTasks) {
    //             let taskInfo = {}
    //             taskInfo.task = task
    //             const tasksUserFromAPI = await axios.get(`${API_URL}/taskuser/${task.taskId}`);
    //             taskInfo.user = (tasksUserFromAPI.data).map(u => u.firstName + ' ' + u.lastName)
    //             teamInfo.tasks.push(taskInfo)
    //         }
    //         teamInfo.members = (membersFromAPI.data).map(u => u.firstName + ' ' + u.lastName)
    //         teamsArr.push(teamInfo)
    //     }
    // }

    constructor() {
        //'----->'
    }

    @action addTeam = async (teamName, userId) => {
        const team1 = {
            "teamName": teamName,
            "userId": userId
        }
        console.log(teamName, userId)

        const response = await axios.post(`${API_URL}/teams`, team1)
        const id = response.data.teamId
        this.teams.push({ name: teamName, id: id })
    }
    @action addTask = async (teamName, rowData) => {
        const userName = rowData.assignee
        const userId = await axios.get(`${API_URL}/userid/${userName}`)
        console.log(userName, userId)
        // const teamId = this.teams.find(t => t.name === teamName).id
        // const response = await axios.post(`${API_URL}/teamsusers/${teamId}/:username`, team1)
        // console.log('in the store', teamName, rowData)
    }

}