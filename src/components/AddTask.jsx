import React from 'react';
import { useState } from 'react';

const AddTask = () => {

    // TODO to seperate every component into a different component, if needed.

    const [name, setName] = useState('')
    const [priority, setPriority] = useState('')
    const [deadline, setDeadline] = useState('')
    const [budget, setBudget] = useState(0)
    const [category, setCategory] = useState('')

    const addTask = () => {
        console.log('AAAAD')
    }

    return (
        <div>
            <span>Name:  </span>
            <input placeholder={'The name of the task'} onChange={(e) => setName(e.target.value)} value={name}/><br></br>

            <span>Priority: </span>
            <select onChange={(e) => setPriority(e.target.value)} value={priority}>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select><br></br>

            <span>Deadline:  </span>
            <input placeholder={'The deadline'} onChange={(e) => setDeadline(e.target.value)} value={deadline} type='date'/><br></br>

            <span>Budget: </span>
            <input placeholder={'The budget'} onChange={(e) => setBudget(e.target.value)} value={budget} type={'number'}/><br></br>

            <span>Category: </span>
            <input placeholder={'The budget'} onChange={(e) => setCategory(e.target.value)} value={category}/><br></br>

            <button onClick={() => addTask()}>Add Task</button>
        </div>
    );

}

export default AddTask;