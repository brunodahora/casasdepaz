//@flow

import * as React from 'react';
import * as firebase from 'firebase';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Drawer from './Drawer';

import { admins } from '../constants';

export default class PrivateRoute extends React.Component {
  state = {
    user: undefined,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        if (admins.includes(user.email)) {
          this.setState({ user });
        } else {
          firebase.auth().signOut();
        }
      } else {
        this.setState({ user });
      }
    });
  }

  render() {
    const { component: Component, title, ...rest } = this.props;
    const { user } = this.state;

    if (user === undefined)
      return (
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      );

    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Drawer title={title}>
              <Component {...props} />
            </Drawer>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}
