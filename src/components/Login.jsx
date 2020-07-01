import React, {useState} from 'react';
const Login = () => {

    const [userNameInput, setUserNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const logIn = () => {
        //use post req to "/login"
        alert(`Checking validation for:\nUser Name: ${userNameInput}\nPassword: ${passwordInput}`)
    }

    const createNewUser = () => {
         //use post req to "/signup"
        alert('Open New Tab For New Info')
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
}
 
export default Login;
