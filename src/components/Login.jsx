import React, {useState} from 'react';
import { observer, inject } from 'mobx-react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = inject('tasksStore')(observer((props) => {

    const [userNameInput, setUserNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const logIn = () => {
        const loginData = {
            name:userNameInput,
            password:passwordInput
        }
        Axios.post('http://localhost:3200/login',loginData).then( res => {
            if(res.data.status === 'OK'){
                const userID = res.data.id
                props.tasksStore.setUserId(userID)
                window.location.href = window.location.origin + '/tasks'
                // <Redirect to='/tasks'/>
            } else {
                alert('Incorect password or username')
            }
        })
        // alert(`Checking validation for:\nUser Name: ${userNameInput}\nPassword: ${passwordInput}`)
    }

    const createNewUser = () => {
        const loginData = {
            name:userNameInput,
            password:passwordInput
        }
        Axios.post('http://localhost:3200/signup',loginData).then( res => {
            if(res.data.status === 'OK'){
                const userID = res.data.id
                props.tasksStore.setUserId(userID)
                window.location.href = window.location.origin + '/tasks'
                // <Redirect to='/tasks'/>
            } else {
                alert('Problem creating new user')
            }
        })
        // alert('Open New Tab For New Info')

    }

    return (
        <div id="login-page-container">
            <h1>LOGIN PAGE:</h1>
            <input type="text" placeholder="User Name" value={userNameInput} onChange={(e)=>setUserNameInput(e.target.value)}/> <br/>
            <input type="text" placeholder="Password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}/> <br/>
            <button onClick={logIn}>Login In</button> <br/>
            <button onClick={createNewUser}>Create New User</button>
        </div>
    );
}))
 
export default Login;
