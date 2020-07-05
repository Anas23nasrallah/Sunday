import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Tasks from './components/Tasks'
import Login from './components/Login';
import './App.css';
import NavBar from './components/navBar';
import { Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Teams from './components/Teams'


const App = inject('tasksStore', 'user')(observer((props) => {

  return (
    <Router >

     <NavBar />

      <Route path='/' >
        {props.user.loggedIn == 'true' ? <Redirect to="/tasks" /> : <Redirect to="/login" />}
      </Route>

      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signUp' component={SignUp} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/teams' component={Teams} />


    </Router>
  )

}))

export default App;
