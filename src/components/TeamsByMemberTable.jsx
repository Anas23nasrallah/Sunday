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

export default inject('tasksStore')(observer(function TeamsByMemberTable(props) {
    const [selectedRow, setSelectedRow] = useState(null);
    

    const [state, setState] = React.useState({

        columns: [
            { title: 'Task Name', field: 'taskName', sorting: false, searchable: true },
            { title: 'Priority', field: 'priority', lookup: { Urgent: 'Urgent', Hight: 'Hight', Medium: 'Medium', Low: 'Low' }, searchable: true, sorting: false },
            { title: 'Deadline', field: 'deadLine', type: "date" },
            { title: 'Status', field: 'status', initialEditValue: 1, sorting: false, lookup: { Starting: 'Starting', InProgress: 'In progress', Completed: 'Completed' } },
            { title: 'Budget', field: 'budget', type: 'currency', currencySetting: { currencyCode: "ILS" } },
        ],
        data: props.tasks
    });

    // const addTask = (rowData) => {
    //     console.log(rowData)
    //     const newTask = { ...rowData, category: props.category }
    //     tasksStore.addTask(newTask)
    // }

    // const updateTask = (rowData) => {
    //     const updatedTask = { ...rowData, category: props.category }
    //     tasksStore.updateTask(updatedTask)
    // }

    // const deleteTask = (rowData) => {
    //     const taskToDelete = rowData.taskId
    //     tasksStore.deleteTask(taskToDelete)
    // }

    useEffect(() => {
        let oldData = { ...state }
        oldData.data = props.tasks
        setState(oldData)
    }, [props.tasks])

    return (
        <div className="tasks-category-table">
            <MaterialTable
                icons={tableIcons}
                title={props.tasks[0].assignee + ' - ' + props.teamName}
                columns={state.columns}
                data={state.data}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{ rowStyle: rowData => ({backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'})},
                { headerStyle: { backgroundColor: '#01579b', color: '#FFF' }}}
                // editable={{
                //     onRowAdd:
                //         (newData) =>
                //             new Promise((resolve) => {
                //                 setTimeout(() => {
                //                     resolve();

                //                     addTask(newData)
                //                 }, 600);
                //             })
                //     ,
                //     onRowUpdate: (newData, oldData) =>
                //         new Promise((resolve) => {
                //             setTimeout(() => {
                //                 resolve();

                //                 updateTask(newData)
                //             }, 600);
                //         }),
                //     onRowDelete: (oldData) =>
                //         new Promise((resolve) => {
                //             setTimeout(() => {
                //                 resolve();

                //                 if (oldData.status == 3) { deleteTask(oldData) }
                //             }, 600);
                //         }),
                // }}
            />
        </div>
    );
}
))
