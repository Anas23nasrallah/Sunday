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
import { useState, useEffect } from 'react';
import Axios from 'axios';


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

const Profile = inject('tasksStore')(observer((props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [urgentTasks, setUrgent] = useState(0);
  const [completedTasks, setCompleted] = useState(0);
  const [avatar, setAvatar] = useState(0);






  // const getAnalysis = async () => {

  //   await props.tasksStore.getTasksFromDB(props.tasksStore.userId);
  //   // console.log(props.tasksStore.userId);

  //   let tasks = props.tasksStore._tasks;
  //   tasks = JSON.parse(JSON.stringify(tasks));
  //   // console.log(tasks);
  //   //   const totalTasks = tasks.length;
  //   const completedTasks = tasks.filter((u) => (u.status == '3') || (u.status == 'Completed')).length;
  //   const urgentTasks = tasks.filter(
  //     (u) => (u.priority == '1' || u.priority == 'Urgent'
  //     ) && u.status != 'Completed').length;
  //   setUrgent(urgentTasks);
  //   setCompleted(completedTasks);
  // };
  let url
  // let getAvatar = async () =>{
  //     const response = await Axios.get(`https://tinyfac.es/api/users`);
  //     console.log("response is:" , response.data[0].avatars[0].url);
  // url.push(response.data[0].avatars[0].url);
  // }

  useEffect(() => {
    const getAnalysis = async () => {

      await props.tasksStore.getTasksFromDB(props.tasksStore.userId);
      // console.log(props.tasksStore.userId);
  
      let tasks = props.tasksStore._tasks;
      tasks = JSON.parse(JSON.stringify(tasks));
      // console.log(tasks);
      //   const totalTasks = tasks.length;
      const completedTasks = tasks.filter((u) => (u.status == '3') || (u.status == 'Completed')).length;
      const urgentTasks = tasks.filter(
        (u) => (u.priority == '1' || u.priority == 'Urgent'
        ) && u.status != 'Completed').length;
      setUrgent(urgentTasks);
      setCompleted(completedTasks);
    };
    getAnalysis()
  }, []);
  // useEffect(getAvatar, []);

  useEffect(() => {
    async function getAvatar() {
      const response = await Axios.get(`https://tinyfac.es/api/users`);
      url = response.data[0].avatars[1].url 
      setAvatar(url)
    }
    getAvatar();
  }, []);

  return (
    <div>
      <ScopedCssBaseline>
        <MuiThemeProvider>
          <Box
            width='100vw'
            height='100vh'
            boxShadow={4}
            style={{ justifyContent: 'center' }}>
            <Paper elevation={4}>
              <br></br>
              <Avatar
                alt='https://api.adorable.io/avatars/285/abott@adorable.png'
                src={`${avatar}` || ""}
                // src='https://image.flaticon.com/icons/png/512/1752/1752735.png'
                className={classes.large}
              />
              <div className={classes.root}>
                <Typography
                  color='primary'
                  variant='h5'
                  component='h1'
                  gutterBottom>
                  {bull} First Name: {localStorage.getItem('firstName')}
                </Typography>
                <Typography
                  color='primary'
                  variant='h5'
                  component='h2'
                  gutterBottom>
                  {bull} Last Name: {localStorage.getItem('lastName')}
                </Typography>
                <Typography
                  color='primary'
                  variant='h5'
                  component='h3'
                  gutterBottom>
                  {bull} User Name : {localStorage.getItem('username')}
                </Typography>
                <Typography
                  color='primary'
                  variant='h5'
                  component='h4'
                  gutterBottom>
                  {bull} Email : {localStorage.getItem('email')}
                </Typography>
                {/* <Typography
                      color='primary'
                      variant='h5'
                      component='h4'
                      gutterBottom>
                      {bull} Open Tasks
                    </Typography> */}
                {/* <span>
                      <Badge
                        className='open-tasks'
                        badgeContent={openTask}
                        color='primary'>
                        <MailIcon />
                      </Badge>
                    </span> */}
                <span>
                  <Typography
                    color='primary'
                    variant='h5'
                    component='h4'
                    gutterBottom>
                    {bull} Completed Tasks
                        <Badge
                      className='completed-tasks'
                      badgeContent={completedTasks}
                      color='secondary'
                      display='inline'>
                      <MailIcon />
                    </Badge>
                  </Typography>
                </span>
                <Typography
                  color='primary'
                  variant='h5'
                  component='h4'
                  gutterBottom>
                  {bull} Urgent Tasks
                      <Badge
                    className='urgent-tasks'
                    badgeContent={urgentTasks}
                    color='secondary'
                    display='inline'>
                    <MailIcon />
                  </Badge>
                </Typography>
                <span></span>
                <br></br>
                {/* <Button
                      size='small'
                      color='textSecondary'
                      onClick={getAnalysis}>
                      Show my stats
                    </Button> */}
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
