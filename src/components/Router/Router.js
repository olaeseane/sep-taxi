import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Grid from "@material-ui/core/Grid/Grid";
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import styles from './Router.module.css';

export default () => (
  <Grid
    alignItems="center"
    className={styles.root}
    direction="column"
    justify="space-between"
    container
  >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Grid>
);
