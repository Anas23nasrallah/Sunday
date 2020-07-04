import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Tasks from './components/Tasks'
import Login from './components/Login';
import './App.css';
import NavBar from './components/navBar';
import { Redirect } from 'react-router-dom';

import SignUp from './components/SignUp';
import TasksTable from './components/TasksTable';
import Profile from './components/Profile';


const App = inject('tasksStore', 'user')(observer((props) => {


  return (
    <Router >

      <NavBar/>

      <Route exact path='/' >
        {props.user.loggedIn ? <Redirect to="/tasks" /> : <Login />} {/* TODO should the loggedIn variable be in the tasksStore?*/}
      </Route>

      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/signUp' component={SignUp} />
      <Route exact path='/profile' component={Profile} />


    </Router>
    // <SuperTable />
  )

}))

export default App;
