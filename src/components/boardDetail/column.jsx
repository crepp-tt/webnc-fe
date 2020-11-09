// import React from 'react';
// import { useState, useEffect } from 'react';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import { Card, CardContent, CardActions } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/Edit';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     fontSize: '56px !important',
//     marginBottom: theme.spacing.unit,
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(1, 0, 1),
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4),
//   },
//   columnGrid: {
//     paddingTop: theme.spacing(2),
//     paddingBottom: theme.spacing(8),
//   },
//   column: {
//     width: '96.25%',
//     display: 'flex',
//     margin: 'auto',
//     flexDirection: 'column',
//   },
//   cardMedia: {
//     paddingTop: '56.25%', // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   button: {
//     height: 95, // setting height/width is optional
//   },
//   label: {
//     // Aligns the content of the button vertically.
//     flexDirection: 'column',
//   },
//   columnItem: {
//     marginTop: theme.spacing(2),
//   },
//   itemAction: {
//     justifyContent: 'flex-end',
//     display: 'flex',
//   },
// }));

// export default function Column() {
//   const classes = useStyles();
//   return (
//     <Grid md={4} sm={4} xs={12}>
//       <Box className={classes.column}>
//         <h3>Action Items</h3>
//         <Button variant="contained" size="small" color="gray">
//           <AddIcon />
//         </Button>
//         {addItem}
//         <Card className={classes.columnItem}>
//           <CardContent>
//             <span>test</span>
//           </CardContent>
//           <CardActions className={classes.itemAction}>
//             <Button size="small">
//               <EditIcon />
//             </Button>
//             <Button size="small">
//               <DeleteForeverIcon />
//             </Button>
//           </CardActions>
//         </Card>
//       </Box>
//     </Grid>
//   );
// }
