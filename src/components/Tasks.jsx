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

const Tasks = inject('tasksStore')(observer((props) => {

    // [props.tasksStore._tasks.map(t => toJS(t))]
    const tasks = props.tasksStore._tasks
    
    // let tasks = []

    const fetchData = () => {
        props.tasksStore.getTasksFromDB(localStorage.getItem('userId'))
        // props.tasksStore.setCategories()
    }

    useEffect(fetchData, [])

    const groupedTasks = props.tasksStore.getTasksByCategory

    const [categoryInput, setCategoryInput] = useState('')

    const addCategory = () => {
        props.tasksStore.addCategory(categoryInput)
    }
    
    return (
        <div id="tasks-page">
            {/* <Router >
                <Link to='/addTask' ><span> Add Task</span></Link>
                <Route exact path='/addTask' render={showAddTaskComp} />
            </Router> */}
            <div id="new-category-input">
                <TextField id="category-input" label="New Category" type="text" 
                    autoComplete="new-category" variant="outlined" 
                    style={{}}
                    value={categoryInput} onChange={(e)=>setCategoryInput(e.target.value)}/>
                <Button variant='contained' color='primary' onClick={addCategory}> Add Category </Button>     
            </div>
            <div id="all-tasks-tables">
                {Object.keys(groupedTasks).map((group, i) => <SuperTable key={i} category={group} tasks={groupedTasks[group]}/>)}
            </div>
        </div>

    );
}))

export default Tasks;