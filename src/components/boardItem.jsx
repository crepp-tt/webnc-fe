import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import AppBar from '@material-ui/core/AppBar';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
    justifyContent: 'space-between',
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
    console.log(item._id);
    fetch('https://webnc-api.herokuapp.com/boards/' + item._id, {
      method: 'DELETE',
    });
    setChange(!change);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box gutterBottom variant="h6" component="h3" color="#646e66">
          {item.title}
        </Box>
        <Box>
          <div className={classes.info}>
            <span>
              <AccessTimeIcon className={classes.time} />
              {date.getDate() + ' ' + monthNames[date.getMonth()]}
            </span>

            <span className={classes.cardNumber}>
              {item.totalCards > 0 ? item.totalCards + ' cards' : ''}
            </span>
          </div>
        </Box>
        <hr />
      </CardContent>

      <CardActions className={classes.info}>
        <Button size="small" color="primary">
          <FileCopyIcon />
          URL
        </Button>
        <Button size="small" color="primary" onClick={handleDeleteBoard}>
          <DeleteForeverIcon />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
