import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import CustomizedMenus from './menuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    margiRight: '60%',
    fontWeight: '600',
    marginLeft:'0px', 
    width:'30vw',
    fontSize: "3.7em"
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'end',
    marginRight: theme.spacing(2),
    // background: 'white',
    // color: 'black'
  },
  container: {
    height: '10vh',
  }
}));

const NavBar = inject('user')(observer((props) => {
  
  const classes = useStyles();
  let loggedIn = props.user.loggedIn

  return (
 
      <div className={classes.root} id="nav-bar">
        <AppBar position="static" className={classes.container}>
          <Toolbar>
          <Typography className={classes.menuButton} variant="h4" noWrap>
              Sunday.com
          </Typography>

          { loggedIn === 'true' ?
            <CustomizedMenus loggedIn={loggedIn} className={classes.title} />
            :null}

          </Toolbar>
        </AppBar>
      </div>
  );
}))

export default NavBar


