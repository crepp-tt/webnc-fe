import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddItem from './addItem';
import ColumnItem from './columnItem';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Header from '../header';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '56px !important',
    marginBottom: theme.spacing.unit,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 1),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  columnGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  column: {
    width: '96.25%',
    display: 'flex',
    margin: 'auto',
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
  columnItem: {
    marginTop: theme.spacing(2),
  },
  itemAction: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
}));

export default function BoardDetail() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addActionItem, setAddActionItem] = useState([]);
  const [addWentWellItem, setAddWentWellItem] = useState([]);
  const [addImproveItem, setAddImproveItem] = useState([]);

  let { id } = useParams();

  const handleAddActionItem = () => {
    const cloneAdd = [...addActionItem];
    cloneAdd.push(
      <AddItem type={'actionCards'} item={item} setItem={setItem} id={id} />
    );
    setAddActionItem(cloneAdd);
  };
  const handleAddWentWellItem = () => {
    const cloneAdd = [...addWentWellItem];
    cloneAdd.push(
      <AddItem type={'wentCards'} item={item} setItem={setItem} id={id} />
    );
    setAddWentWellItem(cloneAdd);
  };
  const handleAddImproveItem = () => {
    const cloneAdd = [...addImproveItem];
    cloneAdd.push(
      <AddItem type={'improveCards'} item={item} setItem={setItem} id={id} />
    );
    setAddImproveItem(cloneAdd);
  };

  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3000/api/boards/board-detail/' + id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result.board);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return item ? (
      <React.Fragment>
        <CssBaseline />
        {localStorage.getItem('token') ? (
          <Header />
        ) : (
          <AppBar position="relative">
            <Toolbar>
              <Button color="inherit" onClick={() => history.push('/boards')}>
                <h3>Retro</h3>
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="primary"
              >
                {item.title}
              </Typography>
            </Container>
          </div>

          <Container className={classes.columnGrid} maxWidth="xl">
            <Grid container spacing={3}>
              <Grid md={4} sm={4} xs={12}>
                <Box className={classes.column}>
                  <h3>Action Items</h3>
                  <Button
                    variant="contained"
                    size="small"
                    color="gray"
                    onClick={handleAddActionItem}
                  >
                    <AddIcon />
                  </Button>
                  {addActionItem.map((element) => element)}
                  {item.actionCards.map((action) => (
                    <ColumnItem
                      content={action}
                      type="actionCards"
                      item={item}
                      setItem={setItem}
                      id={id}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid md={4} sm={4} xs={12}>
                <Box className={classes.column}>
                  <h3>Went Well</h3>
                  <Button
                    variant="contained"
                    size="small"
                    color="gray"
                    onClick={handleAddWentWellItem}
                  >
                    <AddIcon />
                  </Button>
                  {addWentWellItem.map((element) => element)}
                  {item.wentCards.map((went) => (
                    <ColumnItem
                      content={went}
                      type="wentCards"
                      item={item}
                      setItem={setItem}
                      id={id}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid md={4} sm={4} xs={12}>
                <Box className={classes.column}>
                  <h3>To Improve</h3>
                  <Button
                    variant="contained"
                    size="small"
                    color="gray"
                    onClick={handleAddImproveItem}
                  >
                    <AddIcon />
                  </Button>
                  {addImproveItem.map((element) => element)}
                  {item.improveCards.map((improve) => (
                    <ColumnItem
                      content={improve}
                      type="improveCards"
                      item={item}
                      setItem={setItem}
                      id={id}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    ) : null;
  }
}
