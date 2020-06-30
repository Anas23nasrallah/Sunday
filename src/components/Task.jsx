import React from 'react'


const Task = (props) => {
    const task = props.task

    return (
        <tr >
            <td >{task.taskName}</td>
            <td >{task.description}</td>
            <td>{task.priority}</td>
            <td>{task.progressStatus}</td>
            <td>{task.deadline}</td>
            <td>{task.budget}</td>
        </tr>
    );
}


export default Task;