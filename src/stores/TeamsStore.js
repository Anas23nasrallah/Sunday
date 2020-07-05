import { observable, action } from "mobx";
import Task from '../stores/Task'

const dummyTeams = [
    {
        name: 'BackEnd Team',
        members: ['Ahmad', 'Eitan', 'Anas'],
        tasks: [
            {
                task: new Task(1, 'routes', 'in the back', 'Hight', 'today', 3, 'category1'),
                assignee
                : 'Ahmad'
            },
            {
                task: new Task(2, 'DataBase', 'in the db', 'Urgernt', 'tmw', 2, 'category2'),
                assignee
                : 'Ahmad'
            },
            {
                task: new Task(3, 'Dummies', 'for testing', 'Medium', 'today', 6, 'category2'),
                assignee
                : 'Eitan'
            }
        ]
    },
    {
        name: 'FronEnd Team',
        members: ['Eitan', 'Anas'],
        tasks: [
            {
                task: new Task(1, 'components', 'in REACT', 'Hight', 'today', 0, 'category4'),
                assignee
                : 'Anas'
            },
            {
                task: new Task(2, 'Stores', 'in the stores file', 'Low', 'today', 54, 'category3'),
                assignee
                : 'Anas'
            },
            {
                task: new Task(3, 'Material UI', 'for better UI', 'High', 'today', 33, 'category6'),
                assignee
                : 'Eitan'
            }
        ]
    }
]

export class TeamsStore {

    @observable teams = dummyTeams

    constructor() {
        //get teams from db or useEffect
    }

    @action addTeam = (team) => {
        this.teams.push(team)
    }
}