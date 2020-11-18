import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import jwt_decode from 'jwt-decode';
import InputBase from '@material-ui/core/InputBase';
import Avt from '../../icon/man.png';

import { withStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

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

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const user = jwt_decode(localStorage.getItem('token'));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const handleSaveProfile = () => {
    fetch('http://localhost:3000/api/users/change-profile', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        email: user.email,
        name: textValue,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          localStorage.setItem('token', data.token);
          setIsEdit(false);
        });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };
  return (
    <AppBar position="relative">
      <Toolbar className={classes.bar}>
        <Button color="inherit" onClick={() => history.push('/boards')}>
          <h3>Retro</h3>
        </Button>
        <Avatar alt="Remy Sharp" src={Avt} onClick={handleClick} />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              setOpen(true);
              setAnchorEl(null);
            }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </StyledMenu>
        <Dialog
          open={open}
          onClose={() => setAnchorEl(null)}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Change profile</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}

            <label>Email</label>
            <InputBase
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              defaultValue={user.email}
              disabled={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              defaultValue={user.name}
              disabled={!isEdit}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            {isEdit ? (
              <Button onClick={handleSaveProfile} color="primary">
                Save
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                color="primary"
              >
                Edit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}
