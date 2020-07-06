import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import TeamsByMembers from './TeamsByMembers';
import TeamsByTasks from './TeamsByTasks';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useEffect } from 'react';

const Teams = inject('teamsStore')(observer((props) => {

    const [teamName, setTeamName] = useState('')
    const [toShow, setToShow] = useState('tasks')

    const fetchData = () => {
        props.teamsStore.getTeams(localStorage.getItem('userId'))
    }

    useEffect(fetchData, [])

    const toggleShow = () => {
        if (toShow === 'tasks') {
            setToShow('members')
        } else {
            setToShow('tasks')
        }
    }
    
    const addTeam = () => {
        if (!teamName.length) {
            alert('Enter a name for the team')
            return
        }
        props.teamsStore.addTeam(teamName, localStorage.getItem('userId'))
    }

    return (
        <div id="tasks-page">
            <div id="new-category-input">
                <TextField id="category-input" label="New Category" type="text" variant="outlined"
                    style={{}}
                    value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                <Button variant='contained' color='secondary' onClick={addTeam}> Add Team </Button>
            </div><br></br>
            <div>
                Add Member

            </div>
            <button onClick={() => toggleShow()} >Toggle Show</button>
            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}
        </div>
    );
}))

export default Teams;