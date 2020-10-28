import React from 'react';
import BoardItem from './boardItem';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    height: '100%', // setting height/width is optional
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
  },
}));
export default function Board({ items }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBoard = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <Grid item xs={6} sm={3} md={2}>
        <Button
          classes={{ root: classes.button, label: classes.label }}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          <AddCircleIcon className={classes.icon} />
          Add board
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Add new board</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Content"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddBoard} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {items.map((item) => (
        <Grid item key={item} xs={6} sm={3} md={2}>
          <BoardItem item={item} />
        </Grid>
      ))}
    </>
  );
}
