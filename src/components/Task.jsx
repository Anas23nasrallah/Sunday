import React from 'react'


const Task = (props) => {
    const {taskName, priority, progressStatus, deadline, budget} = props.task

    return (
        <tr >
            <td >{taskName}</td>
            <td>{priority}</td>
            <td>{progressStatus}</td>
            <td>{deadline}</td>
            <td>{budget}</td>
        </tr>
    );
}


export default Task;