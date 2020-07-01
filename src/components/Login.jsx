import React, {useState} from 'react';
import { observer, inject } from 'mobx-react';
import Axios from 'axios';

import { Redirect } from 'react-router-dom';
import '../styles/login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Login = inject('tasksStore')(observer((props) => {

    const [userNameInput, setUserNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const logIn = async () => {
        const loginData = {
            name:userNameInput,
            password:passwordInput
        }
        Axios.post('http://localhost:3200/login',loginData).then( res => {
            if(res.data.status === 'OK'){
                const userID = res.data.userId
                // alert(userID)
                props.tasksStore.setUserId(userID)
                // window.location.href = window.location.origin + '/tasks'

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
            <div id="login-page">
                {/* <h1>Welcome,</h1> */}
                <TextField id="userName-input" label="User Name" type="text" 
                autoComplete="current-password" variant="outlined" 
                style={{marginTop: '5%'}}
                value={userNameInput} onChange={(e)=>setUserNameInput(e.target.value)}/> <br/>
                <TextField id="password-input" label="Password" type="password" 
                autoComplete="current-password" variant="outlined" 
                style={{marginTop: '5%'}}
                value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}/> <br/>
            
                <Button variant="contained" color="primary" onClick={logIn}> Log In </Button> <br/>
                <Button variant="contained" color="primary" onClick={createNewUser}> Create New User </Button>

            </div>
        </div>
    );
}))
 
export default Login;
