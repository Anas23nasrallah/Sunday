import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { observer, inject } from 'mobx-react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

// const API_URL = 'http://localhost:3200'
const API_URL = ''

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default inject('teamsStore', 'tasksStore')(observer(function TeamsByTaskTable(props) {

    const teamsStore = props.teamsStore
    const members = teamsStore.teams.find(t => t.name === props.name).members
    const isAdmin = props.isAdmin
    // console.log(isAdmin, props.name)

    const getUsernamesLookup = (members) => {
        const usernamesLookUp = {}
        for (let member of members) {
            usernamesLookUp[member] = member
        }
        return usernamesLookUp
    }

    const usernamesLookUps = getUsernamesLookup(members)

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')

    const [state, setState] = React.useState({

        columns: [
            { title: 'Task Name', field: 'taskName', sorting: false, searchable: true },
            { title: 'Assignee', field: 'assignee', editable:'never',sorting: false, lookup: usernamesLookUps },
            { title: 'Priority', field: 'priority', lookup: { Urgent: 'Urgent', High: 'High', Medium: 'Medium', Low: 'Low' }, searchable: true, sorting: false },
            { title: 'Deadline', field: 'deadLine', type: "date" },
            { title: 'Status', field: 'status', initialEditValue: 1, sorting: false, lookup: { Starting: 'To Do', InProgress: 'In progress', Completed: 'Completed' } },
            { title: 'Budget', field: 'budget', type: 'currency', currencySetting: { currencyCode: "ILS" } },
            // { title: 'Notify Me', field: 'notify', type: 'text' },
        ],
        data: props.rows,
        teams: teamsStore.teams
    });

    const addTask = async (rowData) => {
        try{
            teamsStore.addTask(props.name, rowData)
            setSnackbarMessage(`Added New Task`)
            setSnackbarStatus('success')
            setOpenSnackbar(true)
        } catch(err){
            setSnackbarMessage(`Seems like there was an error, please try again or contact us`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            console.log(err)
        }
    }

    const  notifyAdmin = async (taskName,description,deadLine,teamName,username) => {
        const teamidData = await  axios.get(`${API_URL}/teamid/${teamName}`);
        const teamId = teamidData.data[0].teamId
        const adminData = await  axios.get(`${API_URL}/admin/${teamId}`);
        const email = adminData.data[0].email
        await axios({ method: "POST", 
        url:`${API_URL}/sendCompleted`, 
        data: {
                taskName : taskName,
                description : description,
                deadLine : deadLine,
                teamName : teamName,
                email: email,
                username : username
                }
        }).then((response)=>{
                 if (response.data.msg === 'success'){
                    // setSnackbarMessage('Email sent, awesome!')
                    // setSnackbarStatus('success')
                    // setOpenSnackbar(true)
                    //  alert("Email sent, awesome!"); 
                     this.resetForm()
                 }else if(response.data.msg === 'fail'){
                    // setSnackbarMessage('Oops, something went wrong. Try again')
                    // setSnackbarStatus('error')
                    // setOpenSnackbar(true)
                    //  alert("Oops, something went wrong. Try again")
                 }
             })
    } 


    const updateTask = async (rowData) => {
        if(rowData.status=="Completed") {
            notifyAdmin(rowData.taskName,rowData.description,rowData.deadLine,props.name,rowData.assignee)
        }
        const updatedTask = { ...rowData, category: props.category }
        try{
            await props.tasksStore.updateTask(updatedTask)
            teamsStore.getTeams(localStorage.getItem('userId'))
            setSnackbarMessage(`Updated Task Successfully`)
            setSnackbarStatus('success')
            setOpenSnackbar(true)
        } catch (err){
            setSnackbarMessage(`Seems like there was an error, please try again or contact us`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
        }
    }

    const deleteTask = async (rowData) => {
        const taskToDelete = rowData.taskId
        try{
            await props.tasksStore.deleteTask(taskToDelete)
            teamsStore.getTeams(localStorage.getItem('userId'))
            setSnackbarMessage(`Task Deleted Successfully`)
            setSnackbarStatus('success')
            setOpenSnackbar(true)
        } catch (err){
            setSnackbarMessage(`Seems like there was an error, please try again or contact us`)
            setSnackbarStatus('error')
            setOpenSnackbar(true)
        }
    }

    useEffect(() => {
        let oldData = { ...state }
        oldData.data = props.rows
        setState(oldData)
    }, [props.rows, state.teams])

    //ahmad - make this create the automation (onclicked in lone 177 if you need to enter row data)
    const tellMeWhenComplete = () => {
        alert('hey')
    }

    return (
        <div className="tasks-category-table">
            <MaterialTable
                icons={tableIcons}
                title={props.name}
                columns={state.columns}
                data={state.data}
                // .map(r => ({...r, notify:<AlarmOnIcon onClick={tellMeWhenComplete}/>}))}
                editable= { isAdmin ? {
                    onRowAdd:
                        (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    addTask(newData)
                                }, 600);
                            }) 
                    ,
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                updateTask(newData)
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                // if (oldData.status == 'Completed') { deleteTask(oldData) }
                                deleteTask(oldData)
                            }, 600);
                        }),
                    } 
                    :
                    {
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                updateTask(newData)
                            }, 600);
                        })  
                    } } 
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={()=>setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    );
}
))
