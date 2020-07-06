import React from 'react';
import { inject, observer } from 'mobx-react';
import TeamsByMemberTable from './TeamsByMemberTable';


const TeamsByMembers = inject('teamsStore')(observer((props) => {

    const teams = props.teamsStore.teams

    const modifyTeam = (team) => {
        const modifiedTeam = { teamName: team.name }
        if (team.tasks) {
            for (let task of team.tasks) {
                if (modifiedTeam[task.assignee]) {
                    modifiedTeam[task.assignee].push(task.task)
                } else {
                    modifiedTeam[task.assignee] = [task.task]
                }
            }
        }
        return modifiedTeam
    }
    let modifiedTeams = []
    if (teams) {
         modifiedTeams = teams.map(t => modifyTeam(t))
    }
    return (
        <div>
            {modifiedTeams.length ? modifiedTeams.map(team => Object.keys(team).map((member, i) => {
                return (
                    member !== 'teamName' ?
                        <TeamsByMemberTable member={member} key={i} tasks={team[member]} teamName={team.teamName} />
                        : null
                )
            })) : null} 
        </div>
    );
}))

export default TeamsByMembers;
