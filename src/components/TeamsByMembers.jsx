import React from 'react';
import { inject, observer } from 'mobx-react';
import TeamsByMemberTable from './TeamsByMemberTable';


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
            {modifiedTeams.map((t, i) => <TeamsByMemberTable rows={t.rows} key={i} namw={t.name}/>)}
        </div>
    );
}))

export default TeamsByTasks;
