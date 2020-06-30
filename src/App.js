import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import Tasks from './components/Tasks'
import Login from './components/Login';

const App = () => {

  return (
    <Router >

      <Link to='/tasks' ><span> Tasks</span></Link>
      <Link to='/login' ><span> Login</span></Link>

      <hr></hr>

      <Route exact path='/tasks' render={() => <Tasks />} />
      <Route exact path='/login' render={() => <Login />} />

    </Router>
  )

}

export default App;
