import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthorized } from '../../modules/Auth';

export class PrivateRoute extends PureComponent {
  render() {
    const { isAuthorized, component } = this.props;

    return isAuthorized ? (
      <Route component={component} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default connect(state => ({
  isAuthorized: getIsAuthorized(state)
}))(PrivateRoute);
