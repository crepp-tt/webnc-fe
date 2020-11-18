import React, { useState } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';

import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      background: '#e5f2e4',
    },
  },
  // cardMedia: {
  //   paddingTop: '56.25%', // 16:9
  // },
  cardContent: {
    flexGrow: 1,
  },
  info: {
    fontSize: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    color: '#95a399',
  },
  time: {
    fontSize: '12px',
  },
  box: {
    width: '100%',
  },
}));

export default function BoardItem({ item, change, setChange }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(item.title);
  const [item2, setItem2] = useState(item);

  let date = new Date(item.createAt);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleDeleteBoard = () => {
    fetch('https://webnc-api.herokuapp.com/api/boards/' + item._id, {
      method: 'DELETE',
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    setChange(!change);
  };

  const handleOnClick = () => {
    history.push('/boards/board-detail/' + item._id);
  };

  const handleEditTitle = () => {
    item.title = textValue;
    setItem2(item);
    fetch(
      'https://webnc-api.herokuapp.com/api/boards/board-detail/' + item._id,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: item2,
        }),
      }
    );
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} onClick={handleOnClick}>
        <Box gutterBottom variant="h6" component="h3" color="#646e66">
          {item2.title}
        </Box>
        <Box>
          <div className={classes.info}>
            <span>
              <AccessTimeIcon className={classes.time} />
              {date.getDate() + ' ' + monthNames[date.getMonth()]}
            </span>

            <span className={classes.cardNumber}>
              {item.totalCards > 1 ? item.totalCards + ' cards' : ''}
            </span>
          </div>
        </Box>
        <hr />
      </CardContent>

      <CardActions className={classes.info}>
        <CopyToClipboard
          text={'http://localhost:3001/boards/board-detail/' + item._id}
        >
          <Button size="small" color="primary">
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>

        <Button size="small" color="primary" onClick={handleDeleteBoard}>
          <DeleteForeverIcon />
        </Button>

        <Button size="small" color="primary" onClick={() => setOpen(true)}>
          <Edit />
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Add new board</DialogTitle>
          <DialogContent>
            <TextField
              defaultValue={item.title}
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditTitle} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
