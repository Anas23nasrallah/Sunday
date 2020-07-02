import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import TasksTable from './TasksTable'
import AddTask from './AddTask'
import { inject, observer } from 'mobx-react'
import '../styles/tasksPage.css'
import { toJS } from 'mobx'

const Tasks = inject('tasksStore')(observer((props) => {

    // [props.tasksStore._tasks.map(t => toJS(t))]
    const tasks = props.tasksStore._tasks

    
    // let tasks = []

    const fetchData =  () => {
        props.tasksStore.getTasksFromDB(props.tasksStore.userId)
    }


    useEffect(fetchData,[tasks])

    // const task1 = {
    //     name: 'take the dog for a walk',
    //     priority: 'mid',
    //     progressStatus: 'in progress',
    //     deadline: '12/8',
    //     category: 'home',
    //     budget: 10
    // }
    // const task2 = {
    //     name: 'Wash the car',
    //     priority: 'low',
    //     progressStatus: 'in progress',
    //     deadline: '29/7',
    //     category: 'personal',
    //     budget: 50
    // }
    // const task3 = {
    //     name: 'Wash the dishes',
    //     priority: 'low',
    //     progressStatus: 'in progress',
    //     deadline: '24/8',
    //     category: 'home',
    //     budget: 0
    // }

    // const tasks = [task1, task2, task3]

    const groupByCategory = (tasks) => {
        // console.log(tasks)
        const groupedTasks = {}
        for (let task of tasks) {
            console.log(task)
            if (groupedTasks[task.category]) {
                groupedTasks[task.category].push(task)
            } else {
                groupedTasks[task.category] = [task]
            }
        }
        return groupedTasks
    }

    const groupedTasks = groupByCategory(tasks)
    // console.log(groupedTasks)
    let addTaskToggleFlag = false

    const showAddTaskComp = () => {
        if(!addTaskToggleFlag){
            addTaskToggleFlag=true
            return <AddTask />
        } else {
            addTaskToggleFlag=false
            return null
        }
    }
    return (
        <div id="tasks-page">
            <Router >
                <Link to='/addTask' ><span> Add Task</span></Link>
                <Route exact path='/addTask' render={showAddTaskComp} />
            </Router>
            <div>
                {Object.keys(groupedTasks).map((group, i) => <TasksTable key={i} category={group} tasks={groupedTasks[group]} />)}
            </div>
        </div>

    );
}))

export default Tasks;