import React from 'react';
import { inject, observer } from 'mobx-react';
import { Task } from '../stores/Task'
import TeamsByTaskTable from './TeamsByTaskTable';


const TeamsByTasks = inject('teamsStore')(observer((props) => {

    const teams = props.teamsStore.teams

    const modifyTeams = (teams) => {
        const modifiedTeams = []
        for(let team of teams){
            const modifiedTeam = {name: team.name, rows: []}
            for(let task of team.tasks){
                task.task.assignee = task.assignee
                modifiedTeam.rows.push(task.task)
            }
            modifiedTeams.push(modifiedTeam)
        }
        return modifiedTeams
    }
    const modifiedTeams = modifyTeams(teams)
    return (
        <div>
            {modifiedTeams.map((t, i) => <TeamsByTaskTable rows={t.rows} key={i} name={t.name}/>)}
        </div>
    );
}))

export default TeamsByTasks;