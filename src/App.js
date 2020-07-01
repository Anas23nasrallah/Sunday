import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Tasks from './components/Tasks'
import Login from './components/Login';
import './App.css';
import NavBar from './components/navBar';
import { Redirect } from 'react-router-dom';

const App = inject('tasksStore')(observer((props) => {


  return (
    <Router >

      <NavBar/>
      {/* <hr></hr> */}

      <Route exact path='/' >
        {props.tasksStore.loggedIn ? <Redirect to="/tasks" /> : <Login />}
      </Route>

      <Route exact path='/tasks' component={Tasks} />

    </Router>
  )

}))

export default App;
