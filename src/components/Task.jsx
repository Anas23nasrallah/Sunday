import React from 'react'
import { inject, observer } from 'mobx-react'

const Task = inject('tasksStore')(observer((props) => {
    const {taskName, priority, progressStatus, deadline, budget, taskId} = props.task

    const deleteTask = () =>  {
        props.tasksStore.deleteTask(taskId)
    }

    return (
        <tbody>
        <tr >
            <td >{taskName}</td>
            <td>{priority}</td>
            <td>{progressStatus}</td>
            <td>{deadline}</td>
            <td>{budget}</td>
            <td><button onClick={deleteTask}>Delete Task</button></td>
        </tr>
        </tbody>
    );
}))


export default Task;