import React from 'react';
import { useState } from 'react';
import { observer, inject } from 'mobx-react';

const AddTask = inject('tasksStore')( observer((props) => {
    const [inputs, setInputs] = useState({
        taskName: '',
        priority: '',
        category: '',
        deadLine: null,
        budget: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({
            ...inputs, [name]: value
        }));
    };

    const addTask = () => {
        props.tasksStore.addTask(inputs)
    }

    return (
        <div>
            <span>Name:  </span>
            <input name='taskName' placeholder={'The name of the task'} onChange={handleChange} value={inputs.taskName} /><br></br>

            <span>Priority: </span>
            <select name='priority' onChange={handleChange} value={inputs.priority}>
                <option value=''></option>
                <option value='urgent'>Urgent</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
            </select><br></br>

            <span>Category: </span>
            <input name='category' placeholder='The budget' onChange={handleChange} value={inputs.category} /><br></br>

            <span>Deadline:  </span>
            <input name='deadLine' placeholder='The deadline' onChange={handleChange} value={inputs.deadLine} type='date' /><br></br>

            <span>Budget: </span>
            <input name='budget' placeholder='The budget' onChange={handleChange} value={inputs.budget} type='number' /><br></br>

            <button onClick={addTask}>Add Task</button>
        </div>
    );
}))

export default AddTask;