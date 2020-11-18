import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '../../icon/facebook.png';
import GoogleIcon from '../../icon/google.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 0, 0),
  },
}));

export default function RegisterCard() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  const responseGoogle = (response) => {
    fetch('http://localhost:3000/api/auth/logingg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ggAccessToken: response.accessToken,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            localStorage.setItem('token', data.token);
            history.push('/boards');
          });
        } else if (response.status === 400) {
          setAlert(<Alert severity="warning">Please input all fields!</Alert>);
        } else {
          setAlert(<Alert severity="error">Can not login!</Alert>);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const responseFacebook = (response) => {
    console.log(response);
    fetch('http://localhost:3000/api/auth/loginfb', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fbAccessToken: response.accessToken,
        id: response.id,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            localStorage.setItem('token', data.token);
            history.push('/boards');
          });
        } else if (response.status === 400) {
          setAlert(<Alert severity="warning">Please input all fields!</Alert>);
        } else {
          setAlert(<Alert severity="error">Can not login!</Alert>);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    fetch('https://webnc-api.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem('token', data.token);
            history.push('/boards');
          });
        } else if (response.status === 400) {
          setAlert(<Alert severity="warning">Please input all fields!</Alert>);
        } else {
          setAlert(<Alert severity="error">Can not login!</Alert>);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {alert}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          
          Google Login
        </Button> */}
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <GoogleLogin
            clientId="866874233194-ecep2qn31gc8ltvddh81s9nj52bpb4th.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className={classes.submit}
            render={(props) => (
              <Button
                onClick={props.onClick}
                variant="outlined"
                color="secondary"
                style={{ width: '40%', textTransform: 'none' }}
              >
                <img src={GoogleIcon} />
                <span style={{ marginLeft: 5 }}>Google</span>
              </Button>
            )}
          />

          <FacebookLogin
            appId="691587058431937"
            callback={responseFacebook}
            render={(props) => (
              <Button
                variant="outlined"
                color="primary"
                onClick={props.onClick}
                startIcon={props.icon}
                style={{ width: '40%', textTransform: 'none' }}
              >
                <img src={FacebookIcon} />
                <span style={{ marginLeft: 5 }}>Facebook</span>
              </Button>
            )}
          />
        </div>

        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Grid item>
            <Link href="/register" variant="body2">
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
