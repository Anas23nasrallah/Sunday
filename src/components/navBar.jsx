import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'end',
    marginRight: theme.spacing(2),
  },
  container: {
    height: '10vh',
  }
}));

const NavBar = inject('user')(observer((props) => {
  const classes = useStyles();

  return (

    props.user.loggedIn == 'true' ?
      <div className={classes.root} id="nav-bar">
        <AppBar position="static" className={classes.container}>
          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
              <h1>Sunday.com</h1>
            </IconButton>

            <Link to='/tasks' className={classes.title}>
              <Typography variant="h6" >
                Tasks
            </Typography>
            </Link>

            <Link to='/profile' className={classes.title}>
              <Typography variant="h6" >
                Profile
            </Typography>
            </Link>

            <Link className={classes.title}>
              <Typography variant="h6" onClick={() => props.user.logout()}>
                Log Out
            </Typography>
            </Link>

          </Toolbar>
        </AppBar>
      </div>
      :
      <div className={classes.root} id="nav-bar">
        <AppBar position="static" className={classes.container}>
          <Toolbar>

            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <h1>Sunday.com</h1>
            </IconButton>

            <Link to='/login' className={classes.title}>
              <Typography variant="h6" >
                Login
              </Typography>
            </Link>

            <Link to='/signUp' className={classes.title}>
              <Typography variant="h6" >
                Sign Up
            </Typography>
            </Link>

          </Toolbar>
        </AppBar>
      </div>

  );
}))

export default NavBar