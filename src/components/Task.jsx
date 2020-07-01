import React from 'react'


const Task = (props) => {
    const {taskName, priority, progressStatus, deadline, budget} = props.task

    return (
        <tbody>
        <tr >
            <td >{taskName}</td>
            <td>{priority}</td>
            <td>{progressStatus}</td>
            <td>{deadline}</td>
            <td>{budget}</td>
        </tr>
        </tbody>
    );
}


export default Task;