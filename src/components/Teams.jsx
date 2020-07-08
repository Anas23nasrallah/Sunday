import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import TeamsByMembers from './TeamsByMembers';
import TeamsByTasks from './TeamsByTasks';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useEffect } from 'react';
import { Router, Link } from 'react-router-dom';
import '../styles/teams.css'
import { InputLabel, NativeSelect } from '@material-ui/core';
import axios from 'axios';
const API_URL = 'http://localhost:3200';

const Teams = inject('teamsStore', 'tasksStore')(observer((props) => {
    const [taskInput, settaskInput] = useState('')
    const [statusInput, setstatusInput] = useState('')
    const [toShow, setToShow] = useState('tasks')
    const statusArr = ['Starting', 'In progress', 'Completed']
    const fetchData = () => {
        props.teamsStore.getTeams(localStorage.getItem('userId'))
    }

    useEffect(fetchData, [])

    const trackTask = async () => {
        const userData = await axios.get(`${API_URL}/user/${localStorage.getItem('userId')}`);
        const email = userData.data.email
        await axios.post(`${API_URL}/tracking`, {
            taskId: taskInput.substr(0, taskInput.indexOf(' ')),
            email: email,
            status: statusInput
        });
        alert("Ok! We Will ...")
    }

    const toggleShow = () => {
        if (toShow === 'tasks') {
            setToShow('members')
        } else {
            setToShow('tasks')
        }
    }

    return (
        <div id="tasks-page">
            <div className="aut">
                Hello Sunday.com, <br></br>
                Please notify me when task with the name  <NativeSelect id="select" value={taskInput} onChange={(e) => settaskInput(e.target.value)}>
                    <option></option>
                    {(props.tasksStore._tasks).map((t, i) => <option key={i}>{t.taskId + '  ' + t.taskName}</option>)}
                </NativeSelect><br></br> status change to  <NativeSelect id="select" value={statusInput} onChange={(e) => setstatusInput(e.target.value)}>
                    <option></option>
                    {statusArr.map((t, i) => <option key={i}>{t}</option>)}
                </NativeSelect>.<br></br>
                <button onClick={trackTask}>Ok</button>
            </div>
            {
                toShow === 'tasks' ? <button onClick={() => toggleShow()} >Show By Members</button>
                    : <button onClick={() => toggleShow()} >Show By Teams</button>
            }
            <br></br><br></br>

            <Link to='/teamhandler'>
                <Button variant='contained' color='primary'> Manage Teams </Button>
            </Link><br></br><br></br>
            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}
        </div>
    );
}))

export default Teams;