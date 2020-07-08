import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Task } from '../stores/Task'
import TeamsByTaskTable from './TeamsByTaskTable';
import { useEffect } from 'react';
import Axios from 'axios';


const TeamsByTasks = inject('teamsStore')(observer((props) => {

    const teams = props.teamsStore.teams
    const [admin, setAdmin] = useState([])
    
    useEffect(() => {
        const isAdmin = async () => {
            for (let team of props.teamsStore.teams) {
                const teamId = team.id
                const res = await Axios.get(`http://localhost:3200/admin/${teamId}`)
                const adminRes = res.data[0].userName
                console.log(adminRes, localStorage.getItem('username'))
                const isAdmin = (adminRes === localStorage.getItem('username'))
                const adminArr = admin
                adminArr.push(isAdmin)
                setAdmin(adminArr)
            }
        }
        isAdmin()
    }, [])
    
    const modifyTeams = (teams) => {
        if (!teams) { return }
        const modifiedTeams = []
        if (teams.length) {
            for (let team of teams) {
                const modifiedTeam = { name: team.name, rows: [] }
                if (team.tasks) {
                    for (let task of team.tasks) {
                        task.task.assignee = task.assignee
                        modifiedTeam.rows.push(task.task)
                    }
                }
                modifiedTeams.push(modifiedTeam)
            }
        }

        return modifiedTeams
    }

    const modifiedTeams = modifyTeams(teams)

    return (
        <div>
            {modifiedTeams ? modifiedTeams.map((t, i) => <TeamsByTaskTable rows={t.rows} key={i} name={t.name} isAdmin={admin[i]}/>) : null}
        </div>
    );
}))

export default TeamsByTasks;
