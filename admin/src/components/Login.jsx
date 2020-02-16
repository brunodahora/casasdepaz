// @flow
import * as React from 'react';
import * as Sentry from '@sentry/browser';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { admins } from '../constants';

type State = {
  email: string,
  password: string,
  user: object,
};

class Login extends React.Component<null, State> {
  state = {
    email: '',
    password: '',
  };

  attemptLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .then(({ user }) => {
        if (admins.includes(user.email)) {
          this.setState({ user });
        } else {
          alert('Você não tem acesso a esta página.');
          firebase.auth().signOut();
        }
      })
      .catch(error => {
        alert('Erro ao efetuar o login.\nVerifique seu e-mail e/ou sua senha.');
        Sentry.captureException(error);
      });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };

    if (firebase.auth().currentUser) return <Redirect to={from} />;

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppBar position="sticky" style={{ padding: 15, marginBottom: 15 }}>
            Login
          </AppBar>
          <TextField
            placeholder="Entre seu e-mail"
            label="E-mail"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <br />
          <TextField
            type="password"
            placeholder="Entre sua senha"
            label="Senha"
            onChange={event => this.setState({ password: event.target.value })}
          />
          <br />
          <Button variant="contained" style={style} onClick={this.attemptLogin}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;
