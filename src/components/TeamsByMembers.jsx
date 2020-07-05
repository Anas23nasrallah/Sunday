import React from 'react';
import { inject, observer } from 'mobx-react';
import TeamsByMemberTable from './TeamsByMemberTable';


const TeamsByMembers = inject('teamsStore')(observer((props) => {

    const teams = props.teamsStore.teams

    const modifyTeam = (team) => {
        const modifiedTeam = { teamName: team.name }
        for (let task of team.tasks) {
            if (modifiedTeam[task.assignee]) {
                modifiedTeam[task.assignee].push(task.task)
            } else {
                modifiedTeam[task.assignee] = [task.task]
            }
        }
        return modifiedTeam
    }
    const modifiedTeams = teams.map(t => modifyTeam(t))
    console.log(Object.keys(modifiedTeams[0]))
    return (
        <div>
            {modifiedTeams.map(team => Object.keys(team).map((member, i) => {
                return (
                    member !== 'teamName' ?
                        <TeamsByMemberTable member={member} key={i} tasks={team[member]} teamName={team.teamName} />
                        : null
                )
            }))}
        </div>
    );
}))

export default TeamsByMembers;
