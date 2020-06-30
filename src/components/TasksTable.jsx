import React from 'react'
import Task from './Task';

const TasksTable = (props) => {

    const category = props.category
    const tasks = props.tasks

    return (
        <div>
            <p>{category}</p>
            <table style={{width: '100%'}}>
                {tasks.map((task, i) => <Task key={i} task={task} />)}
            </table >
        </div>
    );
}

export default TasksTable;