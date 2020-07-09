import { Line, Circle } from 'rc-progress';
import '../styles/analysis.css'
import React, { useEffect } from 'react'
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import TasksTable from './TasksTable'
import AddTask from './AddTask'
import { inject, observer } from 'mobx-react'
import '../styles/tasksPage.css'
// import { toJS } from 'mobx'
import SuperTable from './SuperTable'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'


const Analysis = inject('tasksStore')(observer((props) => {
    const [urgentTasks, setUrgent] = useState(0)
    const [completedTasks, setCompleted] = useState(0)

    const getAnalysis = async () => {
        await props.tasksStore.getTasksFromDB(props.tasksStore.userId)
        let tasks = props.tasksStore._tasks
        tasks = JSON.parse(JSON.stringify(tasks))
        const totalTasks = tasks.length
        const completedTasks = tasks.filter(u => u.status == "Completed").length
        const urgentTasks = tasks.filter(u => u.priority == "Urgent").length
        setUrgent((urgentTasks / totalTasks) * 100)
        setCompleted((completedTasks / totalTasks) * 100)
    }


    return (
        <div className="analysis">
            <br />
            <Button variant='contained' color='primary' onClick={() => getAnalysis()}> Check Progress </Button>
            {/* <button onClick={getAnalysis}>Check Progress</button> */}
            <h2>Urgent Tasks {parseInt(urgentTasks, 10)}%</h2>
            <Line percent={urgentTasks} strokeWidth="4" strokeColor="red" />
            <h2>Tasks Completed {parseInt(completedTasks, 10)}%</h2>
            <Circle percent={completedTasks} strokeWidth="4" strokeColor="green" />
        </div>
    )

}))

export default Analysis;