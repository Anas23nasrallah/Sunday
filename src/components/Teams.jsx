import React from 'react';
import { inject, observer } from 'mobx-react';
import TeamsByMembers from './TeamsByMembers';
import TeamsByTasks from './TeamsByTasks';
import { useState } from 'react';

const Teams = () => {

    const [toShow, setToShow] = useState('tasks')

    const toggleShow = () => {
        if (toShow === 'tasks') {
            setToShow('members')
        } else {
            setToShow('tasks')
        }
    }

    return (
        <div>
            <button onClick={() => toggleShow()} >Toggle Show</button>
            {toShow === 'tasks' ? <TeamsByTasks /> : <TeamsByMembers />}
        </div>
    );
}

export default Teams;