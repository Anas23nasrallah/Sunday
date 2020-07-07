import React from 'react';
import '../styles/signUp.css'
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const SignUp = inject('usernamesStore')(observer((props) => {

    const users = props.usernamesStore.usernames
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
             url:"http://localhost:3200/send", 
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
            alert('The username you chose already exists, choose another')
            return false
        }
        if (!isPasswordValid(inputs.password, inputs.rePassword)) {
            alert('The passwords does not match!')
            return false
        }
        return true
    }

    const allFieldsFilled = (inputs) => {
        if (!!inputs.email && !!inputs.firstName && !!inputs.lastName && !!inputs.userName && !!inputs.password && !!inputs.rePassword) {
            return true
        } else {
            alert('Fill all the fields!')
            return false
        }
    }
    const signUp = async () => {
        if (!allFieldsFilled(inputs) || !areInputsValid(inputs)) { return }
        await axios.post('http://localhost:3200/signup', inputs)
        sendNewUserMail()
        alert('Signed up successfully')
        return
    }

    return (
        <form>
            <h1>Sign Up</h1>
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
                        type="password"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                    /><br />

                    <TextField id="repassword-input"
                        label="Retype password"
                        type="password"
                        variant="outlined"
                        style={{ marginTop: '4%' }}
                        name='rePassword'
                        value={inputs.rePassword}
                        onChange={handleChange}
                    /><br />

                    <Button variant="contained" onClick={signUp} color="primary"> Sign UP </Button> <br /><br />

                    <span>Already registered? <Link to="/">Login here!</Link></span>
                </div>
            </div>
        </form>);
}))

export default SignUp;