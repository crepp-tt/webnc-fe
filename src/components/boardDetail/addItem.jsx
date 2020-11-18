import React from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardActions } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

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
    borderColor: 'black',
  },
  itemAction: {
    justifyContent: 'space-between',
    display: 'flex',
  },
}));

export default function AddItem({ type, item, setItem, id }) {
  const classes = useStyles();
  const [exists, setExists] = useState(true);
  const [text, setText] = useState('');

  const handleAddItem = () => {
    if (text.trim() !== '') {
      const cloneItem = { ...item };
      cloneItem[type].push(text);
      setItem(cloneItem);
      setExists(false);
      fetch('http://localhost:3000/api/boards/board-detail/' + id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: item,
        }),
      });
    }
  };
  return exists ? (
    <Card className={classes.columnItem}>
      <CardContent>
        <InputBase
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </CardContent>
      <CardActions className={classes.itemAction}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleAddItem}
        >
          Add
        </Button>
        <Button size="small" onClick={() => setExists(false)}>
          <DeleteForeverIcon />
        </Button>
      </CardActions>
    </Card>
  ) : null;
}
