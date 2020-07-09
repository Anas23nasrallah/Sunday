import React from 'react';
import { observer, inject } from 'mobx-react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { InputLabel, NativeSelect, TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const capitalize = require('capitalize')
// const API_URL = 'http://localhost:3200'
const API_URL = ''

const TeamManager = inject('usernamesStore', 'user', 'teamsStore')(observer((props) => {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')

    const userID = localStorage['userId']
    const [newTeamInput, setTeamInput] = useState('')
    const [teamInput, setTeam] = useState('')

    const [allTeams, setAllTeams] = useState([])

    const addTeam = () => {
        if (!newTeamInput.length) {
            setSnackbarMessage('Enter a name for the team')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            return
        }
        const newTeamCap = capitalize(newTeamInput)
        props.teamsStore.addTeam(newTeamCap, localStorage.getItem('userId'))
        setSnackbarMessage(`Team: ${newTeamCap} was Added Successfully`)
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        setTeamInput('')
    }

    const getTeams = async () => {
        const teams = await Axios.get(`${API_URL}/teams/${userID}`)
        console.log(teams)
    }

    useEffect( getTeams,[])

    return (
       <div>
           <p>Add Team</p>
            <div id="new-category-input">
                <TextField id="category-input" label="New Category" type="text" variant="outlined"
                    style={{}}
                    value={newTeamInput} onChange={(e) => setTeamInput(e.target.value)} />
                <Button variant='contained' color='primary' onClick={addTeam}> Add Team </Button>
            </div>

            <p>Your Teams</p>
            <InputLabel htmlFor="select">Choose Team</InputLabel>
            <NativeSelect id="select" value={teamInput} onChange={(e) => setTeam(e.target.value)}>
                <option></option>
                {allTeams.map((t, i) => <option key={i}>{t}</option>)}
            </NativeSelect><br></br>

            <Snackbar open={openSnackbar} autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

       </div>
    )
}))
        
export default TeamManager;
