import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import { getProfile, getToken, profileRequest } from '../../modules/Profile';

import styles from './Profile.module.css';

export class Profile extends Component {
  componentDidMount() {
    const { profileRequest, jwt_token } = this.props;
    profileRequest(jwt_token);
  }

  render() {
    const { profile } = this.props;

    return (
      profile.data !== null && (
        <Paper className={styles.root}>
          <Typography variant="h4" align="left">
            Profile
          </Typography>
          <br />
          <Typography>
            ID: {profile.data.id}
            <br />
            Email: {profile.data.email}
          </Typography>
        </Paper>
      )
    );
  }
}

export default connect(
  state => ({
    jwt_token: getToken(state),
    profile: getProfile(state)
  }),
  { profileRequest }
)(Profile);
