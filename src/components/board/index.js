import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Board from './board';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '56px !important',
    marginBottom: theme.spacing.unit,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    height: 95, // setting height/width is optional
  },
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [change, setChange] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/boards', {
      method: 'GET',
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          localStorage.getItem('token');
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [change]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="primary"
                gutterBottom
              >
                My boards
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="xl">
            <Grid container spacing={3}>
              <Board items={items} setChange={setChange} change={change} />
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
