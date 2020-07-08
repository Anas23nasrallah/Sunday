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
import TeamManager from './TeamManager'

const API_URL = 'http://localhost:3200';

const Teams = inject('teamsStore')(observer((props) => {
    const [taskInput, settaskInput] = useState('')
    const [statusInput, setstatusInput] = useState('')
    const [toShow, setToShow] = useState('tasks')

    const [alltasks, setAll] = useState([])
    const statusArr = ['Starting','In progress','Completed']


    const fetchData = () => {
        props.teamsStore.getTeams(localStorage.getItem('userId'))
    }

    const getTasks = async () => {
        let alltasks = []
        try {
            let tasks = await axios.get(`${API_URL}/alltasks`); 
            alltasks = tasks.data;
          } catch (err) {
            console.log(err);
          }
        setAll(alltasks)
    }

    useEffect(()=>{
        const fetchData = async () => {
            await props.teamsStore.getTeams(localStorage.getItem('userId'))
        }
        fetchData()
    }, [])

    useEffect(()=>{
        const getTasks = async () => {
            let alltasks = []
            try {
                let tasks = await axios.get(`${API_URL}/alltasks`); 
                alltasks = tasks.data;
              } catch (err) {
                console.log(err);
              }
            setAll(alltasks)
        }
        getTasks()
    }, [])

    // useEffect(getTasks, [])

    const [manageTeams, setManageTeams] = useState(false)

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

    // const toggleTeamManager = () => {
    //     setManageTeams(!manageTeams) : setManageTeams(true)
    // }

    return (
        <div id="tasks-page">
            {/* <div className="aut">
                Hello Sunday.com, <br></br>
                Please notify me when task with the name  <NativeSelect id="select" value={taskInput} onChange={(e) => settaskInput(e.target.value)}>

                <option></option>
                {alltasks.map((t, i) => <option key={i}>{t.taskId + '  ' + t.taskName}</option>)}
            </NativeSelect><br></br> status change to  <NativeSelect id="select" value={statusInput} onChange={(e) => setstatusInput(e.target.value)}>
                <option></option>
                {statusArr.map((t, i) => <option key={i}>{t}</option>)}
            </NativeSelect>.<br></br>     

                <button onClick={trackTask}>Ok</button>
            </div> */}
            
                {/* <Link to='/teamhandler'> */}
            {/* </Link> */}
            <Button variant='contained' color='primary' onClick={()=>setManageTeams(!manageTeams)}> Manage Teams </Button>
            
            {manageTeams ? <TeamManager/> : <div></div>}
            <br></br><br></br>
            {
                 
                 toShow === 'tasks' ? <Button variant='contained' color='primary' onClick={() => toggleShow()}> Show By Members </Button>
                     : <Button variant='contained' color='primary' onClick={() => toggleShow()} >Show By Teams</Button>
             }

            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}
        </div>
    );
}))

export default Teams;