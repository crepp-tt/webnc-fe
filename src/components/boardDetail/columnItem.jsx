import React, { useState } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Pusher from 'pusher-js';

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
export default function ColumnItem({ content, type, item, setItem, id }) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState('');

  const handleDelete = () => {
    const index = item[type].indexOf(content);
    const cloneItem = { ...item };
    cloneItem[type].splice(index, 1);
    setItem(cloneItem);
    fetch('https://webnc-api.herokuapp.com/api/boards/board-detail/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board: item,
      }),
    });
  };

  const handleEdit = () => {
    const index = item[type].indexOf(content);
    const cloneItem = { ...item };
    cloneItem[type][index] = text;
    setItem(cloneItem);
    fetch('https://webnc-api.herokuapp.com/api/boards/board-detail/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board: item,
      }),
    });
    setIsEdit(false);
  };

  return (
    <Card className={classes.columnItem}>
      <CardContent>
        <InputBase
          defaultValue={content}
          disabled={!isEdit}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ width: '100%', overflowWrap: 'break-word' }}
          multiline
        />
      </CardContent>
      <CardActions className={classes.itemAction}>
        {!isEdit ? (
          <>
            <Button size="small" onClick={() => setIsEdit(true)}>
              <EditIcon />
            </Button>
            <Button size="small" onClick={handleDelete}>
              <DeleteForeverIcon />
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleEdit}
          >
            Done
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
