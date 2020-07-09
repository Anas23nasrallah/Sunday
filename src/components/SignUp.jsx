import React from 'react';
import '../styles/signUp.css'
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// const API_URL = 'http://localhost:3200'
const API_URL = ''

const SignUp = inject('usernamesStore')(observer((props) => {
    
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarStatus, setSnackbarStatus] = useState('')


    const users = props.usernamesStore.usernames.map(u => u.username)
    console.log('in sign up', users)

    const [inputs, setInputs] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        birthDate: '2020-07-02',
        email: '',
        password: '',
        rePassword: ''
    })

    const sendNewUserMail = async () => {
    await axios({ method: "POST", 
             url:`${API_URL}/send`, 
             data: {
                    email: inputs.email,
                    mailContent: `Hey ${inputs.firstName}   ${inputs.lastName}
                     `}
             }).then((response)=>{
                      if (response.data.msg === 'success'){
                          alert("Email sent, awesome!"); 
                          this.resetForm()
                      }else if(response.data.msg === 'fail'){
                          alert("Oops, something went wrong. Try again")
                      }
      })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({
            ...inputs, [name]: value
        }));
    };

    const isUserNameValid = (userName) => {
        return !users.includes(userName)
    }

    const isPasswordValid = (password, rePassword) => {
        return password === rePassword
    }

    const areInputsValid = (inputs) => {
        if (!isUserNameValid(inputs.userName)) {
            setSnackbarMessage('The username you chose already exists, choose another')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            // alert('The username you chose already exists, choose another')
            return false
        }
        if (!isPasswordValid(inputs.password, inputs.rePassword)) {
            setSnackbarMessage('The passwords does not match!')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            // alert('The passwords does not match!')
            return false
        }
        return true
    }

    const allFieldsFilled = (inputs) => {
        if (!!inputs.email && !!inputs.firstName && !!inputs.lastName && !!inputs.userName && !!inputs.password && !!inputs.rePassword) {
            return true
        } else {
            setSnackbarMessage('Fill all the fields!')
            setSnackbarStatus('error')
            setOpenSnackbar(true)
            // alert('Fill all the fields!')
            return false
        }
    }
    const signUp = async () => {
        if (!allFieldsFilled(inputs) || !areInputsValid(inputs)) { return }

        const res = await axios.post(`${API_URL}/signup`, inputs)
        const userId = res.data.userId
        sendNewUserMail()
        setSnackbarMessage('Signed up successfully')
        setSnackbarStatus('success')
        setOpenSnackbar(true)
        localStorage.setItem("userId", userId)
        localStorage.setItem("loggedIn", 'true')
        localStorage.setItem("username",  inputs.userName)
        window.location = '/welcome'
        return
    }

    return (
        <form>
            <h1 id="sign-up">Sign Up</h1>
            <div id="login-page-container">
                <div id="login-page">

                    <TextField id="userName-input"
                        label="User Name"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '5%' }}
                        name='userName'
                        value={inputs.userName}
                        onChange={handleChange}
                    /><br />

                    <TextField id="firstName-input"
                        label="First Name"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='firstName'
                        value={inputs.firstName}
                        onChange={handleChange}
                    /><br />

                    <TextField id="lastName-input"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='lastName'
                        value={inputs.lastName}
                        onChange={handleChange}
                    /><br />

                    <TextField id="birthDate-input"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='birthDate'
                        value={inputs.birthDate}
                        onChange={handleChange}
                    /><br />

                    <TextField id="mail-input"
                        label="E-mail"
                        type="email"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='email'
                        value={inputs.email}
                        onChange={handleChange}
                    /><br />

                    <TextField id="password-input"
                        label="Password"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                    /><br />

                    <TextField id="repassword-input"
                        label="Retype password"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='rePassword'
                        value={inputs.rePassword}
                        onChange={handleChange}
                    /><br />

                    <Button variant="contained" onClick={signUp} color="primary"> Sign UP </Button> <br /><br />

                    <span>Already registered? </span> <Link to="/login">Login here!</Link>

                    <Snackbar open={openSnackbar} autoHideDuration={6000} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert onClose={()=>setOpenSnackbar(false)} severity={snackbarStatus} variant="filled">
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        </form>);
}))

export default SignUp;