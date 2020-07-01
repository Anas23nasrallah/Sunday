import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import Tasks from './components/Tasks'
import Login from './components/Login';
import './App.css';
import NavBar from './components/navBar';

const App = () => {

  return (
    <Router >

      <NavBar/>
      {/* <hr></hr> */}

      <Route exact path='/' component={Login} />
      <Route exact path='/tasks' component={Tasks} />

    </Router>
  )

}

export default App;
