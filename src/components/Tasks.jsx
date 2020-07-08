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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const capitalize = require('capitalize')

const Tasks = inject('tasksStore','user')(observer((props) => {

    // [props.tasksStore._tasks.map(t => toJS(t))]
    const tasks = props.tasksStore._tasks
    
    // let tasks = []

    // const fetchData = async () => {
    //     await props.tasksStore.getTasksFromDB(localStorage.getItem('userId'))
    //     // props.tasksStore.setCategories()
    // }

    // useEffect(fetchData, [])
    useEffect(() => {
        async function fetchData() {
          await props.tasksStore.getTasksFromDB(localStorage.getItem('userId'))
        }
        fetchData();
      }, []);

    const groupedTasks = props.tasksStore.getTasksByCategory

    const [categoryInput, setCategoryInput] = useState('')


    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')

    const addCategory = () => {
        const catgoreyToAdd = capitalize(categoryInput)
        try{
            props.tasksStore.addCategory(catgoreyToAdd)
            setSnackbarMessage(`Added new category - ${catgoreyToAdd}`)
            setSnackbarStatus('success')
            setOpenSnackbar(true)
            setCategoryInput('')
        } catch (err){
            setSnackbarMessage(`Seems like there was an error, please try again or contact us`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
        }
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

            <Snackbar open={openSnackbar} autoHideDuration={6000} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={()=>setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>

    );
}))

export default Tasks;