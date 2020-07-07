import React from 'react';
import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { InputLabel, NativeSelect, TextField, Button } from '@material-ui/core';

const TeamHandler = inject('usernamesStore', 'user', 'teamsStore')(observer((props) => {
    const usernames = props.usernamesStore.usernames.map(u => u.username)

    const [teamsObj, setTeamsObj] = useState([])
    const [team, setTeam] = useState('')
    const [teams, setTeams] = useState([])
    const [member, setMember] = useState('')
    const [teamInput, setTeamInput] = useState('')

    const getContenders = () => {
        const teamm = props.teamsStore.teams.find(t => t.name = team)
        if (teamm && teamm.members) {
            const members = teamm.members
            const contenders = usernames.filter(u => !members.includes(u))
            return contenders
        }
        return

    }
    const addTeam = () => {
        if (!teamInput.length) {
            alert('Enter a name for the team')
            return
        }
        props.teamsStore.addTeam(teamInput, localStorage.getItem('userId'))
        alert(`Team: ${teamInput} was Added Successfully`)
        setTeamInput('')
    }

    useEffect(() => {
        getTeams()
    }, [teams])

    const getTeams = async () => {
        const res = await Axios.get(`http://localhost:3200/teams/${localStorage.getItem('userId')}`)
        setTeamsObj([...teamsObj, ...res.data])

        setTeams(res.data.map(t => t.teamName))
    }
    const addMemberToTeam = async () => {
        const teamId = teamsObj.find(t => t.teamName === team).teamId
        await Axios.post(`http://localhost:3200/teamsusers/${teamId}/${member}`)
    }

    return (
        <div>

            <p>Add Team</p>
            <div id="new-category-input">
                <TextField id="category-input" label="New Category" type="text" variant="outlined"
                    style={{}}
                    value={teamInput} onChange={(e) => setTeamInput(e.target.value)} />
                <Button variant='contained' color='secondary' onClick={addTeam}> Add Team </Button>
            </div>

            <p>Your Teams</p>
            <InputLabel htmlFor="select">Choose Team</InputLabel>
            <NativeSelect id="select" value={team} onChange={(e) => setTeam(e.target.value)}>
                <option></option>
                {teams.map((t, i) => <option key={i}>{t}</option>)}
            </NativeSelect><br></br>

            <p>Add Member</p>
            <InputLabel htmlFor="select">Choose Team</InputLabel>
            <NativeSelect id="select" value={member} onChange={(e) => setMember(e.target.value)}>
                <option></option>
                {getContenders() ? getContenders().map((u, i) => <option key={i}>{u}</option>) : null}
            </NativeSelect>
            <button onClick={() => addMemberToTeam()}>Add</button>

        </div>

    );
}))

export default TeamHandler;