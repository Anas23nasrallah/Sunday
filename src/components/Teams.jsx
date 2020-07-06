import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import TeamsByMembers from './TeamsByMembers';
import TeamsByTasks from './TeamsByTasks';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useEffect } from 'react';
import { Router, Link } from 'react-router-dom';

const Teams = inject('teamsStore')(observer((props) => {

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

    return (
        <div id="tasks-page">
            <button onClick={() => toggleShow()} >Toggle Show</button><br></br><br></br>
                <Link to='/teamhandler'>
                    <Button variant='contained' color='primary'> Manage Teams </Button>
                </Link><br></br><br></br>
            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}
        </div>
    );
}))

export default Teams;