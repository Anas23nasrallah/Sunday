import React from 'react';
import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { InputLabel, NativeSelect, TextField, Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const TeamHandler = inject('usernamesStore', 'user', 'teamsStore')(observer((props) => {
    const usernames = props.usernamesStore.usernames.map(u => u.username)

    const [teamsObj, setTeamsObj] = useState([])
    const [teamInput, setTeam] = useState('')
    const [teams, setTeams] = useState([])
    const [member, setMember] = useState('')
    const [memberToDelete, setMemberToDelete] = useState('')

    const [newTeamInput, setTeamInput] = useState('')
    const team = props.teamsStore.teams.find(t => t.name === teamInput)

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')

    const getContenders = () => {
        const members = team.members
        const contenders = usernames.filter(u => !members.includes(u))
        return contenders
    }
    const addTeam = () => {
        if (!newTeamInput.length) {
            setSnackbarMessage('Enter a name for the team')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            // alert('Enter a name for the team')
            return
        }
        props.teamsStore.addTeam(newTeamInput, localStorage.getItem('userId'))
        setSnackbarMessage(`Team: ${newTeamInput} was Added Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        // alert(`Team: ${newTeamInput} was Added Successfully`)
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
        const teamId = teamsObj.find(t => t.teamName === teamInput).teamId
        await Axios.post(`http://localhost:3200/teamsusers/${teamId}/${member}`)
        props.teamsStore.getTeams(localStorage.getItem('userId'))
    }

    const removeMemberFromTeam = async () => {
        const response = await Axios.get(`http://localhost:3200/userid/${memberToDelete}`)
        const idToDelete = response.data.userId
        await Axios.post(`http://localhost:3200/members/${teamInput}/${idToDelete}`)
        props.teamsStore.getTeams(localStorage.getItem('userId'))
    }

    return (
        <div>

            <p>Add Team</p>
            <div id="new-category-input">
                <TextField id="category-input" label="New Category" type="text" variant="outlined"
                    style={{}}
                    value={newTeamInput} onChange={(e) => setTeamInput(e.target.value)} />
                <Button variant='contained' color='secondary' onClick={addTeam}> Add Team </Button>
            </div>

            <p>Your Teams</p>
            <InputLabel htmlFor="select">Choose Team</InputLabel>
            <NativeSelect id="select" value={teamInput} onChange={(e) => setTeam(e.target.value)}>
                <option></option>
                {teams.map((t, i) => <option key={i}>{t}</option>)}
            </NativeSelect><br></br>

            <p>Add Member</p>
            <InputLabel htmlFor="select">Choose Team</InputLabel>
            <NativeSelect id="select" value={member} onChange={(e) => setMember(e.target.value)}>
                <option></option>
                {teamInput ? getContenders().map((u, i) => <option key={i}>{u}</option>) : null}
            </NativeSelect>
            <button onClick={() => addMemberToTeam()}>Add</button>

            <p>Remove Member</p>
            <InputLabel htmlFor="select">Choose A Member</InputLabel>
            <NativeSelect id="select" value={memberToDelete} onChange={(e) => setMemberToDelete(e.target.value)}>
                <option></option>
                {teamInput ? props.teamsStore.teams.find(t => t.name === teamInput).members.map((u, i) => <option key={i}>{u}</option>) : null}
            </NativeSelect>
            <button onClick={() => removeMemberFromTeam()}>Remove</button>


            <Snackbar open={openSnackbar} autoHideDuration={6000} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={()=>setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>


        </div>

    );
}))

export default TeamHandler;