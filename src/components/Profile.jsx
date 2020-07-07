import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { inject, observer } from 'mobx-react';
import { Avatar, Paper } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Typography, Box } from '@material-ui/core';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

import { sizing } from '@material-ui/system';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Profile = inject('user')(
  observer((props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    //! user basic tasks stats
    let openTasks = 4;
    let completedTasks = 20;
    let urgentTasks = 3;

    const user = props.user;
    return (
      <div>
        <ScopedCssBaseline>
          <MuiThemeProvider>
            <Box width='48%' boxShadow={4} style={{ justifyContent: 'center' }}>
              <Paper elevation={4}>
                <Avatar
                  alt='AB'
                  src='https://image.flaticon.com/icons/png/512/1752/1752735.png'
                  className={classes.large}
                />
                <div className={classes.root}>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h1'
                    gutterBottom>
                    {bull} First Name: {user.firstName}
                  </Typography>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h2'
                    gutterBottom>
                    {bull} Last Name: {user.lastName}
                  </Typography>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h3'
                    gutterBottom>
                    {bull} User Name : {user.userName}
                  </Typography>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h4'
                    gutterBottom>
                    {bull} Email : {user.email}
                  </Typography>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h4'
                    gutterBottom>
                    {bull} Open Tasks
                  </Typography>
                  <span>
                    <Badge
                      className='open-tasks'
                      badgeContent={openTasks}
                      color='primary'>
                      <MailIcon />
                    </Badge>
                  </span>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h4'
                    gutterBottom>
                    {bull} Completed Tasks
                  </Typography>
                  <span>
                    <Badge
                      className='completed-tasks'
                      badgeContent={completedTasks}
                      color='secondary'
                      display='inline'>
                      <MailIcon />
                    </Badge>
                  </span>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h4'
                    gutterBottom>
                    {bull} Urgent Tasks
                  </Typography>
                  <span>
                    <Badge
                      className='urgent-tasks'
                      badgeContent={urgentTasks}
                      color='secondary'
                      display='inline'>
                      <MailIcon />
                    </Badge>
                  </span>
                  <br></br>
                  <Button size='small' color='textSecondary'>
                    Show my stats
                  </Button>
                </div>
              </Paper>
            </Box>
          </MuiThemeProvider>
        </ScopedCssBaseline>
      </div>
    );
  })
);

export default Profile;
