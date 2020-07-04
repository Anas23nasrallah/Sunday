import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{color:'black', background:'white'}}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        {!props.loggedIn ? 
            <div>

                <Link to='/' >
                    <StyledMenuItem>
                        <ListItemText primary="Login" />
                    </StyledMenuItem>
                </Link>

                <Link to='/signUp'>
                    <StyledMenuItem>
                        <ListItemText primary="Sign Up" />
                    </StyledMenuItem>
                </Link>

            </div>
            : 
            <div>

                <Link to='/tasks' >
                    <StyledMenuItem>
                        <ListItemText primary="Tasks" />
                    </StyledMenuItem>
                </Link>

                <Link to='/profile'>
                    <StyledMenuItem>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                </Link>

            </div>
            }
        </StyledMenu>

        {/* <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem> */}
    </div>
  );
}