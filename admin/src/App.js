import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import { ErrorBoundary, PrivateRoute, Login, Dashboard, Users, Places } from './components';
import { env } from './constants';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

firebase.initializeApp({ ...env.firebase });

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: teal,
    secondary: amber,
  },
});

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} title="Dashboard" />
              <PrivateRoute exact path="/users" component={Users} title="Mensageiros" />
              <PrivateRoute exact path="/places" component={Places} title="Lugares" />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
